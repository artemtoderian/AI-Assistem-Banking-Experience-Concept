export interface Plan {
  /** Monthly transfer in EUR. */
  monthly: number
  /** One-off head start taken from Savings today, in EUR. */
  kick: number
  /** Skip the December transfer. */
  skipDec: boolean
}

export interface PlanContext {
  goal: number
  /** What the customer typically has left each month, in EUR. */
  free: number
  /** First transfer happens on the 26th of this month. */
  start: Date
  /** The "before summer" deadline. */
  deadline: Date
}

export type AffordLevel = 'ok' | 'tight' | 'stretch'

export interface Schedule {
  transfers: { date: Date; amount: number }[]
  count: number
  end: Date
  onTime: boolean
  /** free - monthly; negative means the plan exceeds typical free cash. */
  spare: number
  level: AffordLevel
}

const MAX_MONTHS = 72

export function schedule(plan: Plan, ctx: PlanContext): Schedule {
  const transfers: Schedule['transfers'] = []
  let total = Math.min(plan.kick, ctx.goal)

  for (let i = 0; total < ctx.goal && i < MAX_MONTHS; i++) {
    const date = new Date(ctx.start.getFullYear(), ctx.start.getMonth() + i, 26)
    if (plan.skipDec && date.getMonth() === 11) continue
    const amount = Math.min(plan.monthly, ctx.goal - total)
    transfers.push({ date, amount })
    total += amount
  }

  const end = transfers.length ? transfers[transfers.length - 1].date : ctx.start
  const ratio = plan.monthly / ctx.free
  return {
    transfers,
    count: transfers.length,
    end,
    onTime: end <= ctx.deadline,
    spare: ctx.free - plan.monthly,
    level: ratio <= 0.75 ? 'ok' : ratio <= 0.95 ? 'tight' : 'stretch',
  }
}
