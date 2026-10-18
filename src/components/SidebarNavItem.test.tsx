import { readFileSync } from 'node:fs'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { SidebarNavItem } from './SidebarNavItem'

describe('SidebarNavItem', () => {
  it('is a link; the active one has aria-current="page"', () => {
    render(
      <>
        <SidebarNavItem label="Today" href="#today" icon="sun" />
        <SidebarNavItem label="This week" href="#week" icon="calendar-range" active />
      </>,
    )
    expect(screen.getByRole('link', { name: 'Today' }).getAttribute('aria-current')).toBeNull()
    expect(screen.getByRole('link', { name: 'This week' }).getAttribute('aria-current')).toBe('page')
  })

  it('announces a count as "3 to sort"', () => {
    render(<SidebarNavItem label="Inbox" href="#inbox" icon="inbox" count={3} />)
    expect(screen.getByRole('link', { name: 'Inbox 3 to sort' })).toBeTruthy()
  })

  it('is 44px tall', () => {
    const css = readFileSync('src/components/SidebarNavItem.css', 'utf-8')
    expect(css).toMatch(/\.pf-navitem\s*\{[^}]*min-height:\s*44px/)
  })
})
