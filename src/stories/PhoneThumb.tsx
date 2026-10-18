import type { CSSProperties, ReactNode } from 'react'
import '../app/app.css'

export const linkStyle: CSSProperties = {
  color: 'var(--accent-text)',
  textDecoration: 'none',
  borderBottom: '1px solid var(--border-strong)',
  paddingBottom: 1,
}

/** A real screen at 55%, inert, with a caption linking to its story. Used by the docs pages. */
export function Phone({ children, label, story }: { children: ReactNode; label: string; story: string }) {
  return (
    <figure style={{ margin: 0, display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
      <div inert aria-hidden="true" style={{ width: 215, height: 464, overflow: 'hidden', borderRadius: 24, border: '1px solid var(--border-subtle)', pointerEvents: 'none' }}>
        <div className="pf-phone-thumb" style={{ width: 390, height: 844, transform: 'scale(0.55)', transformOrigin: 'top left' }}>
          {children}
        </div>
      </div>
      <figcaption style={{ fontSize: 'var(--type-14-size)', color: 'var(--text-secondary)', maxWidth: 215 }}>
        <a style={linkStyle} href={`/?path=/story/${story}`} target="_top">
          {label}
        </a>
      </figcaption>
    </figure>
  )
}

export function Phones({ children }: { children: ReactNode }) {
  return <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-6)', margin: 'var(--space-4) 0' }}>{children}</div>
}
