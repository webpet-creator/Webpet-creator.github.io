import type { ReactNode } from 'react'
import { Container } from './Container'

interface SectionProps {
  id: string
  label: string
  title: string
  children: ReactNode
}

/** Section de page standard : libellé, titre, contenu. */
export function Section({ id, label, title, children }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="border-line scroll-mt-6 border-t py-16 lg:py-28"
    >
      <Container>
        <p className="tracking-label text-muted text-sm font-semibold uppercase">{label}</p>
        <h2
          id={`${id}-title`}
          className="font-display mt-4 max-w-3xl text-3xl leading-tight font-extrabold tracking-tight lg:text-5xl"
        >
          {title}
        </h2>
        <div className="mt-10 lg:mt-16">{children}</div>
      </Container>
    </section>
  )
}
