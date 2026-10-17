import './CompassChoice.css'

export type Direction = 'N' | 'E' | 'S' | 'W'

export interface CompassChoiceProps {
  direction: Direction
  title: string
  detail: string
  checked: boolean
  onSelect: () => void
}

/** Use inside a role="radiogroup" that has an accessible name. */
export function CompassChoice({ direction, title, detail, checked, onSelect }: CompassChoiceProps) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={checked}
      className="pf-glass pf-compass"
      onClick={onSelect}
    >
      <span className="pf-compass__dir" aria-hidden="true">
        {direction}
      </span>
      <span className="pf-compass__body">
        <span className="pf-compass__title">{title}</span>
        <span className="pf-compass__detail">{detail}</span>
      </span>
    </button>
  )
}
