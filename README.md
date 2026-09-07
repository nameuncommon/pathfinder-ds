# pathfinder-ds

Pathfinder is a planner, to-do, and notes app for people who think in routes: it treats a day, a project, or a goal as a trail with a destination, and its interface stays out of the way so the plan reads clearly. The product doesn't exist. This repository is a self-initiated concept design system built to demonstrate end-to-end design system range, from brand and design tokens through a hand-mirrored Figma library and a small working code library, for Jake Reategui's portfolio.

Lives in `pathfinder-ds` (syncs via GitHub private `nameuncommon/pathfinder-ds`).

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
