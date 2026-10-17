import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const css = readFileSync(new URL('../src/styles/surfaces.css', import.meta.url), 'utf8')

function blockAfter(marker) {
  const start = css.indexOf(marker)
  assert.notEqual(start, -1, `missing ${marker}`)
  const open = css.indexOf('{', start)
  let depth = 0
  for (let i = open; i < css.length; i++) {
    if (css[i] === '{') depth++
    if (css[i] === '}' && --depth === 0) return css.slice(open + 1, i)
  }
  throw new Error('unbalanced braces')
}

for (const marker of [
  '@media (prefers-reduced-transparency: reduce)',
  '@supports not (backdrop-filter: blur(1px))',
]) {
  test(`.pf-glass falls back under ${marker}`, () => {
    const body = blockAfter(marker)
    assert.match(body, /\.pf-glass/)
    assert.match(body, /background:\s*var\(--surface-glass-fallback\)/)
    assert.match(body, /backdrop-filter:\s*none/)
  })
}

test('glow peak reads the token', () => {
  assert.match(css, /var\(--effect-glow-peak\)/)
})
