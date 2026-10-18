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

  it('an error is wired to the field and set calmly: gold 2px edge, primary text, no red', () => {
    render(<Input label="What it says" defaultValue="" error="Write what the line says" />)
    const field = screen.getByLabelText('What it says')
    expect(field).toHaveAttribute('aria-invalid', 'true')
    expect(field).toHaveAccessibleDescription('Write what the line says')
    const css = readFileSync('src/components/Input.css', 'utf-8')
    expect(css).toMatch(/\.pf-input__field\[aria-invalid='true'\]\s*\{[^}]*border:\s*2px solid var\(--accent-default\)/)
    expect(css).toMatch(/\.pf-input__error\s*\{[^}]*color:\s*var\(--text-primary\)/)
    expect(css).not.toMatch(/red|danger|error\)|#[cdef][0-9a-f]{2}0{2,}/i)
  })

  it('no error, no invalid state', () => {
    render(<Input label="What it says" defaultValue="x" />)
    expect(screen.getByLabelText('What it says')).not.toHaveAttribute('aria-invalid')
  })

  it('the label is sentence case 14 semibold, like the app section labels', () => {
    const css = readFileSync('src/components/Input.css', 'utf-8')
    const label = css.match(/\.pf-input__label\s*\{([^}]*)\}/)?.[1] ?? ''
    expect(label).not.toMatch(/text-transform/)
    expect(label).toMatch(/font-size:\s*var\(--type-14-size\)/)
  })
})
