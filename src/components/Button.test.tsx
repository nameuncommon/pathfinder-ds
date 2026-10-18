import { readFileSync } from 'node:fs'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Button } from './Button'

describe('Button', () => {
  it('quiet variant carries the quiet class and the glass strong surface', () => {
    render(<Button variant="quiet">later</Button>)
    const el = screen.getByRole('button', { name: 'later' })
    expect(el.classList.contains('pf-button--quiet')).toBe(true)
    expect(el.classList.contains('pf-glass--strong')).toBe(true)
  })

  it('primary is the default (accent fill, accent label come from its CSS class)', () => {
    render(<Button>add task</Button>)
    const el = screen.getByRole('button', { name: 'add task' })
    expect(el.classList.contains('pf-button--primary')).toBe(true)
  })

  it('ghost is the calm text action', () => {
    render(<Button variant="ghost">Leave the rest for Sunday</Button>)
    expect(screen.getByRole('button').classList.contains('pf-button--ghost')).toBe(true)
  })

  it('carries only the v2 variants and one 52px size (no v1 secondary, danger or small sizes)', () => {
    const css = readFileSync('src/components/Button.css', 'utf-8')
    expect(css).not.toMatch(/pf-button--(secondary|danger|sm|lg)\b/)
    expect(css).toMatch(/\.pf-button\s*\{[^}]*min-height:\s*52px/)
  })
})
