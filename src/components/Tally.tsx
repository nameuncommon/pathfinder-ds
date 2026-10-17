import { Mark } from './Mark'
import './Tally.css'

export interface TallyProps {
  done: number
  moved: number
}

export function Tally({ done, moved }: TallyProps) {
  const items = [
    ...Array.from({ length: done }, (_, i) => ({ key: `d${i}`, type: 'done' as const })),
    ...Array.from({ length: moved }, (_, i) => ({ key: `m${i}`, type: 'moved' as const })),
  ]
  return (
    <div className="pf-tally" role="img" aria-label={`${done} done, ${moved} moved`}>
      {items.map(({ key, type }) => (
        <Mark key={key} type={type} size={20} decorative />
      ))}
    </div>
  )
}
