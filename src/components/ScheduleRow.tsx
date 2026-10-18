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
      {/* A clock time is data and stays mono; a word such as "due" is set in sans. */}
      <span className={/^\d/.test(time) ? 'pf-schedule-row__time' : 'pf-schedule-row__time pf-schedule-row__time--word'}>{time}</span>
      <span className="pf-schedule-row__title">{title}</span>
      <BearingTag bearing={bearing} />
    </div>
  )
}
