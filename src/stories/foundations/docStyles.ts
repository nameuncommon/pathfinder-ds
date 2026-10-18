// Shared layout for the foundations pages, so every page reads the same and
// only uses token variables.
import type { CSSProperties } from 'react'

export const page: CSSProperties = {
  background: 'var(--surface-base)',
  color: 'var(--text-primary)',
  fontFamily: 'var(--font-sans)',
  minHeight: '100vh',
  padding: 'var(--space-8)',
  boxSizing: 'border-box',
}

export const h1Style: CSSProperties = {
  fontFamily: 'var(--font-display)',
  fontWeight: 600,
  fontSize: 'var(--type-32-size)',
  lineHeight: 'var(--type-32-line)',
  margin: '0 0 var(--space-3) 0',
}

export const h2Style: CSSProperties = {
  fontWeight: 600,
  fontSize: 'var(--type-20-size)',
  lineHeight: 'var(--type-20-line)',
  margin: 'var(--space-8) 0 var(--space-4) 0',
  paddingBottom: 'var(--space-2)',
  borderBottom: '1px solid var(--border-subtle)',
}

export const pStyle: CSSProperties = {
  fontSize: 'var(--type-16-size)',
  lineHeight: 'var(--type-16-line)',
  color: 'var(--text-secondary)',
  maxWidth: 680,
  margin: '0 0 var(--space-3) 0',
}

export const cell: CSSProperties = {
  textAlign: 'left',
  verticalAlign: 'top',
  padding: 'var(--space-3)',
  borderBottom: '1px solid var(--border-subtle)',
  fontSize: 'var(--type-14-size)',
  lineHeight: 'var(--type-14-line)',
}

export const headCell: CSSProperties = {
  ...cell,
  color: 'var(--text-muted)',
  fontSize: 'var(--type-12-size)',
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
}
