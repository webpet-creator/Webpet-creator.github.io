import { ArrowRight } from 'lucide-react'
import { useState, type SubmitEvent } from 'react'
import { getDict, type Lang } from '../../i18n'
import { buttonClass } from '../../lib/buttonClass'

type Status = 'idle' | 'sending' | 'success' | 'error'

const FIELDS = ['name', 'contact', 'message'] as const
type Field = (typeof FIELDS)[number]

/** [min, max] en caractères. Mêmes valeurs que dans server/contact/contact_server.py. */
const LIMITS: Record<Field, [number, number]> = {
  name: [2, 80],
  contact: [3, 120],
  message: [10, 2000],
}

const inputClass =
  'mt-2 block w-full rounded-sm border border-ink bg-transparent px-4 py-3 text-lg text-ink placeholder:text-label aria-invalid:border-2'

export function ContactForm({ lang, endpoint }: { lang: Lang; endpoint: string }) {
  const t = getDict(lang).contact.form
  const [status, setStatus] = useState<Status>('idle')
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({})

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    const read = (key: string) => String(data.get(key) ?? '').trim()
    const values = { name: read('name'), contact: read('contact'), message: read('message') }

    const found: Partial<Record<Field, string>> = {}
    for (const field of FIELDS) {
      const [min, max] = LIMITS[field]
      const length = values[field].length
      if (length === 0) found[field] = t.required
      else if (length < min) found[field] = t.tooShort
      else if (length > max) found[field] = t.tooLong
    }
    setErrors(found)
    const firstInvalid = FIELDS.find((field) => found[field])
    if (firstInvalid) {
      form.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus()
      return
    }

    setStatus('sending')
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, website: read('website'), lang }),
      })
      if (!response.ok) throw new Error(`HTTP ${response.status}`)
      form.reset()
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <p role="status" className="border-ink rounded-sm border p-6 text-lg font-semibold">
        {t.success}
      </p>
    )
  }

  const describe = (field: Field, hint?: string) =>
    [errors[field] && `${field}-error`, hint && `${field}-hint`].filter(Boolean).join(' ') ||
    undefined

  const errorText = (field: Field) =>
    errors[field] && (
      <p id={`${field}-error`} className="mt-2 text-sm font-semibold">
        {errors[field]}
      </p>
    )

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
      <div>
        <label htmlFor="contact-name" className="text-sm font-semibold">
          {t.nameLabel}
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          autoComplete="name"
          maxLength={LIMITS.name[1]}
          aria-invalid={errors.name ? true : undefined}
          aria-describedby={describe('name')}
          className={inputClass}
        />
        {errorText('name')}
      </div>

      <div>
        <label htmlFor="contact-contact" className="text-sm font-semibold">
          {t.contactLabel}
        </label>
        <input
          id="contact-contact"
          name="contact"
          type="text"
          autoComplete="email"
          maxLength={LIMITS.contact[1]}
          aria-invalid={errors.contact ? true : undefined}
          aria-describedby={describe('contact', t.contactHint)}
          className={inputClass}
        />
        <p id="contact-hint" className="text-label mt-2 text-sm">
          {t.contactHint}
        </p>
        {errorText('contact')}
      </div>

      <div>
        <label htmlFor="contact-message" className="text-sm font-semibold">
          {t.messageLabel}
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          maxLength={LIMITS.message[1]}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={describe('message')}
          className={inputClass}
        />
        {errorText('message')}
      </div>

      {/* Piège à robots : invisible et hors tabulation pour un humain. */}
      <div aria-hidden="true" className="hidden">
        <label htmlFor="contact-website">Website</label>
        <input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {status === 'error' && (
        <p role="alert" className="border-ink rounded-sm border-2 p-4 font-semibold">
          {t.error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'sending'}
        className={buttonClass('ink', 'disabled:opacity-60 sm:self-start')}
      >
        {status === 'sending' ? t.sending : t.submit}
        <ArrowRight aria-hidden="true" size={18} strokeWidth={2.2} />
      </button>
    </form>
  )
}
