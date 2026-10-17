import type { Meta, StoryObj } from '@storybook/react-vite'
import { Mark, type MarkTone, type MarkType } from './Mark'

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
          'Six line glyphs that tag a task by what happened to it: task, done, moved, dropped, matters, note. Two tones: gold on dark surfaces, navy on paper. A mark on its own is an image with the type word as its label. When the row already says the same thing in words, pass `decorative` so screen readers skip it.',
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
      <div className="pf-ambient" style={{ padding: '24px', borderRadius: '14px' }}>
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
      <div className="pf-ambient" style={{ padding: '24px', borderRadius: '14px' }}>
        <Row tone="gold" />
      </div>
      <div className="pf-paper" style={{ padding: '24px', borderRadius: '14px' }}>
        <Row tone="navy" />
      </div>
    </div>
  ),
}
