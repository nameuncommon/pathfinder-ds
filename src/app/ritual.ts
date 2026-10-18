import type { Direction } from '../components/CompassChoice'
import type { MarkType } from '../components/Mark'
import { inbox } from './data'

export interface ReadItem {
  id: string
  mark: MarkType
  text: string
  /** The reader is not confident about this line: flag it and list it first. */
  unsure?: boolean
}

export type Step = 'open' | 'snap' | 'check' | 'sort' | 'done'

export interface RitualState {
  step: Step
  snapped: boolean
  inboxIndex: number
  decisions: Record<string, Direction>
  reads: ReadItem[]
  /** Choices in the order they were made, so undo can step back one at a time. */
  history: Array<{ index: number; itemId: string; revisit?: boolean }>
  /** Sorting one item again from Done: the next choice returns to Done. */
  revisiting: boolean
}

export type Action =
  | { type: 'next' }
  | { type: 'back' }
  | { type: 'skipSnap' }
  | { type: 'fixRead'; id: string; text: string }
  | { type: 'choose'; direction: Direction }
  | { type: 'leaveForSunday' }
  | { type: 'undo' }
  | { type: 'revisit'; itemId: string }

export function initialRitual(reads: ReadItem[]): RitualState {
  return { step: 'open', snapped: false, inboxIndex: 0, decisions: {}, reads, history: [], revisiting: false }
}

export function ritualReducer(state: RitualState, action: Action, inboxSize: number): RitualState {
  switch (action.type) {
    case 'next':
      if (state.step === 'open') return { ...state, step: 'snap' }
      if (state.step === 'snap') return { ...state, step: 'check', snapped: true }
      if (state.step === 'check') return { ...state, step: 'sort' }
      return state
    case 'back':
      if (state.step === 'snap') return { ...state, step: 'open' }
      if (state.step === 'check') return { ...state, step: 'snap' }
      if (state.step === 'sort') {
        if (state.inboxIndex > 0) return { ...state, inboxIndex: state.inboxIndex - 1 }
        return { ...state, step: state.snapped ? 'check' : 'snap' }
      }
      return state
    case 'skipSnap':
      return { ...state, step: 'sort', snapped: false }
    case 'fixRead':
      return {
        ...state,
        reads: state.reads.map((r) => (r.id === action.id ? { ...r, text: action.text } : r)),
      }
    case 'choose': {
      const item = inbox[state.inboxIndex]
      if (!item) return state
      const decisions = { ...state.decisions, [item.id]: action.direction }
      const history = [...state.history, { index: state.inboxIndex, itemId: item.id, revisit: state.revisiting }]
      if (state.revisiting || state.inboxIndex >= inboxSize - 1)
        return { ...state, decisions, history, revisiting: false, step: 'done' }
      return { ...state, decisions, history, inboxIndex: state.inboxIndex + 1 }
    }
    case 'leaveForSunday':
      return { ...state, step: 'done' }
    case 'undo': {
      const last = state.history.at(-1)
      if (!last) return state
      const decisions = { ...state.decisions }
      delete decisions[last.itemId]
      return { ...state, decisions, history: state.history.slice(0, -1), inboxIndex: last.index, step: 'sort', revisiting: last.revisit ?? false }
    }
    case 'revisit': {
      const index = inbox.findIndex((i) => i.id === action.itemId)
      if (index < 0) return state
      const decisions = { ...state.decisions }
      delete decisions[action.itemId]
      return {
        ...state,
        decisions,
        history: state.history.filter((h) => h.itemId !== action.itemId),
        inboxIndex: index,
        step: 'sort',
        revisiting: true,
      }
    }
  }
}
