import { useId } from 'react'
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

export interface SnapProps extends ScreenActions {
  photo?: 'ok' | 'blurry'
  onRetry?: () => void
}

export function Snap({ focusTitle, onNext, onBack, onSkip, photo = 'ok', onRetry }: SnapProps) {
  const blurry = photo === 'blurry'
  const statusId = useId()
  const take = blurry ? (onRetry ?? (() => {})) : onNext
  return (
    <Screen
      eyebrow="Morning · 2 of 4"
      title="Snap the spread"
      support={
        blurry
          ? 'It came out blurry. Hold the phone steady over the spread and tap to try again.'
          : "Same spread every morning; it reads what's new"
      }
      step={2}
      onBack={onBack}
      focusTitle={focusTitle}
      escape={
        <Button variant="ghost" onClick={onSkip}>
          Skip today
        </Button>
      }
      action={
        <Button onClick={take} aria-describedby={statusId}>
          Take the photo
        </Button>
      }
    >
      <Viewfinder found={!blurry} blurry={blurry} weekCode="W42" corners={4} onTake={take} pointerOnly statusId={statusId}>
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
