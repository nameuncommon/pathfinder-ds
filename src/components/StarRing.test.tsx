import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { StarRing } from './StarRing'

describe('StarRing', () => {
  it('is an image named Pathfinder at the default size', () => {
    render(<StarRing />)
    const svg = screen.getByRole('img', { name: 'Pathfinder' })
    expect(svg.getAttribute('width')).toBe('40')
    expect(svg.getAttribute('viewBox')).toBe('0 0 200 200')
  })

  it('takes a size', () => {
    render(<StarRing size={64} />)
    expect(screen.getByRole('img').getAttribute('height')).toBe('64')
  })
})
