import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { Input } from './Input'
import { componentDocs } from '../stories/componentDocs'
import { StatesGrid, statesParameters } from '../stories/StatesGrid'

const meta = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          componentDocs.Input,
      },
    },
  },
  args: { label: 'What it says', onChange: fn() },
  decorators: [
    (Story) => (
      <div className="pf-story-frame" style={{ padding: '24px', borderRadius: '14px', width: 390 }}>
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
export const Error: Story = { args: { defaultValue: '', error: 'Write what the line says' } }

export const States: Story = {
  parameters: { ...statesParameters, layout: 'padded' },
  decorators: [(Story) => <Story />],
  render: () => (
    <StatesGrid width={300} render={(s) => <Input label="What it says" defaultValue="call the dentist" disabled={s === 'disabled'} />} />
  ),
}
