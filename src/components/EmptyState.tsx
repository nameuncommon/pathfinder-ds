import { Button } from './Button'
import { DotGrid } from './DotGrid'
import './EmptyState.css'

export interface EmptyStateProps {
  /** Short and specific: says what is absent. */
  title: string
  /** One line: why this is fine, or what happens next. */
  line: string
  /** At most one action; omit it when there is nothing to do. */
  action?: { label: string; onClick: () => void }
  /** glass: a glass panel. dots: the faint dot strip above the title (the dot texture's one empty-state use). */
  surface?: 'glass' | 'dots'
  headingLevel?: 2 | 3
}

/** Figma `empty state` (536:112). */
export function EmptyState({ title, line, action, surface = 'glass', headingLevel = 2 }: EmptyStateProps) {
  const Heading = headingLevel === 3 ? 'h3' : 'h2'
  return (
    <div className={surface === 'glass' ? 'pf-glass pf-empty pf-empty--glass' : 'pf-empty pf-empty--dots'}>
      {surface === 'dots' && (
        <span className="pf-empty__dots" aria-hidden="true">
          <DotGrid surface="navy" />
        </span>
      )}
      <Heading className="pf-empty__title">{title}</Heading>
      <p className="pf-empty__line">{line}</p>
      {action ? (
        <span className="pf-empty__action">
          <Button variant="quiet" onClick={action.onClick}>
            {action.label}
          </Button>
        </span>
      ) : null}
    </div>
  )
}
