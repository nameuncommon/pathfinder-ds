import type { Meta, StoryObj } from '@storybook/react-vite'
import { Tally } from './Tally'

const meta = {
  title: 'Components/Tally',
  component: Tally,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A row of small marks, one for each task finished and one for each moved to another day. The whole row is read as one sentence, such as "6 done, 2 moved".',
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
} satisfies Meta<typeof Tally>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { args: { done: 6, moved: 2 } }
export const ManyMarks: Story = { args: { done: 18, moved: 7 } }
