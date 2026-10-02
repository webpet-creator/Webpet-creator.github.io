import { ButtonLink } from '../components/ui/ButtonLink'
import { Container } from '../components/ui/Container'
import { getDict, type Lang } from '../i18n'

export function NotFound({ lang }: { lang: Lang }) {
  const t = getDict(lang)
  return (
    <Container className="py-16 lg:py-24">
      <p className="tracking-label text-accent text-sm font-semibold uppercase">404</p>
      <h1 className="font-display mt-6 mb-10 text-4xl font-extrabold md:text-6xl">
        {t.notFound.title}
      </h1>
      <ButtonLink href={`/${lang}`} variant="secondary">
        {t.notFound.back}
      </ButtonLink>
    </Container>
  )
}
