import { useEffect, useRef } from 'react'
import { Route, Routes, useLocation, useNavigate, useParams } from 'react-router'
import { Layout } from './components/layout/Layout'
import { DEFAULT_LANG, detectLang, isLang } from './i18n'
import { getPageMeta } from './lib/seo'
import { Home } from './pages/Home'
import { NotFound } from './pages/NotFound'
import { ProjectDetail } from './pages/ProjectDetail'

/** Garde <html lang>, le titre et la description alignés sur la page affichée. */
function useDocumentMeta() {
  const { pathname } = useLocation()
  useEffect(() => {
    const meta = getPageMeta(pathname)
    document.documentElement.lang = meta.lang
    document.title = meta.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', meta.description)
  }, [pathname])
}

/**
 * Navigation interne : retour en haut de page, ou défilement vers l'ancre (`#projects`).
 * Rien au premier affichage, pour laisser le navigateur restaurer la position au rechargement.
 */
function useScrollOnNavigate() {
  const { pathname, hash } = useLocation()
  const first = useRef(true)
  useEffect(() => {
    if (first.current) {
      first.current = false
      return
    }
    if (hash) document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'instant' })
    else window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname, hash])
}

/** `/` : contenu anglais pré-rendu, puis bascule vers la langue du navigateur. */
function RootRedirect() {
  const navigate = useNavigate()
  useEffect(() => {
    navigate(`/${detectLang()}`, { replace: true })
  }, [navigate])
  return (
    <Layout lang={DEFAULT_LANG}>
      <Home lang={DEFAULT_LANG} />
    </Layout>
  )
}

function LangRoutes() {
  const { lang } = useParams()

  if (!isLang(lang)) {
    return (
      <Layout lang={DEFAULT_LANG}>
        <NotFound lang={DEFAULT_LANG} />
      </Layout>
    )
  }
  return (
    <Layout lang={lang}>
      <Routes>
        <Route index element={<Home lang={lang} />} />
        <Route path="projects/:slug" element={<ProjectDetail lang={lang} />} />
        <Route path="*" element={<NotFound lang={lang} />} />
      </Routes>
    </Layout>
  )
}

export default function App() {
  useDocumentMeta()
  useScrollOnNavigate()
  return (
    <Routes>
      <Route path="/" element={<RootRedirect />} />
      <Route path="/:lang/*" element={<LangRoutes />} />
    </Routes>
  )
}
