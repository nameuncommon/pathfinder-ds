import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { AppBar } from './AppBar'

describe('AppBar', () => {
  it('shows the dial and no back button by default', () => {
    render(<AppBar />)
    expect(screen.getByRole('img', { name: 'Pathfinder' })).toBeTruthy()
    expect(screen.queryByRole('button', { name: 'Back' })).toBeNull()
  })

  it('the disc shows the dial', () => {
    render(<AppBar />)
    expect(screen.getByRole('img', { name: 'Pathfinder' }).querySelectorAll('circle')).toHaveLength(1)
  })

  it('shows a working back button when onBack is given', () => {
    const onBack = vi.fn()
    render(<AppBar onBack={onBack} />)
    fireEvent.click(screen.getByRole('button', { name: 'Back' }))
    expect(onBack).toHaveBeenCalledTimes(1)
  })
})
