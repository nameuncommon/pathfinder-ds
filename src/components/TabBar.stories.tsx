import type { Meta, StoryObj } from '@storybook/react-vite'
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
