import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, waitFor, within } from 'storybook/test'
import { MorningRitual } from '../../app/MorningRitual'

// The coded morning ritual, driven by interaction tests that run in the
// browser with every story test (npm run test:stories).
const meta = {
  title: 'Screens/Morning ritual (interactive)',
  component: MorningRitual,
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <div style={{ width: 390, minHeight: 844, margin: '0 auto' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof MorningRitual>

export default meta
type Story = StoryObj<typeof meta>

export const FullRitual: Story = {
  name: 'full ritual: open to All sorted',
  play: async ({ canvasElement }) => {
    const c = within(canvasElement)
    await userEvent.click(c.getByRole('button', { name: /Snap this week/ }))
    await userEvent.click(await c.findByRole('button', { name: 'Take the photo' }))
    await userEvent.click(await c.findByRole('button', { name: 'Looks right' }))
    for (let i = 0; i < 3; i++) {
      await userEvent.click(await c.findByRole('button', { name: /^N\b|Now/ }))
    }
    await expect(await c.findByRole('heading', { level: 1, name: 'All sorted' })).toBeInTheDocument()
  },
}

export const FixARead: Story = {
  name: 'correction sheet: save, then Escape returns focus to the row',
  play: async ({ canvasElement }) => {
    const c = within(canvasElement)
    await userEvent.click(c.getByRole('button', { name: /Snap this week/ }))
    await userEvent.click(await c.findByRole('button', { name: 'Take the photo' }))
    const row = await c.findByRole('button', { name: 'Fix: call the dentist, moved' })
    await userEvent.click(row)
    const sheet = await c.findByRole('dialog', { name: 'Fix what I read' })
    const field = within(sheet).getByLabelText('What it says')
    await userEvent.clear(field)
    await userEvent.type(field, 'call the vet')
    await userEvent.click(within(sheet).getByRole('button', { name: 'Save' }))
    const fixed = await c.findByRole('button', { name: 'Fix: call the vet, moved' })
    await waitFor(() => expect(fixed).toHaveFocus())
    await userEvent.click(fixed)
    await c.findByRole('dialog', { name: 'Fix what I read' })
    await userEvent.keyboard('{Escape}')
    await waitFor(() => expect(c.queryByRole('dialog')).not.toBeInTheDocument())
    await waitFor(() => expect(fixed).toHaveFocus())
  },
}
