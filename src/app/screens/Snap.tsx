import { Button } from '../../components/Button'
import { Mark } from '../../components/Mark'
import { Viewfinder } from '../../components/Viewfinder'
import { snapImage, snapSize } from '../assets'
import { reads } from '../data'
import { Screen } from '../Screen'
import type { ScreenActions } from './Open'

const lines = [
  ...reads.map((r) => ({ mark: r.mark, text: r.text })),
  { mark: 'task' as const, text: 'book flights' },
]

export function Snap({ focusTitle, onNext, onBack, onSkip }: ScreenActions) {
  return (
    <Screen
      eyebrow="Morning · 2 of 4"
      title="Snap the spread"
      support="Same spread every morning; it reads what's new"
      step={2}
      onBack={onBack}
      focusTitle={focusTitle}
      action={
        <Button variant="quiet" onClick={onSkip}>
          Skip today
        </Button>
      }
    >
      <Viewfinder found weekCode="W42" corners={4} onTake={onNext}>
        {snapImage ? (
          <img
            className="pf-viewfinder__page"
            src={snapImage}
            alt=""
            width={snapSize.width}
            height={snapSize.height}
          />
        ) : (
          <span className="pf-paper pf-viewfinder__page" aria-hidden="true">
            {lines.map((l) => (
              <span key={l.text} className="pf-viewfinder__line">
                <Mark type={l.mark} tone="navy" size={18} decorative />
                {l.text}
              </span>
            ))}
          </span>
        )}
      </Viewfinder>
    </Screen>
  )
}
