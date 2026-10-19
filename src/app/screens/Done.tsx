import { useId, type ReactNode } from 'react'
import { Button } from '../../components/Button'
import { snippet, snippetSize } from '../assets'
import { choices, inbox, oneThing } from '../data'
import type { RitualState } from '../ritual'
import { Screen } from '../Screen'

export interface DoneProps {
  focusTitle: boolean
  decisions: RitualState['decisions']
  onRestart: () => void
  /** Sort one decided item again. */
  onRevisit: (itemId: string) => void
  notice?: ReactNode
}

export function Done({ focusTitle, decisions, onRestart, onRevisit, notice }: DoneProps) {
  const groupId = useId()
  const decided = inbox.filter((i) => decisions[i.id])
  const all = decided.length === inbox.length
  const groups = choices
    .map((c) => ({ ...c, items: decided.filter((i) => decisions[i.id] === c.direction) }))
    .filter((g) => g.items.length > 0)
  return (
    <Screen
      eyebrow="Morning · done"
      title={all ? 'All sorted' : `Sorted ${decided.length} of ${inbox.length}`}
      support={all ? 'See you tomorrow morning.' : `${inbox.length - decided.length} left for Sunday.`}
      focusTitle={focusTitle}
      settle
      notice={notice}
      action={<Button onClick={onRestart}>Back to today</Button>}
    >
      <h2 className="pf-app__label">Still the one thing this week</h2>
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
      {groups.map((g) => (
        <section key={g.direction} className="pf-done__group" aria-labelledby={`${groupId}-${g.direction}`}>
          <h2 id={`${groupId}-${g.direction}`} className="pf-app__label pf-done__heading">
            <span className="pf-done__dir">{g.direction}</span> {g.title}
          </h2>
          <div className="pf-done__rows">
            {g.items.map((i) => (
              <button key={i.id} type="button" className="pf-done__row" aria-label={`Change ${i.title}`} onClick={() => onRevisit(i.id)}>
                <span className="pf-done__title">{i.title}</span>
                <span className="pf-done__change" aria-hidden="true">Change</span>
              </button>
            ))}
          </div>
        </section>
      ))}
    </Screen>
  )
}
