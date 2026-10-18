import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { DateChip } from './DateChip'
import { componentDocs } from '../stories/componentDocs'
import { StatesGrid, statesParameters } from '../stories/StatesGrid'

const meta = {
  title: 'Components/DateChip',
  component: DateChip,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          componentDocs.DateChip,
      },
    },
  },
  args: { onClick: fn(), children: 'Fri 22 Oct' },
  decorators: [
    (Story) => (
      <div className="pf-ambient" style={{ padding: '24px', borderRadius: '14px', width: 360 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DateChip>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { args: { selected: false } }
export const Selected: Story = { args: { selected: true } }
export const Disabled: Story = { args: { disabled: true } }

export const States: Story = {
  parameters: { ...statesParameters, layout: 'padded' },
  decorators: [(Story) => <Story />],
  render: () => <StatesGrid width={140} render={(s) => <DateChip disabled={s === 'disabled'}>Fri 22 Oct</DateChip>} />,
}
