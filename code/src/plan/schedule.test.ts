import { describe, expect, it } from 'vitest'
import { schedule, type PlanContext } from './schedule'

const ctx: PlanContext = {
  goal: 3000,
  free: 440,
  start: new Date(2026, 9, 1),
  deadline: new Date(2027, 7, 31),
}

describe('schedule', () => {
  it('counts transfers and honours the head start', () => {
    const s = schedule({ monthly: 300, kick: 600, skipDec: false }, ctx)
    expect(s.count).toBe(8)
    expect(s.transfers.reduce((a, t) => a + t.amount, 600)).toBe(3000)
    expect(s.onTime).toBe(true)
  })

  it('caps the last transfer at the remaining amount', () => {
    const s = schedule({ monthly: 700, kick: 0, skipDec: false }, ctx)
    expect(s.transfers.at(-1)!.amount).toBe(3000 - 700 * 4)
  })

  it('skips December and pushes the end date out', () => {
    const base = schedule({ monthly: 300, kick: 600, skipDec: false }, ctx)
    const skip = schedule({ monthly: 300, kick: 600, skipDec: true }, ctx)
    expect(skip.transfers.some(t => t.date.getMonth() === 11)).toBe(false)
    expect(skip.end > base.end).toBe(true)
  })

  it('classifies affordability', () => {
    expect(schedule({ monthly: 300, kick: 0, skipDec: false }, ctx).level).toBe('ok')
    expect(schedule({ monthly: 400, kick: 0, skipDec: false }, ctx).level).toBe('tight')
    expect(schedule({ monthly: 500, kick: 0, skipDec: false }, ctx).level).toBe('stretch')
  })

  it('reports spare cash, negative when over budget', () => {
    expect(schedule({ monthly: 300, kick: 0, skipDec: false }, ctx).spare).toBe(140)
    expect(schedule({ monthly: 500, kick: 0, skipDec: false }, ctx).spare).toBe(-60)
  })
})
