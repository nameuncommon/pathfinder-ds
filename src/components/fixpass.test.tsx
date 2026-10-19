import { readFileSync } from 'node:fs'
import { render, screen } from '@testing-library/react'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import { DesktopThisWeek } from '../stories/screens/DesktopThisWeek'
import { Toast } from './Toast'

const css = (f: string) => readFileSync(f, 'utf-8')
const rule = (file: string, sel: string) => {
  const m = css(file).match(new RegExp(`${sel.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*\\{([^}]*)\\}`))
  return m ? m[1] : ''
}

describe('final review fixes', () => {
  it('every component that uses .pf-visually-hidden loads the shared utility stylesheet itself', () => {
    expect(css('src/styles/utilities.css')).toMatch(/\.pf-visually-hidden\s*\{[^}]*clip/)
    for (const c of ['CalendarEvent', 'SidebarNavItem']) {
      expect(css(`src/components/${c}.tsx`)).toMatch(/import '\.\.\/styles\/utilities\.css'/)
    }
  })

  it('toast message and calendar title may wrap: no nowrap or ellipsis in their rules', () => {
    for (const [f, sel] of [['src/components/Toast.css', '.pf-toast__message'], ['src/components/CalendarEvent.css', '.pf-calevent__title']]) {
      expect(rule(f, sel)).not.toMatch(/nowrap|ellipsis/)
    }
  })

  it('tabs share the bar width; labels wrap between words and are capped so a word always fits', () => {
    const tab = rule('src/components/TabBar.css', '.pf-tabbar__tab')
    expect(tab).not.toMatch(/(^|\s)width:\s*60px/)
    expect(tab).toMatch(/flex:\s*1 1 0/)
    expect(tab).toMatch(/overflow-wrap:\s*normal/)
    expect(tab).toMatch(/font-size:\s*min\(/)
  })

  it('the viewfinder pill can wrap and stays inside the frame', () => {
    const pill = rule('src/components/Viewfinder.css', '.pf-viewfinder__pill')
    expect(pill).not.toMatch(/nowrap/)
    expect(pill).toMatch(/max-width:/)
  })

  it('the toast mounts its live region empty, then fills it, so the message is announced', () => {
    expect(renderToStaticMarkup(<Toast message="Saved on this phone." />)).not.toContain('Saved on this phone.')
    render(<Toast message="Saved on this phone." />)
    expect(screen.getByRole('status').textContent).toContain('Saved on this phone.')
  })

  it('desktop compass chips include their visible letter in their name (label in name)', () => {
    render(<DesktopThisWeek />)
    expect(screen.getAllByRole('button', { name: /^N\b/ })).toHaveLength(2)
    expect(screen.getAllByRole('button', { name: /^E\b.*Later/ })).toHaveLength(2)
  })

  it('docs state the real component count', () => {
    const n = readFileSync('design.md', 'utf-8').match(/^ {2}- /gm)!.length
    expect(n).toBe(26)
    for (const f of ['design.md', 'README.md']) expect(css(f)).not.toMatch(/\b17 (v2 )?components\b/)
  })
})
