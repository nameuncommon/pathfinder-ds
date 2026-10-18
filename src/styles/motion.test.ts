import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const css = readFileSync('src/styles/motion.css', 'utf-8')
const motionBlock = (() => {
  const start = css.indexOf('@media (prefers-reduced-motion: no-preference)')
  expect(start).toBeGreaterThan(-1)
  let depth = 0
  const open = css.indexOf('{', start)
  for (let i = open; i < css.length; i++) {
    if (css[i] === '{') depth++
    if (css[i] === '}' && --depth === 0) return css.slice(open + 1, i)
  }
  throw new Error('unbalanced')
})()

describe('motion: the signature moments', () => {
  it.each([
    ['screen to screen', '.pf-app__content'],
    ['the next inbox item arriving', '.pf-app__item'],
    ['a compass choice landing', '.pf-compass:active'],
    ['the snap corners locking on', '.pf-viewfinder__corner'],
    ['the tally counting up', '.pf-tally'],
    ['the correction sheet opening', '.pf-sheet'],
    ['the checkbox check', '.pf-checkbox__box svg'],
  ])('%s is animated only when motion is allowed', (_, selector) => {
    expect(motionBlock).toContain(selector)
  })

  it('uses only the motion tokens: no raw durations or easings', () => {
    expect(css).not.toMatch(/\d+ms|cubic-bezier\(/)
    expect(css).toMatch(/var\(--motion-duration-/)
    expect(css).toMatch(/var\(--motion-ease-standard\)/)
  })
})
