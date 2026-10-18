import type { Meta, StoryObj } from '@storybook/react-vite'
import { SidebarNavItem } from './SidebarNavItem'
import { componentDocs } from '../stories/componentDocs'
import { StatesGrid, statesParameters } from '../stories/StatesGrid'

const meta = {
  title: 'Components/SidebarNavItem',
  component: SidebarNavItem,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          componentDocs.SidebarNavItem,
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="pf-story-frame" style={{ padding: '24px', borderRadius: '14px', width: 240 }}>
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

export const States: Story = {
  args: { label: 'Calendar', href: '#calendar', icon: 'calendar' },
  parameters: { ...statesParameters, layout: 'padded' },
  decorators: [(Story) => <Story />],
  render: (args) => <StatesGrid states={['default', 'hover', 'focus']} width={190} render={() => <SidebarNavItem {...args} />} />,
}
