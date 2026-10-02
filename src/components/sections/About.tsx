import portrait from '../../assets/portrait.webp'
import { getDict, type Lang } from '../../i18n'
import { LabelField, LabelList } from '../ui/LabelField'
import { Section } from '../ui/Section'

export function About({ lang }: { lang: Lang }) {
  const t = getDict(lang)
  return (
    <Section id="about" label={t.about.label} title={t.about.title}>
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-6">
        <img
          src={portrait}
          width={800}
          height={1000}
          alt={t.about.portraitAlt}
          loading="lazy"
          className="w-full max-w-xs rounded-md lg:col-span-4"
        />
        <div className="lg:col-span-8">
          <div className="flex max-w-2xl flex-col gap-5 text-lg leading-relaxed">
            {t.about.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <LabelList className="border-line mt-10 border-t pt-6 sm:grid-cols-3">
            <LabelField label={t.about.studyLabel}>{t.about.study}</LabelField>
            <LabelField label={t.about.universityLabel}>{t.about.university}</LabelField>
            <LabelField label={t.about.languagesLabel}>{t.about.languages}</LabelField>
          </LabelList>
        </div>
      </div>
    </Section>
  )
}
