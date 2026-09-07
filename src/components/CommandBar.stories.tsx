import type { Meta, StoryObj } from '@storybook/react-vite'
import { CommandBar, type CommandBarItem } from './CommandBar'

const plannerCommands: CommandBarItem[] = [
  { id: 'chart-week', label: 'chart your week', shortcut: 'w' },
  { id: 'new-task', label: 'new task', shortcut: 'n' },
  { id: 'jump-project', label: 'jump to project', shortcut: 'p' },
  { id: 'open-notes', label: 'open notes', shortcut: 'o' },
]

const meta = {
  title: 'Components/CommandBar',
  component: CommandBar,
  tags: ['autodocs'],
} satisfies Meta<typeof CommandBar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { items: plannerCommands },
}

/**
 * Non-modal, inline layout: the command bar renders as a plain block in the
 * page flow (no Dialog/portal/scrim), which is how this story mounts it.
 * Typing filters the list live via cmdk's built-in keyword matching, and
 * arrow keys move the selected-row accent rail.
 */
export const Inline: Story = {
  args: { items: plannerCommands, placeholder: 'type a command...' },
  render: (args) => (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '32px' }}>
      <CommandBar {...args} />
    </div>
  ),
}

export const EmptyQuery: Story = {
  args: { items: [] },
}
