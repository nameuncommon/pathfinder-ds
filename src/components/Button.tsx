import type { ButtonHTMLAttributes, ReactNode } from 'react'
import './Button.css'

/** primary: the one gold action. quiet: glass, for everything else. ghost: a calm text action. */
export type ButtonVariant = 'primary' | 'quiet' | 'ghost'

export interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  variant?: ButtonVariant
  children: ReactNode
}

export function Button({
  variant = 'primary',
  children,
  className,
  ...rest
}: ButtonProps) {
  const classes = ['pf-button', `pf-button--${variant}`]
  if (variant === 'quiet') classes.push('pf-glass', 'pf-glass--strong')
  if (className) classes.push(className)

  return (
    <button className={classes.join(' ')} {...rest}>
      {children}
    </button>
  )
}
