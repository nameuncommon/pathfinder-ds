import { Button } from '../../components/Button'
import { GlassCard } from '../../components/GlassCard'
import { ReadRow } from '../../components/ReadRow'
import { Tally } from '../../components/Tally'
import { snippetFor, snippetSize } from '../assets'
import { yesterday } from '../data'
import type { ReadItem } from '../ritual'
import { Screen } from '../Screen'
import type { ScreenActions } from './Open'

export interface CheckProps extends ScreenActions {
  reads: ReadItem[]
  /** Called with the item id and the row that opened the fix, for focus return. */
  onFix: (id: string, opener: HTMLElement) => void
}

export function Check({ focusTitle, onNext, onBack, reads: all, onFix }: CheckProps) {
  const reads = all.filter((r) => r.id.startsWith('read-'))
  const topThree = all.filter((r) => r.id.startsWith('top-'))
  return (
    <Screen
      eyebrow="Morning · 3 of 4"
      title="Check the read"
      step={3}
      onBack={onBack}
      focusTitle={focusTitle}
      action={<Button onClick={onNext}>Looks right</Button>}
    >
      <GlassCard>
        <div className="pf-app__yesterday">
          <span className="pf-app__numeral">{yesterday.done}</span>
          <div>
            <p className="pf-app__strong">done yesterday</p>
            <p className="pf-app__secondary">
              {yesterday.moved} moved forward. Your best Thursday this month.
            </p>
          </div>
        </div>
        <Tally done={yesterday.done} moved={yesterday.moved} />
      </GlassCard>
      <h2 className="pf-app__label">What I read · tap to fix</h2>
      <GlassCard>
        <div className="pf-app__rows">
          {reads.map((r) => (
            <ReadRow
              key={r.id}
              mark={r.mark}
              text={r.text}
              snippetSrc={snippetFor(r)}
              snippetSize={snippetSize(r.id)}
              onFix={(opener) => onFix(r.id, opener)}
            />
          ))}
        </div>
      </GlassCard>
      <h2 className="pf-app__label">Today&apos;s top 3 · from today&apos;s box</h2>
      <GlassCard>
        <div className="pf-app__rows">
          {topThree.map((t) => (
            <ReadRow
              key={t.id}
              mark={t.mark}
              text={t.text}
              snippetSrc={snippetFor(t)}
              snippetSize={snippetSize(t.id)}
              onFix={(opener) => onFix(t.id, opener)}
            />
          ))}
        </div>
      </GlassCard>
    </Screen>
  )
}
