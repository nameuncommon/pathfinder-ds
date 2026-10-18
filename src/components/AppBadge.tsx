import { Dial } from './Dial'
import './AppBadge.css'

export interface AppBadgeProps {
  size?: number
}

/** The brand slot in the app bar and sidebar: the dial alone, filling its box (Figma `brand / app badge`). */
export function AppBadge({ size = 52 }: AppBadgeProps) {
  return (
    <span className="pf-appbadge" style={{ width: size, height: size }}>
      <Dial size={size} />
    </span>
  )
}
