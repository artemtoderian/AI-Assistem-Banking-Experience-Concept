# Plan card: Figma → code mapping

Figma: WIT-Test-Task, component set `Plan card`, node `25:586`
Code: `src/components/PlanCard/PlanCard.tsx` (React + TypeScript)
Code Connect: `figma/PlanCard.figma.ts` (parserless `.figma.ts` template), plus `Pill.figma.ts` and `Button.figma.ts` for the nested components.

## Properties

| Figma | Type | Code | Notes |
|---|---|---|---|
| `Size` = Phone / Compact | VARIANT | `size="phone" \| "compact"` | Compact drops the transfer count and the affordability line. |
| `State` = Active / Replaced / Approved | VARIANT | `state="active" \| "replaced" \| "approved"` | Active shows Adjust and Review. The other two hide the actions and show a state tag. |
| `Tag` (Pill instance, tone AI) → `Label` | nested TEXT | `title` | Read with `findInstance('Tag').getString('Label')`. |
| `State tag` (Pill instance, OK / Neutral) | nested instance | derived from `state` | Not a prop. Replaced gives a Neutral pill, Approved gives an OK pill. |
| `Amount` | TEXT | derived: `plan.monthly` | Not mapped. |
| `Detail` | TEXT | derived: `plan.kick`, `plan.skipDec` | Not mapped. |
| `Result` | TEXT | derived: `context.goal` + `schedule().end` | Not mapped. |
| `Transfers` | TEXT | derived: `schedule().count` | Not mapped. |
| `Affordability` | TEXT | derived: `schedule().spare` | Not mapped. |
| Nested `Pill` (timing, level) | instance | derived: `schedule().onTime`, `.level` | Computed, not passed in. |
| Nested `Button` ×2 (Adjust glassy, Review solid) | instances | `onAdjust`, `onReview` | The card owns its actions. |

## Why the five TEXT props are not mapped

In Figma they are placeholder copy. In production they are outputs of `schedule(plan, context)`, the same logic as the prototype's `schedule()`. Mapping them to string props would let callers put copy on screen that does not match the schedule, which is the wrong thing to allow for money. The Code Connect snippet shows the real inputs (`plan`, `context`) instead. A designer who selects the card in Dev Mode sees how to feed it data, not a pile of hard-coded strings.

## Nested components

- `Pill` (Figma node `22:331`) maps to `<Pill tone="ok|ai|neutral" icon>`. The `Tone` variant is mapped exhaustively, and `Icon` (INSTANCE_SWAP) is rendered through `executeTemplate()`.
- `Button` (Figma node `22:284`) maps to `<Button variant="solid|glassy" icon>`. `Style` becomes `variant`, and `Show icon` plus `Icon` become the `icon` prop. `State` (Default / Hover) is not mapped, because hover is CSS.
- Icons (`Icon/sun`, `Icon/check`, `Icon/down`, `Icon/sliders`) and `AI/Orb` have no Code Connect yet. This is the next mapping to add. Until then they are omitted from snippets rather than hard-coded.

## Publish

```bash
cd code
npm install
export FIGMA_ACCESS_TOKEN=...   # needs Code Connect write scope, Org/Enterprise plan
npm run figma:dry-run           # verified: lists PlanCard, Pill, Button
npm run figma:publish
```

## Verification status

- `tsc --noEmit` is clean and `vitest` passes (7 tests: `schedule()` logic and `PlanCard` rendering).
- `figma connect publish --dry-run` parses all three templates against the right node URLs.
- Not done: the actual publish. Figma refused it because the file is not on an Organization or Enterprise plan (see the root README).
- Not done: visual regression against the Figma frames. The CSS classes match the prototype but the stylesheet is not ported.
- Templates were written against the component properties reported by Figma MCP. They have not been rendered in Dev Mode.
