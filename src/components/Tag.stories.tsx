import type { Meta, StoryObj } from '@storybook/react-vite'
import { Tag, type TagColor } from './Tag'

const meta = {
  title: 'Components/Tag',
  component: Tag,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          "Tags label what a task IS. Colour carries meaning, not decoration: accent for the active project or focus, success for completed work, neutral for metadata that should stay quiet, warning for something that needs attention soon, danger for something blocking. Two constraints. Danger and warning tags must sit on surface/base, never on surface/raised, where the tint contrast drops below AA. And no more than one accent tag should be visible in a row, because the accent is the eye's anchor and repeating it removes the hierarchy it exists to create.",
      },
    },
  },
  argTypes: {
    color: {
      control: 'select',
      options: ['accent', 'success', 'neutral', 'danger', 'warning'],
    },
  },
} satisfies Meta<typeof Tag>

export default meta
type Story = StoryObj<typeof meta>

export const Accent: Story = {
  args: { color: 'accent', children: 'focus' },
}

export const Success: Story = {
  args: { color: 'success', children: 'done' },
}

export const Neutral: Story = {
  args: { color: 'neutral', children: 'backlog' },
}

export const Danger: Story = {
  args: { color: 'danger', children: 'blocked' },
}

export const Warning: Story = {
  args: { color: 'warning', children: 'at risk' },
}

const colors: { color: TagColor; label: string }[] = [
  { color: 'accent', label: 'focus' },
  { color: 'success', label: 'done' },
  { color: 'neutral', label: 'backlog' },
  { color: 'danger', label: 'blocked' },
  { color: 'warning', label: 'at risk' },
]

export const AllColors: Story = {
  args: { color: 'accent', children: 'focus' },
  render: () => (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
      {colors.map(({ color, label }) => (
        <Tag key={color} color={color}>
          {label}
        </Tag>
      ))}
    </div>
  ),
}
