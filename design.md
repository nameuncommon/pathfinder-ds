# design.md - Google Labs design-system spec (alpha format)
# Token front-matter. Reference tokens in the body with {group.key}, e.g. {colors.primary}.
# Spec + CLI: github.com/google-labs-code/design.md  -  ALPHA: re-check the repo before wiring the CLI.
#
# This file MIRRORS tokens/tokens.json - the single source of truth for this project (see
# CLAUDE.md "Token flow"). Never hand-edit a value here without updating tokens.json first;
# tokens.json -> tokens/build.mjs -> src/styles/tokens.css is the one real generated pipeline,
# this file is a hand-maintained mirror of the same numbers for anyone (or anything) building
# UI without opening Figma or the code. Dark theme is first-class in this system, so the
# front-matter below reflects the dark palette; the light-theme mirror lives in the Colors
# section and in tokens.json's `semantic.light` block.
colors:
  primary: "#3E7BFA"      # accent/default, dark theme (blue/500)
  secondary: "#232733"    # ink/700, a mid-scale neutral surface step
  accent: "#6EA0FF"       # accent/hover, dark theme (blue/400)
  background: "#0A0B0D"   # surface/base, dark theme (ink/950)
  surface: "#191C23"      # surface/raised, dark theme (ink/800)
  text: "#F4F5F8"          # text/primary, dark theme (paper/50)
  muted: "#9AA1B4"         # text/muted, dark theme (slate/300)
  border: "#303648"        # border/subtle, dark theme (ink/600)
  success: "#4F8168"       # success, dark theme (green/500)
  warning: "#E8A33D"        # warning, dark theme (literal)
  danger: "#E5484D"         # danger, dark theme (literal)
  brand: "#C9A35A"          # brand/mark, dark theme (gold/500); mark and brand surfaces only, never UI
typography:
  fontFamily: "'Geist', -apple-system, 'Segoe UI', sans-serif"
  monoFamily: "'Geist Mono', ui-monospace, 'SF Mono', monospace"
  scale:                  # name: size / line-height, from primitives.type
    scale-11: "11px / 16px"
    scale-12: "12px / 18px"
    scale-13: "13px / 20px"
    scale-14: "14px / 22px"
    scale-16: "16px / 24px"
    scale-20: "20px / 28px"
    scale-24: "24px / 32px"
    scale-32: "32px / 40px"
  weight:
    regular: 400
    medium: 500
    semibold: 600
rounded:                  # border-radius scale, from primitives.radius
  sm: "6px"
  md: "10px"
  lg: "14px"
  full: "9999px"           # pill shape (Tag, DateChip, buttons) - literal, no radius/full primitive
spacing:                  # base unit + scale, from primitives.space
  unit: "4px"
  scale: ["4px", "8px", "12px", "16px", "20px", "24px", "32px", "40px", "48px", "64px"]
components:               # 9 of 16 Pathfinder components are built in code; the rest live in Figma only
  - button
  - checkbox
  - input
  - tag
  - date-chip
  - task-row
  - command-bar
  - toast
  - empty-state
---

# Overview

Pathfinder is a concept design system for a fictional planner/to-do/notes app: precision-productivity
in personality, keyboard-first, with the wayfinding motif (the compass rose mark, trail lines) kept as a
subtle hint rather than costume theming. Dark theme is first-class, not an inverted afterthought - the
system is built dark-first and light is a mirror at the semantic tier only. The governing principle:
every visual decision routes through `tokens/tokens.json`, never invented ad hoc.

# Colors

## Primitives (theme-invariant)
| Token | Hex |
|---|---|
| ink/950 | #0A0B0D |
| ink/900 | #111318 |
| ink/800 | #191C23 |
| ink/700 | #232733 |
| ink/600 | #303648 |
| slate/500 | #4D5468 |
| slate/400 | #737B90 |
| slate/300 | #9AA1B4 |
| slate/200 | #C3C8D6 |
| paper/100 | #E8EAF0 |
| paper/50 | #F4F5F8 |
| paper/0 | #FBFBFD |
| blue/700 | #214FC4 |
| blue/600 | #2456D6 |
| blue/500 | #3E7BFA |
| blue/400 | #6EA0FF |
| blue/300 | #A3C4FF |
| green/600 | #3F6B5B |
| green/500 | #4F8168 |
| green/400 | #6FA184 |
| navy/900 | #16213B |
| gold/500 | #C9A35A |
| cream/100 | #F3EEE3 |

## Semantic (theme-swapped)
| Token | Dark | Light |
|---|---|---|
| surface/base | {ink/950} `#0A0B0D` | {paper/0} `#FBFBFD` |
| surface/raised | {ink/800} `#191C23` | {paper/50} `#F4F5F8` |
| text/primary | {paper/50} `#F4F5F8` | {ink/900} `#111318` |
| text/muted | {slate/300} `#9AA1B4` | {slate/500} `#4D5468` |
| accent/default | {blue/500} `#3E7BFA` | {blue/600} `#2456D6` |
| accent/hover | {blue/400} `#6EA0FF` | {blue/500} `#3E7BFA` |
| border/subtle | {ink/600} `#303648` | {slate/200} `#C3C8D6` |
| focus/ring | {blue/400} `#6EA0FF` | {blue/500} `#3E7BFA` |
| danger | `#E5484D` (literal) | `#D8353D` (literal) |
| success | {green/500} `#4F8168` | {green/600} `#3F6B5B` |
| warning | `#E8A33D` (literal) | `#9D6A1D` (literal) |
| tag-text/accent | {blue/400} `#6EA0FF` | {blue/700} `#214FC4` |
| tag-text/success | {green/400} `#6FA184` | `#3C6757` (literal) |
| tag-text/neutral | {slate/300} `#9AA1B4` | {slate/500} `#4D5468` |
| tag-text/danger | `#E5484D` (literal) | `#BE2F36` (literal) |
| tag-text/warning | `#E8A33D` (literal) | `#815718` (literal) |
| brand/mark | {gold/500} `#C9A35A` | {navy/900} `#16213B` |

`tag-text/*` exists because Tag and DateChip render text on top of a translucent tint (the hue
token at 18% opacity over `surface/base` or `surface/raised`, 13% for danger), not on a solid
fill - so text can't just reuse the solid-fill semantic color and stay >= 4.5:1 (WCAG AA) in
both themes. Every `tag-text/*` value was verified against the actual composited background on
both surface steps, in both themes (see `decisions.md`). One documented exception survives:
**no danger tags or chips on `surface/raised`, in either theme** - `tag-text/danger` on a 13%
danger tint over `surface/raised` still falls short of 4.5:1 (dark 3.83:1, light 4.39:1), so
danger only ships on `surface/base`.

Usage rules: `accent/default` stays under ~10% of any view (buttons, active states).
Body text is always `text/primary` on `surface/base`; `surface/raised`
is for cards, panels, and floating chrome (modal, command bar, toast). `border/subtle` is the only
hairline color in the system - no ad hoc grays. The brand colors (navy, gold, cream) belong to the
mark and brand surfaces only, through `brand/mark`; they never replace `accent/*` in the UI.

# Typography

Headings and UI text use `{typography.fontFamily}` (Geist); code, dates, and tags use
`{typography.monoFamily}` (Geist Mono) for a keyboard-first, precise feel. The scale runs
11/12/13/14/16/20/24/32px, each with a fixed line-height (see front-matter `typography.scale`) -
there is no fluid/responsive type scale, only these 8 fixed steps. 11px mono, uppercase, is
reserved for Tag/DateChip labels; 14px sans is the default body/UI size; 24px sans semibold is
used for view-level headings (e.g. "today").

# Layout

The base spacing unit is 4px; the full scale is 4/8/12/16/20/24/32/40/48/64px (`{spacing.scale}`).
Inner component padding stays at the small end (4-16px: checkbox gap, tag/chip padding, input
padding); section and card gaps use the mid-to-large steps (20-32px); page-level rhythm uses
40-64px. Two literal exceptions to the token scale are documented in `decisions.md`: `999` for
full-round pills (no `radius/full` primitive exists) and `6px`/`2.5px` for the progress ring's
label gap and stroke weight (neither is a multiple of 4).

# Elevation & Depth

One shadow token exists: `shadow/raised` = `0 1px 2px rgb(0 0 0 / 0.4), 0 4px 16px rgb(0 0 0 / 0.24)`,
a two-layer shadow (tight contact shadow + soft ambient falloff). It marks anything that visually
lifts off `surface/base`: dragging TaskRow, Toast, CommandBar, Modal. Static raised surfaces (cards,
panels) use `surface/raised` fill + `border/subtle` hairline instead of a shadow - depth in this
system comes from either a fill-and-border step *or* a shadow, never both at once on the same
element, keeping elevation legible as a discrete state rather than a blurred gradient of depths.

# Shapes

Corner radii come from `{rounded}`: `sm` (6px) for tight controls like Input and Checkbox, `md`
(10px) for Button and most component-tier shells (`button/radius`, `input/radius`), `lg` (14px)
for elevated surfaces (Card, Modal, CommandBar, Toast). `full` (999px, literal) is reserved for
pill shapes only - Tag, DateChip, and any fully-rounded control. Nothing in the system uses a
sharp (0px) corner; the softest shape language still reads as "precise," not "soft app."

# Components

9 of 16 Pathfinder components are built in code (Vite + React + Storybook); the remaining 7 live
in the Figma library only. Every coded component consumes `tokens/tokens.json` values via
generated CSS custom properties - never a hardcoded color, type size, or spacing value in
`src/components/`.

## button
Tokens: `button/radius` ({radius/md}), `button/accent-label` ({ink/950}, the label color on the
accent fill), `accent/default` / `accent/hover` fills, `surface/raised` for secondary/ghost hover.
States: default / hover (brightness filter on danger, `surface/raised` tint on ghost) / active /
focus (`focus/ring` outline) / disabled (reduced opacity). Sizes: sm/md.

## checkbox
Tokens: `radius/sm`, `border/subtle` (unchecked border), `accent/default` (checked fill),
`button/accent-label` (checkmark glyph color), `focus/ring`. States: default / checked /
indeterminate / disabled / focus-visible. The real `<input>` stays in the DOM (absolutely
positioned, opacity 0) for accessibility; a styled box replaces it visually, so the wrapper
needs `position: relative` to anchor that overlay correctly.

## input
Tokens: `radius/sm`, `border/subtle`, `danger` (error state border + helper text), `text/primary`,
`text/muted` (placeholder). States: default / focus (`focus/ring`) / error (`error` prop is the
message string itself) / disabled.

## tag
Tokens: pill shape (`radius/full`, literal 999px), background/border = the color's hue token at
18%/13% opacity via `color-mix()`, text = the matching `tag-text/*` semantic token. Colors: accent /
success / neutral / danger / warning. Danger is capped at 13% background opacity (see Colors
section) and never ships on `surface/raised`.

## date-chip
Same tint recipe and `tag-text/*` text tokens as Tag. States: today (accent) / scheduled (neutral) /
overdue (danger, row-level source of truth - `overdue` always forces the `overdue` visual state
regardless of the `dateState` prop passed in).

## task-row
Composes Checkbox + Tag + DateChip in a horizontal flex row with a drag handle. States: default /
hover (`surface/raised` fill) / completed (struck-through, dimmed) / overdue (red DateChip) /
dragging (`surface/raised` fill + `shadow/raised` + slight rotation).

## command-bar
Tokens: `radius/lg`, `surface/raised`, `shadow/raised`, `accent/default` at 18% for the selected
result row's background tint plus a 2px accent rail. Built from a reusable `result row` atom
instanced N times.

## toast
Tokens: `radius/lg`, `surface/raised`, `shadow/raised`, status icon color bound to
`success`/`danger`/`warning` via `currentColor` on an inline SVG. Statuses: success / danger /
warning.

# Do's and Don'ts

**Do**
- Route every color, spacing, radius, and type value through `tokens/tokens.json` - update the
  source first, then regenerate CSS, then update Figma variables by hand.
- Keep `accent/default` under ~10% of any given view.
- Use `tag-text/*` (not the solid semantic color) for any text rendered on a translucent tint.

**Don't**
- Never hardcode a hex, font stack, or px value directly in `src/components/` - always a
  `var(--...)` reference.
- Never ship a danger or warning Tag/DateChip on `surface/raised` (documented AA failure at the
  13-18% tint recipe on that surface, in both themes).
- Never let `design.md`, the generated CSS, or the Figma variables drift from `tokens.json` - it
  is the only source of truth in this pipeline.
