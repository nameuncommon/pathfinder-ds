import { useId, type ReactNode } from 'react'
import './GlassPanel.css'

export interface GlassPanelProps {
  /** Small caps label at the top; when given, the panel is a region named by it. */
  title?: string
  children: ReactNode
}

/** The desktop glass panel (Figma `glass panel`). Glass and its solid fallback come from .pf-glass. */
export function GlassPanel({ title, children }: GlassPanelProps) {
  const id = useId()
  if (!title) return <div className="pf-glass pf-glass-panel">{children}</div>
  return (
    <section className="pf-glass pf-glass-panel" aria-labelledby={id}>
      <h2 id={id} className="pf-glass-panel__title">
        {title}
      </h2>
      {children}
    </section>
  )
}
