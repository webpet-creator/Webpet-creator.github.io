import { About } from '../components/sections/About'
import { Contact } from '../components/sections/Contact'
import { Hero } from '../components/sections/Hero'
import { Process } from '../components/sections/Process'
import { ProjectList } from '../components/sections/ProjectList'
import { Skills } from '../components/sections/Skills'
import type { Lang } from '../i18n'

export function Home({ lang }: { lang: Lang }) {
  return (
    <>
      <Hero lang={lang} />
      <ProjectList lang={lang} />
      <Skills lang={lang} />
      <Process lang={lang} />
      <About lang={lang} />
      <Contact lang={lang} />
    </>
  )
}
