import type { ReactNode } from 'react'
import './GlassCard.css'

export interface GlassCardProps {
  tone?: 'default' | 'nudge'
  as?: 'div' | 'section'
  children: ReactNode
}

export function GlassCard({ tone = 'default', as: Tag = 'div', children }: GlassCardProps) {
  const cls = ['pf-glass', 'pf-glass-card', tone === 'nudge' && 'pf-glass--nudge']
    .filter(Boolean)
    .join(' ')
  return <Tag className={cls}>{children}</Tag>
}
