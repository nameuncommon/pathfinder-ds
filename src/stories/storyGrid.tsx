import type { CSSProperties, ReactNode } from 'react'

/**
 * Shared frame for grid-style stories (variant matrices, state galleries) so
 * they read as an intentional composed sheet instead of floating loose
 * against the bare canvas. Bordered `--radius-lg` panel, filled with either
 * surface tier:
 * - `raised` (default) - the same raised-card recipe every other composed
 *   surface in this system uses; picked because the canvas body itself is
 *   already painted `--surface-base` by the preview decorator, so a
 *   base-colored fill alone would blend into it with no visible edge.
 * - `base` - for stories whose content's own hover/lifted states are *drawn
 *   in* `--surface-raised` (TaskRow's hover/dragging rows); a raised wrapper
 *   would erase that contrast, so those opt into `base` and rely on the
 *   border alone for framing.
 * This is the fix the P0 canvas-void critique asked for, applied once here
 * instead of re-styling each grid story by hand.
 */
export function StoryGrid({
  children,
  maxWidth = 640,
  surface = 'raised',
  style,
}: {
  children: ReactNode
  maxWidth?: number
  surface?: 'raised' | 'base'
  style?: CSSProperties
}) {
  return (
    <div
      style={{
        padding: 'var(--space-6)',
        maxWidth,
        background: surface === 'raised' ? 'var(--surface-raised)' : 'var(--surface-base)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-lg)',
        boxSizing: 'border-box',
        ...style,
      }}
    >
      {children}
    </div>
  )
}
