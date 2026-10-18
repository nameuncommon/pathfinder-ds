import { Button } from '../../components/Button'
import { choices, inbox } from '../data'
import type { RitualState } from '../ritual'
import { Screen } from '../Screen'

export interface DoneProps {
  focusTitle: boolean
  decisions: RitualState['decisions']
  onRestart: () => void
}

export function Done({ focusTitle, decisions, onRestart }: DoneProps) {
  const decided = inbox.filter((i) => decisions[i.id])
  const all = decided.length === inbox.length
  return (
    <Screen
      eyebrow="Morning · done"
      title={all ? 'All sorted' : `Sorted ${decided.length} of ${inbox.length}`}
      support={
        all ? 'See you tomorrow morning.' : `${inbox.length - decided.length} left for Sunday.`
      }
      focusTitle={focusTitle}
      action={<Button onClick={onRestart}>Back to today</Button>}
    >
      {decided.length > 0 && (
        <ul className="pf-app__summary">
          {decided.map((i) => (
            <li key={i.id}>
              {i.title}: {choices.find((c) => c.direction === decisions[i.id])?.title}
            </li>
          ))}
        </ul>
      )}
    </Screen>
  )
}
