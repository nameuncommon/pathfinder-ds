# Build / test / run

<!-- @imported by CLAUDE.md. Keep it to the commands Claude actually needs to run this project. -->

## Stack
Vite + React + Storybook. Deliberately basic: this project is proof of a one-direction tokens.json → CSS → code pipeline (with tokens.json also hand-mirrored into Figma variables), not a production app. 8 of 15 Pathfinder components get built in code; the rest live in Figma only.

## Commands
| Action | Command |
|---|---|
| Install | `npm install` |
| Dev / run | `npm run dev` |
| Storybook | `npm run storybook` |
| Storybook build | `npm run build-storybook` |
| Build | `npm run build` |
| Lint | `npm run lint` |
| Typecheck | `npx tsc -b --noEmit` |
| Test | `npm test` |

Scaffolded Task 12 (Vite `react-ts` template + Storybook 10, `@storybook/react-vite` framework, `addon-a11y` + `addon-docs` only - no Storybook test-runner addon). `npm test` runs the tokens pipeline test (`node --test tokens/build.test.mjs`) added in the final review fix wave - it's the one thing in this repo with real assertions (the tokens.json → CSS pipeline, including the C2 contrast-fix tokens). The Storybook Vitest/Playwright test-runner addon itself was deliberately removed after init (see `decisions.md`) - that's a separate thing from this `npm test` script. `npm run lint` runs `oxlint` (the create-vite default), not ESLint.

## Definition of done
- Build passes, `npm test` green, no type errors.
- Components consume `tokens/tokens.json` values, never hardcoded colors, type, or spacing.
- Run the **verifier** agent before declaring work done (see conventions.md).
