import '@testing-library/jest-dom/vitest'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { MorningRitual } from './MorningRitual'

const LONG_TITLE = 'Book flights and hotel and a rental car for the big March trip'

vi.mock('./data', async (importOriginal) => {
  const orig = await importOriginal<typeof import('./data')>()
  return {
    ...orig,
    inbox: orig.inbox.map((item, i) =>
      i === 0 ? { ...item, title: 'Book flights and hotel and a rental car for the big March trip' } : item,
    ),
  }
})

/** Tab until the element with this accessible name has focus. */
async function tabTo(user: ReturnType<typeof userEvent.setup>, name: string | RegExp) {
  for (let i = 0; i < 40; i++) {
    await user.tab()
    const el = document.activeElement as HTMLElement | null
    const label = el?.getAttribute('aria-label') ?? el?.textContent ?? ''
    if (typeof name === 'string' ? label === name : name.test(label)) return el!
  }
  throw new Error(`could not tab to ${String(name)}`)
}

const h1 = () => screen.getByRole('heading', { level: 1 })

describe('MorningRitual', () => {
  it('starts on the open screen', () => {
    render(<MorningRitual />)
    expect(h1()).toHaveTextContent('Good morning, Jake')
    expect(screen.getByText('Fri 22 Oct · week 42')).toBeInTheDocument()
  })

  it('walks the full keyboard path to All sorted', async () => {
    const user = userEvent.setup()
    render(<MorningRitual />)
    await tabTo(user, "Snap this week's spread")
    await user.keyboard('{Enter}')
    expect(h1()).toHaveTextContent('Snap the spread')
    expect(h1()).toHaveFocus()
    await tabTo(user, 'Take the photo')
    await user.keyboard('{Enter}')
    expect(h1()).toHaveTextContent('Check the read')
    await tabTo(user, 'Looks right')
    await user.keyboard('{Enter}')
    expect(h1()).toHaveTextContent('Sort the inbox')
    for (let i = 0; i < 3; i++) {
      await tabTo(user, /^N, Now/)
      await user.keyboard('{Enter}')
    }
    expect(h1()).toHaveTextContent('All sorted')
    expect(screen.getByText(new RegExp(`${LONG_TITLE}: Now`))).toBeInTheDocument()
  })

  it('Skip today goes to the sort heading', async () => {
    const user = userEvent.setup()
    render(<MorningRitual />)
    await user.click(screen.getByRole('button', { name: "Snap this week's spread" }))
    await user.click(screen.getByRole('button', { name: 'Skip today' }))
    expect(h1()).toHaveTextContent('Sort the inbox')
  })

  it('the inbox button on open goes straight to sorting', async () => {
    const user = userEvent.setup()
    render(<MorningRitual />)
    await user.click(screen.getByRole('button', { name: /Inbox · 3 to sort/ }))
    expect(h1()).toHaveTextContent('Sort the inbox')
  })

  it('back returns to the previous step', async () => {
    const user = userEvent.setup()
    render(<MorningRitual />)
    await user.click(screen.getByRole('button', { name: "Snap this week's spread" }))
    await user.click(screen.getByRole('button', { name: 'Back' }))
    expect(h1()).toHaveTextContent('Good morning, Jake')
  })

  it('compass is a labelled group of buttons', async () => {
    const user = userEvent.setup()
    render(<MorningRitual />)
    await user.click(screen.getByRole('button', { name: /Inbox · 3 to sort/ }))
    const group = screen.getByRole('group', { name: 'Which way does it go?' })
    expect(within(group).getAllByRole('button')).toHaveLength(4)
    expect(screen.getByText('1 of 3')).toBeInTheDocument()
  })

  it('a read row opens the fix dialog and save updates the row', async () => {
    const user = userEvent.setup()
    render(<MorningRitual />)
    await user.click(screen.getByRole('button', { name: "Snap this week's spread" }))
    await user.click(screen.getByRole('button', { name: 'Take the photo' }))
    await user.click(screen.getByRole('button', { name: 'Fix: run 5k' }))
    const dialog = screen.getByRole('dialog', { name: 'Fix what I read' })
    expect(dialog).toHaveAttribute('aria-modal', 'true')
    const input = within(dialog).getByLabelText('What it says')
    expect(input).toHaveValue('run 5k')
    expect(input).toHaveFocus()
    await user.clear(input)
    await user.type(input, 'run 10k')
    await user.click(within(dialog).getByRole('button', { name: 'Save' }))
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Fix: run 10k' })).toHaveFocus()
  })

  it('Escape closes the dialog and returns focus to the row', async () => {
    const user = userEvent.setup()
    render(<MorningRitual />)
    await user.click(screen.getByRole('button', { name: "Snap this week's spread" }))
    await user.click(screen.getByRole('button', { name: 'Take the photo' }))
    const row = screen.getByRole('button', { name: 'Fix: run 5k' })
    await user.click(row)
    await user.keyboard('{Escape}')
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(row).toHaveFocus()
  })

  it('renders a long inbox title in full', async () => {
    const user = userEvent.setup()
    render(<MorningRitual />)
    await user.click(screen.getByRole('button', { name: /Inbox · 3 to sort/ }))
    expect(LONG_TITLE.length).toBeGreaterThanOrEqual(60)
    expect(screen.getByText(LONG_TITLE)).toBeInTheDocument()
  })

  it('Start again resets from done', async () => {
    const user = userEvent.setup()
    render(<MorningRitual />)
    await user.click(screen.getByRole('button', { name: /Inbox · 3 to sort/ }))
    await user.click(screen.getByRole('button', { name: 'Leave the rest for Sunday' }))
    expect(h1()).toHaveTextContent('All sorted')
    await user.click(screen.getByRole('button', { name: 'Start again' }))
    expect(h1()).toHaveTextContent('Good morning, Jake')
  })

  it('saving a top 3 fix updates that row, and Start again restores it', async () => {
    const user = userEvent.setup()
    render(<MorningRitual />)
    await user.click(screen.getByRole('button', { name: "Snap this week's spread" }))
    await user.click(screen.getByRole('button', { name: 'Take the photo' }))
    await user.click(screen.getByRole('button', { name: 'Fix: case study images' }))
    const input = screen.getByLabelText('What it says')
    await user.clear(input)
    await user.type(input, 'case study copy')
    await user.click(screen.getByRole('button', { name: 'Save' }))
    expect(screen.getByRole('button', { name: 'Fix: case study copy' })).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Looks right' }))
    await user.click(screen.getByRole('button', { name: 'Leave the rest for Sunday' }))
    await user.click(screen.getByRole('button', { name: 'Start again' }))
    await user.click(screen.getByRole('button', { name: "Snap this week's spread" }))
    await user.click(screen.getByRole('button', { name: 'Take the photo' }))
    expect(screen.getByRole('button', { name: 'Fix: case study images' })).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Fix: case study copy' })).not.toBeInTheDocument()
  })
})
