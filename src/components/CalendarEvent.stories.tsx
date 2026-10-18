import type { Meta, StoryObj } from '@storybook/react-vite'
import { CalendarEvent } from './CalendarEvent'

const meta = {
  title: 'Components/CalendarEvent',
  component: CalendarEvent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'One event in a desktop day column: a bearing-coloured rule, the time in type / data and the title. The bearing is also named for screen readers, so colour never carries it alone. Long titles wrap.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="pf-ambient" style={{ padding: '24px', borderRadius: '14px', width: 200 }}>
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
