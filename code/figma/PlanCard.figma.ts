// url=https://www.figma.com/design/7jBSiLPca3tR2ZAye28knU/WIT-Test-Task?node-id=25-586
// source=src/components/PlanCard/PlanCard.tsx
// component=PlanCard
import figma from 'figma'
const instance = figma.selectedInstance

// Figma VARIANT -> code prop. Every option is listed so none resolve to undefined.
const size = instance.getEnum('Size', {
  Phone: 'phone',
  Compact: 'compact',
})
const state = instance.getEnum('State', {
  Active: 'active',
  Replaced: 'replaced',
  Approved: 'approved',
})

// The AI tag (a Pill instance) carries the card title in its Label.
const tag = instance.findInstance('Tag')
let title = 'Suggested plan'
if (tag && tag.type === 'INSTANCE') {
  title = tag.getString('Label')
}

// Figma TEXT props (Amount, Detail, Result, Transfers, Affordability) are derived
// copy, not inputs: PlanCard computes them from `plan` + `context` via schedule().
// They are intentionally not mapped to props; the snippet shows the data model instead.
export default {
  example: figma.code`
    <PlanCard
      title="${title}"
      size="${size}"
      state="${state}"
      plan={plan}
      context={planContext}
      onAdjust={openAdjustSheet}
      onReview={openReview}
    />
  `,
  imports: ['import { PlanCard } from "@dusk/ui"'],
  id: 'plan-card',
  metadata: { nestable: true },
}
