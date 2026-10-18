import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { Toast } from './Toast'

describe('Toast', () => {
  it('is a status message', () => {
    render(<Toast message="Saved on this phone. It will sync when you are back online." />)
    expect(screen.getByRole('status').textContent).toContain('Saved on this phone')
  })

  it('has an optional action', () => {
    const onClick = vi.fn()
    render(<Toast message="Dropped on purpose." action={{ label: 'Undo', onClick }} />)
    fireEvent.click(screen.getByRole('button', { name: 'Undo' }))
    expect(onClick).toHaveBeenCalledTimes(1)
  })

})
