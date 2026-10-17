import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { ReadRow } from './ReadRow'

const meta = {
  title: 'Components/ReadRow',
  component: ReadRow,
  tags: ['autodocs'],
  args: { onFix: fn() },
  argTypes: {
    mark: { control: 'select', options: ['task', 'done', 'moved', 'dropped', 'matters', 'note'] },
  },
  parameters: {
    docs: {
      description: {
        component:
          'A line the app read from your notebook, shown so you can correct it. The whole row is one button named "Fix:" plus the text. When a cropped image of your handwriting is available it shows that instead of typed text, with the text as its description.',
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
} satisfies Meta<typeof ReadRow>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { mark: 'task', text: 'Call the plumber about the kitchen tap' },
}

const snippet =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="240" height="32"><text x="0" y="22" font-family="cursive" font-size="20" fill="#F3EEE3">Buy stamps</text></svg>',
  )

export const WithSnippet: Story = {
  args: { mark: 'note', text: 'Buy stamps', snippetSrc: snippet },
}
