import { describe, expect, it } from 'vitest'
import { snapImage, snippet } from './assets'

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

  it('has a snap image', () => {
    expect(typeof snapImage).toBe('string')
  })
})
