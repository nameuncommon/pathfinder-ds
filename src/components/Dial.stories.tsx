import type { Meta, StoryObj } from '@storybook/react-vite'
import { Dial } from './Dial'
import { componentDocs } from '../stories/componentDocs'

const meta = {
  title: 'Components/Dial',
  component: Dial,
  tags: ['autodocs'],
  argTypes: { size: { control: 'number' }, label: { control: 'text' } },
  parameters: {
    docs: {
      description: {
        component:
          componentDocs.Dial,
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="pf-story-frame" style={{ padding: '24px', borderRadius: '14px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Dial>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { args: { size: 40 } }
export const Large: Story = { args: { size: 120 } }
export const Small: Story = { args: { size: 20 } }
