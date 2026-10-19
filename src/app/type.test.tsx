import { readFileSync } from 'node:fs'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { reads, topThree } from './data'
import { Check } from './screens/Check'
import { Done } from './screens/Done'
import { Open } from './screens/Open'
import { Snap } from './screens/Snap'
import { Sort } from './screens/Sort'

const actions = { focusTitle: false, onNext: () => {}, onBack: () => {}, onSkip: () => {} }
const noop = () => {}
const css = readFileSync('src/app/app.css', 'utf-8')
const rule = (selector: string) => {
  const esc = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  return css.match(new RegExp(`(^|\\n)${esc}\\s*\\{([^}]*)\\}`))?.[2] ?? ''
}
const h1 = () => screen.getByRole('heading', { level: 1 })

describe('app type', () => {
  it('step screens use the smaller step title; the greeting and the ending keep the large one', () => {
    const step = [
      () => <Snap {...actions} />,
      () => <Check {...actions} reads={[...reads, ...topThree]} onFix={noop} />,
      () => <Sort {...actions} index={0} onChoose={noop} onLeave={noop} />,
    ]
    for (const s of step) {
      const r = render(s())
      expect(h1().classList.contains('pf-app__title--step')).toBe(true)
      r.unmount()
    }
    for (const s of [() => <Open {...actions} />, () => <Done focusTitle={false} decisions={{}} onRestart={noop} onRevisit={noop} />]) {
      const r = render(s())
      expect(h1().classList.contains('pf-app__title--step')).toBe(false)
      r.unmount()
    }
    expect(rule('.pf-app__title--step')).toMatch(/font-size:\s*var\(--type-24-size\)/)
    expect(rule('.pf-app__title--step')).toMatch(/line-height:\s*var\(--type-24-line\)/)
  })

  it('section labels are sentence case, 14/22 semibold, with more space above than below', () => {
    const r = rule('.pf-app__label')
    expect(r).not.toMatch(/text-transform/)
    expect(r).not.toMatch(/letter-spacing/)
    expect(r).toMatch(/font-size:\s*var\(--type-14-size\)/)
    expect(r).toMatch(/font-weight:\s*600/)
    expect(r).toMatch(/margin:\s*var\(--space-2\) 0 calc\(var\(--space-2\) \* -1\)/)
  })

  it('the sort item title is sans 20/28 semibold, so the screen has one serif', () => {
    const r = rule('.pf-app__item-title')
    expect(r).toMatch(/font-family:\s*var\(--font-sans\)/)
    expect(r).toMatch(/font-size:\s*var\(--type-20-size\)/)
    expect(r).toMatch(/font-weight:\s*600/)
  })

  it('action bar labels may wrap to a second line instead of overflowing at large text', () => {
    expect(rule('.pf-app__action > .pf-button')).toMatch(/white-space:\s*normal/)
  })

  it('the sort choices sit in a 2x2 grid of compact tiles', () => {
    expect(rule('.pf-app__choices')).toMatch(/grid-template-columns:\s*repeat\(2, minmax\(0, 1fr\)\)/)
    const r = render(<Sort {...actions} index={0} onChoose={noop} onLeave={noop} />)
    expect(r.container.querySelectorAll('.pf-app__choices .pf-compass--tile')).toHaveLength(4)
  })
})
