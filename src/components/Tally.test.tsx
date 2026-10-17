import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Tally } from './Tally'

describe('Tally', () => {
  it('names the whole row', () => {
    render(<Tally done={6} moved={2} />)
    expect(screen.getByLabelText('6 done, 2 moved')).toBeTruthy()
  })

  it('draws one decorative mark per item', () => {
    const { container } = render(<Tally done={3} moved={1} />)
    expect(container.querySelectorAll('svg[aria-hidden="true"]')).toHaveLength(4)
  })
})
