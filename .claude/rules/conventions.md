# Conventions

<!-- @imported by CLAUDE.md. Project-specific naming, structure, and workflow rules. -->

## Naming
- Code / skills → `kebab-case`.
- Figma pages, layers, and variant values → lowercase, ` / ` delimited (see `CLAUDE.md` §Naming constraints).
- Design tokens → lowercase, slash-delimited (e.g. `accent/default`).

## Workflow
- Every decision appends one line to `decisions.md` at the repo root (`what I did | why over the alternative`) - this is mandatory, not optional.
- A decision that needs fuller context also gets a file in `specs/decisions/` (one file per decision, ADR-style).
- Match `design.md` for anything visual - never invent tokens; `tokens/tokens.json` is the source of truth.
- Match the surrounding code's idiom, comment density, and naming.

## Verify before done
Generated or non-trivial work gets an **independent check** before it's called finished:
- Dispatch the `verifier` agent (fresh context, instructed to refute) on the change.
- For parallel agents that mutate files, isolate each in its own **git worktree** so they don't collide.
- Treat the verifier's findings as a gate, not a suggestion - resolve P0/P1 before declaring done.

## Path rule
Never hardcode absolute home paths - always use `~/`.
