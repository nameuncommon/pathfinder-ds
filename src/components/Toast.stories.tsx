import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { Toast } from './Toast'
import { componentDocs } from '../stories/componentDocs'
import { StatesGrid, statesParameters } from '../stories/StatesGrid'

const meta = {
  title: 'Components/Toast',
  component: Toast,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          componentDocs.Toast,
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="pf-ambient" style={{ padding: '24px', borderRadius: '14px', width: 390 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Toast>

export default meta
type Story = StoryObj<typeof meta>

export const Offline: Story = { args: { message: 'Saved on this phone. It will sync when you are back online.' } }
export const WithAction: Story = { args: { message: 'Dropped on purpose. Logged, not lost.', action: { label: 'Undo', onClick: fn() } } }

export const States: Story = {
  args: { message: 'Dropped on purpose. Logged, not lost.' },
  parameters: { ...statesParameters, layout: 'padded' },
  decorators: [(Story) => <Story />],
  render: (args) => (
    <StatesGrid states={['default', 'hover', 'focus']} width={340} render={() => <Toast {...args} action={{ label: 'Undo', onClick: () => {} }} />} />
  ),
}
