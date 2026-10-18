import type { Meta, StoryObj } from '@storybook/react-vite'
import { GlassCard } from './GlassCard'
import { componentDocs } from '../stories/componentDocs'

const meta = {
  title: 'Components/GlassCard',
  component: GlassCard,
  tags: ['autodocs'],
  argTypes: {
    tone: { control: 'select', options: ['default', 'nudge'] },
    as: { control: 'select', options: ['div', 'section'] },
  },
  parameters: {
    docs: {
      description: {
        component:
          componentDocs.GlassCard,
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
} satisfies Meta<typeof GlassCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { children: 'Friday, October 22. Four things on the list today.' },
}

export const Nudge: Story = {
  args: { tone: 'nudge', children: 'Two tasks moved three days in a row. Worth a look.' },
}
