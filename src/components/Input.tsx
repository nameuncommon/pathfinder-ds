import { forwardRef, useId, type InputHTMLAttributes } from 'react'
import './Input.css'

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  /** Visible label above the field; also its accessible name. */
  label: string
}

/** A text field with its label above (Figma `input`). */
export const Input = forwardRef<HTMLInputElement, InputProps>(function Input({ label, id, className, ...rest }, ref) {
  const generated = useId()
  const inputId = id ?? generated
  return (
    <div className="pf-input">
      <label htmlFor={inputId} className="pf-input__label">
        {label}
      </label>
      <input ref={ref} id={inputId} type="text" className={['pf-input__field', className].filter(Boolean).join(' ')} {...rest} />
    </div>
  )
})
