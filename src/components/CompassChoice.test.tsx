import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { CompassChoice, type Direction } from './CompassChoice'

describe('CompassChoice', () => {
  it('is a radio with aria-checked', () => {
    const { rerender } = render(
      <div role="radiogroup" aria-label="Pick">
        <CompassChoice direction="N" title="Go on" detail="d" checked={false} onSelect={() => {}} />
      </div>,
    )
    expect(screen.getByRole('radio').getAttribute('aria-checked')).toBe('false')
    rerender(
      <div role="radiogroup" aria-label="Pick">
        <CompassChoice direction="N" title="Go on" detail="d" checked onSelect={() => {}} />
      </div>,
    )
    expect(screen.getByRole('radio').getAttribute('aria-checked')).toBe('true')
  })

  it('calls onSelect on click', () => {
    const onSelect = vi.fn()
    render(<CompassChoice direction="E" title="t" detail="d" checked={false} onSelect={onSelect} />)
    fireEvent.click(screen.getByRole('radio'))
    expect(onSelect).toHaveBeenCalledTimes(1)
  })

  it('renders a 140 character detail in full as one radio', () => {
    const detail = 'x'.repeat(140)
    render(<CompassChoice direction="S" title="t" detail={detail} checked={false} onSelect={() => {}} />)
    expect(screen.getAllByRole('radio')).toHaveLength(1)
    expect(screen.getByText(detail).textContent).toBe(detail)
  })

  it('accepts the four directions', () => {
    const d: Direction[] = ['N', 'E', 'S', 'W']
    expect(d).toHaveLength(4)
  })
})
