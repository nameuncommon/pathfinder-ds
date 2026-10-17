import type { Meta, StoryObj } from '@storybook/react-vite'
import { BearingTag, type Bearing } from './BearingTag'

const meta = {
  title: 'Components/BearingTag',
  component: BearingTag,
  tags: ['autodocs'],
  argTypes: {
    bearing: { control: 'select', options: ['health', 'people', 'home', 'work', 'craft'] },
  },
  parameters: {
    docs: {
      description: {
        component:
          'A pill that names which area of life a task belongs to: health, people, home, work or craft. It is separate from Tag on purpose. Tag carries status colour. A bearing is one of your own life areas, so it has its own five colours and its own meaning.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="pf-ambient" style={{ padding: '24px', borderRadius: '14px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof BearingTag>

export default meta
type Story = StoryObj<typeof meta>

export const Health: Story = { args: { bearing: 'health' } }

const all: Bearing[] = ['health', 'people', 'home', 'work', 'craft']

export const AllBearings: Story = {
  args: { bearing: 'health' },
  render: () => (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
      {all.map((b) => (
        <BearingTag key={b} bearing={b} />
      ))}
    </div>
  ),
}
