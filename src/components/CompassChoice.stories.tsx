import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { CompassChoice, type Direction } from './CompassChoice'

const meta = {
  title: 'Components/CompassChoice',
  component: CompassChoice,
  tags: ['autodocs'],
  args: { onSelect: fn() },
  argTypes: {
    direction: { control: 'select', options: ['N', 'E', 'S', 'W'] },
  },
  parameters: {
    docs: {
      description: {
        component:
          'One of up to four big choices, each tied to a compass point. Put them inside an element with `role="group"` and an accessible name. Each is a plain button: one tap decides. Each choice is at least 64px tall and the detail text wraps.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="pf-ambient" style={{ padding: '24px', borderRadius: '14px', maxWidth: 420 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof CompassChoice>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    direction: 'N',
    title: 'Keep going',
    detail: 'Carry it to tomorrow as it is.',
  },
}

export const Selected: Story = { args: { ...Default.args, selected: true } }

const options: { direction: Direction; title: string; detail: string }[] = [
  { direction: 'N', title: 'Keep going', detail: 'Carry it to tomorrow as it is.' },
  { direction: 'E', title: 'Make it smaller', detail: 'Split it into a first step you can finish in ten minutes.' },
  { direction: 'S', title: 'Set it down', detail: 'Drop it for now. It stays in your notebook if you want it back later this month or next.' },
  { direction: 'W', title: 'Ask for help', detail: 'Note who could take this on with you.' },
]

export const Group: Story = {
  args: Default.args,
  render: function Render() {
    const [value, setValue] = useState<Direction>('N')
    return (
      <div role="group" aria-label="Which way does it go?" style={{ display: 'grid', gap: '12px' }}>
        {options.map((o) => (
          <CompassChoice key={o.direction} {...o} selected={value === o.direction} onSelect={() => setValue(o.direction)} />
        ))}
      </div>
    )
  },
}
