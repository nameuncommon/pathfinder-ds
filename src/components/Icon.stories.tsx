import type { Meta, StoryObj } from '@storybook/react-vite'
import { Icon, iconNames } from './Icon'

const meta = {
  title: 'Components/Icon',
  component: Icon,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'The approved Lucide icons (ISC licence): 24px grid, 2px stroke, coloured by the text around them. An icon always sits next to a text label and is hidden from screen readers.',
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
} satisfies Meta<typeof Icon>

export default meta
type Story = StoryObj<typeof meta>

export const Sun: Story = { args: { name: 'sun' } }

export const AllIcons: Story = {
  args: { name: 'sun' },
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, color: 'var(--text-primary)' }}>
      {iconNames.map((n) => (
        <div key={n} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, fontSize: 12 }}>
          <Icon name={n} />
          <span style={{ color: 'var(--text-muted)' }}>{n}</span>
        </div>
      ))}
    </div>
  ),
}
