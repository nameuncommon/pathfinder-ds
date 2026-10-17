import type { Meta, StoryObj } from '@storybook/react-vite'
import { StarRing } from './StarRing'

const meta = {
  title: 'Components/StarRing',
  component: StarRing,
  tags: ['autodocs'],
  argTypes: { size: { control: 'number' } },
  parameters: {
    docs: {
      description: {
        component:
          'The Pathfinder mark: a gold ring of dots around a star. It is drawn in the gold accent colour and read as an image named "Pathfinder".',
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
} satisfies Meta<typeof StarRing>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { args: { size: 40 } }
export const Large: Story = { args: { size: 120 } }
