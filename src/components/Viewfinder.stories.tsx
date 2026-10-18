import type { Meta, StoryObj } from '@storybook/react-vite'
import { snapImage, snapSize } from '../app/assets'
import { Viewfinder } from './Viewfinder'

const meta = {
  title: 'Components/Viewfinder',
  component: Viewfinder,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'The snap step camera frame. It is one big button ("Take the photo"). When the page is found, gold brackets lock on and a pill names the week and corners; the pill is the button\'s description for screen readers.',
      },
    },
  },
  args: { onTake: () => {}, weekCode: 'W42', corners: 4 },
  decorators: [
    (Story) => (
      <div className="pf-ambient" style={{ padding: '24px', borderRadius: '14px', maxWidth: 420 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Viewfinder>

export default meta
type Story = StoryObj<typeof meta>

const page = <img className="pf-viewfinder__page" src={snapImage} alt="" width={snapSize.width} height={snapSize.height} />

export const Found: Story = { args: { found: true, children: page } }
export const Searching: Story = { args: { found: false, children: page } }
