import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Checkbox } from './Checkbox'
import { StoryGrid } from '../stories/storyGrid'

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

export const Unchecked: Story = {
  args: { checked: false, label: 'review inbox', onChange: () => {} },
}

export const Checked: Story = {
  args: { checked: true, label: 'plan tomorrow', onChange: () => {} },
}

export const Indeterminate: Story = {
  args: { checked: false, indeterminate: true, label: 'weekly review (3 of 5 done)', onChange: () => {} },
}

export const Disabled: Story = {
  args: { checked: false, label: 'archive project', disabled: true, onChange: () => {} },
}

export const AllStates: Story = {
  args: { checked: false, label: 'review inbox', onChange: () => {} },
  render: () => (
    <StoryGrid maxWidth={360}>
      <div style={{ display: 'grid', gap: '16px' }}>
        <Checkbox checked={false} label="unchecked" onChange={() => {}} />
        <Checkbox checked={true} label="checked" onChange={() => {}} />
        <Checkbox checked={false} indeterminate label="indeterminate" onChange={() => {}} />
        <Checkbox checked={false} label="disabled" disabled onChange={() => {}} />
        <Checkbox checked={true} label="disabled + checked" disabled onChange={() => {}} />
      </div>
    </StoryGrid>
  ),
}

/** Motion gate: click to toggle and watch the 120ms scale-in + stroke draw. */
export const InteractiveAnimated: Story = {
  args: { checked: false, label: 'ship task 14', onChange: () => {} },
  render: function Render() {
    const [checked, setChecked] = useState(false)
    return <Checkbox checked={checked} label="ship task 14" onChange={setChecked} />
  },
}
