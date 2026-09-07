import { useMemo, useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Input } from '../components/Input'
import { TaskRow } from '../components/TaskRow'
import { Tag } from '../components/Tag'
import { EmptyState } from '../components/EmptyState'
import type { TagColor } from '../components/Tag'
import type { DateChipState } from '../components/DateChip'

interface Task {
  id: string
  title: string
  tag: string
  tagColor: TagColor
  date: string
  dateState: DateChipState
  overdue?: boolean
}

// Same raised-surface recipe as the Today View card. Repeated rather than
// abstracted into a Card component on purpose - see decisions.md.
const cardStyle = {
  background: 'var(--surface-raised)',
  border: '1px solid var(--border-subtle)',
  borderRadius: 'var(--radius-lg)',
  padding: 'var(--space-5)',
  display: 'grid',
  gap: 'var(--space-1)',
}

const shellStyle = {
  display: 'grid',
  gap: 'var(--space-5)',
  width: 640,
  maxWidth: '100%',
  fontFamily: 'var(--font-sans)',
}

const headerStyle = {
  display: 'flex',
  alignItems: 'baseline',
  gap: 'var(--space-3)',
}

const titleStyle = {
  margin: 0,
  fontSize: 'var(--type-24-size)',
  lineHeight: 'var(--type-24-line)',
  fontWeight: 600,
  color: 'var(--text-primary)',
}

const countStyle = {
  fontFamily: 'var(--font-mono)',
  fontSize: 'var(--type-13-size)',
  lineHeight: 'var(--type-13-line)',
  color: 'var(--text-muted)',
}

const filterRowStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: 'var(--space-2)',
  flexWrap: 'wrap' as const,
}

const filterLabelStyle = {
  fontFamily: 'var(--font-mono)',
  fontSize: 'var(--type-12-size)',
  lineHeight: 'var(--type-12-line)',
  color: 'var(--text-muted)',
  marginRight: 'var(--space-1)',
}

const chipButtonStyle = {
  background: 'none',
  border: 'none',
  padding: 0,
  cursor: 'pointer',
  borderRadius: 999,
}

const ALL: Task[] = [
  { id: '1', title: 'design the onboarding flow', tag: 'design', tagColor: 'accent', date: 'today', dateState: 'today' },
  { id: '2', title: 'wire up the sync endpoint', tag: 'backend', tagColor: 'neutral', date: 'tomorrow', dateState: 'scheduled' },
  { id: '3', title: 'write the api docs', tag: 'docs', tagColor: 'neutral', date: 'fri', dateState: 'scheduled' },
  { id: '4', title: 'fix the flaky checkout test', tag: 'backend', tagColor: 'neutral', date: 'sep 4', dateState: 'overdue', overdue: true },
  { id: '5', title: 'audit the empty states', tag: 'design', tagColor: 'accent', date: 'mon', dateState: 'scheduled' },
  { id: '6', title: 'ship the changelog notes', tag: 'docs', tagColor: 'neutral', date: 'sep 2', dateState: 'scheduled' },
]

const TAGS = ['design', 'backend', 'docs'] as const

function SearchViewDemo() {
  const [query, setQuery] = useState('')
  const [activeTag, setActiveTag] = useState<string | null>(null)

  const results = useMemo(
    () =>
      ALL.filter((t) => {
        const matchesQuery = t.title.toLowerCase().includes(query.trim().toLowerCase())
        const matchesTag = activeTag === null || t.tag === activeTag
        return matchesQuery && matchesTag
      }),
    [query, activeTag],
  )

  const filtered = query.trim() !== '' || activeTag !== null

  return (
    <div style={shellStyle}>
      <div style={headerStyle}>
        <h1 style={titleStyle}>search</h1>
        <span style={countStyle}>
          {results.length} of {ALL.length}
        </span>
      </div>

      <Input
        type="search"
        placeholder="search tasks"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <div style={filterRowStyle}>
        <span style={filterLabelStyle}>tag</span>
        {TAGS.map((t) => (
          <button
            key={t}
            type="button"
            style={chipButtonStyle}
            aria-pressed={activeTag === t}
            onClick={() => setActiveTag(activeTag === t ? null : t)}
          >
            <Tag color={activeTag === t ? 'accent' : 'neutral'}>{t}</Tag>
          </button>
        ))}
      </div>

      <div style={cardStyle}>
        {results.length > 0 ? (
          results.map((t) => (
            <TaskRow
              key={t.id}
              title={t.title}
              tag={t.tag}
              tagColor={t.tagColor}
              date={t.date}
              dateState={t.dateState}
              overdue={t.overdue}
            />
          ))
        ) : (
          <EmptyState
            title="nothing matches that search"
            description={
              filtered
                ? 'try a shorter query, or clear the filters to see everything again.'
                : 'start typing to filter your tasks.'
            }
            action={
              filtered
                ? {
                    label: 'clear filters',
                    onClick: () => {
                      setQuery('')
                      setActiveTag(null)
                    },
                  }
                : undefined
            }
          />
        )}
      </div>
    </div>
  )
}

const meta = {
  title: 'Composed/Search View',
  component: SearchViewDemo,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'The second composed screen, and the one that shows the system handling a state rather than a snapshot. Type in the search field or toggle a tag filter and the list narrows; empty the results and the EmptyState takes over, carrying the one place the wayfinding motif is allowed to appear. Everything here is assembled from the coded components with no new primitives: Input, Tag, TaskRow, DateChip and EmptyState. The card shell is the same raised-surface recipe the Today View uses, repeated deliberately rather than abstracted into a Card component.',
      },
    },
  },
} satisfies Meta<typeof SearchViewDemo>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
