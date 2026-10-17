import type { ButtonHTMLAttributes, ReactNode } from 'react'
import './Button.css'

export type ButtonVariant = 'primary' | 'quiet' | 'secondary' | 'ghost' | 'danger'
export type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  variant?: ButtonVariant
  size?: ButtonSize
  children: ReactNode
}

export function Button({
  variant = 'primary',
  size = 'md',
  children,
  className,
  ...rest
}: ButtonProps) {
  const classes = ['pf-button', `pf-button--${variant}`, `pf-button--${size}`]
  if (variant === 'quiet') classes.push('pf-glass', 'pf-glass--strong')
  if (className) classes.push(className)

  return (
    <button className={classes.join(' ')} {...rest}>
      {children}
    </button>
  )
}
