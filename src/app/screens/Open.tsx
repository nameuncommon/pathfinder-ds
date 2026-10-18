import type { ReactNode } from 'react'
import { Button } from '../../components/Button'
import { ScheduleRow } from '../../components/ScheduleRow'
import { Toast } from '../../components/Toast'
import { snippet, snippetSize } from '../assets'
import { inbox, oneThing, schedule, today } from '../data'
import { Screen } from '../Screen'

export interface ScreenActions {
  focusTitle: boolean
  /** A status above the action bar, such as the undo or fixed toast. */
  notice?: ReactNode
  onNext: () => void
  onBack: () => void
  onSkip: () => void
}

export interface OpenProps extends ScreenActions {
  /** The snap was skipped today: show what the app already knows, never a nag. */
  snapSkipped?: boolean
  lastSync?: string
  offline?: boolean
}

export function Open({ focusTitle, onNext, onSkip, snapSkipped = false, lastSync, offline = false }: OpenProps) {
  return (
    <Screen
      eyebrow={`${today.weekday} ${today.date} ${today.month} · week ${today.week}`}
      dateEyebrow
      title="Good morning, Jake"
      focusTitle={focusTitle}
      notice={offline ? <Toast message="Saved on this phone. It will sync when you are back online." /> : undefined}
      escape={
        <Button variant="ghost" onClick={onSkip}>
          {`Inbox · ${inbox.length} to sort`}
        </Button>
      }
      action={
        snapSkipped ? (
          <Button variant="quiet" onClick={onNext}>
            Snap the spread
          </Button>
        ) : (
          <Button onClick={onNext}>Snap this week&apos;s spread</Button>
        )
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
      {snapSkipped && lastSync && <p className="pf-app__secondary pf-app__muted">{`Last synced ${lastSync}`}</p>}
      <h2 className="pf-app__label">Today</h2>
      <div>
        {schedule.map((s) => (
          <ScheduleRow key={s.title} time={s.time} title={s.title} bearing={s.bearing} />
        ))}
      </div>
    </Screen>
  )
}
