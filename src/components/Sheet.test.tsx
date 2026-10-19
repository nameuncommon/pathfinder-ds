import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { Input } from './Input'
import { Sheet } from './Sheet'

const body = (
  <>
    <Input label="What it says" defaultValue="run 5k" />
    <button type="button">Save</button>
    <button type="button">Cancel</button>
  </>
)

describe('Sheet', () => {
  it('is a modal dialog labelled by its title, focusing the first field', () => {
    render(<Sheet title="Fix what it read" returnFocusTo={null} onClose={() => {}}>{body}</Sheet>)
    const dialog = screen.getByRole('dialog', { name: 'Fix what it read' })
    expect(dialog).toHaveAttribute('aria-modal', 'true')
    expect(screen.getByLabelText('What it says')).toHaveFocus()
  })

  it('returns focus to the opener it was given, even when body had focus at mount', () => {
    const opener = document.createElement('button')
    document.body.appendChild(opener)
    ;(document.activeElement as HTMLElement | null)?.blur()
    const { unmount } = render(<Sheet title="t" returnFocusTo={opener} onClose={() => {}}>{body}</Sheet>)
    unmount()
    expect(document.activeElement).toBe(opener)
    opener.remove()
  })

  it('Tab wraps inside the sheet both ways', async () => {
    const user = userEvent.setup()
    render(<Sheet title="t" returnFocusTo={null} onClose={() => {}}>{body}</Sheet>)
    await user.tab()
    await user.tab()
    expect(screen.getByRole('button', { name: 'Cancel' })).toHaveFocus()
    await user.tab()
    expect(screen.getByLabelText('What it says')).toHaveFocus()
    await user.tab({ shift: true })
    expect(screen.getByRole('button', { name: 'Cancel' })).toHaveFocus()
  })

  it('Escape calls onClose', async () => {
    const onClose = vi.fn()
    render(<Sheet title="t" returnFocusTo={null} onClose={onClose}>{body}</Sheet>)
    await userEvent.keyboard('{Escape}')
    expect(onClose).toHaveBeenCalledTimes(1)
  })
})
