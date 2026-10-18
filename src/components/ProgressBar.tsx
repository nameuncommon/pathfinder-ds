import './ProgressBar.css'

export interface ProgressBarProps {
  step: number
  total: number
  /** Accessible name for the bar, e.g. the flow it tracks. */
  label?: string
}

export function ProgressBar({ step, total, label = 'Progress' }: ProgressBarProps) {
  const pct = total > 0 ? Math.min(100, Math.max(0, (step / total) * 100)) : 0
  return (
    <div
      className="pf-progress"
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuenow={step}
      aria-valuemax={total}
      aria-valuetext={`Step ${step} of ${total}`}
    >
      <div className="pf-progress__fill" style={{ width: `${pct}%` }} />
    </div>
  )
}
