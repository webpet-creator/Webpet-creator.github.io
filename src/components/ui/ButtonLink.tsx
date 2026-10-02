import { ArrowRight } from 'lucide-react'
import type { ReactNode } from 'react'
import { Link } from 'react-router'
import { buttonClass, type ButtonVariant } from '../../lib/buttonClass'

interface ButtonLinkProps {
  href: string
  variant?: ButtonVariant
  arrow?: boolean
  className?: string
  children: ReactNode
}

/** Bouton d'action. Lien interne (`/…`) via le routeur, sinon lien classique. */
export function ButtonLink({
  href,
  variant = 'primary',
  arrow = false,
  className = '',
  children,
}: ButtonLinkProps) {
  const classes = buttonClass(variant, className)
  const content = (
    <>
      {children}
      {arrow && <ArrowRight aria-hidden="true" size={18} strokeWidth={2.2} />}
    </>
  )

  if (href.startsWith('/')) {
    return (
      <Link to={href} className={classes}>
        {content}
      </Link>
    )
  }
  const external = href.startsWith('http')
  return (
    <a
      href={href}
      className={classes}
      {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
    >
      {content}
    </a>
  )
}
