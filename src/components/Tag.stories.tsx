import type { Meta, StoryObj } from '@storybook/react-vite'
import { Tag } from './Tag'
import { componentDocs } from '../stories/componentDocs'

const meta = {
  title: 'Components/Tag',
  component: Tag,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          componentDocs.Tag,
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
} satisfies Meta<typeof Tag>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { args: { children: 'said on the move' } }
