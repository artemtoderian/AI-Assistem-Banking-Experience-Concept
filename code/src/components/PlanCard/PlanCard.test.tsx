import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import { PlanCard } from './PlanCard'

const context = { goal: 3000, free: 440, start: new Date(2026, 9, 1), deadline: new Date(2027, 7, 31) }
const plan = { monthly: 300, kick: 600, skipDec: false }

describe('PlanCard', () => {
  it('shows actions only while active', () => {
    expect(renderToStaticMarkup(<PlanCard plan={plan} context={context} title="Suggested plan" />)).toContain('Review plan')
    expect(renderToStaticMarkup(<PlanCard plan={plan} context={context} title="x" state="approved" />)).not.toContain('Review plan')
  })
  it('hides secondary copy when compact', () => {
    const html = renderToStaticMarkup(<PlanCard plan={plan} context={context} title="x" size="compact" />)
    expect(html).not.toContain('monthly transfers')
  })
})
