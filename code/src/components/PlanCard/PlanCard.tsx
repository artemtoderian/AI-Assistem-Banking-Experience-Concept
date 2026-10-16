import { schedule, type Plan, type PlanContext } from '../../plan/schedule'
import { Button } from '../Button/Button'
import { Pill } from '../Pill/Pill'

export interface PlanCardProps {
  plan: Plan
  context: PlanContext
  /** AI tag label, e.g. "Suggested plan" or "Updated plan". */
  title: string
  /** active: awaiting a decision; replaced: superseded by a newer plan; approved: locked in. */
  state?: 'active' | 'replaced' | 'approved'
  /** phone: full card; compact: summary for narrow / secondary panes. */
  size?: 'phone' | 'compact'
  onAdjust?: () => void
  onReview?: () => void
}

const eur = (n: number) => `€${Math.round(n).toLocaleString('en-IE')}`
const date = (d: Date) =>
  d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })

const LEVEL_LABEL = { ok: 'Comfortable', tight: 'Tight', stretch: 'Stretch' } as const
const LEVEL_TONE = { ok: 'ok', tight: 'neutral', stretch: 'neutral' } as const

export function PlanCard({
  plan,
  context,
  title,
  state = 'active',
  size = 'phone',
  onAdjust,
  onReview,
}: PlanCardProps) {
  const s = schedule(plan, context)
  const compact = size === 'compact'
  const decided = state !== 'active'

  return (
    <article
      className={`plan plan--${size} plan--${state}`}
      aria-label={title}
      aria-disabled={state === 'replaced' || undefined}
    >
      <header className="plan-head">
        <Pill tone="ai">{title}</Pill>
        {state === 'replaced' && <Pill tone="neutral">Replaced</Pill>}
        {state === 'approved' && <Pill tone="ok">Approved</Pill>}
      </header>

      <p className="plan-amount">
        <span className="big">{eur(plan.monthly)}</span>
        <span className="per">a month, on the 26th</span>
      </p>
      {plan.kick > 0 && (
        <p className="plan-kick">
          plus <b>{eur(plan.kick)}</b> today from Savings
        </p>
      )}
      {plan.skipDec && <p className="plan-kick">December skipped</p>}

      <div className="plan-result">
        <strong>
          {eur(context.goal)} by {date(s.end)}
        </strong>
        {!compact && <small>{s.count} monthly transfers</small>}
      </div>

      <div className="plan-pills">
        <Pill tone={s.onTime ? 'ok' : 'neutral'}>
          {s.onTime ? 'Before summer' : 'After summer starts'}
        </Pill>
        <Pill tone={LEVEL_TONE[s.level]}>{LEVEL_LABEL[s.level]}</Pill>
      </div>

      {!compact && (
        <p className="plan-afford">
          {s.spare >= 0
            ? `Leaves about ${eur(s.spare)} spare in a typical month`
            : `About ${eur(-s.spare)} more than you usually have left`}
        </p>
      )}

      {!decided && (
        <footer className="plan-actions">
          <Button variant="glassy" onClick={onAdjust}>
            Adjust
          </Button>
          <Button variant="solid" onClick={onReview}>
            Review plan
          </Button>
        </footer>
      )}
    </article>
  )
}
