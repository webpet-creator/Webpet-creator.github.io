import { site } from '../../data/site'
import { getDict, type Lang } from '../../i18n'
import { ButtonLink } from '../ui/ButtonLink'
import { Container } from '../ui/Container'
import { ContactForm } from './ContactForm'

/** Bloc clair, en écho à l'étiquette du hero : liens directs, et formulaire si un service d'envoi est configuré. */
export function Contact({ lang }: { lang: Lang }) {
  const t = getDict(lang)
  const endpoint = site.contactEndpoint
  return (
    <section id="contact" aria-labelledby="contact-title" className="scroll-mt-6 py-16 lg:py-28">
      <Container>
        <div className="bg-paper text-ink [&_:focus-visible]:outline-ink grid gap-12 rounded-md p-7 lg:grid-cols-12 lg:gap-6 lg:p-16">
          <div className="lg:col-span-6">
            <p className="tracking-label text-label text-sm font-semibold uppercase">
              {t.contact.label}
            </p>
            <h2
              id="contact-title"
              className="font-display mt-4 text-4xl leading-none font-extrabold tracking-tight sm:text-6xl xl:text-7xl"
            >
              {t.contact.title}
            </h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed lg:text-xl">{t.contact.text}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4 lg:flex-col lg:items-start">
              <ButtonLink href={site.telegram.href} variant="ink-outline" arrow>
                {t.actions.telegram}
              </ButtonLink>
              <ButtonLink href={`mailto:${site.email}`} variant="ink-outline">
                {t.actions.email}
              </ButtonLink>
            </div>
          </div>
          {endpoint && (
            <div className="lg:col-span-5 lg:col-start-8">
              <ContactForm lang={lang} endpoint={endpoint} />
            </div>
          )}
        </div>
      </Container>
    </section>
  )
}
