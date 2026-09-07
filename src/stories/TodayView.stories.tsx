import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { TaskRow } from '../components/TaskRow'
import { Toast } from '../components/Toast'
import { Button } from '../components/Button'
import type { TagColor } from '../components/Tag'
import type { DateChipState } from '../components/DateChip'

interface TodayTask {
  id: string
  title: string
  tag: string
  tagColor: TagColor
  date: string
  dateState: DateChipState
  overdue?: boolean
}

// Deliberately not a fourth Card component (see decisions.md) - the card
// recipe here is the same shell every other raised surface in the system
// uses: surface/raised fill, border/subtle hairline, radius/lg corners.
const cardStyle = {
  background: 'var(--surface-raised)',
  border: '1px solid var(--border-subtle)',
  borderRadius: 'var(--radius-lg)',
  padding: 'var(--space-5)',
  display: 'grid',
  gap: 'var(--space-1)',
}

const tasks: TodayTask[] = [
  {
    id: 'design-onboarding',
    title: 'design the onboarding flow',
    tag: 'design',
    tagColor: 'accent',
    date: 'today',
    dateState: 'today',
  },
  {
    id: 'sync-endpoint',
    title: 'wire up the sync endpoint',
    tag: 'backend',
    tagColor: 'neutral',
    date: 'tomorrow',
    dateState: 'scheduled',
  },
  {
    id: 'api-docs',
    title: 'write the api docs',
    tag: 'docs',
    tagColor: 'neutral',
    date: 'fri',
    dateState: 'scheduled',
  },
  {
    id: 'flaky-checkout',
    title: 'fix the flaky checkout test',
    tag: 'backend',
    tagColor: 'neutral',
    date: 'sep 4',
    dateState: 'scheduled',
    overdue: true,
  },
  {
    id: 'reviewed-pr',
    title: 'review the design system pr',
    tag: 'design',
    tagColor: 'accent',
    date: 'sep 3',
    dateState: 'scheduled',
  },
  {
    id: 'shipped-changelog',
    title: 'ship the changelog notes',
    tag: 'docs',
    tagColor: 'neutral',
    date: 'sep 2',
    dateState: 'scheduled',
  },
]

// last two rows start completed so the "completed sinks to the bottom"
// grouping is visible without any interaction.
const initialCompleted = tasks.map((_, index) => index >= tasks.length - 2)

let newTaskCounter = 0

function TodayViewDemo() {
  const [taskList, setTaskList] = useState<TodayTask[]>(tasks)
  const [completed, setCompleted] = useState<boolean[]>(initialCompleted)
  // index of the task the "task moved to done" toast is currently offering
  // to undo, or null when nothing was just completed - the toast is a real
  // reaction to an action, not permanently on screen.
  const [undoIndex, setUndoIndex] = useState<number | null>(null)

  const toggle = (index: number) => {
    setCompleted((prev) => {
      const wasCompleted = prev[index]
      const next = prev.map((value, i) => (i === index ? !value : value))
      if (!wasCompleted && next[index]) {
        // just completed - offer undo
        setUndoIndex(index)
      } else if (wasCompleted && !next[index]) {
        // manually unchecked - clear a stale undo offer for this same row
        setUndoIndex((current) => (current === index ? null : current))
      }
      return next
    })
  }

  const undoComplete = () => {
    if (undoIndex === null) return
    setCompleted((prev) => prev.map((value, i) => (i === undoIndex ? false : value)))
    setUndoIndex(null)
  }

  const addTask = () => {
    newTaskCounter += 1
    setTaskList((prev) => [
      ...prev,
      {
        id: `untitled-task-${newTaskCounter}`,
        title: 'untitled task',
        tag: 'design',
        tagColor: 'accent',
        date: 'today',
        dateState: 'today',
      },
    ])
    setCompleted((prev) => [...prev, false])
  }

  return (
    <div
      style={{
        maxWidth: 760,
        fontFamily: 'var(--font-sans)',
        // P0 fix: this root has to paint its own surface + text color so the
        // scene is self-contained in the docs page too, where the
        // surrounding chrome is Storybook's own (theme-invariant) white,
        // not this system's `data-theme` canvas.
        background: 'var(--surface-base)',
        color: 'var(--text-primary)',
        padding: 'var(--space-6)',
        borderRadius: 'var(--radius-lg)',
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-3)',
          marginBottom: 'var(--space-5)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--space-3)' }}>
          <h1
            style={{
              margin: 0,
              fontFamily: 'var(--font-sans)',
              fontWeight: 600,
              fontSize: 'var(--type-24-size)',
              lineHeight: 'var(--type-24-line)',
              color: 'var(--text-primary)',
            }}
          >
            today
          </h1>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--type-14-size)',
              lineHeight: 'var(--type-14-line)',
              color: 'var(--text-muted)',
            }}
          >
            sun, sep 6
          </span>
        </div>
        <Button variant="primary" size="sm" onClick={addTask} style={{ marginLeft: 'auto' }}>
          new task
        </Button>
      </div>

      <div style={cardStyle}>
        {taskList.map((task, index) => (
          <TaskRow
            key={task.id}
            title={task.title}
            tag={task.tag}
            tagColor={task.tagColor}
            date={task.date}
            dateState={task.dateState}
            overdue={task.overdue}
            completed={completed[index]}
            onToggle={() => toggle(index)}
          />
        ))}
      </div>

      {undoIndex !== null ? (
        <div style={{ marginTop: 'var(--space-6)' }}>
          <Toast
            status="success"
            message="task moved to done"
            action={{ label: 'undo', onClick: undoComplete }}
          />
        </div>
      ) : null}
    </div>
  )
}

const meta = {
  title: 'Composed/Today View',
  component: TodayViewDemo,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'a composed scene proving assembly, not a ninth component - `today` heading, a primary "new task" affordance, six real `TaskRow`s in a locally styled card shell, and a `Toast`. checkboxes are wired to real state, so toggling one actually moves it: completing a row surfaces the toast with an undo action that reverses it, and "new task" appends a real row ("untitled task", tag design, date today) to the list.',
      },
    },
  },
} satisfies Meta<typeof TodayViewDemo>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <TodayViewDemo />,
}
