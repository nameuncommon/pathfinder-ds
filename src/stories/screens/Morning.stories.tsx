import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { snippetOnPaperFor, snippetSize } from '../../app/assets'
import { CorrectionSheet } from '../../app/CorrectionSheet'
import { inbox, reads, topThree } from '../../app/data'
import { Check } from '../../app/screens/Check'
import { Done } from '../../app/screens/Done'
import { Open } from '../../app/screens/Open'
import { Snap } from '../../app/screens/Snap'
import { Sort } from '../../app/screens/Sort'
import '../../app/app.css'

// These stories render the real screens from src/app/screens with the sample
// data, so the app and Storybook can never drift apart.
const figma = (node: string) => `https://www.figma.com/design/ZKIX0oa2fm0OwNIGvRWJXJ?node-id=${node}`
const doc = (text: string, node: string) => ({
  docs: { description: { story: `${text} [Figma frame](${figma(node)})` } },
  design: { type: 'figma', url: figma(node) },
})
const actions = { focusTitle: false, onNext: fn(), onBack: fn(), onSkip: fn() }
const allReads = [...reads, ...topThree]

const meta = {
  title: 'Screens/Morning ritual',
  parameters: { layout: 'fullscreen', viewport: { defaultViewport: 'mobile' } },
  decorators: [
    (Story) => (
      <div style={{ width: 390, minHeight: 844, margin: '0 auto' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Step1Open: Story = {
  name: '01 open',
  parameters: doc('Today and the door to the ritual: the one thing on paper, today’s calendar, the snap.', '515-3'),
  render: () => <Open {...actions} />,
}

export const Step2Snap: Story = {
  name: '02 snap',
  parameters: doc('The viewfinder has found the spread; tap to take the photo or skip today.', '515-137'),
  render: () => <Snap {...actions} />,
}

export const Step3Check: Story = {
  name: '03 check',
  parameters: doc('What it read from yesterday and today’s top 3; tap a row to fix it.', '516-181'),
  render: () => <Check {...actions} reads={allReads} onFix={fn()} />,
}

export const Step4Sort1: Story = {
  name: '04 sort / 1 of 3',
  parameters: doc('One inbox item at a time; one tap on a direction decides it.', '516-315'),
  render: () => <Sort {...actions} index={0} onChoose={fn()} onLeave={fn()} />,
}

export const Step4Sort2: Story = {
  name: '04 sort / 2 of 3',
  parameters: doc('The second inbox item.', '516-426'),
  render: () => <Sort {...actions} index={1} onChoose={fn()} onLeave={fn()} />,
}

export const Step4Sort3: Story = {
  name: '04 sort / 3 of 3',
  parameters: doc('The last inbox item; choosing finishes the ritual.', '516-537'),
  render: () => <Sort {...actions} index={2} onChoose={fn()} onLeave={fn()} />,
}

export const Done_: Story = {
  name: 'done',
  parameters: doc('Every item decided: All sorted.', '517-500'),
  render: () => <Done focusTitle={false} decisions={{ [inbox[0].id]: 'E', [inbox[1].id]: 'N', [inbox[2].id]: 'S' }} onRestart={fn()} />,
}

export const FixWhatIRead: Story = {
  name: 'fix what I read',
  parameters: doc('The correction sheet over the check step, with the handwriting it read and the field to fix it.', '517-554'),
  render: () => {
    const item = reads[2]
    return (
      <>
        <Check {...actions} reads={allReads} onFix={fn()} />
        <CorrectionSheet
          text={item.text}
          snippetSrc={snippetOnPaperFor(item)}
          snippetSize={snippetSize(item.id)}
          returnFocusTo={null}
          onSave={fn()}
          onCancel={fn()}
        />
      </>
    )
  },
}

export const StateSnapBlurry: Story = {
  name: 'state / snap blurry',
  parameters: doc('The photo came out blurry: say so plainly, tap to try again, skip still offered.', '541-655'),
  render: () => <Snap {...actions} photo="blurry" onRetry={fn()} />,
}

export const StateCheckNothingNew: Story = {
  name: 'state / check nothing new',
  parameters: doc('Nothing new since the last snap: nothing to check, carry on.', '541-714'),
  render: () => <Check {...actions} reads={[]} onFix={fn()} />,
}

export const StateSortEmpty: Story = {
  name: 'state / sort empty',
  parameters: doc('The inbox is empty: All sorted.', '541-762'),
  render: () => <Sort {...actions} items={[]} index={0} onChoose={fn()} onLeave={fn()} />,
}

export const StateOffline: Story = {
  name: 'state / offline',
  parameters: doc('Offline: everything is saved on the phone and syncs later; nothing else changes.', '541-802'),
  render: () => <Open {...actions} offline />,
}

export const StateSnapSkipped: Story = {
  name: 'state / snap skipped',
  parameters: doc('The snap was skipped today: Today shows what it already knows, with no nag.', '541-832'),
  render: () => <Open {...actions} snapSkipped lastSync="Thu 21 Oct · 7:40 pm" />,
}
