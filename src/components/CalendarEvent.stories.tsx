import type { Meta, StoryObj } from '@storybook/react-vite'
import { CalendarEvent } from './CalendarEvent'
import { componentDocs } from '../stories/componentDocs'

const meta = {
  title: 'Components/CalendarEvent',
  component: CalendarEvent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          componentDocs.CalendarEvent,
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="pf-story-frame" style={{ padding: '24px', borderRadius: '14px', width: 200 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof CalendarEvent>

export default meta
type Story = StoryObj<typeof meta>

export const Appointment: Story = { args: { time: '9:30', title: 'Dentist', bearing: 'health', kind: 'appointment' } }
export const Bill: Story = { args: { time: 'due', title: 'Rent', bearing: 'home', kind: 'bill', amount: '$1,450' } }
export const LongTitle: Story = {
  args: { time: '19:00', title: 'Dinner with Ana and the whole team from the old studio office', bearing: 'people' },
}
