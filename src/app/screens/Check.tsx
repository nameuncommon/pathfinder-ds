import { Button } from '../../components/Button'
import { GlassCard } from '../../components/GlassCard'
import { ReadRow } from '../../components/ReadRow'
import { Tally } from '../../components/Tally'
import { snippet } from '../assets'
import { topThree, yesterday } from '../data'
import type { ReadItem } from '../ritual'
import { Screen } from '../Screen'
import type { ScreenActions } from './Open'

export interface CheckProps extends ScreenActions {
  reads: ReadItem[]
  topEdits: Record<string, string>
  onFix: (id: string) => void
}

export function Check({ focusTitle, onNext, onBack, reads, topEdits, onFix }: CheckProps) {
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
              snippetSrc={snippet(r.id)}
              onFix={() => onFix(r.id)}
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
              text={topEdits[t.id] ?? t.text}
              snippetSrc={snippet(t.id)}
              onFix={() => onFix(t.id)}
            />
          ))}
        </div>
      </GlassCard>
    </Screen>
  )
}
