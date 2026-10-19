import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { CalendarEvent } from '../../components/CalendarEvent'
import { ReadRow } from '../../components/ReadRow'
import { ScheduleRow } from '../../components/ScheduleRow'
import { reads, topThree } from '../data'
import { Check } from './Check'

const actions = { focusTitle: false, onNext: () => {}, onBack: () => {}, onSkip: () => {} }

const sources = (dir: string): string[] =>
  readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? sources(join(dir, e.name)) : /\.tsx?$/.test(e.name) && !e.name.includes('.test.') ? [join(dir, e.name)] : [],
  )

describe('copy: plain words, no ranking', () => {
  it('yesterday is one plain sentence with the tally, no hero numeral', () => {
    const { container } = render(<Check {...actions} reads={[...reads, ...topThree]} onFix={() => {}} />)
    expect(container.querySelector('.pf-app__numeral')).toBeNull()
    expect(screen.getByText('Six done yesterday, two moved forward.')).toBeInTheDocument()
    expect(container.querySelector('.pf-tally')).not.toBeNull()
  })

  it('nothing in the app ranks a day', () => {
    for (const f of sources('src/app')) expect(readFileSync(f, 'utf-8'), f).not.toMatch(/\bbest\b/i)
  })

  it('section labels say what they are', () => {
    render(<Check {...actions} reads={[...reads, ...topThree]} onFix={() => {}} />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Check what it read')
    expect(screen.getByRole('heading', { name: 'What it read from yesterday · tap a line to fix' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Today’s top 3, as you wrote them' })).toBeInTheDocument()
  })

  it('a read row shows a decorative pencil, so it looks fixable', () => {
    const { container } = render(<ReadRow mark="done" text="run 5k" onFix={() => {}} />)
    const pencil = container.querySelector('.pf-read-row__fix svg')
    expect(pencil).not.toBeNull()
    expect(pencil?.getAttribute('aria-hidden')).toBe('true')
    expect(screen.getByRole('button')).toHaveAccessibleName('Fix: run 5k, done')
  })

  it('a word in the time slot is set in sans; times stay mono', () => {
    const due = render(<ScheduleRow time="due" title="Electric bill · $84" bearing="home" />)
    expect(due.container.querySelector('.pf-schedule-row__time--word')).not.toBeNull()
    due.unmount()
    const t = render(<ScheduleRow time="9:30" title="Dentist" bearing="health" />)
    expect(t.container.querySelector('.pf-schedule-row__time--word')).toBeNull()
    t.unmount()
    const ev = render(<CalendarEvent time="due" title="Electric bill" bearing="home" kind="bill" />)
    expect(ev.container.querySelector('.pf-calevent__time--word')).not.toBeNull()
    for (const [file, sel] of [
      ['src/components/ScheduleRow.css', '.pf-schedule-row__time--word'],
      ['src/components/CalendarEvent.css', '.pf-calevent__time--word'],
    ]) {
      expect(readFileSync(file, 'utf-8')).toMatch(new RegExp(`${sel.replace(/[.-]/g, '\\$&')}\\s*\\{[^}]*font-family:\\s*var\\(--font-sans\\)`))
    }
  })
})
