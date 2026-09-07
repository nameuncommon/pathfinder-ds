import type { Meta, StoryObj } from '@storybook/react-vite'
import { EmptyState } from './EmptyState'
import { StoryGrid } from '../stories/storyGrid'

const meta = {
  title: 'Components/EmptyState',
  component: EmptyState,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'The one place the wayfinding motif is allowed to surface. The brand spec caps it at "a hint" - subtle naming and at most one empty-state texture, never UI chrome - so this component is where the brand layer and the component layer actually touch. Write the title as what is specifically absent ("no tasks due today"), not as a system state ("no data"). Give an action only when there is genuinely something to do; an empty inbox is a success, not an error, and should not be handed a button. Set `art={false}` where an empty state repeats inside a list or a small panel, because the illustration stops being a moment and becomes noise.',
      },
    },
  },
} satisfies Meta<typeof EmptyState>

export default meta
type Story = StoryObj<typeof meta>

export const NoResults: Story = {
  args: {
    title: 'nothing matches that search',
    description: 'try a shorter query, or clear the filters to see everything again.',
    action: { label: 'clear filters', onClick: () => {} },
  },
  render: (args) => (
    <StoryGrid maxWidth={420} surface="base">
      <EmptyState {...args} />
    </StoryGrid>
  ),
}

export const AllClear: Story = {
  name: 'All clear (no action)',
  args: {
    title: 'nothing due today',
    description: 'you are all caught up. tomorrow has three tasks waiting.',
  },
  render: (args) => (
    <StoryGrid maxWidth={420} surface="base">
      <EmptyState {...args} />
    </StoryGrid>
  ),
}

export const Compact: Story = {
  name: 'Compact (no art)',
  args: {
    title: 'no tags on this task',
    description: 'tags help you filter later.',
    art: false,
  },
  render: (args) => (
    <StoryGrid maxWidth={420} surface="base">
      <EmptyState {...args} />
    </StoryGrid>
  ),
}
