import { useId, type ReactNode } from 'react'
import './Viewfinder.css'

export interface ViewfinderProps {
  /** True once the page's four corner marks are in view. */
  found: boolean
  weekCode?: string
  corners?: number
  onTake: () => void
  /** The page in view: the snapped image or a drawn page. */
  children?: ReactNode
}

export function Viewfinder({ found, weekCode, corners = 4, onTake, children }: ViewfinderProps) {
  const pillId = useId()
  return (
    <button
      type="button"
      className="pf-viewfinder"
      aria-label="Take the photo"
      aria-describedby={found ? pillId : undefined}
      onClick={onTake}
    >
      {found &&
        (['tl', 'tr', 'bl', 'br'] as const).map((c) => (
          <span key={c} className={`pf-viewfinder__corner pf-viewfinder__corner--${c}`} aria-hidden="true" />
        ))}
      {children}
      {found && (
        <span id={pillId} className="pf-viewfinder__pill">
          <span className="pf-viewfinder__dot" />
          {`Found ${weekCode} · ${corners} corners`}
        </span>
      )}
    </button>
  )
}
