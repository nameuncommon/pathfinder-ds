import type { ReactNode } from 'react'

export type UiState = 'default' | 'hover' | 'focus' | 'pressed' | 'disabled'

export const allStates: UiState[] = ['default', 'hover', 'focus', 'pressed', 'disabled']

/** Story parameters that force each cell's pseudo-class with storybook-addon-pseudo-states. */
// The addon applies the state to the matched element itself, so target the
// control in each cell (and the input or button inside composite controls).
const cellTargets = (state: string) => [`.pf-state--${state} > *`, `.pf-state--${state} input`, `.pf-state--${state} button`, `.pf-state--${state} a`]

export const statesParameters = {
  pseudo: {
    hover: cellTargets('hover'),
    focusVisible: cellTargets('focus'),
    active: cellTargets('pressed'),
  },
}

/** Interaction states side by side, forced so they show without interacting. */
export function StatesGrid({
  states = allStates,
  render,
  width = 200,
}: {
  states?: UiState[]
  render: (state: UiState) => ReactNode
  width?: number
}) {
  return (
    <div className="pf-states">
      {states.map((s) => (
        <div key={s} style={{ display: 'flex', flexDirection: 'column', gap: 8, width }}>
          <div className={`pf-state--${s}`}>{render(s)}</div>
          <span style={{ color: 'var(--text-muted)', fontSize: 12, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{s}</span>
        </div>
      ))}
    </div>
  )
}
