import { Link } from 'react-router'
import { projects } from '../../data/projects'
import { site } from '../../data/site'
import { getDict, type Lang } from '../../i18n'
import { ButtonLink } from '../ui/ButtonLink'
import { Container } from '../ui/Container'
import { LabelField, LabelList } from '../ui/LabelField'

export function Hero({ lang }: { lang: Lang }) {
  const t = getDict(lang)
  const featured = projects[0]
  const projectHref = `/${lang}/projects/${featured.slug}`

  return (
    <section className="py-14 lg:py-24">
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-6">
          <div className="animate-rise lg:col-span-7">
            <p className="tracking-label text-muted text-sm font-semibold uppercase">
              {t.hero.role}
            </p>
            <h1 className="font-display mt-6 text-5xl leading-none font-extrabold tracking-tight sm:text-7xl xl:text-9xl">
              Pierre <br />
              <span className="text-accent">Gnadjro</span>
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-relaxed lg:text-xl">{t.hero.statement}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
              <ButtonLink href={projectHref} arrow>
                {t.actions.viewProject}
              </ButtonLink>
              <ButtonLink href={site.telegram.href} variant="secondary">
                {t.actions.telegram}
              </ButtonLink>
            </div>
          </div>

          <div className="lg:col-span-5 lg:flex lg:justify-end">
            <Link
              to={projectHref}
              style={{ animationDelay: '120ms' }}
              className="animate-rise bg-paper text-ink block w-full max-w-md rounded-md p-6 transition-[rotate] duration-200 lg:-rotate-2 lg:p-7 lg:hover:rotate-0"
            >
              <span className="tracking-label flex justify-between text-xs font-semibold uppercase">
                <span>{t.hero.cardLabel}</span>
                <span>{t.status.live}</span>
              </span>
              <span className="font-display mt-5 block text-2xl leading-tight font-extrabold lg:text-3xl">
                {featured.name}
              </span>
              {featured.cover ? (
                <img
                  src={featured.cover.src}
                  width={featured.cover.width}
                  height={featured.cover.height}
                  alt={featured.cover.alt[lang]}
                  className="mt-5 block w-full rounded-sm"
                />
              ) : (
                <span className="border-ink mt-5 flex h-40 items-center justify-center rounded-sm border border-dashed px-4 text-center text-sm font-semibold lg:h-48">
                  {t.hero.imageNeeded}
                </span>
              )}
              <LabelList className="border-ink mt-5 grid-cols-2 gap-4 border-t pt-4 sm:grid-cols-3">
                <LabelField label={t.hero.typeLabel} onPaper compact>
                  {featured.category[lang]}
                </LabelField>
                <LabelField label={t.hero.stackLabel} onPaper compact>
                  {featured.stack.join(', ')}
                </LabelField>
                <LabelField label={t.hero.yearLabel} onPaper compact>
                  {featured.year}
                </LabelField>
              </LabelList>
            </Link>
          </div>
        </div>

        <LabelList className="border-line mt-14 border-t pt-6 sm:grid-cols-3 lg:mt-20">
          <LabelField label={t.hero.basedLabel}>{t.hero.based}</LabelField>
          <LabelField label={t.hero.languagesLabel}>{t.hero.languages}</LabelField>
          <LabelField label={t.hero.availabilityLabel}>{t.hero.availability}</LabelField>
        </LabelList>
      </Container>
    </section>
  )
}
