# WIT — AI Assisted Design Challenge · Concept

Dusk: an AI-native mobile banking concept. A customer states a goal
("save €3,000 for a holiday next summer"), the assistant proposes a plan,
the user adjusts it, then reviews and explicitly approves it.

## Structure

- `prototypes/` — interactive HTML prototypes. Open in a browser.
  Fonts load from Google Fonts, so be online.
  - `iphone.html` — Dusk on iPhone
  - `iphone-duo-open.html` — Dusk on iPhone Duo (open)
  - `iphone-duo-closed.html` — Dusk on iPhone Duo (closed)
- `handoff/` — Plan card component-to-code handoff spec (Claude Doc export).
- `exports/screens/` — PNG/PDF captures of key screens and states (to generate).
- `exports/recordings/` — screen recordings of the core journey (to generate).
- `code/` — production mapping of the Plan card component (to build).

## Sources

- Figma file: WIT-Test-Task (https://www.figma.com/design/7jBSiLPca3tR2ZAye28knU/WIT-Test-Task)
  Plan card component set: page "Design System", node 25:586
- Published prototypes:
  - iPhone: https://claude.ai/artifact/3AXEaJKcNZieBi6yvRh7CM
  - iPhone Duo (open): https://claude.ai/artifact/QVqf9sD7mkYxxLceMtwxAL
  - iPhone Duo (closed): https://claude.ai/artifact/HAY2xyxMxw2Mi2DCMjXpt2
- Plan card handoff doc: https://claude.ai/code/artifact/d70d1043-866c-40ef-b5e3-7a8d75e943d5

## Challenge deliverables (from the brief)

- Figma file with ~4–6 polished mobile screens + supporting design system
- Interactive Figma prototype of the primary journey
- 1–2 summary slides: user journey, design rationale, AI tools used, links
- Optional: component-to-code mapping or Code Connect example

Evaluation weights: UX & product thinking 25% · Visual design 20% ·
AI-assisted design & judgement 25% · Figma & design system 15% ·
Prototype & handoff 15%.

## Next steps for Claude Code

1. Capture each prototype's key screens and states into `exports/screens/`
   (Playwright, mobile viewport, wait for fonts).
2. Turn the Plan card spec in `handoff/` into a real `PlanCard` component in
   `code/` with the `schedule()` function and its unit tests.
3. Code Connect templates are in `code/figma/` (`.figma.ts`, parserless). Publish with `npm run figma:publish`; see `handoff/MAPPING.md`.

## Code Connect status

The Code Connect mapping for the Plan card is complete as files but **not published to Figma**.
Figma rejected the publish (`send_code_connect_mappings`, 2026-10-16) because Code Connect
requires a library on an Organization or Enterprise plan, and WIT-Test-Task is not on one.
`npm run figma:dry-run` in `code/` parses all three templates (PlanCard 25:586, Pill 22:331,
Button 22:284). To publish, move the file to a qualifying plan, set `FIGMA_ACCESS_TOKEN`, and run
`npm run figma:publish`. See `handoff/MAPPING.md`.
