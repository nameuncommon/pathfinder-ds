import { AppBadge } from './AppBadge'
import { Icon } from './Icon'
import './AppBar.css'

export interface AppBarProps {
  onBack?: () => void
}

export function AppBar({ onBack }: AppBarProps) {
  return (
    <header className="pf-appbar">
      {onBack && (
        <button type="button" className="pf-appbar__back" aria-label="Back" onClick={onBack}>
          <Icon name="chevron-left" size={20} />
        </button>
      )}
      <div className="pf-appbar__badge">
        <AppBadge size={40} />
      </div>
    </header>
  )
}
