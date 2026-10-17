import { Mark, type MarkType } from './Mark'
import './ReadRow.css'

export interface ReadRowProps {
  mark: MarkType
  text: string
  snippetSrc?: string
  onFix: () => void
}

export function ReadRow({ mark, text, snippetSrc, onFix }: ReadRowProps) {
  return (
    <button
      type="button"
      className="pf-glass pf-read-row"
      aria-label={`Fix: ${text}, ${mark}`}
      onClick={onFix}
    >
      <Mark type={mark} decorative />
      {snippetSrc ? (
        <img className="pf-read-row__snippet" src={snippetSrc} alt={text} />
      ) : (
        <span className="pf-read-row__text">{text}</span>
      )}
    </button>
  )
}
