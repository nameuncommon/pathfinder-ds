import type { Meta, StoryObj } from '@storybook/react-vite'
import { TabBar } from './TabBar'

const meta = {
  title: 'Components/TabBar',
  component: TabBar,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'The phone tab bar: Today, Week, Inbox and Library, with the capture button in the middle. Every target is at least 44px. The active tab is gold, carries a dot and is marked aria-current, so it is never shown by colour alone.',
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
} satisfies Meta<typeof TabBar>

export default meta
type Story = StoryObj<typeof meta>

export const Today: Story = { args: { active: 'today' } }
export const Week: Story = { args: { active: 'week' } }
export const Inbox: Story = { args: { active: 'inbox' } }
export const Library: Story = { args: { active: 'library' } }
