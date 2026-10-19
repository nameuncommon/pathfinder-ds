import type { ReactNode } from 'react'

export type MarkType = 'task' | 'done' | 'moved' | 'dropped' | 'matters' | 'note'
export type MarkTone = 'gold' | 'navy' | 'quiet'

export interface MarkProps {
  type: MarkType
  tone?: MarkTone
  size?: number
  decorative?: boolean
}

const glyphs: Record<MarkType, ReactNode> = {
  task: <circle cx="12" cy="12" r="7" />,
  done: <path d="M5 12.5l4.5 4.5L19 7.5" />,
  moved: <path d="M5 12h13M13 7l5 5-5 5" />,
  dropped: (
    <>
      <circle cx="12" cy="12" r="7" />
      <path d="M7 17L17 7" />
    </>
  ),
  matters: (
    <path d="M12 4.5l2.2 4.6 5 .7-3.6 3.5.9 5-4.5-2.4-4.5 2.4.9-5-3.6-3.5 5-.7z" />
  ),
  note: <path d="M15.5 5.5l3 3L9 18l-4 1 1-4z" />,
}

const toneColor: Record<MarkTone, string> = {
  gold: 'var(--gold-500)',
  navy: 'var(--navy-900)',
  quiet: 'var(--text-secondary)',
}

export function Mark({ type, tone = 'gold', size = 20, decorative = false }: MarkProps) {
  const a11y = decorative
    ? ({ 'aria-hidden': true } as const)
    : ({ role: 'img', 'aria-label': type } as const)

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ color: toneColor[tone], flexShrink: 0 }}
      {...a11y}
    >
      {glyphs[type]}
    </svg>
  )
}
