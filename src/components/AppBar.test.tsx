import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { AppBar } from './AppBar'

describe('AppBar', () => {
  it('shows the dial and no back button by default', () => {
    render(<AppBar />)
    expect(screen.getByRole('img', { name: 'Pathfinder' })).toBeTruthy()
    expect(screen.queryByRole('button', { name: 'Back' })).toBeNull()
  })

  it('shows the app badge: the dial alone at 40px, inside the 44px bar, no navy disc', () => {
    const { container } = render(<AppBar />)
    const dial = screen.getByRole('img', { name: 'Pathfinder' })
    expect(dial.querySelectorAll('circle')).toHaveLength(1)
    expect(dial.getAttribute('width')).toBe('40')
    expect(container.querySelector('.pf-appbar__disc')).toBeNull()
  })

  it('shows a working back button when onBack is given', () => {
    const onBack = vi.fn()
    render(<AppBar onBack={onBack} />)
    fireEvent.click(screen.getByRole('button', { name: 'Back' }))
    expect(onBack).toHaveBeenCalledTimes(1)
  })
})
