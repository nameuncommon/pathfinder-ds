import type { CSSProperties } from 'react'
import './BearingTag.css'

export type Bearing = 'health' | 'people' | 'home' | 'work' | 'craft'

export interface BearingTagProps {
  bearing: Bearing
}

export function BearingTag({ bearing }: BearingTagProps) {
  const style = { '--pf-bearing': `var(--bearing-${bearing})` } as CSSProperties
  return (
    <span className="pf-bearing-tag" style={style}>
      <span className="pf-bearing-tag__dot" aria-hidden="true" />
      <span className="pf-bearing-tag__label">{bearing}</span>
    </span>
  )
}
