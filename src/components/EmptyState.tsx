import './EmptyState.css'

export interface EmptyStateProps {
  /** Short, specific. Says what is absent, not "no data". */
  title: string
  /** One line. Tells the reader what to do next, or why this is fine. */
  description?: string
  /** Optional action. Omit it when there is genuinely nothing to do. */
  action?: { label: string; onClick: () => void }
  /**
   * The brand art is decorative and deliberately optional. It carries the
   * wayfinding motif, which the brand spec caps at "a hint" - one empty-state
   * texture and nothing else. Turn it off where an empty state appears
   * repeatedly in a list or a small panel and the art would become noise.
   */
  art?: boolean
}

export function EmptyState({ title, description, action, art = true }: EmptyStateProps) {
  return (
    <div className="pf-empty">
      {art ? (
        /* alt="" is correct here: the illustration restates the heading below
           it and adds nothing for a screen reader. Announcing it would be
           noise, not access. */
        <img className="pf-empty__art" src="/art/empty-no-results.png" alt="" aria-hidden="true" />
      ) : null}
      <p className="pf-empty__title">{title}</p>
      {description ? <p className="pf-empty__description">{description}</p> : null}
      {action ? (
        <button type="button" className="pf-empty__action" onClick={action.onClick}>
          {action.label}
        </button>
      ) : null}
    </div>
  )
}
