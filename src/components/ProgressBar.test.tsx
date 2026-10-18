import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { ProgressBar } from './ProgressBar'

describe('ProgressBar', () => {
  it('exposes progressbar semantics', () => {
    render(<ProgressBar step={3} total={4} />)
    const bar = screen.getByRole('progressbar')
    expect(bar.getAttribute('aria-valuenow')).toBe('3')
    expect(bar.getAttribute('aria-valuemax')).toBe('4')
    expect(bar.getAttribute('aria-valuetext')).toBe('Step 3 of 4')
  })

  it('has an accessible name, Progress by default', () => {
    render(<ProgressBar step={1} total={4} />)
    expect(screen.getByRole('progressbar', { name: 'Progress' })).toBeTruthy()
  })

  it('takes a label', () => {
    render(<ProgressBar step={2} total={4} label="Morning ritual" />)
    expect(screen.getByRole('progressbar', { name: 'Morning ritual' })).toBeTruthy()
  })
})
