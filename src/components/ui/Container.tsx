import type { ReactNode } from 'react'

export function Container({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div className={`max-w-page mx-auto w-full px-5 md:px-10 lg:px-18 ${className}`}>
      {children}
    </div>
  )
}
