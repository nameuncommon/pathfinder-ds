import type { Meta, StoryObj } from '@storybook/react-vite'
import { snapImage, snapSize } from '../app/assets'
import { Viewfinder } from './Viewfinder'
import { componentDocs } from '../stories/componentDocs'

const meta = {
  title: 'Components/Viewfinder',
  component: Viewfinder,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          componentDocs.Viewfinder,
      },
    },
  },
  args: { onTake: () => {}, weekCode: 'W42', corners: 4 },
  decorators: [
    (Story) => (
      <div className="pf-story-frame" style={{ padding: '24px', borderRadius: '14px', maxWidth: 420 }}>
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
