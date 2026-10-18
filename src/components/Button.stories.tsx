import type { Meta, StoryObj } from '@storybook/react-vite'
import { componentDocs } from '../stories/componentDocs'
import { StatesGrid, statesParameters } from '../stories/StatesGrid'
import { Button } from './Button'

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: { variant: { control: 'select', options: ['primary', 'quiet', 'ghost'] } },
  parameters: { docs: { description: { component: componentDocs.Button } } },
  decorators: [
    (Story) => (
      <div className="pf-ambient" style={{ padding: '24px', borderRadius: '14px', width: 342 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = { args: { variant: 'primary', children: 'Snap this week’s spread' } }
export const Quiet: Story = { args: { variant: 'quiet', children: 'Skip today' } }
export const Ghost: Story = { args: { variant: 'ghost', children: 'Leave the rest for Sunday' } }
export const Disabled: Story = { args: { variant: 'primary', children: 'Save', disabled: true } }

export const States: Story = {
  args: { children: 'Snap the spread' },
  parameters: { ...statesParameters, layout: 'padded' },
  decorators: [(Story) => <Story />],
  render: () => (
    <div style={{ display: 'grid', gap: 16 }}>
      <StatesGrid render={(s) => <Button disabled={s === 'disabled'}>Snap the spread</Button>} />
      <StatesGrid render={(s) => <Button variant="quiet" disabled={s === 'disabled'}>Skip today</Button>} />
    </div>
  ),
}
