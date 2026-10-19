import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { Checkbox } from './Checkbox'
import { componentDocs } from '../stories/componentDocs'
import { StatesGrid, statesParameters } from '../stories/StatesGrid'

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          componentDocs.Checkbox,
      },
    },
  },
  args: { onChange: fn(), label: 'Call the dentist' },
  decorators: [
    (Story) => (
      <div className="pf-story-frame" style={{ padding: '24px', borderRadius: '14px', width: 360 }}>
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

export const States: Story = {
  args: { checked: false },
  parameters: { ...statesParameters, layout: 'padded' },
  decorators: [(Story) => <Story />],
  render: () => <StatesGrid render={(s) => <Checkbox checked={false} onChange={() => {}} label="Call the dentist" disabled={s === 'disabled'} />} />,
}
