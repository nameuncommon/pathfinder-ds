import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { CompassChoice, type Direction } from './CompassChoice'
import { componentDocs } from '../stories/componentDocs'
import { StatesGrid, statesParameters } from '../stories/StatesGrid'
import { choices } from '../app/data'
import { expect, userEvent, within } from 'storybook/test'

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
          componentDocs.CompassChoice,
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

const options = choices

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

export const States: Story = {
  args: { ...Default.args },
  parameters: statesParameters,
  render: (args) => (
    <StatesGrid states={['default', 'hover', 'focus', 'pressed']} width={320} render={() => <CompassChoice {...args} />} />
  ),
}

export const PickLater: Story = {
  args: Default.args,
  render: Group.render,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const later = canvas.getByRole('button', { name: /Later/ })
    await userEvent.click(later)
    await expect(later).toHaveAttribute('aria-pressed', 'true')
    await expect(canvas.getByRole('button', { name: /Now/ })).toHaveAttribute('aria-pressed', 'false')
  },
}
