import { useReducer, useState } from 'react'
import { CorrectionSheet } from './CorrectionSheet'
import { snippet } from './assets'
import { inbox, reads, topThree } from './data'
import { initialRitual, ritualReducer, type Action, type ReadItem, type RitualState } from './ritual'
import { Check } from './screens/Check'
import { Done } from './screens/Done'
import { Open } from './screens/Open'
import { Snap } from './screens/Snap'
import { Sort } from './screens/Sort'
import './app.css'

type AppAction = Action | { type: 'reset' }

const reducer = (s: RitualState, a: AppAction): RitualState =>
  a.type === 'reset' ? initialRitual(reads) : ritualReducer(s, a, inbox.length)

export function MorningRitual() {
  const [state, dispatch] = useReducer(reducer, reads, initialRitual)
  const [fixingId, setFixingId] = useState<string | null>(null)
  const [topEdits, setTopEdits] = useState<Record<string, string>>({})
  // Focus the heading only after the user has moved, not on first load.
  const [navigated, setNavigated] = useState(false)

  function go(a: AppAction) {
    setNavigated(true)
    dispatch(a)
  }

  const fixing: ReadItem | undefined = fixingId
    ? (state.reads.find((r) => r.id === fixingId) ??
      topThree
        .filter((t) => t.id === fixingId)
        .map((t) => ({ ...t, text: topEdits[t.id] ?? t.text }))[0])
    : undefined

  const common = {
    focusTitle: navigated,
    onNext: () => go({ type: 'next' }),
    onBack: () => go({ type: 'back' }),
    onSkip: () => go({ type: 'skipSnap' }),
  }

  return (
    <>
      {state.step === 'open' && <Open {...common} />}
      {state.step === 'snap' && <Snap {...common} />}
      {state.step === 'check' && (
        <Check {...common} reads={state.reads} topEdits={topEdits} onFix={setFixingId} />
      )}
      {state.step === 'sort' && (
        <Sort
          {...common}
          index={state.inboxIndex}
          onChoose={(direction) => go({ type: 'choose', direction })}
          onLeave={() => go({ type: 'leaveForSunday' })}
        />
      )}
      {state.step === 'done' && (
        <Done
          focusTitle={navigated}
          decisions={state.decisions}
          onRestart={() => go({ type: 'reset' })}
        />
      )}
      {fixing && (
        <CorrectionSheet
          text={fixing.text}
          snippetSrc={snippet(fixing.id)}
          onCancel={() => setFixingId(null)}
          onSave={(text) => {
            dispatch({ type: 'fixRead', id: fixing.id, text })
            setTopEdits((e) => ({ ...e, [fixing.id]: text }))
            setFixingId(null)
          }}
        />
      )}
    </>
  )
}
