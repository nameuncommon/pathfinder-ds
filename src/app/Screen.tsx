import { useEffect, useRef, type ReactNode } from 'react'
import { AppBar } from '../components/AppBar'
import { ProgressBar } from '../components/ProgressBar'

export interface ScreenProps {
  eyebrow: string
  /** The eyebrow is today's date (Open only): it keeps the gold. */
  dateEyebrow?: boolean
  title: string
  /** large: the greeting and the ending. step: a heading inside the flow. */
  titleSize?: 'large' | 'step'
  support?: string
  /** 1 to 4 shows the progress bar; omit for open and done. */
  step?: number
  onBack?: () => void
  /** The app bar dial settles in, like a compass coming to rest (Done only). */
  settle?: boolean
  /** Move focus to the heading on mount (set after the first navigation). */
  focusTitle?: boolean
  /** A status shown just above the action, such as the offline toast. */
  notice?: ReactNode
  /**
   * Pinned to the bottom of the viewport. The one rule: this is the step's gold
   * forward action when it has one. Any way out goes in `escape`.
   */
  action?: ReactNode
  /** A quiet way out (skip, leave for later, the inbox), rendered just above the action. */
  escape?: ReactNode
  children: ReactNode
}

export function Screen({
  eyebrow,
  dateEyebrow = false,
  title,
  titleSize = 'large',
  support,
  step,
  onBack,
  focusTitle = false,
  settle = false,
  notice,
  action,
  escape,
  children,
}: ScreenProps) {
  const headingRef = useRef<HTMLHeadingElement>(null)
  useEffect(() => {
    if (focusTitle) headingRef.current?.focus({ preventScroll: true })
  }, [focusTitle])

  return (
    <div className={settle ? 'pf-ambient pf-app pf-app--settle' : 'pf-ambient pf-app'}>
      <div className="pf-app__column">
        <div className="pf-app__top">
          <AppBar onBack={onBack} />
          {step !== undefined && <ProgressBar step={step} total={4} label="Morning ritual" />}
        </div>
        <main className="pf-app__content">
          <p className={dateEyebrow ? 'pf-app__eyebrow pf-app__eyebrow--date' : 'pf-app__eyebrow'}>{eyebrow}</p>
          <h1 ref={headingRef} tabIndex={-1} className={titleSize === 'step' ? 'pf-app__title pf-app__title--step' : 'pf-app__title'}>
            {title}
          </h1>
          {support && <p className="pf-app__support">{support}</p>}
          {children}
        </main>
        {(notice || escape || action) && (
          <div className="pf-app__action">
            {notice}
            {escape}
            {action}
          </div>
        )}
      </div>
    </div>
  )
}
