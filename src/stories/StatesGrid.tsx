import type { ReactNode } from 'react'

export type UiState = 'default' | 'hover' | 'focus' | 'pressed' | 'disabled'

export const allStates: UiState[] = ['default', 'hover', 'focus', 'pressed', 'disabled']

/** Story parameters that force each cell's pseudo-class with storybook-addon-pseudo-states. */
export const statesParameters = {
  pseudo: {
    hover: ['.pf-state--hover'],
    focusVisible: ['.pf-state--focus'],
    active: ['.pf-state--pressed'],
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
    <div className="pf-ambient" style={{ display: 'flex', flexWrap: 'wrap', gap: 24, padding: 24, borderRadius: 14 }}>
      {states.map((s) => (
        <div key={s} style={{ display: 'flex', flexDirection: 'column', gap: 8, width }}>
          <div className={`pf-state--${s}`}>{render(s)}</div>
          <span style={{ color: 'var(--text-muted)', fontSize: 12, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{s}</span>
        </div>
      ))}
    </div>
  )
}
