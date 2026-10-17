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
  return (
    <Screen
      eyebrow="Morning · done"
      title="All sorted"
      support="See you tomorrow morning."
      focusTitle={focusTitle}
      action={
        <Button variant="quiet" onClick={onRestart}>
          Start again
        </Button>
      }
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
