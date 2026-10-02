import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import App from './App'
import { projects } from './data/projects'
import { DEFAULT_LANG, LANGS } from './i18n'
import { getPageMeta } from './lib/seo'

/** Pour le script de redirection de la page racine (voir scripts/prerender.mjs). */
export const langs = { all: [...LANGS], fallback: DEFAULT_LANG }

/** Toutes les URLs à générer en HTML statique. */
export const routes: string[] = [
  '/',
  ...LANGS.flatMap((lang) => [
    `/${lang}`,
    ...projects.filter((p) => p.status === 'live').map((p) => `/${lang}/projects/${p.slug}`),
  ]),
  '/404',
]

export function render(url: string) {
  const html = renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </StrictMode>,
  )
  return { html, meta: getPageMeta(url) }
}
