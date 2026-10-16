import type { ReactNode } from 'react'

export interface PillProps {
  tone?: 'ok' | 'ai' | 'neutral'
  icon?: ReactNode
  children: ReactNode
}

export function Pill({ tone = 'neutral', icon, children }: PillProps) {
  return (
    <span className={`pill pill--${tone}`}>
      {icon}
      {children}
    </span>
  )
}
