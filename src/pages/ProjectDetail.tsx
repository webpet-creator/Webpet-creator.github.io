import { ArrowLeft } from 'lucide-react'
import { Link, useParams } from 'react-router'
import { ButtonLink } from '../components/ui/ButtonLink'
import { Container } from '../components/ui/Container'
import { LabelField, LabelList } from '../components/ui/LabelField'
import { Tag } from '../components/ui/Tag'
import { caseStudies } from '../data/caseStudies'
import { getProject } from '../data/projects'
import { getDict, type Lang } from '../i18n'
import { NotFound } from './NotFound'

export function ProjectDetail({ lang }: { lang: Lang }) {
  const { slug } = useParams()
  const project = getProject(slug)
  const study = slug ? caseStudies[slug] : undefined
  if (!project || !study) return <NotFound lang={lang} />

  const t = getDict(lang)
  const text = study.text[lang]
  const [mainAction, ...otherActions] = text.actions
  const linkClass = 'underline decoration-accent underline-offset-4 hover:text-accent'

  return (
    <article>
      <Container className="py-10 lg:py-16">
        <Link
          to={`/${lang}#projects`}
          className="text-muted hover:text-paper inline-flex min-h-11 items-center gap-2 transition-colors duration-150"
        >
          <ArrowLeft aria-hidden="true" size={18} />
          {t.project.back}
        </Link>

        <div className="mt-8 flex items-center gap-5">
          <img
            src={study.logo.src}
            width={study.logo.width}
            height={study.logo.height}
            alt={text.logoAlt}
            className="size-16 rounded-md lg:size-20"
          />
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <p className="tracking-label text-muted text-sm font-semibold uppercase">
              {project.category[lang]} · {project.year}
            </p>
            <Tag variant="solid">{t.status.live}</Tag>
          </div>
        </div>

        <h1 className="font-display mt-8 text-4xl leading-tight font-extrabold tracking-tight sm:text-6xl lg:text-7xl">
          {project.name}
        </h1>
        <p className="mt-6 max-w-3xl text-xl leading-relaxed lg:text-2xl">
          {project.summary[lang]}
        </p>

        <LabelList className="border-line mt-12 border-t pt-6 sm:grid-cols-2 lg:grid-cols-4">
          <LabelField label={t.project.roleLabel}>{text.role}</LabelField>
          <LabelField label={t.project.stackLabel}>{project.stack.join(', ')}</LabelField>
          <LabelField label={t.project.launchedLabel}>{text.launched}</LabelField>
          <LabelField label={t.project.linksLabel}>
            <span className="flex flex-col gap-1">
              {project.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className={`${linkClass} break-all`}
                >
                  {link.label}
                </a>
              ))}
            </span>
          </LabelField>
        </LabelList>
      </Container>

      <div className="border-line border-t">
        <Container className="grid gap-14 py-16 lg:grid-cols-12 lg:gap-6 lg:py-24">
          <figure className="lg:sticky lg:top-8 lg:col-span-4 lg:self-start">
            <img
              src={study.screenshot.src}
              width={study.screenshot.width}
              height={study.screenshot.height}
              alt={text.screenshotAlt}
              loading="lazy"
              className="border-line-strong w-full max-w-sm rounded-md border"
            />
          </figure>

          <div className="flex flex-col gap-16 lg:col-span-7 lg:col-start-6">
            {text.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="font-display text-2xl leading-tight font-extrabold lg:text-3xl">
                  {section.heading}
                </h2>
                {section.paragraphs && (
                  <div className="mt-6 flex flex-col gap-5 text-lg leading-relaxed">
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                )}
                {section.figures && (
                  <dl className="border-line mt-6 grid grid-cols-3 gap-4 border-t pt-6">
                    {section.figures.map((figure) => (
                      <div key={figure.label}>
                        <dt className="sr-only">{figure.label}</dt>
                        <dd className="font-display text-accent text-4xl font-extrabold lg:text-5xl">
                          {figure.value}
                        </dd>
                        <dd aria-hidden="true" className="text-muted mt-2">
                          {figure.label}
                        </dd>
                      </div>
                    ))}
                  </dl>
                )}
                {section.note && <p className="text-muted mt-6 text-sm">{section.note}</p>}
                {section.items && (
                  <ul className="border-line mt-6 border-b">
                    {section.items.map((item) => (
                      <li key={item} className="border-line border-t py-4 text-lg leading-relaxed">
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>
        </Container>
      </div>

      <Container className="pb-16 lg:pb-28">
        <div className="bg-paper text-ink [&_:focus-visible]:outline-ink rounded-md p-7 lg:p-16">
          <h2 className="font-display text-3xl leading-none font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            {text.tryTitle}
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed lg:text-xl">{text.tryText}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <ButtonLink href={mainAction.href} variant="ink" arrow>
              {mainAction.label}
            </ButtonLink>
            {otherActions.map((action) => (
              <ButtonLink key={action.href} href={action.href} variant="ink-outline">
                {action.label}
              </ButtonLink>
            ))}
          </div>
        </div>
      </Container>
    </article>
  )
}
