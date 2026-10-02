import { site } from '../../data/site'
import { getDict, type Lang } from '../../i18n'
import { Container } from '../ui/Container'
import { LabelField, LabelList } from '../ui/LabelField'

export function Footer({ lang }: { lang: Lang }) {
  const t = getDict(lang)
  const linkClass = 'underline decoration-accent underline-offset-4 hover:text-accent'
  return (
    <footer className="border-line border-t">
      <Container className="py-10">
        <LabelList className="sm:grid-cols-3">
          <LabelField label={t.footer.basedLabel}>{t.footer.based}</LabelField>
          <LabelField label={t.footer.emailLabel}>
            <a href={`mailto:${site.email}`} className={`${linkClass} break-all`}>
              {site.email}
            </a>
          </LabelField>
          <LabelField label={t.footer.telegramLabel}>
            <a href={site.telegram.href} target="_blank" rel="noreferrer" className={linkClass}>
              {site.telegram.handle}
            </a>
          </LabelField>
        </LabelList>
        <p className="text-muted mt-10 text-sm">
          © {new Date().getFullYear()} {site.name}
        </p>
      </Container>
    </footer>
  )
}
