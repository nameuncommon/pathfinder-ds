import './Toast.css'

export type ToastStatus = 'success' | 'danger' | 'warning'

export interface ToastAction {
  label: string
  onClick: () => void
}

export interface ToastProps {
  status: ToastStatus
  message: string
  action?: ToastAction
}

function StatusIcon({ status }: { status: ToastStatus }) {
  if (status === 'success') {
    return (
      <svg viewBox="0 0 16 16" fill="none" width="16" height="16">
        <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M5.3 8.2L7.2 10.1L10.9 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  }
  if (status === 'danger') {
    return (
      <svg viewBox="0 0 16 16" fill="none" width="16" height="16">
        <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M6 6L10 10M10 6L6 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 16 16" fill="none" width="16" height="16">
      <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 5V8.6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="8" cy="11" r="0.9" fill="currentColor" />
    </svg>
  )
}

export function Toast({ status, message, action }: ToastProps) {
  return (
    <div className={`pf-toast pf-toast--${status}`} role="status">
      <span className="pf-toast__icon" aria-hidden="true">
        <StatusIcon status={status} />
      </span>
      <span className="pf-toast__message">{message}</span>
      {action ? (
        <button type="button" className="pf-toast__action" onClick={action.onClick}>
          {action.label}
        </button>
      ) : null}
    </div>
  )
}
