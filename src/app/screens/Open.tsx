import { Button } from '../../components/Button'
import { ScheduleRow } from '../../components/ScheduleRow'
import { snippet, snippetSize } from '../assets'
import { inbox, oneThing, schedule, today } from '../data'
import { Screen } from '../Screen'

export interface ScreenActions {
  focusTitle: boolean
  onNext: () => void
  onBack: () => void
  onSkip: () => void
}

export function Open({ focusTitle, onNext, onSkip }: ScreenActions) {
  return (
    <Screen
      eyebrow={`${today.weekday} ${today.date} ${today.month} · week ${today.week}`}
      title="Good morning, Jake"
      focusTitle={focusTitle}
      action={
        <Button variant="quiet" onClick={onSkip}>
          {`Inbox · ${inbox.length} to sort`}
        </Button>
      }
    >
      <h2 className="pf-app__label">The one thing this week</h2>
      <div className="pf-paper pf-app__paper">
        {snippet('one-thing') ? (
          <img
            className="pf-app__paper-hand"
            src={snippet('one-thing')}
            alt={oneThing}
            width={snippetSize('one-thing')?.width}
            height={snippetSize('one-thing')?.height}
          />
        ) : (
          oneThing
        )}
      </div>
      <Button onClick={onNext}>Snap this week&apos;s spread</Button>
      <h2 className="pf-app__label">Today</h2>
      <div>
        {schedule.map((s) => (
          <ScheduleRow key={s.title} time={s.time} title={s.title} bearing={s.bearing} />
        ))}
      </div>
    </Screen>
  )
}
