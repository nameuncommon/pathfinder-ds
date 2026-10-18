// The approved Lucide set (ISC licence), the same icons as Figma's `icon / <name>`.
// 24px grid, 2px stroke, colour from currentColor. Icons sit beside a text label,
// never in place of one, so they are hidden from assistive tech.
import {
  Calendar,
  CalendarRange,
  Check,
  ChevronLeft,
  CloudOff,
  FolderKanban,
  History,
  Inbox,
  Library,
  Plus,
  RotateCcw,
  Sun,
  type LucideIcon,
} from 'lucide-react'

const icons = {
  calendar: Calendar,
  'calendar-range': CalendarRange,
  check: Check,
  'chevron-left': ChevronLeft,
  'cloud-off': CloudOff,
  'folder-kanban': FolderKanban,
  history: History,
  inbox: Inbox,
  library: Library,
  plus: Plus,
  'rotate-ccw': RotateCcw,
  sun: Sun,
} satisfies Record<string, LucideIcon>

export type IconName = keyof typeof icons
export const iconNames = Object.keys(icons) as IconName[]

export interface IconProps {
  name: IconName
  size?: number
}

export function Icon({ name, size = 24 }: IconProps) {
  const Glyph = icons[name]
  return <Glyph size={size} strokeWidth={2} aria-hidden="true" focusable="false" />
}
