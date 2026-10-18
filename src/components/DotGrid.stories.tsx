import type { Meta, StoryObj } from '@storybook/react-vite'
import { DotGrid } from './DotGrid'
import { componentDocs } from '../stories/componentDocs'

const meta = {
  title: 'Components/DotGrid',
  component: DotGrid,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          componentDocs.DotGrid,
      },
    },
  },
} satisfies Meta<typeof DotGrid>

export default meta
type Story = StoryObj<typeof meta>

export const NavyFade: Story = {
  args: { surface: 'navy', fade: true },
  render: (args) => (
    <div style={{ position: 'relative', width: 342, height: 260, background: 'var(--surface-base)', borderRadius: 14 }}>
      <DotGrid {...args} />
    </div>
  ),
}

export const OnCream: Story = {
  args: { surface: 'cream' },
  render: (args) => (
    <div className="pf-paper" style={{ position: 'relative', width: 250, height: 200, borderRadius: 4 }}>
      <DotGrid {...args} />
    </div>
  ),
}
