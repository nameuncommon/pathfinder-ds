import { readFileSync } from 'node:fs'
import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { Checkbox } from './Checkbox'

describe('Checkbox', () => {
  it('is a native checkbox named by its visible label', () => {
    const onChange = vi.fn()
    render(<Checkbox checked={false} onChange={onChange} label="Call the dentist" />)
    const box = screen.getByRole('checkbox', { name: 'Call the dentist' })
    fireEvent.click(box)
    expect(onChange).toHaveBeenCalledWith(true)
  })

  it('can be disabled', () => {
    render(<Checkbox checked onChange={() => {}} label="Call the dentist" disabled />)
    expect(screen.getByRole('checkbox')).toBeDisabled()
  })

  it('the whole row is the 44px target, and the box edge is border/strong', () => {
    const css = readFileSync('src/components/Checkbox.css', 'utf-8')
    expect(css).toMatch(/\.pf-checkbox\s*\{[^}]*min-height:\s*44px/)
    expect(css).toMatch(/\.pf-checkbox__box\s*\{[^}]*var\(--border-strong\)/)
  })
})
