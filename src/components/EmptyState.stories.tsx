import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { EmptyState } from './EmptyState'
import { componentDocs } from '../stories/componentDocs'

const meta = {
  title: 'Components/EmptyState',
  component: EmptyState,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          componentDocs.EmptyState,
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="pf-ambient" style={{ padding: '24px', borderRadius: '14px', width: 400 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof EmptyState>

export default meta
type Story = StoryObj<typeof meta>

export const OnGlass: Story = { args: { title: 'Nothing new', line: 'This spread reads the same as your last snap, so there is nothing to check.' } }
export const OnDots: Story = { args: { title: 'All sorted', line: 'Nothing is waiting. New captures land here.', surface: 'dots' } }
export const WithAction: Story = {
  args: { title: 'All sorted', line: 'Nothing is waiting. New captures land here.', action: { label: 'Capture something', onClick: fn() } },
}
