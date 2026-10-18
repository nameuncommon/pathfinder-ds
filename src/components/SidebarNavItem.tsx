import { Icon, type IconName } from './Icon'
import './SidebarNavItem.css'

export interface SidebarNavItemProps {
  label: string
  href: string
  icon: IconName
  active?: boolean
  /** Items waiting, shown as a gold badge and read as "n to sort". */
  count?: number
}

/** One row of the desktop sidebar (Figma `sidebar / nav item`). */
export function SidebarNavItem({ label, href, icon, active = false, count }: SidebarNavItemProps) {
  return (
    <a className="pf-navitem" href={href} aria-current={active ? 'page' : undefined}>
      <Icon name={icon} size={20} />
      <span className="pf-navitem__label">{label}</span>
      {count !== undefined && ' '}
      {count !== undefined && (
        <span className="pf-navitem__count">
          {count}
          {' '}
          <span className="pf-visually-hidden">to sort</span>
        </span>
      )}
    </a>
  )
}
