import type { Meta, StoryObj } from '@storybook/react-vite'
import { SidebarNavItem } from './SidebarNavItem'

const meta = {
  title: 'Components/SidebarNavItem',
  component: SidebarNavItem,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'One row of the desktop sidebar: an icon, a label and an optional count. 44px tall. The current page has a soft gold fill, gold text and aria-current="page". A count reads as "3 to sort".',
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="pf-ambient" style={{ padding: '24px', borderRadius: '14px', width: 240 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SidebarNavItem>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { args: { label: 'Today', href: '#today', icon: 'sun' } }
export const Active: Story = { args: { label: 'This week', href: '#week', icon: 'calendar-range', active: true } }
export const WithCount: Story = { args: { label: 'Inbox', href: '#inbox', icon: 'inbox', count: 3 } }

export const Sidebar: Story = {
  args: { label: 'Today', href: '#today', icon: 'sun' },
  render: () => (
    <nav aria-label="Main" style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <SidebarNavItem label="Today" href="#today" icon="sun" />
      <SidebarNavItem label="This week" href="#week" icon="calendar-range" active />
      <SidebarNavItem label="Inbox" href="#inbox" icon="inbox" count={3} />
      <SidebarNavItem label="Calendar" href="#calendar" icon="calendar" />
      <SidebarNavItem label="Projects" href="#projects" icon="folder-kanban" />
      <SidebarNavItem label="Library" href="#library" icon="library" />
      <SidebarNavItem label="Look back" href="#look-back" icon="history" />
    </nav>
  ),
}
