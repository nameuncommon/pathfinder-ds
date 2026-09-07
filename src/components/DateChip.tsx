import type { ReactNode } from 'react'
import './DateChip.css'

export type DateChipState = 'today' | 'scheduled' | 'overdue'

export interface DateChipProps {
  state: DateChipState
  children: ReactNode
}

export function DateChip({ state, children }: DateChipProps) {
  return <span className={`pf-date-chip pf-date-chip--${state}`}>{children}</span>
}
