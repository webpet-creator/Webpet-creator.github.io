export type ButtonVariant = 'primary' | 'secondary' | 'ink' | 'ink-outline'

const base =
  'inline-flex min-h-14 items-center justify-between gap-3 rounded-sm px-5 text-base font-semibold sm:px-6 sm:text-lg transition-colors duration-150'

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-accent text-ink hover:bg-paper',
  secondary: 'border border-line-strong text-paper hover:border-paper',
  // Sur fond papier
  ink: 'bg-ink text-paper hover:bg-surface',
  'ink-outline': 'border border-ink text-ink hover:bg-ink hover:text-paper',
}

/** Classes partagées avec les vrais <button> (formulaire). */
export function buttonClass(variant: ButtonVariant, className = ''): string {
  return `${base} ${variants[variant]} ${className}`
}
