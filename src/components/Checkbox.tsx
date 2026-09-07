import { useEffect, useId, useRef } from 'react'
import './Checkbox.css'

export interface CheckboxProps {
  checked: boolean
  indeterminate?: boolean
  onChange: (checked: boolean) => void
  label?: string
  /**
   * Accessible name for the input when no visible `label` is rendered
   * (e.g. a checkbox composed into a row that shows its own title text
   * elsewhere). Ignored if `label` is set, since the visible label already
   * provides the accessible name.
   */
  ariaLabel?: string
  disabled?: boolean
}

export function Checkbox({
  checked,
  indeterminate = false,
  onChange,
  label,
  ariaLabel,
  disabled = false,
}: CheckboxProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const generatedId = useId()

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = indeterminate
    }
  }, [indeterminate])

  const boxClasses = ['pf-checkbox__box']
  if (checked) boxClasses.push('is-checked')
  if (indeterminate) boxClasses.push('is-indeterminate')

  return (
    <label className="pf-checkbox" htmlFor={generatedId} data-disabled={disabled || undefined}>
      <input
        ref={inputRef}
        id={generatedId}
        type="checkbox"
        className="pf-checkbox__input"
        checked={checked}
        disabled={disabled}
        aria-label={label ? undefined : ariaLabel}
        onChange={(event) => onChange(event.target.checked)}
      />
      <span className={boxClasses.join(' ')} aria-hidden="true">
        <svg
          className="pf-checkbox__glyph pf-checkbox__glyph--check"
          viewBox="0 0 12 12"
          fill="none"
        >
          <path d="M2.5 6.3L4.8 8.6L9.3 3.6" />
        </svg>
        <svg
          className="pf-checkbox__glyph pf-checkbox__glyph--dash"
          viewBox="0 0 12 12"
          fill="none"
        >
          <path d="M3 6H9" />
        </svg>
      </span>
      {label ? <span className="pf-checkbox__label">{label}</span> : null}
    </label>
  )
}
