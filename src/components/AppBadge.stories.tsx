import type { Meta, StoryObj } from '@storybook/react-vite'
import { AppBadge } from './AppBadge'
import { componentDocs } from '../stories/componentDocs'

const meta = {
  title: 'Components/AppBadge',
  component: AppBadge,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          componentDocs.AppBadge,
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="pf-story-frame" style={{ padding: '24px', borderRadius: '14px', maxWidth: 420 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof AppBadge>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { args: { size: 52 } }
export const Small: Story = { args: { size: 20 } }
