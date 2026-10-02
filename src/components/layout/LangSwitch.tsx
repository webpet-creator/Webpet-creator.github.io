import { Link, useLocation } from 'react-router'
import { getDict, LANGS, type Lang } from '../../i18n'

/** Même page, autre langue : on remplace le premier segment de l'URL. */
function pathFor(pathname: string, target: Lang): string {
  const rest = pathname.split('/').slice(2).join('/')
  return rest ? `/${target}/${rest}` : `/${target}`
}

export function LangSwitch({ lang }: { lang: Lang }) {
  const { pathname } = useLocation()
  const t = getDict(lang)
  return (
    <ul aria-label={t.nav.language} className="flex gap-1">
      {LANGS.map((code) => {
        const active = code === lang
        return (
          <li key={code}>
            <Link
              to={pathFor(pathname, code)}
              lang={code}
              hrefLang={code}
              aria-current={active ? 'true' : undefined}
              className={`inline-flex size-11 items-center justify-center rounded-sm text-sm font-semibold tracking-wider uppercase transition-colors duration-150 ${
                active ? 'bg-accent text-ink' : 'text-paper hover:bg-surface'
              }`}
            >
              {code}
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
