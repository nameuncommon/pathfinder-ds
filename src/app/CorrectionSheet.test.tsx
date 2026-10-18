import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { CorrectionSheet } from './CorrectionSheet'

describe('CorrectionSheet', () => {
  it('returns focus to the opener it was given, even when body had focus at mount (Safari after a click)', () => {
    const opener = document.createElement('button')
    document.body.appendChild(opener)
    ;(document.activeElement as HTMLElement | null)?.blur()
    expect(document.activeElement).toBe(document.body)
    const { unmount } = render(
      <CorrectionSheet text="call the dentist" returnFocusTo={opener} onSave={() => {}} onCancel={() => {}} />,
    )
    unmount()
    expect(document.activeElement).toBe(opener)
    opener.remove()
  })

  it('shows the handwriting on paper: cream means paper', () => {
    render(<CorrectionSheet text="call the dentist" snippetSrc="x.png" returnFocusTo={null} onSave={() => {}} onCancel={() => {}} />)
    expect(document.querySelector('.pf-paper img.pf-sheet__snippet')).toBeTruthy()
  })

  it('an empty save moves focus to the field only once the error describes it, so it is read out', async () => {
    const user = userEvent.setup()
    render(<CorrectionSheet text="run 5k" returnFocusTo={null} onSave={() => {}} onCancel={() => {}} />)
    const field = screen.getByLabelText('What it says')
    await user.clear(field)
    const save = screen.getByRole('button', { name: 'Save' })
    save.focus()
    let describedAtFocus: string | null | undefined
    field.addEventListener('focus', () => { describedAtFocus = field.getAttribute('aria-describedby') })
    await user.click(save)
    expect(field).toHaveFocus()
    expect(describedAtFocus).toBeTruthy()
  })

})
