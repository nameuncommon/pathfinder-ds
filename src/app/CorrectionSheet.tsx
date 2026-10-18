import { useEffect, useRef, useState } from 'react'
import { Button } from '../components/Button'
import { Input } from '../components/Input'
import { Sheet } from '../components/Sheet'

export interface CorrectionSheetProps {
  text: string
  snippetSrc?: string
  snippetSize?: { width: number; height: number }
  /** The element that opened the sheet; focus returns to it on close. */
  returnFocusTo: HTMLElement | null
  onSave: (text: string) => void
  onCancel: () => void
}

export function CorrectionSheet({ text, snippetSrc, snippetSize, returnFocusTo, onSave, onCancel }: CorrectionSheetProps) {
  const [value, setValue] = useState(text)
  const [error, setError] = useState<string | undefined>()
  const inputRef = useRef<HTMLInputElement>(null)

  // Focus after the error has rendered, so the field is announced with its description.
  useEffect(() => {
    if (error) inputRef.current?.focus()
  }, [error])

  function save() {
    if (!value.trim()) {
      if (error) inputRef.current?.focus()
      setError('Write what the line says')
      return
    }
    onSave(value.trim())
  }

  return (
    <Sheet title="Fix what it read" returnFocusTo={returnFocusTo} onClose={onCancel}>
      {snippetSrc ? (
        <div className="pf-paper pf-sheet__paper">
          <img className="pf-sheet__snippet" src={snippetSrc} alt={text} width={snippetSize?.width} height={snippetSize?.height} />
        </div>
      ) : (
        <p className="pf-sheet__snippet-text">{text}</p>
      )}
      <Input
        label="What it says"
        ref={inputRef}
        value={value}
        error={error}
        onChange={(e) => {
          setValue(e.target.value)
          if (e.target.value.trim()) setError(undefined)
        }}
      />
      <div className="pf-sheet__actions">
        <Button onClick={save}>Save</Button>
        <Button variant="quiet" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </Sheet>
  )
}
