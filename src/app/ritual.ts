import type { Direction } from '../components/CompassChoice'
import type { MarkType } from '../components/Mark'
import { inbox } from './data'

export interface ReadItem {
  id: string
  mark: MarkType
  text: string
}

export type Step = 'open' | 'snap' | 'check' | 'sort' | 'done'

export interface RitualState {
  step: Step
  snapped: boolean
  inboxIndex: number
  decisions: Record<string, Direction>
  reads: ReadItem[]
}

export type Action =
  | { type: 'next' }
  | { type: 'back' }
  | { type: 'skipSnap' }
  | { type: 'fixRead'; id: string; text: string }
  | { type: 'choose'; direction: Direction }
  | { type: 'leaveForSunday' }

export function initialRitual(reads: ReadItem[]): RitualState {
  return { step: 'open', snapped: false, inboxIndex: 0, decisions: {}, reads }
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
      const decisions = item ? { ...state.decisions, [item.id]: action.direction } : state.decisions
      if (state.inboxIndex >= inboxSize - 1) return { ...state, decisions, step: 'done' }
      return { ...state, decisions, inboxIndex: state.inboxIndex + 1 }
    }
    case 'leaveForSunday':
      return { ...state, step: 'done' }
  }
}
