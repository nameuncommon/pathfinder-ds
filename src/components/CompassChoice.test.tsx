import { readFileSync } from 'node:fs'
import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { CompassChoice } from './CompassChoice'

describe('CompassChoice', () => {
  it('is a button whose name includes direction and title', () => {
    render(<CompassChoice direction="N" title="Go on" detail="d" onSelect={() => {}} />)
    expect(screen.getByRole('button', { name: /N, Go on/ })).toBeTruthy()
    expect(screen.queryByRole('radio')).toBeNull()
  })

  it('omits aria-pressed unless selected is passed', () => {
    render(<CompassChoice direction="N" title="t" detail="d" onSelect={() => {}} />)
    expect(screen.getByRole('button').hasAttribute('aria-pressed')).toBe(false)
  })

  it('reflects selected as aria-pressed', () => {
    const { rerender } = render(<CompassChoice direction="N" title="t" detail="d" selected={false} onSelect={() => {}} />)
    expect(screen.getByRole('button').getAttribute('aria-pressed')).toBe('false')
    rerender(<CompassChoice direction="N" title="t" detail="d" selected onSelect={() => {}} />)
    expect(screen.getByRole('button').getAttribute('aria-pressed')).toBe('true')
  })

  it('calls onSelect on click', () => {
    const onSelect = vi.fn()
    render(<CompassChoice direction="E" title="t" detail="d" onSelect={onSelect} />)
    fireEvent.click(screen.getByRole('button'))
    expect(onSelect).toHaveBeenCalledTimes(1)
  })

  it('renders a 140 character detail in full as one button', () => {
    const detail = 'x'.repeat(140)
    render(<CompassChoice direction="S" title="t" detail={detail} onSelect={() => {}} />)
    expect(screen.getAllByRole('button')).toHaveLength(1)
    expect(screen.getByText(detail).textContent).toBe(detail)
  })

  it('the direction ring is 40px, as in Figma compass / choice', () => {
    const css = readFileSync('src/components/CompassChoice.css', 'utf-8')
    expect(css).toMatch(/\.pf-compass__dir\s*\{[^}]*width:\s*40px;[^}]*height:\s*40px/)
  })
})
