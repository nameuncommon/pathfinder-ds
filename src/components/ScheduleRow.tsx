import { BearingTag, type Bearing } from './BearingTag'
import './ScheduleRow.css'

export interface ScheduleRowProps {
  time: string
  title: string
  bearing: Bearing
}

export function ScheduleRow({ time, title, bearing }: ScheduleRowProps) {
  return (
    <div className="pf-schedule-row">
      <span className="pf-schedule-row__time">{time}</span>
      <span className="pf-schedule-row__title">{title}</span>
      <BearingTag bearing={bearing} />
    </div>
  )
}
