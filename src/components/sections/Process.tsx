import { getDict, type Lang } from '../../i18n'
import { Section } from '../ui/Section'

export function Process({ lang }: { lang: Lang }) {
  const t = getDict(lang)
  return (
    <Section id="process" label={t.process.label} title={t.process.title}>
      <ol className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
        {t.process.steps.map((step, index) => (
          <li key={step.title}>
            <span
              aria-hidden="true"
              className="font-display text-accent text-4xl font-extrabold lg:text-5xl"
            >
              {String(index + 1).padStart(2, '0')}
            </span>
            <h3 className="mt-5 text-xl font-semibold">{step.title}</h3>
            <p className="text-muted mt-3 leading-relaxed">{step.text}</p>
          </li>
        ))}
      </ol>
    </Section>
  )
}
