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
    expect(el.classList.contains('pf-button--md')).toBe(true)
  })

  it.each(['secondary', 'ghost', 'danger'] as const)('keeps %s working', (variant) => {
    render(<Button variant={variant}>x</Button>)
    expect(screen.getByRole('button').classList.contains(`pf-button--${variant}`)).toBe(true)
  })
})
