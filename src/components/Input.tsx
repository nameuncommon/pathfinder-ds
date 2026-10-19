import { forwardRef, useId, type InputHTMLAttributes } from 'react'
import { Mark } from './Mark'
import './Input.css'

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  /** Visible label above the field; also its accessible name. */
  label: string
  /** Says what to write, calmly: a gold edge and a plain line below, never red. */
  error?: string
}

/** A text field with its label above (Figma `input`). */
export const Input = forwardRef<HTMLInputElement, InputProps>(function Input({ label, id, className, error, ...rest }, ref) {
  const generated = useId()
  const inputId = id ?? generated
  const errorId = `${inputId}-error`
  return (
    <div className="pf-input">
      <label htmlFor={inputId} className="pf-input__label">
        {label}
      </label>
      <input
        ref={ref}
        id={inputId}
        type="text"
        className={['pf-input__field', className].filter(Boolean).join(' ')}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        {...rest}
      />
      {error && (
        <p id={errorId} className="pf-input__error">
          <Mark type="note" tone="quiet" size={16} decorative />
          {error}
        </p>
      )}
    </div>
  )
})
