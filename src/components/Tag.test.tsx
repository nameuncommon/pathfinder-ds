import { readFileSync } from 'node:fs'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Tag } from './Tag'

describe('Tag', () => {
  it('shows its label', () => {
    render(<Tag>said on the move</Tag>)
    expect(screen.getByText('said on the move')).toBeTruthy()
  })

  it('is neutral glass only: no status colours, no colour prop', () => {
    const css = readFileSync('src/components/Tag.css', 'utf-8')
    expect(css).not.toMatch(/danger|success|warning|color-mix/)
    expect(css).toMatch(/var\(--surface-glass-strong\)/)
  })
})
