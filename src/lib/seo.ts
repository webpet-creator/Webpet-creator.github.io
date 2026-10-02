import { caseStudies } from '../data/caseStudies'
import { getProject } from '../data/projects'
import { site } from '../data/site'
import { DEFAULT_LANG, getDict, isLang, LANGS, type Lang } from '../i18n'

export interface PageMeta {
  lang: Lang
  title: string
  description: string
  canonical: string
  /** Versions de la même page dans les autres langues. */
  alternates: { hrefLang: string; href: string }[]
  image: string
  noindex: boolean
  /** Données structurées, seulement là où elles sont justifiées. */
  jsonLd?: Record<string, unknown>
}

const abs = (path: string) => site.url + path
/** Adresse d'une page : avec barre finale, la forme que le serveur sert sans redirection. */
const page = (path: string) => abs(path.endsWith('/') ? path : `${path}/`)

function alternatesFor(suffix: string) {
  return [
    ...LANGS.map((lang) => ({ hrefLang: lang as string, href: page(`/${lang}${suffix}`) })),
    { hrefLang: 'x-default', href: page(suffix === '' ? '/' : `/${DEFAULT_LANG}${suffix}`) },
  ]
}

/** Métadonnées d'une URL. Utilisé au pré-rendu (balises <head>) et dans le navigateur. */
export function getPageMeta(pathname: string): PageMeta {
  const parts = pathname.split('/').filter(Boolean)
  const hasLang = isLang(parts[0])
  const lang = hasLang ? (parts[0] as Lang) : DEFAULT_LANG
  const rest = hasLang ? parts.slice(1) : parts
  const known = parts.length === 0 || hasLang
  const t = getDict(lang)
  const shared = { lang, image: abs('/og.png') }

  if (known && rest.length === 0) {
    return {
      ...shared,
      title: t.meta.title,
      description: t.meta.description,
      canonical: page(`/${lang}`),
      alternates: alternatesFor(''),
      noindex: false,
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: site.fullName,
        alternateName: site.name,
        url: page(`/${lang}`),
        email: `mailto:${site.email}`,
        sameAs: [site.telegram.href],
        knowsLanguage: [...LANGS],
        address: { '@type': 'PostalAddress', addressLocality: 'Kaluga', addressCountry: 'RU' },
      },
    }
  }

  if (known && rest.length === 2 && rest[0] === 'projects') {
    const project = getProject(rest[1])
    if (project && caseStudies[project.slug]) {
      const suffix = `/projects/${project.slug}`
      return {
        ...shared,
        title: `${project.name} — ${site.name}`,
        description: project.summary[lang],
        canonical: page(`/${lang}${suffix}`),
        alternates: alternatesFor(suffix),
        noindex: false,
      }
    }
  }

  return {
    ...shared,
    title: `${t.notFound.title} — ${site.name}`,
    description: t.meta.description,
    canonical: page(`/${lang}`),
    alternates: [],
    noindex: true,
  }
}
