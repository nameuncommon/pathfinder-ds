import type { Meta, StoryObj } from '@storybook/react-vite'
import { DesktopThisWeek } from './DesktopThisWeek'
import '../../app/app.css'

const url = 'https://www.figma.com/design/ZKIX0oa2fm0OwNIGvRWJXJ?node-id=518-534'

const meta = {
  title: 'Screens/Desktop this week',
  component: DesktopThisWeek,
  parameters: {
    layout: 'fullscreen',
    design: { type: 'figma', url },
    docs: {
      description: {
        component: `The desktop planning view, composed only from library components on a fixed 1440 by 900 canvas: sidebar, the seven days, carried forward, due this week, printables, and the week panel. [Figma frame](${url})`,
      },
    },
  },
} satisfies Meta<typeof DesktopThisWeek>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
