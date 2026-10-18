import { useId } from 'react'
import { Icon } from './Icon'
import './Checkbox.css'

export interface CheckboxProps {
  checked: boolean
  onChange: (checked: boolean) => void
  label?: string
  /** Accessible name when no visible label is rendered. Ignored if `label` is set. */
  ariaLabel?: string
  disabled?: boolean
}

/** A native checkbox with its label; the whole row is the 44px target (Figma `checkbox`). */
export function Checkbox({ checked, onChange, label, ariaLabel, disabled = false }: CheckboxProps) {
  const id = useId()
  return (
    <label className="pf-checkbox" htmlFor={id} data-disabled={disabled || undefined}>
      <input
        id={id}
        type="checkbox"
        className="pf-checkbox__input"
        checked={checked}
        disabled={disabled}
        aria-label={label ? undefined : ariaLabel}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span className="pf-checkbox__box" aria-hidden="true">
        {checked && <Icon name="check" size={16} />}
      </span>
      {label ? <span className="pf-checkbox__label">{label}</span> : null}
    </label>
  )
}
