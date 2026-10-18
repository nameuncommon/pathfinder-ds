# design.md - Google Labs design-system spec (alpha format)
# Token front-matter. Reference tokens in the body with {group.key}, e.g. {colors.primary}.
# Spec + CLI: github.com/google-labs-code/design.md  -  ALPHA: re-check the repo before wiring the CLI.
#
# This file MIRRORS tokens/tokens.json - the single source of truth for this project (see
# CLAUDE.md "Token flow"). Never hand-edit a value here without updating tokens.json first;
# tokens.json -> tokens/build.mjs -> src/styles/tokens.css is the one real generated pipeline,
# this file is a hand-maintained mirror of the same numbers for anyone (or anything) building
# UI without opening Figma or the code. v2 is dark-first on navy/gold; the front-matter below
# reflects the dark palette and the light mirror lives in the Colors section and in
# tokens.json's `semantic.light` block.
colors:
  primary: "#C9A35A"      # accent/default, dark theme (gold/500)
  secondary: "#1D2A4A"    # navy/800 = surface/raised
  accent: "#D8B76F"       # accent/hover, dark theme (gold/400)
  background: "#0E1628"   # surface/base, dark theme (navy/950)
  surface: "#1D2A4A"      # surface/raised, dark theme (navy/800)
  text: "#F3EEE3"         # text/primary, dark theme (cream/100)
  muted: "#F3EEE399"      # text/muted, dark theme (cream/100 at 60%)
  border: "#2C3A5C"       # border/subtle, dark theme (literal)
  success: "#4F8168"      # success, dark theme (green/500)
  warning: "#E8A33D"      # warning, dark theme (literal)
  danger: "#E5484D"       # danger, dark theme (literal)
  brand: "#C9A35A"        # brand/mark, dark theme (gold/500)
typography:
  fontFamily: "'Geist', -apple-system, 'Segoe UI', sans-serif"
  monoFamily: "'Geist Mono', ui-monospace, 'SF Mono', monospace"
  displayFamily: "'Cormorant Garamond', Georgia, serif"
  scale:                  # name: size / line-height, from primitives.type
    scale-11: "11px / 16px"
    scale-12: "12px / 18px"
    scale-13: "13px / 20px"
    scale-14: "14px / 22px"
    scale-16: "16px / 24px"
    scale-20: "20px / 28px"
    scale-24: "24px / 32px"
    scale-32: "32px / 40px"
    scale-56: "56px / 56px"
  weight:
    regular: 400
    medium: 500
    semibold: 600
rounded:                  # border-radius scale, from primitives.radius
  sm: "6px"
  md: "10px"
  lg: "14px"
  full: "999px"           # pill shape (Tag, DateChip, BearingTag) - literal, no radius/full primitive
spacing:                  # base unit + scale, from primitives.space
  unit: "4px"
  scale: ["4px", "8px", "12px", "16px", "20px", "24px", "32px", "40px", "48px", "64px"]
effect:
  blur-glass: "24px"      # backdrop blur on glass surfaces
  glow-peak: 0.1          # glow cap: 10% alpha at the brightest point, never more
components:               # 17 v2 components, built in code (Storybook) and in Figma; v1 is frozen at tag v1.0.0
  - app-bar
  - bearing-tag
  - button
  - checkbox
  - compass-choice
  - date-chip
  - dial
  - empty-state
  - glass-card
  - input
  - mark
  - progress-bar
  - read-row
  - schedule-row
  - tag
  - tally
  - toast
---


# Overview

Pathfinder is a concept design system for a fictional planner/to-do/notes app. v2 is phone-first and
dark-first: a calm navy field, gold as the single accent, cream for paper and text, and glass surfaces
that let a faint glow through. The wayfinding motif (the compass rose mark, trail lines, bearings) is a
subtle hint rather than costume theming. Light is a mirror at the semantic tier only. The governing
principle: every visual decision routes through `tokens/tokens.json`, never invented ad hoc. The
desktop, keyboard-first v1 is frozen at tag `v1.0.0` and stays live at its own URL.

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
| navy/950 | #0E1628 |
| navy/900 | #16213B |
| navy/800 | #1D2A4A |
| gold/500 | #C9A35A |
| gold/400 | #D8B76F |
| cream/100 | #F3EEE3 |
| bearing/health | #9BC2A5 |
| bearing/people | #E3A48C |
| bearing/home | #9DB6DB |
| bearing/work | #D9C38A |
| bearing/craft | #C3A9DB |

The ink, slate, paper and blue ramps carry the light theme and the frozen v1; v2 dark draws on navy,
gold, cream, green and the five bearing hues.

## Semantic (theme-swapped)
| Token | Dark | Light |
|---|---|---|
| surface/base | {navy/950} `#0E1628` | {paper/0} `#FBFBFD` |
| surface/raised | {navy/800} `#1D2A4A` | {paper/50} `#F4F5F8` |
| text/primary | {cream/100} `#F3EEE3` | {ink/900} `#111318` |
| text/secondary | `#F3EEE3B3` (cream at 70%) | not defined |
| text/muted | `#F3EEE399` (cream at 60%) | {slate/500} `#4D5468` |
| accent/default | {gold/500} `#C9A35A` | {blue/600} `#2456D6` |
| accent/hover | {gold/400} `#D8B76F` | {blue/500} `#3E7BFA` |
| accent/text | {gold/500} `#C9A35A` | {blue/700} `#214FC4` |
| border/subtle | `#2C3A5C` (literal) | {slate/300} `#9AA1B4` |
| border/strong | {slate/400} `#737B90` | {slate/400} `#737B90` |
| focus/ring | {gold/400} `#D8B76F` | {blue/500} `#3E7BFA` |
| danger | `#E5484D` (literal) | `#D8353D` (literal) |
| success | {green/500} `#4F8168` | {green/600} `#3F6B5B` |
| warning | `#E8A33D` (literal) | `#9D6A1D` (literal) |
| tag-text/accent | {gold/400} `#D8B76F` | {blue/700} `#214FC4` |
| tag-text/success | {green/400} `#6FA184` | `#3C6757` (literal) |
| tag-text/neutral | {slate/300} `#9AA1B4` | {slate/500} `#4D5468` |
| tag-text/danger | `#E5484D` (literal) | `#BE2F36` (literal) |
| tag-text/warning | `#E8A33D` (literal) | `#815718` (literal) |
| button/accent-label | {ink/950} `#0A0B0D` | {paper/0} `#FBFBFD` |
| brand/mark | {gold/500} `#C9A35A` | {navy/900} `#16213B` |
| surface/glass | `#F3EEE30F` | dark only |
| surface/glass-edge | `#F3EEE329` | dark only |
| surface/glass-strong | `#F3EEE31A` | dark only |
| surface/glass-strong-edge | `#F3EEE347` | dark only |
| surface/glass-fallback | {navy/800} `#1D2A4A` | dark only |
| surface/paper | {cream/100} `#F3EEE3` | dark only |
| text/on-paper | {navy/900} `#16213B` | dark only |
| bearing/health/fill | `#9BC2A529` (16%) | dark only |
| bearing/health/edge | `#9BC2A566` (40%) | dark only |
| bearing/people/fill | `#E3A48C29` (16%) | dark only |
| bearing/people/edge | `#E3A48C66` (40%) | dark only |
| bearing/home/fill | `#9DB6DB29` (16%) | dark only |
| bearing/home/edge | `#9DB6DB66` (40%) | dark only |
| bearing/work/fill | `#D9C38A29` (16%) | dark only |
| bearing/work/edge | `#D9C38A66` (40%) | dark only |
| bearing/craft/fill | `#C3A9DB29` (16%) | dark only |
| bearing/craft/edge | `#C3A9DB66` (40%) | dark only |
| accent/nudge-edge | `#C9A35A99` (60%) | dark only |
| accent/selected-fill | `#C9A35A1A` (10%) | dark only |
| accent/nav-active | `#C9A35A24` (14%) | dark only |

In Figma the semantic collection has three modes: dark, light, and v1 dark. The four v1 pages are
pinned to v1 dark (the values from tag `v1.0.0`), so the frozen design never moves when v2 changes.

`tag-text/*` exists because Tag and DateChip render text on top of a translucent tint (the hue
token at 18% opacity over the surface, 13% for danger), not on a solid fill. Contrast targets are
4.5:1 for text and 3:1 for meaningful control boundaries, and they are measured over the worst-case
background: glass over the 10% gold glow at its peak. A test in `tokens/` fails if any pair drops
below target.

## Rules
- **Glow cap.** The ambient glow never exceeds 10% alpha at its brightest point (`effect/glow/peak` =
  0.1). Both corner glows read the one token; nothing may brighten past it.
- **Cream means paper.** `cream/100` is the paper surface (`surface/paper`, with `text/on-paper` ink
  on top) and the primary text colour. It is not a general-purpose fill: a cream block on screen is a
  sheet of paper, such as the handwritten snap or a correction sheet.
- **Dots are texture only.** The dot field behind the ambient background fades out over the top
  240px, carries no information, and never sits behind text that has to be read.
- **Gold is the one accent.** `accent/default` stays under about 10% of any view.
- **Tints are tokens.** Every translucent tint (bearing pill fill and edge, the selected compass fill,
  the nudge edge, the active nav fill) is its own alpha token, never an opacity applied by hand. A
  state edge (the selected compass choice) stays full gold: gold at 60% measures 2.66:1 against the
  selected fill, under the 3:1 a state indicator needs, so 60% is for the decorative nudge edge only.
- **Bearings are tags, not themes.** The five bearing hues colour BearingTag and the ambient corner
  glow; they are not used as general accents.

# Typography

Three families, each with a closed job. `{typography.displayFamily}` (Cormorant Garamond SemiBold)
carries the screen title, the sort item title and the done numeral; it is high contrast with a small
x-height, so it is never set below 24px. `{typography.fontFamily}` (Geist 400/500/600) carries all UI
text, buttons and body. `{typography.monoFamily}` (Geist Mono 500) carries dates, tags and small
labels. Handwriting is rendered in Caveat in Figma and shipped as images; Caveat never ships as a web
font.

The ramp is nine fixed steps, each with a fixed line-height: 11/16, 12/18, 13/20, 14/22, 16/24,
20/28, 24/32, 32/40 and 56/56 (the 56 step is the done-screen numeral only). There is no fluid type
scale. 14px sans is the default body size, 16px is the default on phone controls, 11px mono uppercase
is reserved for Tag, DateChip and BearingTag labels.

# Layout

The base spacing unit is 4px; the full scale is 4/8/12/16/20/24/32/40/48/64px (`{spacing.scale}`).
Inner component padding stays at the small end (4-16px); section and card gaps use the mid-to-large
steps (20-32px); page-level rhythm uses 40-64px. v2 is designed phone-first at 390px wide with a
single column, a sticky action area at the bottom and a fixed top bar. Every tap target is at least
44px, and the compass choices are at least 64px. Literal exceptions to the scale are logged in
`decisions.md`: `999` for full-round pills and the progress ring's `6px` label gap and `2.5px` stroke.

# Elevation & Depth

Depth in v2 comes from glass, not shadow. `.pf-glass` is a translucent cream fill with a hairline
edge and a 24px backdrop blur; `.pf-glass--strong` raises both fill and edge; `.pf-glass--nudge` swaps
the edge to gold at 60% for the one thing that should be noticed. When the user asks for reduced
transparency, or the browser has no backdrop-filter, glass falls back to an opaque
`surface/glass-fallback` with no blur, so contrast never depends on what sits behind it. The single
shadow token, `shadow/raised`, still exists for floating chrome (toast, sheet).

# Shapes

Corner radii come from `{rounded}`: `sm` (6px) for tight controls like Input and Checkbox, `md`
(10px) for component shells, `lg` (14px) for elevated surfaces. Buttons take their corner from the single `button/radius` token (`{rounded.lg}`, 14px) at every size. `full` (999px, literal) is reserved for pill shapes only: Tag, DateChip, BearingTag.
Nothing in the system uses a sharp (0px) corner.

# Components

17 v2 components are built in code and in Figma (the Figma file also holds the frozen v1 pages). v1 is
frozen at tag `v1.0.0`. Code is Vite + React + Storybook. Every coded component consumes
`tokens/tokens.json` values via generated CSS custom properties - never a hardcoded colour, type size
or spacing value in `src/components/`.

| Component | What it is for |
|---|---|
| app-bar | top bar with the mark and a title; the 52px mark disc overhangs the 44px row |
| bearing-tag | pill labelling which part of life an item belongs to, in a bearing hue |
| button | primary, quiet (glass) and ghost; 52px tall at md |
| checkbox | native input underneath, styled box on top |
| compass-choice | one large choice (64px minimum) in the sort step |
| date-chip | when an item is due; state is derived from the date |
| dial | the logo: a solid ring around the compass rose P at 24px and up; the compass rose P alone below 24px |
| empty-state | art, a line of copy and one action |
| glass-card | container on the glass surface |
| input | text field with helper and error text |
| mark | status glyph for a line: task, done, moved, dropped, matters, note |
| progress-bar | thin bar showing step of total |
| read-row | one row of the snap read-back, tappable to correct |
| schedule-row | a time, a title and a bearing in the week |
| tag | translucent tinted pill |
| tally | done and moved marks in a row |
| toast | status message on a floating surface |

## compass choices
The compass is a labelled group of buttons (`role="group"` with an `aria-label`), each `aria-pressed`
when selected. It is deliberately not a radio group: one tap decides and advances to the next inbox
item, so radio semantics (arrow keys move and select) would advance items on an arrow press.

## button
Tokens: `button/radius`, `button/accent-label`, `accent/default` / `accent/hover` fills, glass strong
for the quiet variant. States: default / hover / active / focus (`focus/ring` outline) / disabled.
Sizes: sm / md.

## checkbox
Tokens: `radius/sm`, `border/subtle`, `accent/default` (checked fill), `button/accent-label`
(checkmark), `focus/ring`. The real `<input>` stays in the DOM for accessibility; a styled box
replaces it visually.

## input
Tokens: `radius/sm`, `border/subtle`, `danger` (error border and helper text), `text/primary`,
`text/muted` (placeholder). The `error` prop is the message string itself.

## tag and date-chip
Pill shape; background and border are the hue token at 18% (13% for danger) via `color-mix()`, text is
the matching `tag-text/*` token. DateChip states: today (accent), scheduled (neutral), overdue
(danger, forced regardless of the `dateState` prop).

## toast
Tokens: `radius/lg`, `surface/raised`, `shadow/raised`, status icon colour bound to
`success` / `danger` / `warning` via `currentColor`.

# The coded ritual

The morning ritual is also built in code at `/app/` (see the README for the paths): open, snap, check
(one correction), sort three items, done, plus skip and back. It uses only the components above.

# Do's and Don'ts

**Do**
- Route every colour, spacing, radius and type value through `tokens/tokens.json` - update the source
  first, then regenerate CSS, then update Figma variables by hand.
- Keep `accent/default` under about 10% of any given view and the glow at or below 10% alpha.
- Use `tag-text/*` (not the solid semantic colour) for text rendered on a translucent tint.
- Keep tap targets at 44px or larger and compass choices at 64px or larger.

**Don't**
- Never hardcode a hex, font stack or px value in `src/components/` - always a `var(--...)` reference.
- Never use cream as a decorative fill; cream means paper.
- Never put readable text over the dot field.
- Never let `design.md`, the generated CSS or the Figma variables drift from `tokens.json`.
