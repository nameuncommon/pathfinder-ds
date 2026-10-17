import './ProgressBar.css'

export interface ProgressBarProps {
  step: number
  total: number
}

export function ProgressBar({ step, total }: ProgressBarProps) {
  const pct = total > 0 ? Math.min(100, Math.max(0, (step / total) * 100)) : 0
  return (
    <div
      className="pf-progress"
      role="progressbar"
      aria-valuemin={0}
      aria-valuenow={step}
      aria-valuemax={total}
      aria-valuetext={`Step ${step} of ${total}`}
    >
      <div className="pf-progress__fill" style={{ width: `${pct}%` }} />
    </div>
  )
}
