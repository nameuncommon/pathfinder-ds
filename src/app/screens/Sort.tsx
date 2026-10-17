import { Button } from '../../components/Button'
import { CompassChoice, type Direction } from '../../components/CompassChoice'
import { GlassCard } from '../../components/GlassCard'
import { choices, inbox } from '../data'
import { Screen } from '../Screen'
import type { ScreenActions } from './Open'

export interface SortProps extends ScreenActions {
  index: number
  onChoose: (d: Direction) => void
  onLeave: () => void
}

function Rose() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true" className="pf-app__rose">
      <circle cx="20" cy="20" r="17" stroke="currentColor" strokeWidth="1.5" />
      <path d="M20 5l3 12-3 3-3-3z" fill="currentColor" />
      <path d="M20 35l-3-12 3-3 3 3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M5 20l12-3 3 3-3 3zM35 20l-12 3-3-3 3-3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  )
}

export function Sort({ focusTitle, onBack, index, onChoose, onLeave }: SortProps) {
  const item = inbox[index] ?? inbox[0]
  return (
    <Screen
      eyebrow="Morning · 4 of 4"
      title="Sort the inbox"
      support={`${index + 1} of ${inbox.length}`}
      step={4}
      onBack={onBack}
      focusTitle={focusTitle}
      action={
        <Button variant="ghost" onClick={onLeave}>
          Leave the rest for Sunday
        </Button>
      }
    >
      <GlassCard>
        <p className="pf-app__item-title">{item.title}</p>
        <p className="pf-app__secondary">{item.source}</p>
      </GlassCard>
      <div className="pf-app__question">
        <Rose />
        <div>
          <p className="pf-app__strong">Which way does it go?</p>
          <p className="pf-app__secondary">Pick a direction. You can change it later.</p>
        </div>
      </div>
      <div role="group" aria-label="Which way does it go?" className="pf-app__choices">
        {choices.map((c) => (
          <CompassChoice
            key={c.direction}
            direction={c.direction}
            title={c.title}
            detail={c.detail}
            onSelect={() => onChoose(c.direction)}
          />
        ))}
      </div>
    </Screen>
  )
}
