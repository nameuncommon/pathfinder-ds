import type { Meta, StoryObj } from '@storybook/react-vite'
import { GlassPanel } from './GlassPanel'

const meta = {
  title: 'Components/GlassPanel',
  component: GlassPanel,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'The desktop glass panel: cream 6% glass with a 16% edge and a 24px blur, with an optional small caps title that names the region. Under Reduce Transparency it becomes solid navy. Use GlassCard for compact phone cards.',
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
} satisfies Meta<typeof GlassPanel>

export default meta
type Story = StoryObj<typeof meta>

export const WeekSoFar: Story = {
  args: {
    title: 'Week so far',
    children: (
      <>
        <p style={{ margin: 0, fontWeight: 600 }}>14 done since Monday</p>
        <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: 14 }}>5 moved, 2 dropped on purpose</p>
      </>
    ),
  },
}
