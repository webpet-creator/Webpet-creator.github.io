import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router'
import { projects, type Project } from '../../data/projects'
import { getDict, type Lang } from '../../i18n'
import { Section } from '../ui/Section'
import { Tag } from '../ui/Tag'

function Row({ project, index, lang }: { project: Project; index: number; lang: Lang }) {
  const t = getDict(lang)
  const live = project.status === 'live'
  const content = (
    <>
      <span
        className={`w-16 shrink-0 text-sm font-semibold ${live ? 'text-accent' : 'text-muted'}`}
      >
        {String(index + 1).padStart(2, '0')}
      </span>
      <span className="grow">
        <span
          className={`font-display block text-xl font-medium lg:text-2xl ${live ? '' : 'text-muted'}`}
        >
          {project.name}
        </span>
        <span className="text-muted mt-2 block max-w-2xl">{project.summary[lang]}</span>
      </span>
      <span className="flex shrink-0 items-center gap-4 lg:w-72 lg:justify-end">
        <span className="text-muted text-sm">
          {project.category[lang]}, {project.year}
        </span>
        <Tag variant={live ? 'solid' : 'dashed'}>{live ? t.status.live : t.status.inProgress}</Tag>
      </span>
      <span className="hidden w-6 shrink-0 lg:block">
        {live && (
          <ArrowRight
            aria-hidden="true"
            size={22}
            className="transition-transform duration-150 group-hover:translate-x-1"
          />
        )}
      </span>
    </>
  )
  const layout = 'flex flex-col gap-3 py-7 lg:flex-row lg:items-center lg:gap-6 lg:py-9'

  return (
    <li className={`border-t ${live ? 'border-paper' : 'border-line'}`}>
      {live ? (
        <Link
          to={`/${lang}/projects/${project.slug}`}
          className={`group ${layout} hover:bg-surface transition-colors duration-150`}
        >
          {content}
        </Link>
      ) : (
        <div className={layout}>{content}</div>
      )}
    </li>
  )
}

export function ProjectList({ lang }: { lang: Lang }) {
  const t = getDict(lang)
  return (
    <Section id="projects" label={t.projects.label} title={t.projects.title}>
      <ul className="border-line border-b">
        {projects.map((project, index) => (
          <Row key={project.slug} project={project} index={index} lang={lang} />
        ))}
      </ul>
    </Section>
  )
}
