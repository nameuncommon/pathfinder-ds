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
  ':root[data-transparency="reduced"]',
]) {
  test(`.pf-glass falls back under ${marker}`, () => {
    const body = blockAfter(marker)
    assert.match(body, /\.pf-glass/)
    assert.match(body, /background:\s*var\(--surface-glass-fallback\)/)
    assert.match(body, /backdrop-filter:\s*none/)
  })
}

test('@supports fallback also clears the prefixed backdrop-filter', () => {
  const body = blockAfter('@supports not (backdrop-filter: blur(1px))')
  assert.match(body, /-webkit-backdrop-filter:\s*none/)
})

test('glow peak reads the token', () => {
  assert.match(css, /var\(--effect-glow-peak\)/)
})

test('the Storybook reduced-motion switch has a CSS hook', () => {
  assert.match(css, /:root\[data-motion="reduced"\]/)
})

test('the ambient dot field shows at the top and fades out by 240px, as in Figma', () => {
  const body = blockAfter('.pf-ambient::before')
  assert.match(body, /mask-image:\s*linear-gradient\(to bottom,\s*#000 0,\s*transparent 240px\)/)
})
