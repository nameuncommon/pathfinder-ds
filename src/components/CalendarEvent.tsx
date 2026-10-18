import type { CSSProperties } from 'react'
import type { Bearing } from './BearingTag'
import '../styles/utilities.css'
import './CalendarEvent.css'

export interface CalendarEventProps {
  time: string
  title: string
  bearing: Bearing
  kind?: 'event' | 'appointment' | 'bill' | 'reminder'
  /** For bills. */
  amount?: string
}

/** One event in a desktop day column (Figma `calendar / event`). The bearing is a coloured rule plus its word for screen readers. */
export function CalendarEvent({ time, title, bearing, kind = 'event', amount }: CalendarEventProps) {
  const style = { '--pf-bearing': `var(--bearing-${bearing})` } as CSSProperties
  return (
    <div className="pf-calevent" style={style} data-kind={kind}>
      <span className="pf-calevent__bar" aria-hidden="true" />
      <div className="pf-calevent__text">
        <span className="pf-calevent__time">{time}</span>
        <span className="pf-calevent__title">{amount ? `${title} · ${amount}` : title}</span>
        <span className="pf-visually-hidden">, {bearing}</span>
      </div>
    </div>
  )
}
