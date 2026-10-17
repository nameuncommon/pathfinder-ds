import { StarRing } from './StarRing'
import './AppBar.css'

export interface AppBarProps {
  onBack?: () => void
}

export function AppBar({ onBack }: AppBarProps) {
  return (
    <header className="pf-appbar">
      {onBack && (
        <button type="button" className="pf-appbar__back" aria-label="Back" onClick={onBack}>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M15 5l-7 7 7 7" />
          </svg>
        </button>
      )}
      <div className="pf-appbar__disc">
        <StarRing size={40} />
      </div>
    </header>
  )
}
