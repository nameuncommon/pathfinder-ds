import { readFileSync } from 'node:fs'
import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { DateChip } from './DateChip'

describe('DateChip', () => {
  it('is a toggle button: aria-pressed follows selected', () => {
    const onClick = vi.fn()
    const { rerender } = render(<DateChip selected={false} onClick={onClick}>Fri 22 Oct</DateChip>)
    const chip = screen.getByRole('button', { name: 'Fri 22 Oct' })
    expect(chip.getAttribute('aria-pressed')).toBe('false')
    fireEvent.click(chip)
    expect(onClick).toHaveBeenCalledTimes(1)
    rerender(<DateChip selected onClick={onClick}>Fri 22 Oct</DateChip>)
    expect(chip.getAttribute('aria-pressed')).toBe('true')
  })

  it('is 44px tall with no status colours', () => {
    const css = readFileSync('src/components/DateChip.css', 'utf-8')
    expect(css).toMatch(/\.pf-date-chip\s*\{[^}]*min-height:\s*44px/)
    expect(css).not.toMatch(/danger|overdue|color-mix/)
  })
})
