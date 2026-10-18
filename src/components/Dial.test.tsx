import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Dial, DIAL_MIN_SIZE } from './Dial'

describe('Dial', () => {
  it('is an image named Pathfinder at the default size', () => {
    render(<Dial />)
    const svg = screen.getByRole('img', { name: 'Pathfinder' })
    expect(svg.getAttribute('width')).toBe('40')
    expect(svg.getAttribute('height')).toBe('40')
    expect(svg.getAttribute('viewBox')).toBe('0 0 200 200')
  })

  it('renders the dial at 24px: ring and star, no dots', () => {
    expect(DIAL_MIN_SIZE).toBe(24)
    render(<Dial size={24} />)
    const svg = screen.getByRole('img')
    expect(svg.querySelectorAll('circle')).toHaveLength(1)
    expect(svg.querySelectorAll('path')).toHaveLength(1)
  })

  it('renders the star alone at 23px', () => {
    render(<Dial size={23} />)
    const svg = screen.getByRole('img')
    expect(svg.querySelectorAll('circle')).toHaveLength(0)
    expect(svg.querySelectorAll('path')).toHaveLength(1)
  })

  it('takes a label', () => {
    render(<Dial label="Pathfinder home" />)
    expect(screen.getByRole('img', { name: 'Pathfinder home' })).toBeTruthy()
  })

  it('can be decorative: hidden from screen readers, no name', () => {
    const { container } = render(<Dial size={40} decorative />)
    const svg = container.querySelector('svg')!
    expect(svg.getAttribute('aria-hidden')).toBe('true')
    expect(svg.getAttribute('role')).toBeNull()
  })
})
