import type { InputHTMLAttributes, ReactNode } from 'react'
import { useId } from 'react'
import './Input.css'

export type InputType = 'text' | 'search'

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  type?: InputType
  error?: string
  icon?: ReactNode
}

export function Input({
  type = 'text',
  error,
  icon,
  className,
  id,
  ...rest
}: InputProps) {
  const generatedId = useId()
  const inputId = id ?? generatedId
  const errorId = `${inputId}-error`

  const fieldClasses = ['pf-input__field']
  if (icon) fieldClasses.push('pf-input__field--with-icon')
  if (error) fieldClasses.push('is-error')
  if (className) fieldClasses.push(className)

  return (
    <div className="pf-input">
      <div className="pf-input__field-wrap">
        {icon ? (
          <span className="pf-input__icon" aria-hidden="true">
            {icon}
          </span>
        ) : null}
        <input
          id={inputId}
          type={type}
          className={fieldClasses.join(' ')}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          {...rest}
        />
      </div>
      {error ? (
        <span id={errorId} className="pf-input__error">
          {error}
        </span>
      ) : null}
    </div>
  )
}
