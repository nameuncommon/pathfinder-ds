import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Mark, type MarkType } from './Mark'

const types: MarkType[] = ['task', 'done', 'moved', 'dropped', 'matters', 'note']

describe('Mark', () => {
  it.each(types)('renders %s as a labelled image', (type) => {
    render(<Mark type={type} />)
    expect(screen.getByRole('img', { name: type })).toBeTruthy()
  })

  it('drops the role when decorative', () => {
    const { container } = render(<Mark type="done" decorative />)
    expect(screen.queryByRole('img')).toBeNull()
    expect(container.querySelector('svg')?.getAttribute('aria-hidden')).toBe('true')
  })

  it('uses a 24 viewBox, currentColor stroke and the requested size', () => {
    const { container } = render(<Mark type="task" size={32} />)
    const svg = container.querySelector('svg')!
    expect(svg.getAttribute('viewBox')).toBe('0 0 24 24')
    expect(svg.getAttribute('stroke')).toBe('currentColor')
    expect(svg.getAttribute('width')).toBe('32')
  })

  it('maps tone to a colour token', () => {
    const { container, rerender } = render(<Mark type="task" />)
    expect(container.querySelector('svg')?.style.color).toBe('var(--gold-500)')
    rerender(<Mark type="task" tone="navy" />)
    expect(container.querySelector('svg')?.style.color).toBe('var(--navy-900)')
  })
})
