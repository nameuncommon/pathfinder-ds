import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Icon, iconNames } from './Icon'

describe('Icon', () => {
  it('has exactly the approved Lucide set', () => {
    expect([...iconNames].sort()).toEqual(
      ['calendar', 'calendar-range', 'check', 'chevron-left', 'cloud-off', 'folder-kanban', 'history', 'inbox', 'library', 'pencil', 'plus', 'rotate-ccw', 'sun'].sort(),
    )
  })

  it.each([...iconNames])('%s renders a decorative 2px-stroke svg', (name) => {
    const { container } = render(<Icon name={name} />)
    const svg = container.querySelector('svg')!
    expect(svg.getAttribute('aria-hidden')).toBe('true')
    expect(svg.getAttribute('stroke-width')).toBe('2')
    expect(svg.getAttribute('width')).toBe('24')
  })

  it('takes a size', () => {
    const { container } = render(<Icon name="sun" size={20} />)
    expect(container.querySelector('svg')!.getAttribute('width')).toBe('20')
  })
})
