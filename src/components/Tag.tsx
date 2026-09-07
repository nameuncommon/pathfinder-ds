import type { ReactNode } from 'react'
import './Tag.css'

export type TagColor = 'accent' | 'success' | 'neutral' | 'danger' | 'warning'

export interface TagProps {
  color: TagColor
  children: ReactNode
}

export function Tag({ color, children }: TagProps) {
  return <span className={`pf-tag pf-tag--${color}`}>{children}</span>
}
