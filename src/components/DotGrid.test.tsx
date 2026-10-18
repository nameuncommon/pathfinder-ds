import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { DotGrid } from './DotGrid'

describe('DotGrid', () => {
  it('is decorative and hidden from assistive tech', () => {
    const { container } = render(<DotGrid surface="navy" />)
    expect(container.firstElementChild!.getAttribute('aria-hidden')).toBe('true')
  })

  it('takes the surface and an optional fade', () => {
    const { container } = render(<DotGrid surface="cream" fade />)
    const el = container.firstElementChild!
    expect(el.className).toContain('pf-dot-grid--cream')
    expect(el.className).toContain('pf-dot-grid--fade')
  })
})
