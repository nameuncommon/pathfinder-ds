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
  return (
    <div className="pf-glass pf-toast" role="status" data-action={action ? '' : undefined}>
      <span className="pf-toast__message">{message}</span>
      {action ? (
        <button type="button" className="pf-toast__action" onClick={action.onClick}>
          {action.label}
        </button>
      ) : null}
    </div>
  )
}
