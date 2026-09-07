import { Command } from 'cmdk'
import './CommandBar.css'

export interface CommandBarItem {
  id: string
  label: string
  shortcut?: string
}

export interface CommandBarProps {
  items: CommandBarItem[]
  placeholder?: string
  onSelect?: (item: CommandBarItem) => void
}

export function CommandBar({
  items,
  placeholder = 'type a command...',
  onSelect,
}: CommandBarProps) {
  return (
    <Command className="pf-command-bar" label="command palette">
      <div className="pf-command-bar__header">
        <span className="pf-command-bar__search-icon" aria-hidden="true">
          <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
            <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.5" />
            <path d="M10.5 10.5L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </span>
        <Command.Input
          className="pf-command-bar__input"
          placeholder={placeholder}
          autoFocus
        />
        <span className="pf-command-bar__esc">esc</span>
      </div>
      <Command.List className="pf-command-bar__list">
        <Command.Empty className="pf-command-bar__empty">no matching commands</Command.Empty>
        {items.map((item) => (
          <Command.Item
            key={item.id}
            value={item.label}
            className="pf-command-bar__item"
            onSelect={() => onSelect?.(item)}
          >
            <span className="pf-command-bar__item-title">{item.label}</span>
            {item.shortcut ? (
              <span className="pf-command-bar__item-shortcut">{item.shortcut}</span>
            ) : null}
          </Command.Item>
        ))}
      </Command.List>
    </Command>
  )
}
