import type { ReactNode } from 'react'
import './DateChip.css'

export interface DateChipProps {
  children: ReactNode
  selected?: boolean
  disabled?: boolean
  onClick?: () => void
}

/** A date you can pick, in type / data. A toggle button: aria-pressed follows `selected` (Figma `date chip`). */
export function DateChip({ children, selected = false, disabled = false, onClick }: DateChipProps) {
  return (
    <button type="button" className="pf-date-chip" aria-pressed={selected} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  )
}
