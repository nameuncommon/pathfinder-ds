import type { ReactNode } from 'react'
import './Tag.css'

export interface TagProps {
  children: ReactNode
}

/** A neutral glass label for plain facts. No status colour, so it never competes with BearingTag (Figma `tag`). */
export function Tag({ children }: TagProps) {
  return <span className="pf-tag">{children}</span>
}
