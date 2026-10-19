import { readFileSync } from 'node:fs'
import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { Viewfinder } from './Viewfinder'

describe('Viewfinder', () => {
  it('is the take-the-photo button, described by the found pill', () => {
    const onTake = vi.fn()
    render(<Viewfinder found weekCode="W42" corners={4} onTake={onTake}><span>page</span></Viewfinder>)
    const btn = screen.getByRole('button', { name: 'Take the photo' })
    expect(btn).toHaveAccessibleDescription('Found W42 · 4 corners')
    fireEvent.click(btn)
    expect(onTake).toHaveBeenCalledTimes(1)
  })

  it('shows the gold brackets and pill only when the page is found', () => {
    const { container, rerender } = render(<Viewfinder found={false} onTake={() => {}} />)
    expect(container.querySelectorAll('.pf-viewfinder__corner')).toHaveLength(0)
    expect(screen.queryByText(/Found/)).toBeNull()
    rerender(<Viewfinder found weekCode="W42" corners={4} onTake={() => {}} />)
    expect(container.querySelectorAll('.pf-viewfinder__corner')).toHaveLength(4)
  })

  it('the found pill has the decorative nudge edge from Figma', () => {
    const css = readFileSync('src/components/Viewfinder.css', 'utf-8')
    expect(css).toMatch(/\.pf-viewfinder__pill\s*\{[^}]*border:\s*1px solid var\(--accent-nudge-edge\)/)
  })

  it('pointer only: out of the tab order and hidden, the status keeps the given id for an outside shutter', () => {
    const onTake = vi.fn()
    const { container } = render(<Viewfinder found weekCode="W42" corners={4} onTake={onTake} pointerOnly statusId="vf-status" />)
    expect(screen.queryByRole('button')).toBeNull()
    const vf = container.querySelector<HTMLButtonElement>('.pf-viewfinder')!
    expect(vf.tabIndex).toBe(-1)
    expect(vf.getAttribute('aria-hidden')).toBe('true')
    expect(container.querySelector('#vf-status')?.textContent).toBe('Found W42 · 4 corners')
    vf.click()
    expect(onTake).toHaveBeenCalledTimes(1)
  })
})
