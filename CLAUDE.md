# pathfinder-ds - Claude Instructions

**Purpose:** design and build the Pathfinder design system, a self-initiated concept design system
for a fictional planner/to-do/notes app, built end to end (brand, tokens, Figma library, code) as a
portfolio study.

## Imports
@./.claude/rules/build.md
@./.claude/rules/conventions.md
@./CLAUDE.local.md

## What this project is
Pathfinder is a fictional brand (a planner/to-do/notes app) invented so this study can demonstrate
range across the full design-system pipeline - brand, tokens, component library, and a real code
layer. "Done" means: a brand identity, a `tokens/tokens.json` authored in this repo as the single
source of truth, a Figma library whose variables mirror it by hand, and a small Vite + React +
Storybook codebase (9 of 16 components) that consumes it via generated CSS. The code layer is proof
of a real one-direction token pipeline, not a production app.

## Token flow
`tokens/tokens.json` is authored and maintained in this repo - it is the single source of truth.
Figma variables are hand-built once to mirror it, and the CSS layer (custom properties) is generated
from it. `design.md` also mirrors it in spec format for anyone (or anything) building UI without
opening Figma. The flow is one-directional out of tokens.json:
`tokens/tokens.json` -> Figma variables, and `tokens/tokens.json` -> CSS custom properties /
`design.md`. Nothing may drift from `tokens.json` - never hand-edit Figma variables or CSS
independently of it, and never let `design.md` or code drift without updating `tokens.json` first.

## Naming constraints
- Figma naming (pages, layers, variants): lowercase, ` / ` delimited page/layer names, lowercase
  variant values.
- Token naming: lowercase, slash-delimited (e.g. `accent/default`).
- Dark theme is first-class; light is a mirror at the semantic tier, not a separate design pass.
- The wayfinding motif is a hint only - subtle naming and at most one empty-state texture, never UI
  chrome.
- No em dashes in any public-facing copy (README, Storybook docs, case study).

## Design source of truth
This project's visual system lives in `design.md`, mirroring `tokens/tokens.json`. When building or
reviewing any UI, read `design.md` first and match its tokens - do not invent colors, type, or
spacing.

## Specs & plans
Every spec/plan in `specs/` ends with a `## Proof` section naming the objective done-evidence (test,
screenshot match, metric) **before** building starts. No nameable proof = spec not specific enough
yet.

## Decisions
Every task that makes a design decision appends one line to `decisions.md` (repo root):
`what I did | why over the alternative`. Read it before making a decision that might repeat one
already made.

## Accessibility
Contrast is measured, not assumed. `brand/palette.md` holds the validated pairs and the documented
exceptions. Two rules that are easy to get wrong:
- `accent/default` is a fill; use `accent/text` for accent-coloured type.
- `border/subtle` is for dividers; `border/strong` is for boundaries that ARE a control (input,
  checkbox), which need 3:1 per WCAG 1.4.11.
