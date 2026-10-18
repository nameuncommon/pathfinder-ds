import { Button } from '../../components/Button'
import { EmptyState } from '../../components/EmptyState'
import { GlassCard } from '../../components/GlassCard'
import { ReadRow } from '../../components/ReadRow'
import { Tally } from '../../components/Tally'
import { snippetFor, snippetSize } from '../assets'
import { yesterday } from '../data'

const words = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten']
const say = (n: number) => words[n] ?? String(n)
const capital = (s: string) => s[0].toUpperCase() + s.slice(1)
import type { ReadItem } from '../ritual'
import { Screen } from '../Screen'
import type { ScreenActions } from './Open'

export interface CheckProps extends ScreenActions {
  reads: ReadItem[]
  /** Called with the item id and the row that opened the fix, for focus return. */
  onFix: (id: string, opener: HTMLElement) => void
  /** The photo is still being read: a status and placeholder rows, no action yet. */
  reading?: boolean
}

// Lines it is not sure about come first, so they get looked at.
const unsureFirst = (items: ReadItem[]) => [...items.filter((r) => r.unsure), ...items.filter((r) => !r.unsure)]

export function Check({ focusTitle, onNext, onBack, reads: all, onFix, notice, reading = false }: CheckProps) {
  const reads = unsureFirst(all.filter((r) => r.id.startsWith('read-')))
  const topThree = unsureFirst(all.filter((r) => r.id.startsWith('top-')))
  if (reading) {
    return (
      <Screen
        eyebrow="Morning · 3 of 4"
        title="Check what it read"
        titleSize="step"
        step={3}
        onBack={onBack}
        focusTitle={focusTitle}
      >
        <p className="pf-app__secondary" role="status">Reading your spread…</p>
        <GlassCard>
          <div className="pf-app__rows" aria-hidden="true">
            {[72, 48, 60].map((w) => (
              <span key={w} className="pf-app__placeholder" style={{ width: `${w}%` }} />
            ))}
          </div>
        </GlassCard>
      </Screen>
    )
  }
  if (all.length === 0) {
    return (
      <Screen
        eyebrow="Morning · 3 of 4"
        title="Check what it read"
        titleSize="step"
        step={3}
        onBack={onBack}
        focusTitle={focusTitle}
        action={<Button onClick={onNext}>Continue</Button>}
      >
        <EmptyState title="Nothing new" line="This spread reads the same as your last snap, so there is nothing to check." />
      </Screen>
    )
  }
  return (
    <Screen
      eyebrow="Morning · 3 of 4"
      title="Check what it read"
      titleSize="step"
      step={3}
      onBack={onBack}
      focusTitle={focusTitle}
      notice={notice}
      action={<Button onClick={onNext}>Looks right</Button>}
    >
      <GlassCard>
        <p className="pf-app__strong pf-app__yesterday">
          {`${capital(say(yesterday.done))} done yesterday, ${say(yesterday.moved)} moved forward.`}
        </p>
        <Tally done={yesterday.done} moved={yesterday.moved} />
      </GlassCard>
      <h2 className="pf-app__label">What it read from yesterday · tap a line to fix</h2>
      <GlassCard>
        <div className="pf-app__rows">
          {reads.map((r) => (
            <ReadRow
              key={r.id}
              mark={r.mark}
              text={r.text}
              snippetSrc={snippetFor(r)}
              snippetSize={snippetSize(r.id)}
              unsure={r.unsure}
              onFix={(opener) => onFix(r.id, opener)}
            />
          ))}
        </div>
      </GlassCard>
      <h2 className="pf-app__label">Today’s top 3, as you wrote them</h2>
      <GlassCard>
        <div className="pf-app__rows">
          {topThree.map((t) => (
            <ReadRow
              key={t.id}
              mark={t.mark}
              text={t.text}
              snippetSrc={snippetFor(t)}
              snippetSize={snippetSize(t.id)}
              unsure={t.unsure}
              onFix={(opener) => onFix(t.id, opener)}
            />
          ))}
        </div>
      </GlassCard>
    </Screen>
  )
}
