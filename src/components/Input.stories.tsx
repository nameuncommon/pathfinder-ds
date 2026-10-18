import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { Input } from './Input'

const meta = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A text field with its label above. A 52px glass field with a border/strong edge (3:1); focus turns the edge gold and 2px. The correction sheet uses it for "What it says".',
      },
    },
  },
  args: { label: 'What it says', onChange: fn() },
  decorators: [
    (Story) => (
      <div className="pf-ambient" style={{ padding: '24px', borderRadius: '14px', width: 390 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Empty: Story = { args: { placeholder: 'Type what you wrote' } }
export const Filled: Story = { args: { defaultValue: 'call the dentist' } }
export const Disabled: Story = { args: { defaultValue: 'call the dentist', disabled: true } }
