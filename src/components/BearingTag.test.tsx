import { readFileSync } from 'node:fs'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { BearingTag, type Bearing } from './BearingTag'

const bearings: Bearing[] = ['health', 'people', 'home', 'work', 'craft']

describe('BearingTag', () => {
  it.each(bearings)('shows %s as a caps label', (b) => {
    const { container } = render(<BearingTag bearing={b} />)
    expect(container.textContent?.toUpperCase()).toBe(b.toUpperCase())
    expect(screen.getByText(b).textContent?.toUpperCase()).toBe(b.toUpperCase())
  })

  it('tints from the bearing token', () => {
    const { container } = render(<BearingTag bearing="health" />)
    const el = container.firstElementChild as HTMLElement
    expect(el.style.getPropertyValue('--pf-bearing')).toBe('var(--bearing-health)')
  })

  it('hides the dot from assistive tech', () => {
    const { container } = render(<BearingTag bearing="work" />)
    expect(container.querySelector('[aria-hidden="true"]')).toBeTruthy()
  })

  it('colours the label with the bearing hue at full strength', () => {
    const css = readFileSync('src/components/BearingTag.css', 'utf-8')
    const rule = css.match(/\.pf-bearing-tag\s*\{([^}]*)\}/)![1]
    expect(rule).toMatch(/(^|\s)color:\s*var\(--pf-bearing\)/)
  })
})
