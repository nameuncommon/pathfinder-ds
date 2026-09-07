import type { Meta, StoryObj } from '@storybook/react-vite'
import { Toast, type ToastStatus } from './Toast'
import { StoryGrid } from '../stories/storyGrid'

const meta = {
  title: 'Components/Toast',
  component: Toast,
  tags: ['autodocs'],
  argTypes: {
    status: {
      control: 'select',
      options: ['success', 'danger', 'warning'],
    },
  },
} satisfies Meta<typeof Toast>

export default meta
type Story = StoryObj<typeof meta>

export const Success: Story = {
  args: { status: 'success', message: 'task moved to done' },
}

export const Danger: Story = {
  args: {
    status: 'danger',
    message: 'could not delete list',
    action: { label: 'undo', onClick: () => {} },
  },
}

export const Warning: Story = {
  args: { status: 'warning', message: '3 tasks are now overdue' },
}

export const WithUndo: Story = {
  args: {
    status: 'success',
    message: 'task archived',
    action: { label: 'undo', onClick: () => {} },
  },
}

const statuses: { status: ToastStatus; message: string; action?: boolean }[] = [
  { status: 'success', message: 'task archived', action: true },
  { status: 'danger', message: 'could not delete list', action: true },
  { status: 'warning', message: '3 tasks are now overdue' },
]

export const AllStates: Story = {
  args: { status: 'success', message: 'task archived' },
  render: () => (
    <StoryGrid maxWidth={420} surface="base">
      <div style={{ display: 'grid', gap: '12px' }}>
        {statuses.map(({ status, message, action }) => (
          <Toast
            key={status}
            status={status}
            message={message}
            action={action ? { label: 'undo', onClick: () => {} } : undefined}
          />
        ))}
      </div>
    </StoryGrid>
  ),
}
