import { describe, expect, it } from 'vitest'
import { snapImage, snippet, snippetFor, snippetOnPaper } from './assets'

describe('assets', () => {
  it.each(['read-1', 'read-2', 'read-3', 'top-1', 'top-2', 'top-3', 'one-thing'])(
    'returns an image url for %s',
    (id) => {
      expect(typeof snippet(id)).toBe('string')
    },
  )

  it('returns undefined for an unknown id', () => {
    expect(snippet('nope')).toBeUndefined()
    expect(snippet('toString')).toBeUndefined()
  })

  it('snippetFor returns the image only while the text is the original', () => {
    expect(typeof snippetFor({ id: 'read-1', mark: 'done', text: 'draft the brief' })).toBe('string')
    expect(snippetFor({ id: 'read-1', mark: 'done', text: 'draft the plan' })).toBeUndefined()
    expect(snippetFor({ id: 'nope', mark: 'done', text: 'x' })).toBeUndefined()
  })

  it('has a snap image', () => {
    expect(typeof snapImage).toBe('string')
  })

  it.each(['read-1', 'read-2', 'read-3', 'top-1', 'top-2', 'top-3'])('has a navy-ink copy of %s for paper', (id) => {
    expect(typeof snippetOnPaper(id)).toBe('string')
    expect(snippetOnPaper(id)).not.toBe(snippet(id))
  })
})
