import { Icon } from './Icon'
import { Mark, type MarkType } from './Mark'
import './ReadRow.css'

export interface ReadRowProps {
  mark: MarkType
  text: string
  snippetSrc?: string
  /** Display size of the handwriting image (half its 2x pixel size). */
  snippetSize?: { width: number; height: number }
  /** Called with the row, so a dialog it opens can return focus to it. */
  onFix: (opener: HTMLButtonElement) => void
}

export function ReadRow({ mark, text, snippetSrc, snippetSize, onFix }: ReadRowProps) {
  return (
    <button
      type="button"
      className="pf-read-row"
      aria-label={`Fix: ${text}, ${mark}`}
      onClick={(e) => onFix(e.currentTarget)}
    >
      <Mark type={mark} decorative />
      {snippetSrc ? (
        <img
          className="pf-read-row__snippet"
          src={snippetSrc}
          alt={text}
          width={snippetSize?.width}
          height={snippetSize?.height}
        />
      ) : (
        <span className="pf-read-row__text">{text}</span>
      )}
      <span className="pf-read-row__fix">
        <Icon name="pencil" size={16} />
      </span>
    </button>
  )
}
