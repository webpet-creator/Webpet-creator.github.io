#!/usr/bin/env python3
"""Reçoit les messages du formulaire du portfolio et les transmet sur Telegram.

Bibliothèque standard uniquement : rien à installer avec pip.
Écoute en local ; nginx relaie /api/contact vers ce service (voir server/README.md).
"""

import json
import os
import threading
import time
import urllib.error
import urllib.request
from collections import defaultdict, deque
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer

BOT_TOKEN = os.environ["CONTACT_BOT_TOKEN"]
CHAT_ID = os.environ["CONTACT_CHAT_ID"]
HOST = os.environ.get("CONTACT_HOST", "127.0.0.1")
PORT = int(os.environ.get("CONTACT_PORT", "8787"))
API_BASE = os.environ.get("TELEGRAM_API_BASE", "https://api.telegram.org")

MAX_BODY_BYTES = 16 * 1024
# (min, max) en caractères. Mêmes valeurs que dans src/components/sections/ContactForm.tsx.
LIMITS = {"name": (2, 80), "contact": (3, 120), "message": (10, 2000)}
LANGS = ("fr", "en", "ru")

# Anti-abus : au plus RATE_MAX messages par adresse IP sur RATE_WINDOW secondes.
RATE_MAX = 5
RATE_WINDOW = 3600
_hits = defaultdict(deque)
_lock = threading.Lock()


def allowed(ip):
    now = time.monotonic()
    with _lock:
        for key in [k for k, q in _hits.items() if not q or now - q[-1] > RATE_WINDOW]:
            del _hits[key]
        queue = _hits[ip]
        while queue and now - queue[0] > RATE_WINDOW:
            queue.popleft()
        if len(queue) >= RATE_MAX:
            return False
        queue.append(now)
        return True


def send_to_telegram(text):
    payload = json.dumps(
        {"chat_id": CHAT_ID, "text": text, "disable_web_page_preview": True}
    ).encode()
    request = urllib.request.Request(
        f"{API_BASE}/bot{BOT_TOKEN}/sendMessage",
        data=payload,
        headers={"Content-Type": "application/json"},
    )
    with urllib.request.urlopen(request, timeout=10) as response:
        return json.load(response).get("ok") is True


class Handler(BaseHTTPRequestHandler):
    server_version = "contact"
    sys_version = ""

    def reply(self, status, body):
        data = json.dumps(body).encode()
        self.send_response(status)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(data)))
        self.end_headers()
        self.wfile.write(data)

    def log_message(self, fmt, *args):
        # Journal minimal : jamais le contenu des messages ni le jeton.
        print(f"{self.log_date_time_string()} {fmt % args}", flush=True)

    def do_POST(self):
        if self.path != "/api/contact":
            return self.reply(404, {"ok": False, "error": "not_found"})

        try:
            length = int(self.headers.get("Content-Length", "0"))
        except ValueError:
            length = 0
        if length <= 0 or length > MAX_BODY_BYTES:
            return self.reply(413, {"ok": False, "error": "bad_size"})

        try:
            body = json.loads(self.rfile.read(length))
        except (ValueError, UnicodeDecodeError):
            return self.reply(400, {"ok": False, "error": "bad_json"})
        if not isinstance(body, dict):
            return self.reply(400, {"ok": False, "error": "bad_json"})

        # Champ piège rempli = robot. On répond « ok » sans rien envoyer.
        if body.get("website"):
            return self.reply(200, {"ok": True})

        values, invalid = {}, []
        for field, (low, high) in LIMITS.items():
            value = body.get(field)
            value = value.strip() if isinstance(value, str) else ""
            if not low <= len(value) <= high:
                invalid.append(field)
            values[field] = value
        if invalid:
            return self.reply(422, {"ok": False, "error": "invalid", "fields": invalid})

        ip = self.headers.get("X-Real-IP") or self.client_address[0]
        if not allowed(ip):
            return self.reply(429, {"ok": False, "error": "rate_limited"})

        lang = body.get("lang") if body.get("lang") in LANGS else "?"
        text = (
            "Nouveau message du portfolio\n\n"
            f"Nom : {values['name']}\n"
            f"Contact : {values['contact']}\n"
            f"Langue du site : {lang}\n\n"
            f"{values['message']}"
        )
        try:
            delivered = send_to_telegram(text)
        except (urllib.error.URLError, TimeoutError, ValueError) as error:
            print(f"telegram error: {type(error).__name__}", flush=True)
            delivered = False
        if not delivered:
            return self.reply(502, {"ok": False, "error": "delivery_failed"})
        return self.reply(200, {"ok": True})


if __name__ == "__main__":
    print(f"contact service on {HOST}:{PORT}", flush=True)
    ThreadingHTTPServer((HOST, PORT), Handler).serve_forever()
