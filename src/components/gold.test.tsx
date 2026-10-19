import { readFileSync } from 'node:fs'
import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Open } from '../app/screens/Open'
import { Snap } from '../app/screens/Snap'
import { Mark } from './Mark'

const css = (p: string) => readFileSync(p, 'utf-8')
const rule = (src: string, selector: string) => {
  const esc = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  return src.match(new RegExp(`(^|\\n)${esc}\\s*\\{([^}]*)\\}`))?.[2] ?? ''
}
const actions = { focusTitle: false, onNext: () => {}, onBack: () => {}, onSkip: () => {} }

describe('gold is rare', () => {
  it('compass direction rings are neutral; gold only when pressed or hovered', () => {
    const c = css('src/components/CompassChoice.css')
    expect(rule(c, '.pf-compass__dir')).toMatch(/border:\s*1px solid var\(--border-strong\)/)
    expect(rule(c, '.pf-compass__dir')).toMatch(/color:\s*var\(--text-primary\)/)
    expect(rule(c, '.pf-compass:hover .pf-compass__dir')).toMatch(/border-color:\s*var\(--accent-default\)/)
    expect(rule(c, ".pf-compass[aria-pressed='true'] .pf-compass__dir")).toMatch(/background:\s*var\(--gold-500\)/)
  })

  it('step eyebrows are secondary text; only the greeting date stays gold', () => {
    const a = css('src/app/app.css')
    expect(rule(a, '.pf-app__eyebrow')).toMatch(/color:\s*var\(--text-secondary\)/)
    expect(rule(a, '.pf-app__eyebrow--date')).toMatch(/color:\s*var\(--accent-text\)/)
    const open = render(<Open {...actions} />)
    expect(open.container.querySelector('.pf-app__eyebrow')?.classList.contains('pf-app__eyebrow--date')).toBe(true)
    open.unmount()
    const snap = render(<Snap {...actions} />)
    expect(snap.container.querySelector('.pf-app__eyebrow--date')).toBeNull()
  })

  it('desktop chips are neutral until hovered; the destination line is not gold', () => {
    const d = css('src/stories/screens/DesktopThisWeek.css')
    expect(rule(d, '.pf-desk__chip')).toMatch(/border:\s*1px solid var\(--border-strong\)/)
    expect(rule(d, '.pf-desk__chip')).toMatch(/color:\s*var\(--text-primary\)/)
    expect(rule(d, '.pf-desk__chip:hover')).toMatch(/border-color:\s*var\(--accent-default\)/)
    expect(rule(d, '.pf-desk__moves')).toMatch(/color:\s*var\(--text-secondary\)/)
  })

  it('desktop keeps gold for the logo, the active page, today and the one action; data and labels go neutral', () => {
    const d = css('src/stories/screens/DesktopThisWeek.css')
    for (const sel of ['.pf-desk__eyebrow', '.pf-desk__glyph', '.pf-desk__numeral']) {
      expect(rule(d, sel), sel).not.toMatch(/var\(--accent-/)
    }
    expect(d).not.toMatch(/\.pf-desk__day--today \.pf-desk__daynum\s*\{[^}]*accent-text/)
    expect(rule(d, '.pf-desk__day--today')).toMatch(/var\(--accent-nudge-edge\)/)
    const nav = css('src/components/SidebarNavItem.css')
    expect(rule(nav, '.pf-navitem__count')).not.toMatch(/var\(--accent-default\)/)
  })

  it('a quiet mark tone for marks shown as data, used on the desktop rows', () => {
    const { container } = render(<Mark type="moved" tone="quiet" />)
    expect(container.querySelector('svg')?.getAttribute('style')).toContain('var(--text-secondary)')
    expect(css('src/stories/screens/DesktopThisWeek.tsx')).not.toMatch(/<Mark type="moved" size=\{18\} \/>/)
  })
})
