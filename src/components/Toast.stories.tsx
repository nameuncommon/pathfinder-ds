import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { Toast } from './Toast'

const meta = {
  title: 'Components/Toast',
  component: Toast,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A short status message on glass, with an optional gold action. It is announced as a status, never red and never a scold. Used for the offline state.',
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
