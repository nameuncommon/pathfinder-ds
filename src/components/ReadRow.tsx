import { Icon } from './Icon'
import { Mark, type MarkType } from './Mark'
import { Tag } from './Tag'
import './ReadRow.css'

export interface ReadRowProps {
  mark: MarkType
  text: string
  snippetSrc?: string
  /** Display size of the handwriting image (half its 2x pixel size). */
  snippetSize?: { width: number; height: number }
  /** Called with the row, so a dialog it opens can return focus to it. */
  onFix: (opener: HTMLButtonElement) => void
  /** The reader is not confident about this line. */
  unsure?: boolean
}

export function ReadRow({ mark, text, snippetSrc, snippetSize, onFix, unsure = false }: ReadRowProps) {
  return (
    <button
      type="button"
      className="pf-read-row"
      aria-label={`Fix: ${text}, ${mark}${unsure ? ', not sure' : ''}`}
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
      {unsure && <Tag>Not sure</Tag>}
      <span className="pf-read-row__fix">
        <Icon name="pencil" size={16} />
      </span>
    </button>
  )
}
