import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router'
import { site } from '../../data/site'
import { getDict, type Lang } from '../../i18n'
import { Container } from '../ui/Container'
import { LangSwitch } from './LangSwitch'

const SECTIONS = ['projects', 'process', 'about', 'contact'] as const

export function Header({ lang }: { lang: Lang }) {
  const t = getDict(lang)
  const [open, setOpen] = useState(false)

  const links = SECTIONS.map((id) => ({ id, label: t.nav[id], href: `/${lang}#${id}` }))

  return (
    <header className="border-line border-b">
      <Container className="flex items-center justify-between py-4 lg:py-6">
        <Link
          to={`/${lang}`}
          className="font-display inline-flex min-h-11 items-center text-sm font-extrabold lg:text-base"
        >
          {site.name}
        </Link>

        <nav aria-label={t.nav.main} className="hidden lg:block">
          <ul className="flex gap-10">
            {links.map((link) => (
              <li key={link.id}>
                <a
                  href={link.href}
                  className="inline-flex min-h-11 items-center underline-offset-8 hover:underline"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden lg:block">
          <LangSwitch lang={lang} />
        </div>

        <button
          type="button"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((value) => !value)}
          className="border-line-strong inline-flex min-h-11 items-center gap-2 rounded-sm border px-4 font-semibold lg:hidden"
        >
          {open ? <X aria-hidden="true" size={18} /> : <Menu aria-hidden="true" size={18} />}
          {open ? t.nav.close : t.nav.menu}
        </button>
      </Container>

      <div id="mobile-menu" hidden={!open} className="border-line border-t lg:hidden">
        <Container className="flex flex-col gap-6 py-6">
          <nav aria-label={t.nav.main}>
            <ul className="flex flex-col">
              {links.map((link) => (
                <li key={link.id} className="border-line border-b">
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="font-display flex min-h-14 items-center text-xl font-medium"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <LangSwitch lang={lang} />
        </Container>
      </div>
    </header>
  )
}
