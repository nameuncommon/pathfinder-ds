import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { CalendarEvent } from './CalendarEvent'

describe('CalendarEvent', () => {
  it('shows the time and title and names the bearing in text, never colour alone', () => {
    const { container } = render(<CalendarEvent time="9:30" title="Dentist" bearing="health" />)
    expect(screen.getByText('9:30')).toBeTruthy()
    expect(screen.getByText('Dentist')).toBeTruthy()
    expect(container.textContent).toContain('health')
  })

  it('shows a bill amount', () => {
    render(<CalendarEvent time="due" title="Rent" bearing="home" kind="bill" amount="$1,450" />)
    expect(screen.getByText(/\$1,450/)).toBeTruthy()
  })

})
