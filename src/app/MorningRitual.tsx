import { useEffect, useReducer, useState } from 'react'
import { CorrectionSheet } from './CorrectionSheet'
import { snippetOnPaperFor, snippetSize } from './assets'
import { Toast } from '../components/Toast'
import { choices, inbox, reads, topThree } from './data'

import { initialRitual, ritualReducer, type Action, type RitualState } from './ritual'
import { Check } from './screens/Check'
import { Done } from './screens/Done'
import { Open } from './screens/Open'
import { Snap } from './screens/Snap'
import { Sort } from './screens/Sort'
import './app.css'

const seed = [...reads, ...topThree]

type AppAction = Action | { type: 'reset' }

const reducer = (s: RitualState, a: AppAction): RitualState =>
  a.type === 'reset' ? initialRitual(seed) : ritualReducer(s, a, inbox.length)

const motionReduced = () =>
  document.documentElement.dataset.motion === 'reduced' ||
  (typeof window.matchMedia === 'function' && window.matchMedia('(prefers-reduced-motion: reduce)').matches)

export interface MorningRitualProps {
  /** How long the reading pause lasts after the photo; 0 (or reduced motion) skips it. */
  readingMs?: number
}

export function MorningRitual({ readingMs = 700 }: MorningRitualProps) {
  const [state, dispatch] = useReducer(reducer, seed, initialRitual)
  const [fixingId, setFixingId] = useState<string | null>(null)
  // The row that opened the sheet, so focus can return to it on close.
  const [fixOpener, setFixOpener] = useState<HTMLElement | null>(null)
  // Focus the heading only after the user has moved, not on first load.
  const [navigated, setNavigated] = useState(false)
  // One acknowledgement at a time: the latest choice (with Undo) or the latest fix.
  const [toast, setToast] = useState<{ message: string; undo: boolean } | null>(null)
  const [reading, setReading] = useState(false)
  useEffect(() => {
    if (!reading) return
    const t = window.setTimeout(() => setReading(false), readingMs)
    return () => window.clearTimeout(t)
  }, [reading, readingMs])

  function go(a: AppAction) {
    setNavigated(true)
    setToast(null)
    dispatch(a)
  }

  function choose(direction: (typeof choices)[number]['direction']) {
    const item = inbox[state.inboxIndex]
    go({ type: 'choose', direction })
    if (item) setToast({ message: `${item.title} · ${choices.find((c) => c.direction === direction)?.title}`, undo: true })
  }

  const notice = toast ? (
    <Toast message={toast.message} action={toast.undo ? { label: 'Undo', onClick: () => go({ type: 'undo' }) } : undefined} />
  ) : undefined

  const fixing = fixingId ? state.reads.find((r) => r.id === fixingId) : undefined

  const common = {
    focusTitle: navigated,
    onNext: () => {
      if (state.step === 'snap' && readingMs > 0 && !motionReduced()) setReading(true)
      go({ type: 'next' })
    },
    onBack: () => {
      setReading(false)
      go({ type: 'back' })
    },
    onSkip: () => go({ type: 'skipSnap' }),
    notice,
  }

  return (
    <>
      {state.step === 'open' && <Open {...common} />}
      {state.step === 'snap' && <Snap {...common} />}
      {state.step === 'check' && (
        <Check
          {...common}
          reads={state.reads}
          reading={reading}
          onFix={(id, opener) => {
            setFixOpener(opener)
            setFixingId(id)
          }}
        />
      )}
      {state.step === 'sort' && (
        <Sort
          {...common}
          index={state.inboxIndex}
          onChoose={choose}
          onLeave={() => go({ type: 'leaveForSunday' })}
        />
      )}
      {state.step === 'done' && (
        <Done
          focusTitle={navigated}
          decisions={state.decisions}
          onRestart={() => go({ type: 'reset' })}
          onRevisit={(itemId) => go({ type: 'revisit', itemId })}
          notice={notice}
        />
      )}
      {fixing && (
        <CorrectionSheet
          text={fixing.text}
          snippetSrc={snippetOnPaperFor(fixing)}
          snippetSize={snippetSize(fixing.id)}
          returnFocusTo={fixOpener}
          onCancel={() => setFixingId(null)}
          onSave={(text) => {
            dispatch({ type: 'fixRead', id: fixing.id, text })
            setFixingId(null)
            setToast({ message: `Fixed: ${text}`, undo: false })
          }}
        />
      )}
    </>
  )
}
