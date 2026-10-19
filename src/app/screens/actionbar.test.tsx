import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { reads, topThree } from '../data'
import { Check } from './Check'
import { Done } from './Done'
import { Open } from './Open'
import { Snap } from './Snap'
import { Sort } from './Sort'

const actions = { focusTitle: false, onNext: () => {}, onBack: () => {}, onSkip: () => {} }
const noop = () => {}

const screens = {
  open: () => <Open {...actions} />,
  'open, snap skipped': () => <Open {...actions} snapSkipped lastSync="Thu 21 Oct · 7:40 pm" />,
  snap: () => <Snap {...actions} />,
  'snap, blurry': () => <Snap {...actions} photo="blurry" onRetry={noop} />,
  check: () => <Check {...actions} reads={[...reads, ...topThree]} onFix={noop} />,
  'check, nothing new': () => <Check {...actions} reads={[]} onFix={noop} />,
  sort: () => <Sort {...actions} index={0} onChoose={noop} onLeave={noop} />,
  'sort, empty': () => <Sort {...actions} items={[]} index={0} onChoose={noop} onLeave={noop} />,
  done: () => <Done focusTitle={false} decisions={{}} onRestart={noop} onRevisit={noop} />,
}

const isGold = (el: Element) => el.classList.contains('pf-button--primary')

describe('one action-bar rule', () => {
  for (const [name, el] of Object.entries(screens)) {
    it(`${name}: at most one gold button, the escape comes first and is quiet`, () => {
      const { container } = render(el())
      const bar = container.querySelector('.pf-app__action')
      expect(bar).not.toBeNull()
      const buttons = [...bar!.querySelectorAll('button')]
      const gold = buttons.filter(isGold)
      expect(gold.length).toBeLessThanOrEqual(1)
      if (gold.length === 1) expect(buttons.at(-1)).toBe(gold[0])
      // No gold anywhere else on the screen.
      expect(container.querySelectorAll('.pf-button--primary').length).toBe(gold.length)
    })
  }

  it('open: the pinned gold action is the snap, the inbox is the escape', () => {
    const { container } = render(screens.open())
    const bar = container.querySelector<HTMLElement>('.pf-app__action')!
    const snap = within(bar).getByRole('button', { name: "Snap this week's spread" })
    const inbox = within(bar).getByRole('button', { name: 'Inbox · 3 to sort' })
    expect(isGold(snap)).toBe(true)
    expect(isGold(inbox)).toBe(false)
  })

  it('snap: a visible shutter named Take the photo sits in the action bar, Skip today above it', () => {
    const { container } = render(screens.snap())
    const bar = container.querySelector<HTMLElement>('.pf-app__action')!
    const shutter = within(bar).getByRole('button', { name: 'Take the photo' })
    expect(isGold(shutter)).toBe(true)
    expect(shutter).toHaveAccessibleDescription('Found W42 · 4 corners')
    expect(within(bar).getByRole('button', { name: 'Skip today' })).toBeTruthy()
    // One accessible shutter: the viewfinder is a pointer target, not a second button.
    expect(screen.getAllByRole('button', { name: 'Take the photo' })).toHaveLength(1)
  })

  it('done: the gold action is Back to today', () => {
    const { container } = render(screens.done())
    const bar = container.querySelector<HTMLElement>('.pf-app__action')!
    expect(isGold(within(bar).getByRole('button', { name: 'Back to today' }))).toBe(true)
  })
})
