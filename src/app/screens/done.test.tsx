import { readFileSync } from 'node:fs'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { inbox, oneThing } from '../data'
import { Done } from './Done'

const [a, b, c] = inbox
const props = { focusTitle: false, onRestart: () => {}, onRevisit: () => {} }

describe('Done', () => {
  it('restates the one thing on paper', () => {
    const { container } = render(<Done {...props} decisions={{ [a.id]: 'N' }} />)
    const paper = container.querySelector('.pf-paper')
    expect(paper).not.toBeNull()
    expect(within(paper as HTMLElement).getByRole('img', { name: oneThing })).toBeInTheDocument()
  })

  it('groups decisions under the directions used, in compass order, with no browser bullets', () => {
    const { container } = render(<Done {...props} decisions={{ [a.id]: 'E', [b.id]: 'N', [c.id]: 'E' }} />)
    const groups = screen.getAllByRole('heading', { level: 2 }).map((h) => h.textContent)
    expect(groups).toContain('N Now')
    expect(groups).toContain('E Later')
    expect(groups).not.toContain('S Share')
    expect(groups.indexOf('N Now')).toBeLessThan(groups.indexOf('E Later'))
    const later = screen.getByRole('region', { name: 'E Later' })
    expect(within(later).getAllByRole('button').map((x) => x.getAttribute('aria-label'))).toEqual([`Change ${a.title}`, `Change ${c.title}`])
    expect(container.querySelector('ul:not([role]), ol:not([role])')).toBeNull()
  })

  it('a decision is a button that revisits that item', async () => {
    const onRevisit = vi.fn()
    render(<Done {...props} onRevisit={onRevisit} decisions={{ [a.id]: 'S' }} />)
    await userEvent.click(screen.getByRole('button', { name: `Change ${a.title}` }))
    expect(onRevisit).toHaveBeenCalledWith(a.id)
  })

  it('the action is the gold Back to today; partial copy stays', () => {
    const onRestart = vi.fn()
    render(<Done {...props} onRestart={onRestart} decisions={{ [a.id]: 'N' }} />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Sorted 1 of 3')
    expect(screen.getByText('2 left for Sunday.')).toBeInTheDocument()
    const back = screen.getByRole('button', { name: 'Back to today' })
    expect(back.className).toContain('pf-button--primary')
  })

  it('the one dial (the app bar logo) settles in on Done, only when motion is allowed', () => {
    const { container } = render(<Done {...props} decisions={{}} />)
    expect(container.querySelector('.pf-app--settle .pf-appbar__badge svg')).not.toBeNull()
    expect(container.querySelector('.pf-done__dial')).toBeNull()
    const css = readFileSync('src/styles/motion.css', 'utf-8')
    const block = css.slice(css.indexOf('@media (prefers-reduced-motion: no-preference)'))
    expect(block).toMatch(/\.pf-app--settle \.pf-appbadge\s*\{[^}]*animation:\s*pf-settle var\(--motion-duration-slow\)/)
  })
})
