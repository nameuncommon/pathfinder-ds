import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { ReadRow } from '../../components/ReadRow'
import { reads, topThree } from '../data'
import { MorningRitual } from '../MorningRitual'
import { Check } from './Check'

const actions = { focusTitle: false, onNext: () => {}, onBack: () => {}, onSkip: () => {} }
const all = [...reads, ...topThree]

describe('reading state', () => {
  it('Check while reading: a status, three placeholder rows, no read rows and no action yet', () => {
    const { container } = render(<Check {...actions} reads={all} onFix={() => {}} reading />)
    expect(screen.getByRole('status')).toHaveTextContent('Reading your spread…')
    expect(container.querySelectorAll('.pf-app__placeholder')).toHaveLength(3)
    expect(screen.queryByRole('button', { name: /^Fix:/ })).toBeNull()
    expect(screen.queryByRole('button', { name: 'Looks right' })).toBeNull()
  })

  it('reading state is a status and ends on its own', async () => {
    const user = userEvent.setup()
    render(<MorningRitual readingMs={50} />)
    await user.click(screen.getByRole('button', { name: "Snap this week's spread" }))
    await user.click(screen.getByRole('button', { name: 'Take the photo' }))
    expect(screen.getByRole('status')).toHaveTextContent('Reading your spread…')
    expect(screen.getByRole('heading', { level: 1 })).toHaveFocus()
    expect(await screen.findByRole('button', { name: 'Looks right' })).toBeInTheDocument()
    expect(screen.queryByText('Reading your spread…')).toBeNull()
    expect(screen.getByRole('heading', { level: 1 })).toHaveFocus()
  })
})

describe('lines it is not sure about', () => {
  it('an unsure row says so in its name and shows a Not sure tag', () => {
    render(<ReadRow mark="done" text="run 5k" unsure onFix={() => {}} />)
    const row = screen.getByRole('button', { name: 'Fix: run 5k, done, not sure' })
    expect(within(row).getByText('Not sure')).toBeInTheDocument()
  })

  it('the sample marks run 5k unsure and Check lists unsure rows first', () => {
    render(<Check {...actions} reads={all} onFix={() => {}} />)
    const names = screen.getAllByRole('button', { name: /^Fix:/ }).map((b) => b.getAttribute('aria-label'))
    expect(names[0]).toBe('Fix: run 5k, done, not sure')
    expect(names).toHaveLength(6)
  })
})
