import { skillGroups } from '../../data/skills'
import { getDict, type Lang } from '../../i18n'
import { Section } from '../ui/Section'
import { Tag } from '../ui/Tag'

export function Skills({ lang }: { lang: Lang }) {
  const t = getDict(lang)
  return (
    <Section id="skills" label={t.skills.label} title={t.skills.title}>
      <ul className="grid gap-12 lg:grid-cols-3 lg:gap-6">
        {skillGroups.map((group) => {
          const item = t.skills.items[group.id]
          return (
            <li key={group.id} className="border-paper border-t pt-6">
              <h3 className="font-display text-xl font-medium">{item.title}</h3>
              <p className="text-muted mt-3 max-w-md leading-relaxed">{item.text}</p>
              <ul className="mt-6 flex flex-wrap gap-2.5">
                {group.tags.map((tag) => (
                  <li key={tag}>
                    <Tag>{tag}</Tag>
                  </li>
                ))}
              </ul>
            </li>
          )
        })}
      </ul>
    </Section>
  )
}
