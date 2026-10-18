import type { Meta, StoryObj } from '@storybook/react-vite'
import { AppBadge } from './AppBadge'

const meta = {
  title: 'Components/AppBadge',
  component: AppBadge,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'The brand slot in the app bar and the desktop sidebar: the dial alone, filling its box, with no disc behind it. Below 24px it drops to the compass rose P alone, like the Dial.',
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
} satisfies Meta<typeof AppBadge>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { args: { size: 52 } }
export const Small: Story = { args: { size: 20 } }
