import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

describe('tint tokens in CSS', () => {
  it('the selected compass choice fills with accent/selected-fill and keeps a full gold edge', () => {
    const css = readFileSync('src/components/CompassChoice.css', 'utf-8')
    const rule = css.match(/\.pf-compass\[aria-pressed='true'\]\s*\{([^}]*)\}/)![1]
    expect(rule).toMatch(/background:\s*var\(--accent-selected-fill\)/)
    expect(rule).toMatch(/border-color:\s*var\(--gold-500\)/)
  })

  it('the nudge glass edge uses accent/nudge-edge', () => {
    const css = readFileSync('src/styles/surfaces.css', 'utf-8')
    const rule = css.match(/\.pf-glass--nudge\s*\{([^}]*)\}/)![1]
    expect(rule).toMatch(/border-color:\s*var\(--accent-nudge-edge\)/)
  })
})
