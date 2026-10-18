import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, fn, userEvent, within } from 'storybook/test'
import { Button } from './Button'
import { Input } from './Input'
import { Sheet } from './Sheet'
import { componentDocs } from '../stories/componentDocs'

const meta = {
  title: 'Components/Sheet',
  component: Sheet,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen', docs: { description: { component: componentDocs.Sheet }, story: { inline: false, height: '520px' } } },
  args: { title: 'Fix what it read', returnFocusTo: null, onClose: fn(), children: null },
  render: (args) => (
    <div style={{ minHeight: 520 }}>
      <Sheet {...args}>
        <Input label="What it says" defaultValue="run 5k" />
        <div className="pf-sheet__actions">
          <Button>Save</Button>
          <Button variant="quiet" onClick={args.onClose}>Cancel</Button>
        </div>
      </Sheet>
    </div>
  ),
} satisfies Meta<typeof Sheet>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const KeyboardStaysInside: Story = {
  name: 'keyboard stays inside',
  play: async ({ canvasElement, args }) => {
    const c = within(canvasElement)
    await expect(c.getByLabelText('What it says')).toHaveFocus()
    await userEvent.tab()
    await userEvent.tab()
    await userEvent.tab()
    await expect(c.getByLabelText('What it says')).toHaveFocus()
    await userEvent.keyboard('{Escape}')
    await expect(args.onClose).toHaveBeenCalled()
  },
}
