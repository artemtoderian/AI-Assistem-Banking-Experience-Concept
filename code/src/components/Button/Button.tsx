import type { ButtonHTMLAttributes, ReactNode } from 'react'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'solid' | 'glassy'
  icon?: ReactNode
}

export function Button({ variant = 'solid', icon, children, ...rest }: ButtonProps) {
  return (
    <button className={`btn btn--${variant}`} {...rest}>
      {icon}
      {children}
    </button>
  )
}
