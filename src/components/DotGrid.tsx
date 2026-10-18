import './DotGrid.css'

export interface DotGridProps {
  /** navy: cream dots for the app background; cream: navy dots on paper. */
  surface: 'navy' | 'cream'
  /** Fade the dots out over the top 240px, as the screens' dot field does. */
  fade?: boolean
}

/** The insert's notes dot grid as texture. Decorative only: never behind text that has to be read. */
export function DotGrid({ surface, fade = false }: DotGridProps) {
  return <span className={`pf-dot-grid pf-dot-grid--${surface}${fade ? ' pf-dot-grid--fade' : ''}`} aria-hidden="true" />
}
