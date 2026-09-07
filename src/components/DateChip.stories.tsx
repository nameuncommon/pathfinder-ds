import type { Meta, StoryObj } from '@storybook/react-vite'
import { DateChip, type DateChipState } from './DateChip'
import { StoryGrid } from '../stories/storyGrid'

const meta = {
  title: 'Components/DateChip',
  component: DateChip,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Date chips answer when, and their state is derived from the date rather than set by hand. Today is the accent state, scheduled is neutral, overdue is danger. Overdue is the one place danger deliberately appears on a raised surface: inside a task row on a card the red is the signal, and the documented contrast exception is accepted there rather than losing the warning. Do not use the overdue state decoratively; it should always mean the date has passed.',
      },
    },
  },
  argTypes: {
    state: {
      control: 'select',
      options: ['today', 'scheduled', 'overdue'],
    },
  },
} satisfies Meta<typeof DateChip>

export default meta
type Story = StoryObj<typeof meta>

export const Today: Story = {
  args: { state: 'today', children: 'today' },
}

export const Scheduled: Story = {
  args: { state: 'scheduled', children: 'sep 12' },
}

export const Overdue: Story = {
  args: { state: 'overdue', children: 'sep 2' },
}

const states: { state: DateChipState; label: string }[] = [
  { state: 'today', label: 'today' },
  { state: 'scheduled', label: 'sep 12' },
  { state: 'overdue', label: 'sep 2' },
]

export const AllStates: Story = {
  args: { state: 'today', children: 'today' },
  render: () => (
    <StoryGrid maxWidth={360}>
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        {states.map(({ state, label }) => (
          <DateChip key={state} state={state}>
            {label}
          </DateChip>
        ))}
      </div>
    </StoryGrid>
  ),
}
