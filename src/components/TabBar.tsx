import { Icon, type IconName } from './Icon'
import './TabBar.css'

export type Tab = 'today' | 'week' | 'inbox' | 'library'

const tabs: ReadonlyArray<{ id: Tab; label: string; icon: IconName }> = [
  { id: 'today', label: 'Today', icon: 'sun' },
  { id: 'week', label: 'Week', icon: 'calendar-range' },
  { id: 'inbox', label: 'Inbox', icon: 'inbox' },
  { id: 'library', label: 'Library', icon: 'library' },
]

export interface TabBarProps {
  active: Tab
  onSelect?: (tab: Tab) => void
  onCapture?: () => void
}

export function TabBar({ active, onSelect, onCapture }: TabBarProps) {
  const tab = (t: (typeof tabs)[number]) => (
    <button
      key={t.id}
      type="button"
      className="pf-tabbar__tab"
      aria-current={t.id === active ? 'page' : undefined}
      onClick={() => onSelect?.(t.id)}
    >
      <span className="pf-tabbar__indicator" aria-hidden="true" />
      <Icon name={t.icon} size={20} />
      {t.label}
    </button>
  )
  return (
    <nav className="pf-glass pf-glass--strong pf-tabbar" aria-label="Main">
      {tabs.slice(0, 2).map(tab)}
      <button type="button" className="pf-tabbar__capture" aria-label="Capture" onClick={onCapture}>
        <Icon name="plus" />
      </button>
      {tabs.slice(2).map(tab)}
    </nav>
  )
}
