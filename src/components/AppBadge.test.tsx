import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { AppBadge } from './AppBadge'

describe('AppBadge', () => {
  it('is the dial alone filling 52px by default, no disc', () => {
    const { container } = render(<AppBadge />)
    const dial = screen.getByRole('img', { name: 'Pathfinder' })
    expect(dial.getAttribute('width')).toBe('52')
    expect(dial.querySelectorAll('circle')).toHaveLength(1)
    expect(container.querySelector('.pf-appbadge__disc')).toBeNull()
  })

  it('drops to the star below 24px', () => {
    render(<AppBadge size={20} />)
    expect(screen.getByRole('img').querySelectorAll('circle')).toHaveLength(0)
  })
})
