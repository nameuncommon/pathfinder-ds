import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button, type ButtonSize, type ButtonVariant } from './Button'
import { StoryGrid } from '../stories/storyGrid'

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'quiet', 'secondary', 'ghost', 'danger'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'One primary action per view. Primary carries the accent fill and marks the single thing you most want done on this screen; secondary and ghost carry everything else. Labels on primary and danger use `button/accent-label`, which flips between ink and paper by theme rather than being a fixed colour, so do not override it. Danger buttons pair with a confirmation step - see the `ConfirmPattern` story below for the minimal inline version. A real confirmation surface (focus-trapped, scrim-blocked) is the `Modal` component, which lives in the Figma layer of this system rather than in code.',
      },
    },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: { variant: 'primary', size: 'md', children: 'add task' },
}

export const Quiet: Story = {
  args: { variant: 'quiet', size: 'md', children: 'not today' },
  decorators: [
    (Story) => (
      <div className="pf-ambient" style={{ padding: '32px' }}>
        <Story />
      </div>
    ),
  ],
}

export const Secondary: Story = {
  args: { variant: 'secondary', size: 'md', children: 'schedule' },
}

export const Ghost: Story = {
  args: { variant: 'ghost', size: 'md', children: 'snooze' },
}

export const Danger: Story = {
  args: { variant: 'danger', size: 'md', children: 'delete list' },
}

export const Disabled: Story = {
  args: { variant: 'primary', size: 'md', children: 'add task', disabled: true },
}

const variants: ButtonVariant[] = ['primary', 'quiet', 'secondary', 'ghost', 'danger']
const sizes: ButtonSize[] = ['sm', 'md', 'lg']
const labels: Record<ButtonVariant, string> = {
  primary: 'add task',
  quiet: 'not today',
  secondary: 'schedule',
  ghost: 'snooze',
  danger: 'delete list',
}

export const AllVariants: Story = {
  args: { variant: 'primary', size: 'md', children: 'add task' },
  render: () => (
    <StoryGrid maxWidth={520}>
      <div style={{ display: 'grid', gap: '24px' }}>
        {sizes.map((size) => (
          <div key={size} style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <span
              style={{
                width: '32px',
                fontSize: '12px',
                color: 'var(--text-muted)',
                fontFamily: 'var(--font-mono)',
              }}
            >
              {size}
            </span>
            {variants.map((variant) => (
              <Button key={variant} variant={variant} size={size}>
                {labels[variant]}
              </Button>
            ))}
          </div>
        ))}
      </div>
    </StoryGrid>
  ),
}

function ConfirmDeleteDemo() {
  const [confirming, setConfirming] = useState(false)

  if (confirming) {
    return (
      <div style={{ display: 'flex', gap: 'var(--space-2)', alignItems: 'center' }}>
        <span
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'var(--type-13-size)',
            lineHeight: 'var(--type-13-line)',
            color: 'var(--text-primary)',
          }}
        >
          confirm delete?
        </span>
        <Button variant="danger" size="sm" onClick={() => setConfirming(false)}>
          yes
        </Button>
        <Button variant="ghost" size="sm" onClick={() => setConfirming(false)}>
          cancel
        </Button>
      </div>
    )
  }

  return (
    <Button variant="danger" size="sm" onClick={() => setConfirming(true)}>
      delete list
    </Button>
  )
}

/**
 * Confirm pattern: danger buttons never fire a destructive action on their
 * own click - they pair with a confirmation step first. This is the minimal
 * inline version, built from existing `Button` variants plus local state
 * (no new component). The full confirmation surface for a real product -
 * one that traps focus and blocks the page behind a scrim - is the `Modal`
 * component, which lives in the Figma layer only (not one of this study's
 * 8 code components); this story documents the pattern code-side without it.
 */
export const ConfirmPattern: Story = {
  args: { variant: 'danger', size: 'sm', children: 'delete list' },
  render: () => <ConfirmDeleteDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'click "delete list" to see the confirm step: the danger button swaps for a "confirm delete?" prompt with a danger "yes" and a ghost "cancel", both of which return to the resting state. no modal here - that pattern lives in Figma - this is the inline version any list row or settings screen can reach for with just `Button` + `useState`.',
      },
    },
  },
}
