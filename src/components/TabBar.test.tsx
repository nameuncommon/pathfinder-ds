import { readFileSync } from 'node:fs'
import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { TabBar } from './TabBar'

describe('TabBar', () => {
  it('is a navigation landmark named Main', () => {
    render(<TabBar active="today" />)
    expect(screen.getByRole('navigation', { name: 'Main' })).toBeTruthy()
  })

  it('marks only the active tab with aria-current', () => {
    render(<TabBar active="inbox" />)
    expect(screen.getByRole('button', { name: 'Inbox' }).getAttribute('aria-current')).toBe('page')
    for (const n of ['Today', 'Week', 'Library']) {
      expect(screen.getByRole('button', { name: n }).getAttribute('aria-current')).toBeNull()
    }
  })

  it('reports the tab and the capture button', () => {
    const onSelect = vi.fn()
    const onCapture = vi.fn()
    render(<TabBar active="today" onSelect={onSelect} onCapture={onCapture} />)
    fireEvent.click(screen.getByRole('button', { name: 'Week' }))
    fireEvent.click(screen.getByRole('button', { name: 'Capture' }))
    expect(onSelect).toHaveBeenCalledWith('week')
    expect(onCapture).toHaveBeenCalledTimes(1)
  })

  it('Tab reaches all five controls in order', async () => {
    render(<TabBar active="today" />)
    const user = userEvent.setup()
    const seen: string[] = []
    for (let i = 0; i < 5; i++) {
      await user.tab()
      seen.push((document.activeElement as HTMLElement).getAttribute('aria-label') ?? document.activeElement!.textContent!)
    }
    expect(seen).toEqual(['Today', 'Week', 'Capture', 'Inbox', 'Library'])
  })

  it('every control is at least 44px', () => {
    const css = readFileSync('src/components/TabBar.css', 'utf-8')
    expect(css).toMatch(/\.pf-tabbar__tab\s*\{[^}]*min-height:\s*44px/)
    expect(css).toMatch(/\.pf-tabbar__capture\s*\{[^}]*width:\s*52px/)
  })
})
