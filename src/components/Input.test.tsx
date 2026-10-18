import { readFileSync } from 'node:fs'
import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { Input } from './Input'

describe('Input', () => {
  it('has a visible label wired to the field', () => {
    const onChange = vi.fn()
    render(<Input label="What it says" value="" onChange={onChange} />)
    const field = screen.getByLabelText('What it says')
    fireEvent.change(field, { target: { value: 'call the dentist' } })
    expect(onChange).toHaveBeenCalled()
  })

  it('passes the ref through so a dialog can focus it', () => {
    let el: HTMLInputElement | null = null
    render(<Input label="What it says" ref={(n) => { el = n }} defaultValue="x" />)
    expect(el).toBeInstanceOf(HTMLInputElement)
  })

  it('field is 52px with a border/strong edge and a gold focus edge', () => {
    const css = readFileSync('src/components/Input.css', 'utf-8')
    expect(css).toMatch(/\.pf-input__field\s*\{[^}]*min-height:\s*52px/)
    expect(css).toMatch(/\.pf-input__field\s*\{[^}]*var\(--border-strong\)/)
    expect(css).toMatch(/\.pf-input__field:focus-visible\s*\{[^}]*var\(--focus-ring\)/)
  })
})
