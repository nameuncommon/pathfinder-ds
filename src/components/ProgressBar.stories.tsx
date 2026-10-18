import type { Meta, StoryObj } from '@storybook/react-vite'
import { ProgressBar } from './ProgressBar'
import { componentDocs } from '../stories/componentDocs'

const meta = {
  title: 'Components/ProgressBar',
  component: ProgressBar,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          componentDocs.ProgressBar,
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
} satisfies Meta<typeof ProgressBar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { args: { step: 3, total: 4 } }
export const Start: Story = { args: { step: 1, total: 4 } }
