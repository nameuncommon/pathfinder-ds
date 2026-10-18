import type { Meta, StoryObj } from '@storybook/react-vite'
import { MapBox } from './MapBox'

const meta = {
  title: 'Components/MapBox',
  component: MapBox,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A small solid box with a title and one line of description, on the raised navy surface.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="pf-ambient" style={{ padding: '24px', borderRadius: '14px', width: 360 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof MapBox>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { args: { title: 'Destination 2', description: 'Launch the portfolio' } }
