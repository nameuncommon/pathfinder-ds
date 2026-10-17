import { describe, it, expect } from 'vitest'
import { ritualReducer, initialRitual } from './ritual'
import type { Action } from './ritual'
import { reads } from './data'

const start = () => initialRitual(reads)
const run = (s: ReturnType<typeof start>, ...a: Action[]) =>
  a.reduce((st, act) => ritualReducer(st, act, 3), s)

describe('ritualReducer', () => {
  it('starts on open', () => {
    const s = start()
    expect(s.step).toBe('open')
    expect(s.snapped).toBe(false)
    expect(s.inboxIndex).toBe(0)
    expect(s.decisions).toEqual({})
  })
  it('open -> next -> snap', () => {
    expect(run(start(), { type: 'next' }).step).toBe('snap')
  })
  it('snap -> next sets snapped and goes to check', () => {
    const s = run(start(), { type: 'next' }, { type: 'next' })
    expect(s.step).toBe('check')
    expect(s.snapped).toBe(true)
  })
  it('skipSnap goes to sort with snapped=false', () => {
    const s = run(start(), { type: 'next' }, { type: 'skipSnap' })
    expect(s.step).toBe('sort')
    expect(s.snapped).toBe(false)
  })
  it('back from sort after skip returns to snap', () => {
    const s = run(start(), { type: 'next' }, { type: 'skipSnap' }, { type: 'back' })
    expect(s.step).toBe('snap')
  })
  it('back from sort after snapping returns to check', () => {
    const s = run(start(), { type: 'next' }, { type: 'next' }, { type: 'next' }, { type: 'back' })
    expect(s.step).toBe('check')
  })
  it('fixRead replaces text of that id only', () => {
    const s = run(start(), { type: 'fixRead', id: 'read-2', text: 'run 10k' })
    expect(s.reads.find((r) => r.id === 'read-2')?.text).toBe('run 10k')
    expect(s.reads.find((r) => r.id === 'read-1')?.text).toBe('draft the brief')
    expect(s.reads.find((r) => r.id === 'read-3')?.text).toBe('call the dentist')
  })
  it('choose records the decision and advances', () => {
    const s = run(start(), { type: 'next' }, { type: 'skipSnap' }, { type: 'choose', direction: 'N' })
    expect(s.decisions['inbox-1']).toBe('N')
    expect(s.inboxIndex).toBe(1)
    expect(s.step).toBe('sort')
  })
  it('choosing on the last item goes to done', () => {
    const s = run(
      start(),
      { type: 'next' },
      { type: 'skipSnap' },
      { type: 'choose', direction: 'N' },
      { type: 'choose', direction: 'E' },
      { type: 'choose', direction: 'W' },
    )
    expect(s.step).toBe('done')
    expect(s.decisions).toEqual({ 'inbox-1': 'N', 'inbox-2': 'E', 'inbox-3': 'W' })
  })
  it('leaveForSunday goes to done and keeps earlier decisions', () => {
    const s = run(
      start(),
      { type: 'next' },
      { type: 'skipSnap' },
      { type: 'choose', direction: 'S' },
      { type: 'leaveForSunday' },
    )
    expect(s.step).toBe('done')
    expect(s.decisions).toEqual({ 'inbox-1': 'S' })
  })
  it('back from open stays on open', () => {
    expect(run(start(), { type: 'back' }).step).toBe('open')
  })
})
