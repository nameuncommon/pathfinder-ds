import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { ReadRow } from './ReadRow'

describe('ReadRow', () => {
  it('is a button named Fix: text, mark', () => {
    render(<ReadRow mark="task" text="Call the plumber" onFix={() => {}} />)
    expect(screen.getByRole('button', { name: 'Fix: Call the plumber, task' })).toBeTruthy()
    expect(screen.getByText('Call the plumber')).toBeTruthy()
  })

  it.each(['done', 'moved', 'task', 'dropped', 'matters', 'note'] as const)(
    'includes the %s mark word in the name',
    (mark) => {
      render(<ReadRow mark={mark} text="x" onFix={() => {}} />)
      expect(screen.getByRole('button').getAttribute('aria-label')).toBe(`Fix: x, ${mark}`)
    },
  )

  it('calls onFix on click', () => {
    const onFix = vi.fn()
    render(<ReadRow mark="moved" text="Pay rent" onFix={onFix} />)
    fireEvent.click(screen.getByRole('button'))
    expect(onFix).toHaveBeenCalledTimes(1)
  })

  it('shows the snippet image with the text as alt instead of the text', () => {
    render(<ReadRow mark="note" text="Buy stamps" snippetSrc="/s.png" onFix={() => {}} />)
    const img = screen.getByAltText('Buy stamps') as HTMLImageElement
    expect(img.getAttribute('src')).toBe('/s.png')
    expect(screen.queryByText('Buy stamps')).toBeNull()
  })
})
