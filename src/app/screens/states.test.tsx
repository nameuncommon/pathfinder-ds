import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { reads, topThree } from '../data'
import { Check } from './Check'
import { Open } from './Open'
import { Snap } from './Snap'
import { Sort } from './Sort'

const actions = { focusTitle: false, onNext: () => {}, onBack: () => {}, onSkip: () => {} }

describe('screen states', () => {
  it('open, snap skipped: a quiet snap button and the last sync, no gold nag', () => {
    render(<Open {...actions} snapSkipped lastSync="Thu 21 Oct · 7:40 pm" />)
    expect(screen.getByRole('button', { name: 'Snap the spread' }).className).toContain('quiet')
    expect(screen.getByText('Last synced Thu 21 Oct · 7:40 pm')).toBeTruthy()
    expect(screen.queryByRole('button', { name: /Snap this week/ })).toBeNull()
  })

  it('offline: a status toast, nothing else changes', () => {
    render(<Open {...actions} offline />)
    expect(screen.getByRole('status').textContent).toBe('Saved on this phone. It will sync when you are back online.')
    expect(screen.getByRole('button', { name: /Snap this week/ })).toBeTruthy()
  })

  it('snap, blurry: says so plainly, keeps Skip today', () => {
    render(<Snap {...actions} photo="blurry" />)
    expect(screen.getByText(/It came out blurry/)).toBeTruthy()
    expect(screen.getByRole('button', { name: 'Take the photo' })).toHaveAccessibleDescription('Blurry · tap to try again')
    expect(screen.getByRole('button', { name: 'Skip today' })).toBeTruthy()
  })

  it('check, nothing new: an empty state and Continue instead of the read', () => {
    render(<Check {...actions} reads={[]} onFix={() => {}} />)
    expect(screen.getByRole('heading', { name: 'Nothing new' })).toBeTruthy()
    expect(screen.getByRole('button', { name: 'Continue' })).toBeTruthy()
    expect(screen.queryByText(/done yesterday/)).toBeNull()
  })

  it('check with reads still shows them (regression)', () => {
    render(<Check {...actions} reads={[...reads, ...topThree]} onFix={() => {}} />)
    expect(screen.getByRole('button', { name: 'Looks right' })).toBeTruthy()
  })

  it('sort, empty inbox: All sorted and Back to today', () => {
    render(<Sort {...actions} items={[]} index={0} onChoose={() => {}} onLeave={() => {}} />)
    expect(screen.getByRole('heading', { name: 'All sorted' })).toBeTruthy()
    expect(screen.getByRole('button', { name: 'Back to today' })).toBeTruthy()
    expect(screen.queryByRole('group', { name: 'Which way does it go?' })).toBeNull()
  })

  it('sort shows the decorative dial by the question, not the old rose drawing', () => {
    const { container } = render(<Sort {...actions} index={0} onChoose={() => {}} onLeave={() => {}} />)
    const q = container.querySelector('.pf-app__question svg')!
    expect(q.getAttribute('aria-hidden')).toBe('true')
    expect(q.querySelectorAll('circle')).toHaveLength(1)
    expect(q.getAttribute('viewBox')).toBe('0 0 200 200')
  })
})
