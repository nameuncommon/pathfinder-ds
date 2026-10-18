import type { Meta, StoryObj } from '@storybook/react-vite'
import { Dial } from './Dial'

const meta = {
  title: 'Components/Dial',
  component: Dial,
  tags: ['autodocs'],
  argTypes: { size: { control: 'number' }, label: { control: 'text' } },
  parameters: {
    docs: {
      description: {
        component:
          'The Pathfinder logo. At 24px and up it is the dial: a solid ring around the compass rose P. Below 24px it drops to the compass rose P alone, because the ring crowds the star at that size. It is drawn in the brand mark colour and read as an image named "Pathfinder".',
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
} satisfies Meta<typeof Dial>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { args: { size: 40 } }
export const Large: Story = { args: { size: 120 } }
export const Small: Story = { args: { size: 20 } }
