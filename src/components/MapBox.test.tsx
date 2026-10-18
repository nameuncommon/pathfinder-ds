import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { MapBox } from './MapBox'

describe('MapBox', () => {
  it('shows a title and a description', () => {
    render(<MapBox title="Destination 2" description="Launch the portfolio" />)
    expect(screen.getByText('Destination 2')).toBeTruthy()
    expect(screen.getByText('Launch the portfolio')).toBeTruthy()
  })
})
