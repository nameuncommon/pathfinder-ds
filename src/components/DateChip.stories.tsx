import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { DateChip } from './DateChip'

const meta = {
  title: 'Components/DateChip',
  component: DateChip,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A date you can pick, in type / data ("Fri 22 Oct"). It is a toggle button, 44px tall: selected shows a gold edge on the soft gold fill, gold text and aria-pressed.',
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
