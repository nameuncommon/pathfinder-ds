import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { GlassPanel } from './GlassPanel'

describe('GlassPanel', () => {
  it('is a section named by its title', () => {
    render(<GlassPanel title="Week so far"><p>14 done since Monday</p></GlassPanel>)
    expect(screen.getByRole('region', { name: 'Week so far' })).toBeTruthy()
  })

  it('without a title it is a plain glass block', () => {
    const { container } = render(<GlassPanel><p>x</p></GlassPanel>)
    expect(screen.queryByRole('region')).toBeNull()
    expect(container.firstElementChild!.className).toContain('pf-glass')
  })
})
