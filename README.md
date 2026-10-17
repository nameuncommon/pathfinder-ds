# pathfinder-ds

Pathfinder is a planner, to-do, and notes app for people who think in routes: it treats a day, a project, or a goal as a trail with a destination, and its interface stays out of the way so the plan reads clearly. The product doesn't exist. This repository is a self-initiated concept design system built to demonstrate end-to-end design system range, from brand and design tokens through a hand-mirrored Figma library, a small working code library and a coded phone app flow, for Jake Reategui's portfolio.

Lives in `pathfinder-ds` (syncs via GitHub private `nameuncommon/pathfinder-ds`).

## Versions
| Version | What | Where |
|---|---|---|
| v2 (current) | Phone-first, dark-first design system with glass surfaces, 17 components, and a coded morning ritual | Storybook at `/`, the coded ritual at `/app/` (both on the `pathfinder-ds` Vercel project; the production URL is not promoted yet) |
| v1 (frozen) | Desktop, keyboard-first design system, tag `v1.0.0` | https://pathfinder-ds-v1.vercel.app (own Vercel project `pathfinder-ds-v1`) |

## v2 at a glance
- **Look:** navy field, gold as the one accent, cream for paper and text, glass surfaces over a glow capped at 10% at its brightest point. Cormorant Garamond for display, Geist for UI, Geist Mono for small labels.
- **Tokens:** `tokens/tokens.json` is the single source. CSS is generated from it, and a test checks contrast over the worst-case background (glass over the glow peak).
- **Components:** 17, built in code with Storybook stories and in Figma.
- **Coded ritual:** the morning ritual (open, snap, check, sort, done) runs at `/app/`.
- **Figma:** [library and screens](https://www.figma.com/design/ZKIX0oa2fm0OwNIGvRWJXJ) and the [clickable prototype](https://www.figma.com/proto/ZKIX0oa2fm0OwNIGvRWJXJ/?node-id=515:3&starting-point-node-id=515:3). The semantic collection has three modes (dark, light, v1 dark); the v1 pages stay pinned to v1 dark.

## Layout
| Path | What |
|---|---|
| `CLAUDE.md` | Working rules for Claude (lean; imports the rule files) |
| `CLAUDE.local.md` | Machine-specific / sensitive config (gitignored; copy from `.example`) |
| `design.md` | Visual system, tokens + spec (Google Labs format), mirrors `tokens/tokens.json` |
| `brand/` | Brand identity: mark, logo lockups, brand rationale |
| `tokens/` | `tokens.json`, authored here as the single source of truth for design tokens (Figma variables and CSS are generated/mirrored from it) |
| `.claude/rules/` | Build commands + conventions, imported by CLAUDE.md |
| `notes/` | Working notes |
| `specs/decisions/` | Detailed decision log, ADR-style |
| `decisions.md` | Running one-line decision log (`what` / `why over the alternative`) |
| `skills/` | Project-local skills |

## First-time setup
```bash
cp CLAUDE.local.md.example CLAUDE.local.md   # then fill in local paths/ports
```
