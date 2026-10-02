import type { ReactNode } from 'react'
import { useLocation } from 'react-router'
import { getDict, type Lang } from '../../i18n'
import { Footer } from './Footer'
import { Header } from './Header'

export function Layout({ lang, children }: { lang: Lang; children: ReactNode }) {
  const t = getDict(lang)
  const { pathname } = useLocation()
  return (
    <div className="flex min-h-svh flex-col">
      <a
        href="#main"
        className="bg-accent text-ink sr-only rounded-sm px-4 py-3 font-semibold focus:not-sr-only focus:absolute focus:top-3 focus:left-3"
      >
        {t.nav.skip}
      </a>
      {/* `key` : le menu mobile se referme à chaque changement de page ou de langue. */}
      <Header key={pathname} lang={lang} />
      <main id="main" className="grow">
        {children}
      </main>
      <Footer lang={lang} />
    </div>
  )
}
