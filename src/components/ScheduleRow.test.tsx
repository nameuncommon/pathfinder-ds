import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { ScheduleRow } from './ScheduleRow'

describe('ScheduleRow', () => {
  it('shows time, title and bearing', () => {
    render(<ScheduleRow time="9:30" title="Dentist" bearing="health" />)
    expect(screen.getByText('9:30')).toBeTruthy()
    expect(screen.getByText('Dentist')).toBeTruthy()
    expect(screen.getByText('health')).toBeTruthy()
  })

  it('keeps a long title whole', () => {
    const title = 'Walk through the whole quarterly planning document with the team '.repeat(3).trim()
    render(<ScheduleRow time="14:00" title={title} bearing="work" />)
    expect(screen.getByText(title)).toBeTruthy()
  })
})
