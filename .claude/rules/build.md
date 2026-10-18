# Build / test / run

<!-- @imported by CLAUDE.md. Keep it to the commands Claude actually needs to run this project. -->

## Stack
Vite + React + Storybook. Deliberately basic: this project is proof of a one-direction tokens.json → CSS → code pipeline (with tokens.json also hand-mirrored into Figma variables), not a production app. v2 components are built in code and Figma; v1 is frozen at tag v1.0.0.

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

`npm test` runs three suites in one command: the token pipeline and contrast tests (`node --test tokens/*.test.mjs`), the jsdom component and app tests (`vitest --project unit`), and every Storybook story as a test in Playwright's Chromium (`vitest --project storybook`, via `@storybook/addon-vitest`). In the story suite the a11y check is set to `error`, so any axe violation fails the build; play functions are interaction tests. Run one suite with `npm run test:unit` or `npm run test:stories`. First run on a new machine: `npx playwright install chromium` (Playwright's own browser, separate from Google Chrome). The runner was removed at the Task 12 scaffold and reinstated for the v2 library (see `decisions.md`). `npm run lint` runs `oxlint`.

## Definition of done
- Build passes, `npm test` green, no type errors.
- Components consume `tokens/tokens.json` values, never hardcoded colors, type, or spacing.
- Run the **verifier** agent before declaring work done (see conventions.md).
