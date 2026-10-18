import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { EmptyState } from './EmptyState'

describe('EmptyState', () => {
  it('renders a heading, a line and an optional action', () => {
    const onClick = vi.fn()
    render(<EmptyState title="All sorted" line="Nothing is waiting." action={{ label: 'Capture something', onClick }} />)
    expect(screen.getByRole('heading', { level: 2, name: 'All sorted' })).toBeTruthy()
    expect(screen.getByText('Nothing is waiting.')).toBeTruthy()
    fireEvent.click(screen.getByRole('button', { name: 'Capture something' }))
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('takes a heading level', () => {
    render(<EmptyState title="Nothing new" line="x" headingLevel={3} />)
    expect(screen.getByRole('heading', { level: 3, name: 'Nothing new' })).toBeTruthy()
  })

  it('on the dot surface the dots sit in a strip above the title, not behind it', () => {
    const { container } = render(<EmptyState title="All sorted" line="x" surface="dots" />)
    const strip = container.querySelector('.pf-empty__dots')!
    expect(strip).toBeTruthy()
    expect(strip.querySelector('.pf-dot-grid')).toBeTruthy()
    expect(strip.compareDocumentPosition(screen.getByRole('heading')) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
  })
})
