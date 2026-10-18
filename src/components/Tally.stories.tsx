import type { Meta, StoryObj } from '@storybook/react-vite'
import { Tally } from './Tally'
import { componentDocs } from '../stories/componentDocs'

const meta = {
  title: 'Components/Tally',
  component: Tally,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          componentDocs.Tally,
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
