import type { Meta, StoryObj } from '@storybook/react-vite'
import { TaskRow } from './TaskRow'
import { StoryGrid } from '../stories/storyGrid'

const captionStyle = {
  fontFamily: 'var(--font-mono)',
  fontSize: 'var(--type-11-size)',
  lineHeight: 'var(--type-11-line)',
  color: 'var(--text-muted)',
}

const meta = {
  title: 'Components/TaskRow',
  component: TaskRow,
  tags: ['autodocs'],
} satisfies Meta<typeof TaskRow>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: 'chart your week',
    tag: 'focus',
    tagColor: 'accent',
    date: 'today',
    dateState: 'today',
  },
}

export const Completed: Story = {
  args: {
    title: 'review inbox',
    tag: 'admin',
    tagColor: 'neutral',
    date: 'sep 4',
    dateState: 'scheduled',
    completed: true,
  },
}

export const Overdue: Story = {
  args: {
    title: 'unblock design review on empty states',
    tag: 'blocked',
    tagColor: 'danger',
    date: 'sep 4',
    overdue: true,
  },
}

export const Minimal: Story = {
  args: {
    title: 'jot down onboarding notes',
  },
}

/**
 * Dragging: lifted off the list (raised shadow + slight tilt) while a drag
 * is in progress. `--surface-raised` fill and `cursor: grabbing` complete the
 * "lifted card" read.
 */
export const Dragging: Story = {
  args: {
    title: 'sketch the onboarding flow',
    tag: 'focus',
    tagColor: 'accent',
    date: 'sep 9',
    dateState: 'scheduled',
    dragging: true,
  },
}

/**
 * Row hover triggers `--surface-raised` fill and reveals the drag handle. This
 * story fakes the hover class (scoped locally, not shipped in TaskRow.css) so
 * the state is visible in a static shot; hovering the Default row above with
 * a real cursor produces the identical result.
 */
export const Hover: Story = {
  args: {
    title: 'draft the sprint retro notes',
    tag: 'writing',
    tagColor: 'accent',
    date: 'sep 8',
    dateState: 'scheduled',
    className: 'pf-task-row-story-force-hover',
  },
  render: (args) => (
    <>
      <style>{`
        .pf-task-row-story-force-hover {
          background: var(--surface-raised);
        }
        .pf-task-row-story-force-hover .pf-task-row__drag {
          opacity: 1;
        }
      `}</style>
      <TaskRow {...args} />
    </>
  ),
}

/**
 * All states side by side, each labeled with a small mono caption so a
 * static screenshot (or a reader skimming the grid) reads every row's state
 * as intentional. The dragging state lives only in the dedicated Dragging
 * story: its rotation reads as a rendering bug inside a static grid.
 */
export const AllStates: Story = {
  args: { title: 'chart your week' },
  render: () => (
    <StoryGrid maxWidth={480} surface="base">
      <style>{`
        .pf-task-row-story-force-hover {
          background: var(--surface-raised);
        }
        .pf-task-row-story-force-hover .pf-task-row__drag {
          opacity: 1;
        }
      `}</style>
      <div style={{ display: 'grid', gap: 'var(--space-4)', width: '420px' }}>
        <div style={{ display: 'grid', gap: 'var(--space-1)' }}>
          <TaskRow title="chart your week" tag="focus" tagColor="accent" date="today" dateState="today" />
          <span style={captionStyle}>default</span>
        </div>
        <div style={{ display: 'grid', gap: 'var(--space-1)' }}>
          <TaskRow
            title="draft the sprint retro notes"
            tag="writing"
            tagColor="accent"
            date="sep 8"
            dateState="scheduled"
            className="pf-task-row-story-force-hover"
          />
          <span style={captionStyle}>hover (forced for this shot - see the Hover story)</span>
        </div>
        <div style={{ display: 'grid', gap: 'var(--space-1)' }}>
          <TaskRow title="review inbox" tag="admin" tagColor="neutral" date="sep 4" completed />
          <span style={captionStyle}>completed</span>
        </div>
        <div style={{ display: 'grid', gap: 'var(--space-1)' }}>
          <TaskRow
            title="unblock design review on empty states"
            tag="blocked"
            tagColor="danger"
            date="sep 4"
            overdue
          />
          <span style={captionStyle}>overdue</span>
        </div>
      </div>
    </StoryGrid>
  ),
}
