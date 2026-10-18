import { render } from '@testing-library/react'
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
})
