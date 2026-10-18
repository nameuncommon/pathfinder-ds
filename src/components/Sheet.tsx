import { useEffect, useId, useRef, type KeyboardEvent, type ReactNode } from 'react'
import './Sheet.css'

export interface SheetProps {
  title: string
  /** The element that opened the sheet; focus returns to it on close. Passed in
   * because document.activeElement is body after a click in Safari. */
  returnFocusTo: HTMLElement | null
  onClose: () => void
  children: ReactNode
}

const focusable = 'input, textarea, select, button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'

/** A bottom sheet dialog on strong glass (Figma `sheet`): modal, Tab stays inside, Escape closes. */
export function Sheet({ title, returnFocusTo, onClose, children }: SheetProps) {
  const titleId = useId()
  const sheetRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    sheetRef.current?.querySelector<HTMLElement>(focusable)?.focus()
    return () => returnFocusTo?.focus()
  }, [returnFocusTo])

  function onKeyDown(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      e.stopPropagation()
      onClose()
      return
    }
    if (e.key !== 'Tab' || !sheetRef.current) return
    const items = sheetRef.current.querySelectorAll<HTMLElement>(focusable)
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
      <div ref={sheetRef} role="dialog" aria-modal="true" aria-labelledby={titleId} className="pf-glass pf-glass--strong pf-sheet">
        <h2 id={titleId} className="pf-sheet__title">
          {title}
        </h2>
        {children}
      </div>
    </div>
  )
}
