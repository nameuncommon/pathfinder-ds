import type { Meta, StoryObj } from '@storybook/react-vite'
import { Mark, type MarkTone, type MarkType } from './Mark'
import { componentDocs } from '../stories/componentDocs'

const meta = {
  title: 'Components/Mark',
  component: Mark,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['task', 'done', 'moved', 'dropped', 'matters', 'note'],
    },
    tone: { control: 'select', options: ['gold', 'navy'] },
    size: { control: 'number' },
  },
  parameters: {
    docs: {
      description: {
        component:
          componentDocs.Mark,
      },
    },
  },
} satisfies Meta<typeof Mark>

export default meta
type Story = StoryObj<typeof meta>

export const Task: Story = {
  args: { type: 'task' },
  decorators: [
    (Story) => (
      <div className="pf-story-frame" style={{ padding: '24px', borderRadius: '14px' }}>
        <Story />
      </div>
    ),
  ],
}

const types: MarkType[] = ['task', 'done', 'moved', 'dropped', 'matters', 'note']

function Row({ tone }: { tone: MarkTone }) {
  return (
    <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
      {types.map((type) => (
        <Mark key={type} type={type} tone={tone} size={32} />
      ))}
    </div>
  )
}

/** Gold reads on the dark ambient surface, navy reads on paper. */
export const AllMarks: Story = {
  args: { type: 'task' },
  render: () => (
    <div style={{ display: 'grid', gap: '16px' }}>
      <div className="pf-story-frame" style={{ padding: '24px', borderRadius: '14px' }}>
        <Row tone="gold" />
      </div>
      <div className="pf-paper" style={{ padding: '24px', borderRadius: '14px' }}>
        <Row tone="navy" />
      </div>
    </div>
  ),
}
