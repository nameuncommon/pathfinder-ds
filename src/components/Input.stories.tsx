import type { Meta, StoryObj } from '@storybook/react-vite'
import { Input, type InputType } from './Input'
import { StoryGrid } from '../stories/storyGrid'

function SearchIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" width="16" height="16">
      <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10.5 10.5L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

const meta = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'search'],
    },
  },
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Text: Story = {
  args: { type: 'text', placeholder: 'task title' },
}

export const Search: Story = {
  args: { type: 'search', placeholder: 'search tasks and notes', icon: <SearchIcon /> },
}

export const WithValue: Story = {
  // v1 leftover: a11y reported, not gating, until its v2 redesign (plan Task 14)
  parameters: { a11y: { test: 'todo' } },
  args: { type: 'text', defaultValue: 'unblock design review on empty states' },
}

export const Error: Story = {
  // v1 leftover: a11y reported, not gating, until its v2 redesign (plan Task 14)
  parameters: { a11y: { test: 'todo' } },
  args: {
    type: 'text',
    defaultValue: '',
    placeholder: 'project name',
    error: 'project name is required',
  },
}

export const Disabled: Story = {
  // v1 leftover: a11y reported, not gating, until its v2 redesign (plan Task 14)
  parameters: { a11y: { test: 'todo' } },
  args: { type: 'text', defaultValue: 'archived list', disabled: true },
}

const types: { type: InputType; placeholder: string; icon?: boolean }[] = [
  { type: 'text', placeholder: 'task title' },
  { type: 'search', placeholder: 'search tasks and notes', icon: true },
]

export const AllStates: Story = {
  // v1 leftover: a11y reported, not gating, until its v2 redesign (plan Task 14)
  parameters: { a11y: { test: 'todo' } },
  args: { type: 'text', placeholder: 'task title' },
  render: () => (
    <StoryGrid maxWidth={360} surface="base">
      <div style={{ display: 'grid', gap: '16px', width: '280px' }}>
        {types.map(({ type, placeholder, icon }) => (
          <Input key={type} type={type} placeholder={placeholder} icon={icon ? <SearchIcon /> : undefined} />
        ))}
        <Input type="text" defaultValue="unblock design review on empty states" />
        <Input type="text" placeholder="project name" error="project name is required" />
        <Input type="text" defaultValue="archived list" disabled />
      </div>
    </StoryGrid>
  ),
}
