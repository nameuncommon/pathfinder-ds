import type { Meta, StoryObj } from '@storybook/react-vite'
import { ScheduleRow } from './ScheduleRow'
import { componentDocs } from '../stories/componentDocs'

const meta = {
  title: 'Components/ScheduleRow',
  component: ScheduleRow,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          componentDocs.ScheduleRow,
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="pf-ambient" style={{ padding: '24px', borderRadius: '14px', maxWidth: 420 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ScheduleRow>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { time: '9:30', title: 'Dentist', bearing: 'health' },
}

export const LongTitle: Story = {
  args: {
    time: '14:00',
    title: 'Walk through the whole quarterly planning document with the team and write down what changed',
    bearing: 'work',
  },
}
