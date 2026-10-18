import { readdirSync, readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const read = (f: string) => readFileSync(f, 'utf-8')

describe('Storybook chrome', () => {
  it('docs tables have no white zebra rows: every row is on the raised navy with primary text', () => {
    const head = read('.storybook/preview-head.html')
    expect(head).toMatch(/\.sbdocs table tr(:nth-of-type\(2n\))?[^{]*\{[^}]*background:\s*var\(--surface-raised\)/)
    expect(head).toMatch(/\.sbdocs table tr[^{]*\{[^}]*color:\s*var\(--text-primary\)/)
  })

  it('the system is dark only: no theme switch in the toolbar', () => {
    const preview = read('.storybook/preview.tsx')
    expect(preview).not.toMatch(/theme:\s*\{/)
    expect(preview).toMatch(/setAttribute\('data-theme', 'dark'\)/)
  })

  it('component stories sit in a plain frame, not on ambient tiles', () => {
    for (const f of readdirSync('src/components').filter((n) => n.endsWith('.stories.tsx'))) {
      expect(read(`src/components/${f}`), f).not.toMatch(/pf-ambient/)
    }
    expect(read('src/stories/StatesGrid.tsx')).not.toMatch(/pf-ambient/)
    expect(read('src/stories/StatesGrid.tsx')).toMatch(/className="pf-states"/)
    expect(read('src/stories/stories.css')).toMatch(/\.pf-states\s*\{[^}]*flex-wrap:\s*wrap/)
  })

  it('tab labels wrap only between words', () => {
    const rule = read('src/components/TabBar.css').match(/\.pf-tabbar__tab\s*\{([^}]*)\}/)![1]
    expect(rule).toMatch(/overflow-wrap:\s*normal/)
    expect(rule).toMatch(/hyphens:\s*none/)
    expect(rule).not.toMatch(/anywhere/)
  })

  it('foundations page titles are Title Case', () => {
    for (const [f, t] of [['Color', 'Colour'], ['Typography', 'Typography'], ['Spacing', 'Spacing']]) {
      expect(read(`src/stories/foundations/${f}.mdx`)).toContain(`<h1 style={h1Style}>${t}</h1>`)
    }
  })

  it('hover and pressed are visibly different from default on the form controls', () => {
    const cb = read('src/components/Checkbox.css')
    expect(cb).toMatch(/\.pf-checkbox:hover \.pf-checkbox__box\s*\{[^}]*border-color:\s*var\(--text-secondary\)/)
    expect(cb).toMatch(/\.pf-checkbox:active \.pf-checkbox__box\s*\{[^}]*border-color:\s*var\(--accent-default\)/)
    expect(read('src/components/DateChip.css')).toMatch(/\.pf-date-chip:hover\s*\{[^}]*border-color:\s*var\(--text-secondary\)/)
    expect(read('src/components/Input.css')).toMatch(/\.pf-input__field:hover\s*\{[^}]*border-color:\s*var\(--text-secondary\)/)
  })
})
