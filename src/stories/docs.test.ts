import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const read = (f: string) => readFileSync(f, 'utf-8')

describe('docs pages', () => {
  it('the Introduction is a product page: lockup, real screens, the handwriting, a way into the app', () => {
    const s = read('src/stories/Introduction.mdx')
    expect(s).toMatch(/import \{ Dial \}/)
    expect(s).toMatch(/snippet\('one-thing'\)/)
    expect(s).toMatch(/<Open\b/)
    expect(s).toMatch(/href="\/app\/"/)
    expect(s).toContain('Open the morning ritual')
    expect(s).not.toMatch(/four Foundations|borderLeft|function Stat/)
  })

  it('the Colour page shows the v2 palette, not the v1 blue ramp or a light column', () => {
    const s = read('src/stories/foundations/Color.mdx')
    expect(s).not.toMatch(/blue\//)
    expect(s).not.toMatch(/semantic\.light/)
    expect(s).toMatch(/navy\/950/)
    expect(s).toMatch(/bearing\/\$\{|bearing\//)
  })

  it('the Typography page puts the serif in the ramp and counts the real steps', () => {
    const s = read('src/stories/foundations/Typography.mdx')
    expect(s).toMatch(/var\(--font-display\)/)
    expect(s).toMatch(/Object\.keys\(tokens\.primitives\.type\)\.length/)
    expect(s).not.toMatch(/two Geist families|8-step/)
  })

  it('the sidebar leads with the product: Introduction, Screens, Foundations, Patterns, Components, Changelog', () => {
    const p = read('.storybook/preview.tsx')
    const order = p.match(/order:\s*\[([\s\S]*?)\]\s*,?\s*\}/)![1]
    const top = [...order.matchAll(/^\s*'([^']+)'/gm)].map((m) => m[1])
    expect(top).toEqual(['Introduction', 'Screens', 'Foundations', 'Patterns', 'Components', 'Changelog'])
  })

  it.each([
    ['ActionBar', /action-bar-2-x|step-2-snap/],
    ['Undo', /state-sort-after-choice|state-done-undo/],
    ['States', /state-check-reading|state-sort-empty/],
  ])('the %s pattern page explains when to use it and shows its stories', (name, story) => {
    const f = `src/stories/patterns/${name}.mdx`
    expect(existsSync(f)).toBe(true)
    const s = read(f)
    expect(s).toMatch(new RegExp(`<Meta title="Patterns/`))
    expect(s).toContain('When to use')
    expect(s).toMatch(story)
    expect(s).not.toMatch(/\u2014/)
  })

  it('the Changelog lists each release with a date and a status row for every component', () => {
    const s = read('src/stories/Changelog.mdx')
    expect(s).toMatch(/<Meta title="Changelog"/)
    for (const v of ['v1.0.0', 'v2.0', 'v2.1']) expect(s).toContain(v)
    for (const d of ['2026-10-14', '2026-10-17', '2026-10-18']) expect(s).toContain(d)
    expect(s).toMatch(/import\.meta\.glob\(\[?'\.\.\/components\/\*\.tsx'/)
    expect(s).toContain('stable')
    expect(s).not.toMatch(/\u2014/)
    const count = readdirSync('src/components').filter((f) => /^[A-Z]\w*\.tsx$/.test(f)).length
    expect(count).toBeGreaterThan(20)
  })
})
