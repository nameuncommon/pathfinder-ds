import './CompassChoice.css'

export type Direction = 'N' | 'E' | 'S' | 'W'

export interface CompassChoiceProps {
  direction: Direction
  title: string
  detail: string
  selected?: boolean
  onSelect: () => void
}

/** A plain button: one tap decides. Wrap a set in role="group" with an accessible name. */
export function CompassChoice({
  direction,
  title,
  detail,
  selected,
  onSelect,
}: CompassChoiceProps) {
  return (
    <button
      type="button"
      aria-label={`${direction}, ${title}. ${detail}`}
      aria-pressed={selected}
      className="pf-glass pf-compass"
      onClick={onSelect}
    >
      <span className="pf-compass__dir" aria-hidden="true">
        {direction}
      </span>
      <span className="pf-compass__body">
        <span className="pf-compass__title">
          {title}
        </span>
        <span className="pf-compass__detail">{detail}</span>
      </span>
    </button>
  )
}
