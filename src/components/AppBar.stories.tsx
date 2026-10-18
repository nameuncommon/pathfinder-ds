import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { AppBar } from './AppBar'
import { componentDocs } from '../stories/componentDocs'

const meta = {
  title: 'Components/AppBar',
  component: AppBar,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          componentDocs.AppBar,
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="pf-story-frame" style={{ padding: '24px', borderRadius: '14px', width: 342 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof AppBar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const WithBack: Story = { args: { onBack: fn() } }
