import { useEffect, useState } from 'react'
import './Toast.css'

export interface ToastAction {
  label: string
  onClick: () => void
}

export interface ToastProps {
  message: string
  action?: ToastAction
}

/** A short status message on glass with an optional gold action. Never red, never a scold (Figma `toast`). */
export function Toast({ message, action }: ToastProps) {
  // The live region mounts empty and the message arrives a moment later, so
  // screen readers announce it (a region that mounts already full is often silent).
  const [shown, setShown] = useState('')
  useEffect(() => setShown(message), [message])
  return (
    <div className="pf-glass pf-toast" role="status" data-action={action ? '' : undefined}>
      <span className="pf-toast__message">{shown}</span>
      {action ? (
        <button type="button" className="pf-toast__action" onClick={action.onClick}>
          {action.label}
        </button>
      ) : null}
    </div>
  )
}
