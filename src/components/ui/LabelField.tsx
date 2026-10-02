import type { ReactNode } from 'react'

/** Liste de champs façon bordereau. Contient des `LabelField`. */
export function LabelList({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return <dl className={`grid gap-6 ${className}`}>{children}</dl>
}

interface LabelFieldProps {
  label: string
  /** Sur fond clair (étiquette papier). */
  onPaper?: boolean
  /** Valeur plus petite, pour les espaces étroits. */
  compact?: boolean
  children: ReactNode
}

/** Un champ : petit libellé en capitales, valeur dessous. */
export function LabelField({ label, onPaper = false, compact = false, children }: LabelFieldProps) {
  return (
    <div>
      <dt
        className={`tracking-label text-xs font-semibold uppercase ${onPaper ? 'text-label' : 'text-muted'}`}
      >
        {label}
      </dt>
      <dd className={compact ? 'mt-1 text-base font-semibold' : 'mt-1.5 text-lg'}>{children}</dd>
    </div>
  )
}
