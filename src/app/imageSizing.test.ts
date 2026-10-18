import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { snapSize, snippetSize } from './assets'

describe('2x images are sized explicitly at half their pixel size', () => {
  it('knows each snippet at half size', () => {
    expect(snippetSize('read-1')).toEqual({ width: 122, height: 19 })
    expect(snippetSize('one-thing')).toEqual({ width: 274, height: 23 })
    expect(snippetSize('nope')).toBeUndefined()
  })

  it('knows the snap image at half size', () => {
    expect(snapSize).toEqual({ width: 262, height: 349 })
  })

  it('no stylesheet sizes images with zoom', () => {
    for (const f of ['src/app/app.css', 'src/components/ReadRow.css']) {
      expect(readFileSync(f, 'utf-8')).not.toMatch(/zoom\s*:/)
    }
  })

  it('the screen title focus ring is a light 1px outline', () => {
    const css = readFileSync('src/app/app.css', 'utf-8')
    const rule = css.match(/\.pf-app__title:focus-visible\s*\{([^}]*)\}/)![1]
    expect(rule).toMatch(/outline:\s*1px solid var\(--focus-ring\)/)
  })

  it('no CSS width rule overrides the snap image width attribute', () => {
    const css = readFileSync('src/components/Viewfinder.css', 'utf-8')
    const imgRule = css.match(/img\.pf-viewfinder__page\s*\{([^}]*)\}/)![1]
    expect(imgRule).not.toMatch(/(^|\s)width:/)
    const shared = css.match(/(^|\n)\.pf-viewfinder__page\s*\{([^}]*)\}/)
    expect(shared?.[2] ?? '').not.toMatch(/(^|\s)width:/)
  })

  it('the viewfinder frames the page like Figma: 460px tall, pill below the page', () => {
    const css = readFileSync('src/components/Viewfinder.css', 'utf-8')
    expect(css).toMatch(/\.pf-viewfinder\s*\{[^}]*min-height:\s*460px/)
  })

  it('dots are 2px, as in the Figma dot grid', () => {
    for (const f of ['src/components/DotGrid.css', 'src/styles/surfaces.css']) {
      expect(readFileSync(f, 'utf-8')).toMatch(/radial-gradient\(\s*circle at 1px 1px/)
    }
  })
})
