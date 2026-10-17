import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { GlassCard } from './GlassCard'

describe('GlassCard', () => {
  it('renders children on a glass surface', () => {
    render(<GlassCard>hello</GlassCard>)
    const el = screen.getByText('hello')
    expect(el.tagName).toBe('DIV')
    expect(el.classList.contains('pf-glass')).toBe(true)
    expect(el.classList.contains('pf-glass--nudge')).toBe(false)
  })

  it('adds the nudge edge', () => {
    render(<GlassCard tone="nudge">n</GlassCard>)
    expect(screen.getByText('n').classList.contains('pf-glass--nudge')).toBe(true)
  })

  it('can render as a section', () => {
    render(<GlassCard as="section">s</GlassCard>)
    expect(screen.getByText('s').tagName).toBe('SECTION')
  })
})
