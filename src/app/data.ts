import type { Direction } from '../components/CompassChoice'
import type { Bearing } from '../components/BearingTag'
import type { ReadItem } from './ritual'

export interface InboxItem {
  id: string
  title: string
  source: string
}

export interface Choice {
  direction: Direction
  title: string
  detail: string
}

export interface ScheduleItem {
  time: string
  title: string
  bearing: Bearing
}

export const today = { weekday: 'Fri', date: 22, month: 'Oct', week: 42, year: 2027 }

export const oneThing = 'Ship the planner film, tell 3 people'

export const schedule: ScheduleItem[] = [
  { time: '9:30', title: 'Dentist', bearing: 'health' },
  { time: '12:00', title: 'Lunch with Sam', bearing: 'people' },
  { time: 'due', title: 'Electric bill · $84', bearing: 'home' },
]

export const reads: ReadItem[] = [
  { id: 'read-1', mark: 'done', text: 'draft the brief' },
  { id: 'read-2', mark: 'done', text: 'run 5k', unsure: true },
  { id: 'read-3', mark: 'moved', text: 'call the dentist' },
]

export const topThree: ReadItem[] = [
  { id: 'top-1', mark: 'task', text: 'finish the film color pass' },
  { id: 'top-2', mark: 'task', text: 'case study images' },
  { id: 'top-3', mark: 'task', text: 'call the dentist' },
]

export const inbox: InboxItem[] = [
  { id: 'inbox-1', title: 'Book flights for March', source: 'Said on the move · Wednesday' },
  { id: 'inbox-2', title: 'Renew the library card', source: 'Typed · Thursday' },
  { id: 'inbox-3', title: 'Ideas for the March trip page', source: 'Said on the move · Thursday' },
]

export const choices: Choice[] = [
  { direction: 'N', title: 'Now', detail: "Write it into this week's spread" },
  { direction: 'E', title: 'Later', detail: 'Give it a date. It waits in the app until then.' },
  { direction: 'S', title: 'Share', detail: 'Hand it to someone or a shared list' },
  { direction: 'W', title: 'Drop', detail: 'Let it go on purpose. Logged, not lost.' },
]

export const yesterday = { done: 6, moved: 2 }
