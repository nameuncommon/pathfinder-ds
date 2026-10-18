import { useId, type ReactNode } from 'react'
import './Viewfinder.css'

export interface ViewfinderProps {
  /** True once the page's four corner marks are in view. */
  found: boolean
  weekCode?: string
  corners?: number
  /** The photo came out blurry: brackets dim and the pill asks for another try. */
  blurry?: boolean
  onTake: () => void
  /** The page in view: the snapped image or a drawn page. */
  children?: ReactNode
}

export function Viewfinder({ found, weekCode, corners = 4, blurry = false, onTake, children }: ViewfinderProps) {
  const pillId = useId()
  const showPill = found || blurry
  return (
    <button
      type="button"
      className="pf-viewfinder"
      aria-label="Take the photo"
      aria-describedby={showPill ? pillId : undefined}
      onClick={onTake}
    >
      {showPill &&
        (['tl', 'tr', 'bl', 'br'] as const).map((c) => (
          <span
            key={c}
            className={`pf-viewfinder__corner pf-viewfinder__corner--${c}${blurry ? ' pf-viewfinder__corner--dim' : ''}`}
            aria-hidden="true"
          />
        ))}
      {children}
      {showPill && (
        <span id={pillId} className="pf-viewfinder__pill">
          <span className="pf-viewfinder__dot" />
          {blurry ? 'Blurry · tap to try again' : `Found ${weekCode} · ${corners} corners`}
        </span>
      )}
    </button>
  )
}
