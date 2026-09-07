import { Checkbox } from './Checkbox'
import { Tag, type TagColor } from './Tag'
import { DateChip, type DateChipState } from './DateChip'
import './TaskRow.css'

export interface TaskRowProps {
  title: string
  tag?: string
  tagColor?: TagColor
  date?: string
  dateState?: DateChipState
  completed?: boolean
  overdue?: boolean
  dragging?: boolean
  onToggle?: (completed: boolean) => void
  className?: string
}

export function TaskRow({
  title,
  tag,
  tagColor = 'neutral',
  date,
  dateState = 'scheduled',
  completed = false,
  overdue = false,
  dragging = false,
  onToggle,
  className,
}: TaskRowProps) {
  // overdue is the row-level source of truth for the date chip's state;
  // an explicit dateState only matters when the row isn't overdue.
  const resolvedDateState: DateChipState = overdue ? 'overdue' : dateState

  const classes = ['pf-task-row']
  if (completed) classes.push('is-completed')
  if (dragging) classes.push('is-dragging')
  if (className) classes.push(className)

  return (
    <div className={classes.join(' ')}>
      <Checkbox
        checked={completed}
        onChange={onToggle ?? (() => {})}
        ariaLabel={`mark "${title}" ${completed ? 'not done' : 'done'}`}
      />
      <span className="pf-task-row__title">{title}</span>
      <div className="pf-task-row__spacer" />
      {tag ? <Tag color={tagColor}>{tag}</Tag> : null}
      {date ? <DateChip state={resolvedDateState}>{date}</DateChip> : null}
      <span className="pf-task-row__drag" aria-hidden="true">
        <svg viewBox="0 0 10 16" fill="none" width="10" height="16">
          <circle cx="2" cy="2" r="1.25" fill="currentColor" />
          <circle cx="8" cy="2" r="1.25" fill="currentColor" />
          <circle cx="2" cy="8" r="1.25" fill="currentColor" />
          <circle cx="8" cy="8" r="1.25" fill="currentColor" />
          <circle cx="2" cy="14" r="1.25" fill="currentColor" />
          <circle cx="8" cy="14" r="1.25" fill="currentColor" />
        </svg>
      </span>
    </div>
  )
}
