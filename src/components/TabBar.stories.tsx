import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, within } from 'storybook/test'
import { TabBar } from './TabBar'
import { componentDocs } from '../stories/componentDocs'
import { StatesGrid, statesParameters } from '../stories/StatesGrid'

const meta = {
  title: 'Components/TabBar',
  component: TabBar,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          componentDocs.TabBar,
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="pf-ambient" style={{ padding: '24px', borderRadius: '14px', maxWidth: 420 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof TabBar>

export default meta
type Story = StoryObj<typeof meta>

export const Today: Story = { args: { active: 'today' } }
export const Week: Story = { args: { active: 'week' } }
export const Inbox: Story = { args: { active: 'inbox' } }
export const Library: Story = { args: { active: 'library' } }

export const States: Story = {
  args: { active: 'today' },
  decorators: [(Story) => <Story />],
  parameters: {
    layout: 'padded',
    ...statesParameters,
    // the gallery shows two tab bars, so two "Main" landmarks; a real screen has one
    a11y: { config: { rules: [{ id: 'landmark-unique', enabled: false }] } },
  },
  render: (args) => <StatesGrid states={['default', 'focus']} width={342} render={() => <TabBar {...args} />} />,
}

export const LargeText: Story = {
  name: 'large text (2x)',
  args: { active: 'library' },
  decorators: [
    (Story) => (
      <div style={{ ['--type-14-size' as string]: '28px', ['--type-14-line' as string]: '34px' }}>
        <Story />
      </div>
    ),
  ],
  play: async ({ canvasElement }) => {
    const tabs = within(canvasElement).getAllByRole('button').filter((b) => b.getAttribute('aria-label') !== 'Capture')
    const boxes = tabs.map((t) => t.getBoundingClientRect())
    for (let i = 1; i < boxes.length; i++) {
      // each tab starts after the previous one ends: no label runs into its neighbour
      await expect(boxes[i].left).toBeGreaterThanOrEqual(boxes[i - 1].right - 0.5)
    }
  },
}
