import { useEffect, useId, useRef, useState, type KeyboardEvent } from 'react'
import { Button } from '../components/Button'

export interface CorrectionSheetProps {
  text: string
  snippetSrc?: string
  snippetSize?: { width: number; height: number }
  /** The element that opened the sheet; focus returns to it on close. Passed in
   * because document.activeElement is body after a click in Safari. */
  returnFocusTo: HTMLElement | null
  onSave: (text: string) => void
  onCancel: () => void
}

export function CorrectionSheet({ text, snippetSrc, snippetSize, returnFocusTo, onSave, onCancel }: CorrectionSheetProps) {
  const [value, setValue] = useState(text)
  const titleId = useId()
  const inputId = useId()
  const sheetRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
    return () => returnFocusTo?.focus()
  }, [returnFocusTo])

  function onKeyDown(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      e.stopPropagation()
      onCancel()
      return
    }
    if (e.key !== 'Tab' || !sheetRef.current) return
    const items = sheetRef.current.querySelectorAll<HTMLElement>('button, input')
    const first = items[0]
    const last = items[items.length - 1]
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault()
      last.focus()
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault()
      first.focus()
    }
  }

  return (
    <div className="pf-sheet__scrim" onKeyDown={onKeyDown}>
      <div
        ref={sheetRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="pf-glass pf-glass--strong pf-sheet"
      >
        <h2 id={titleId} className="pf-sheet__title">
          Fix what I read
        </h2>
        {snippetSrc ? (
          <img
            className="pf-sheet__snippet"
            src={snippetSrc}
            alt={text}
            width={snippetSize?.width}
            height={snippetSize?.height}
          />
        ) : (
          <p className="pf-sheet__snippet-text">{text}</p>
        )}
        <label htmlFor={inputId} className="pf-sheet__label">
          What it says
        </label>
        <input
          id={inputId}
          ref={inputRef}
          className="pf-sheet__input"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <div className="pf-sheet__actions">
          <Button disabled={!value.trim()} onClick={() => onSave(value.trim())}>
            Save
          </Button>
          <Button variant="quiet" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  )
}
