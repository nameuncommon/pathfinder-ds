import type { Meta, StoryObj } from '@storybook/react-vite'
import { DotGrid } from './DotGrid'

const meta = {
  title: 'Components/DotGrid',
  component: DotGrid,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'The insert\'s notes dot grid, used as texture. On navy it fades out over the top 240px of a screen; on cream it sits under paper content. It is decorative only and never sits behind text that has to be read.',
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
