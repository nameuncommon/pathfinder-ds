import { useEffect, useRef, type ReactNode } from 'react'
import { AppBar } from '../components/AppBar'
import { ProgressBar } from '../components/ProgressBar'

export interface ScreenProps {
  eyebrow: string
  title: string
  support?: string
  /** 1 to 4 shows the progress bar; omit for open and done. */
  step?: number
  onBack?: () => void
  /** Move focus to the heading on mount (set after the first navigation). */
  focusTitle?: boolean
  /** Pinned to the bottom of the viewport. */
  action?: ReactNode
  children: ReactNode
}

export function Screen({
  eyebrow,
  title,
  support,
  step,
  onBack,
  focusTitle = false,
  action,
  children,
}: ScreenProps) {
  const headingRef = useRef<HTMLHeadingElement>(null)
  useEffect(() => {
    if (focusTitle) headingRef.current?.focus({ preventScroll: true })
  }, [focusTitle])

  return (
    <div className="pf-ambient pf-app">
      <div className="pf-app__column">
        <div className="pf-app__top">
          <AppBar onBack={onBack} />
          {step !== undefined && <ProgressBar step={step} total={4} />}
        </div>
        <main className="pf-app__content">
          <p className="pf-app__eyebrow">{eyebrow}</p>
          <h1 ref={headingRef} tabIndex={-1} className="pf-app__title">
            {title}
          </h1>
          {support && <p className="pf-app__support">{support}</p>}
          {children}
        </main>
        {action && <div className="pf-app__action">{action}</div>}
      </div>
    </div>
  )
}
