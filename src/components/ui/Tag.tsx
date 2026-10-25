import type { ReactNode } from 'react'

type Variant = 'outline' | 'solid' | 'dashed'

const variants: Record<Variant, string> = {
  outline: 'border border-line-strong text-paper',
  solid: 'bg-paper text-ink',
  dashed: 'border border-dashed border-muted text-muted',
}

/** Étiquette courte : une technologie (`outline`) ou un état (`solid`, `dashed`). */
export function Tag({ variant = 'outline', children }: { variant?: Variant; children: ReactNode }) {
  return (
    <span
      className={`inline-flex items-center rounded-sm px-3 py-2 text-sm leading-none font-semibold tracking-wide whitespace-nowrap ${variants[variant]}`}
    >
      {children}
    </span>
  )
}
