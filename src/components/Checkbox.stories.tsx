import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { Checkbox } from './Checkbox'

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A native checkbox with its label; the whole row is the 44px target. A glass box with a border/strong edge (3:1) turns gold with an ink check when on. Disabled keeps the label readable (muted, 5.17:1) and drops the edge; nothing fades the whole row.',
      },
    },
  },
  args: { onChange: fn(), label: 'Call the dentist' },
  decorators: [
    (Story) => (
      <div className="pf-ambient" style={{ padding: '24px', borderRadius: '14px', width: 360 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

export const Unchecked: Story = { args: { checked: false } }
export const Checked: Story = { args: { checked: true } }
export const Disabled: Story = { args: { checked: false, disabled: true } }
export const CheckedDisabled: Story = { args: { checked: true, disabled: true } }
