# Mise en ligne du formulaire de contact

Le formulaire du site envoie les messages à `/api/contact`. Sur le VPS, nginx relaie cette
adresse vers un petit service Python, qui transmet le message sur Telegram par un bot dédié.

## 1. Créer le bot

1. Dans Telegram, ouvrir @BotFather, envoyer `/newbot` et suivre les étapes.
2. Noter le jeton fourni (forme `123456:ABC...`). Il est secret.
3. Ouvrir le nouveau bot et lui envoyer `/start` depuis le compte qui recevra les messages.
4. Récupérer l'identifiant de ce compte :
   `curl https://api.telegram.org/bot<JETON>/getUpdates`
   L'identifiant est le nombre dans `"chat":{"id": ...}`.

## 2. Installer le service

```bash
sudo mkdir -p /opt/portfolio-contact
sudo cp contact/contact_server.py /opt/portfolio-contact/
sudo cp contact/contact.env.example /etc/portfolio-contact.env
sudo nano /etc/portfolio-contact.env      # renseigner le jeton et l'identifiant
sudo chmod 600 /etc/portfolio-contact.env
sudo cp contact/portfolio-contact.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable --now portfolio-contact
systemctl status portfolio-contact
```

## 3. Tester sans le site

```bash
curl -X POST http://127.0.0.1:8787/api/contact \
  -H 'Content-Type: application/json' \
  -d '{"name":"Test","contact":"@test","message":"Bonjour, ceci est un test."}'
```

Réponse attendue : `{"ok": true}`, et le message arrive sur Telegram.

## 4. Brancher nginx

Le bloc `location = /api/contact` de `nginx.conf.example` fait le relais. Après modification :
`sudo nginx -t && sudo systemctl reload nginx`.

## Protections en place

- Le service n'écoute qu'en local ; seul nginx lui parle.
- Longueur des champs vérifiée côté serveur, corps limité à 16 Ko.
- Champ piège invisible contre les robots.
- Cinq messages par heure au plus par adresse IP.
- Le message part en texte brut, sans mise en forme interprétée.
- Le journal ne contient ni les messages ni le jeton.
