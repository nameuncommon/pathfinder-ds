# Pathfinder DS v2 Polish Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix every issue and gap from the 2026-10-18 critique so the Storybook and the coded ritual read as a real product's design system, then mirror the changes in Figma.

**Architecture:** Same repo and pipeline (tokens.json single source, generated CSS, components in `src/components`, real screens in `src/app/screens` rendered by Storybook). Storybook chrome fixes live in `.storybook/` and `src/stories/`. Behaviour changes (action bar rule, undo, reading state, new Done) live in the screens and the ritual reducer, test-first. A new `Sheet` component takes the dialog shell out of `CorrectionSheet`. Figma follows code in the last build task.

**Tech Stack:** Vite 8, React 19, TypeScript 6, Storybook 10.6 (addon-vitest, addon-a11y, addon-docs, pseudo-states), Vitest 5 (jsdom + Chromium projects), node:test, lucide-react 1.59, Figma Plugin API via `use_figma`.

**Spec:** `specs/2026-10-18-critique.md` (the critique and Jake's decisions). Design context: `.impeccable.md`.

**Worktree:** `~/Developer/projects/pathfinder-ds-v2-polish`, branch `ds-v2-polish` off main `c3c0208`.

## Global Constraints

- tokens.json is the single source; no hardcoded colours, type or spacing in components.
- Locked brand: navy, gold, cream, Cormorant Garamond SemiBold titles, Geist UI, Geist Mono for data only, glass with the solid fallback, the dial logo, the compass N/E/S/W mapping.
- Contrast measured over the worst case (glass over the 10% gold glow): 4.5:1 text, 3:1 control and state boundaries; never colour alone.
- Tap targets 44px; compass choices 64px.
- Plain language; no em dashes in public copy; it cheers you on and never scolds (no rankings, streaks or red).
- One gold call-to-action plus the logo per view (critique issue 4).
- Every design decision appends one line to `decisions.md`.
- Figma naming lowercase with ` / `; load `figma:figma-use` (+ `figma:figma-generate-library` / `figma:figma-generate-design`) before `use_figma`.
- Chrome safety: never wrap or point anything at the Chrome binary; screenshots via Playwright Chromium or headless Chrome by full path with a fresh `--user-data-dir`. Do not poll the live site (Vercel bot protection).
- No AI attribution in commits (overrides the harness default). Nothing merges or deploys before Jake approves the screenshots.

## Review Focus

1. **Undo after the last inbox item:** choosing on item 3 goes to Done; undoing from there must return to item 3 with its decision cleared, not leave Done showing a decision that no longer exists. Pinned in Task 5 (reducer test `undo from done returns to the last item`).
2. **Rapid choices:** two choices in quick succession then one undo reverts only the latest. Pinned in Task 5 (`undo reverts only the latest choice`).
3. **Reading state and reduced motion:** the reading pause must not trap keyboard focus or hide content from screen readers; with motion reduced it may be instant. Pinned in Task 8 (`reading state is a status and ends on its own`).
4. **Large text on the new action bar:** a two-line escape link and a two-line gold button stack without overlap at 2x type. Pinned in Task 3 (story play `action bar at 2x text`).
5. **Sheet focus trap with the error state:** Tab cycles inside the sheet including the error message's field; Escape returns focus to the opener. Pinned in Task 9 (Sheet tests).

---

### Task 1: Storybook chrome polish

**Files:** `.storybook/preview-head.html`, `.storybook/preview.tsx`, `src/stories/StatesGrid.tsx`, `src/stories/storyFrame.tsx` (new), every `src/components/*.stories.tsx` meta decorator, `src/components/TabBar.css`, `src/stories/foundations/{Color,Typography,Spacing,Motion}.mdx` (title casing only here), `src/stories/chrome.test.ts` (new).

**Interfaces:** Produces `StoryFrame({ children, width? })` in `src/stories/storyFrame.tsx`: a full-width padded frame on `surface-base` with no ambient glows (replaces the `pf-ambient` max-content decorators). `StatesGrid` wraps (`flex-wrap: wrap`) and drops `pf-ambient`.

- [ ] **Step 1: Failing tests** in `chrome.test.ts`: preview-head styles `.sbdocs table tr:nth-of-type(2n)` (and `tr`) with `var(--surface-raised)` background and `var(--text-primary)` text; `preview.tsx` has no `theme` global and sets `data-theme` to `dark` always; no `*.stories.tsx` meta decorator uses `pf-ambient` (grep); `TabBar.css` tab rule has `overflow-wrap: normal` and `hyphens: none` (no `anywhere`); the four foundations MDX titles are Title Case. Add a TabBar `LargeText` play assertion: each tab label's text has exactly one line box per word (`Range.getClientRects` of the "Library" text node returns rects all on the same `top`, i.e. the word is never split).
- [ ] **Step 2:** Run `npx vitest run --project unit src/stories/chrome.test.ts` and `npm run test:stories`; expected FAIL.
- [ ] **Step 3:** Implement; story decorators use `StoryFrame`; the docs table rows are restyled; theme toggle removed (dark only); tab labels wrap only between words.
- [ ] **Step 4:** `npm test` green; build Storybook and screenshot Button docs, Checkbox States, TabBar large text, Tally with Playwright; confirm no white row, no smudge tile, no clipped grid, "Library" whole.
- [ ] **Step 5:** decisions.md lines; commit `fix(storybook): docs tables, story frames, tab labels, dark only`.

### Task 2: Introduction, foundations rewrite, sidebar order

**Files:** `src/stories/Introduction.mdx`, `src/stories/foundations/Color.mdx`, `Typography.mdx`, `.storybook/preview.tsx` (storySort), `src/stories/docs.test.ts` (new).

- [ ] **Step 1: Failing tests:** Introduction contains the Dial lockup import, a handwriting sample (`snippet('one-thing')`), a link to `./app/` ("Open the morning ritual"), and no "four Foundations"; Color.mdx has no `blue/` ramp and no light column for v2 semantic tokens (dormant light values listed only under a "Dormant" note at most); Typography.mdx renders `--font-display` in the scale and states the real step count from tokens.json; `storySort.order` is Introduction, Screens, Foundations, Patterns, Components, Changelog.
- [ ] **Step 2:** FAIL. **Step 3:** Rewrite the Introduction as a product page: lockup, one line on what Pathfinder is, a phone frame row (link to the four ritual stories) and the desktop frame, the token pipeline in three plain steps, counts computed from tokens.json. Color and Typography rewritten for v2 using `docStyles`. **Step 4:** green; screenshot Introduction, Color, Typography. **Step 5:** commit `docs: product introduction and v2 colour and type pages`.

### Task 3: One action-bar rule and the Snap shutter

**Files:** `src/app/Screen.tsx`, `src/app/app.css`, `src/app/screens/{Open,Snap,Check,Sort,Done}.tsx`, tests beside them, `src/stories/screens/Morning.stories.tsx` (2x text story).

**Interfaces:** `ScreenProps` gains `escape?: ReactNode` (a quiet text link rendered directly above `action`). Rule: `action` is the gold forward action when the step has one; any way out (skip, leave for Sunday, inbox) is `escape`. Open: action gold "Snap this week's spread", escape "Inbox · 3 to sort". Snap: action gold "Take the photo" (also triggers onNext), escape "Skip today" (the viewfinder stays tappable). Check: action "Looks right". Sort: no gold action (the four choices are the action), escape "Leave the rest for Sunday". Done: action gold "Back to today".

- [ ] **Step 1: Failing tests** (`screens/actionbar.test.tsx`): for each screen, the `.pf-app__action` region holds at most one gold button and the escape (if any) comes before it in DOM order and is not gold; Snap has a button named "Take the photo" inside the action region; Open's pinned primary is the Snap button. Story play `action bar at 2x text` (type tokens doubled): escape and primary boxes do not overlap.
- [ ] **Step 2:** FAIL. **Step 3:** Implement; the escape renders as `Button variant="ghost"`; the action bar backdrop goes full-bleed (critique minor 9). Update the existing ritual tests that clicked the old buttons. **Step 4:** green. **Step 5:** decisions.md (the rule, documented later as a pattern); commit `feat(app): one action-bar rule and a visible shutter`.

### Task 4: Gold restraint

**Files:** `src/components/CompassChoice.css`, `src/app/app.css` (eyebrow), `src/stories/screens/DesktopThisWeek.{tsx,css}`, `src/components/gold.test.ts` (new), `design.md` rule.

- [ ] **Step 1: Failing tests:** `.pf-compass__dir` border is `var(--border-strong)` with gold only under `[aria-pressed='true']` and `:hover`; the step eyebrow (`.pf-app__eyebrow`) is `var(--text-secondary)` except the Open greeting date (class `pf-app__eyebrow--date` keeps gold); desktop `.pf-desk__chip` border is `var(--border-strong)` and text `var(--text-primary)`, gold on hover; `.pf-desk__moves` uses `var(--text-secondary)`. Contrast test: border/strong ring on worst-case glass >= 3:1 (3.11 measured).
- [ ] **Step 2:** FAIL. **Step 3:** Implement. **Step 4:** green; count gold elements on Sort and desktop renders (target: Sort ≤ 3, desktop ≤ 5). **Step 5:** commit `style: gold is rare again`.

### Task 4b: App type pass (added 2026-10-18 at Jake's request: "best practices for type, intuitive and practical as an app")

**Files:** `src/app/Screen.tsx`, `src/app/app.css`, `src/app/screens/{Snap,Check,Sort}.tsx`, `src/app/type.test.tsx` (new), `design.md`, Typography.mdx ramp.

**Interfaces:** `ScreenProps` gains `titleSize?: 'large' | 'step'` (default `'large'`). `large` = display 32/40 (Open greeting, Done ending); `step` = title 24/32 (Snap, Check, Sort: inside the flow, the title is a heading, not a hero).

- [ ] **Step 1: Failing tests:** Snap, Check and Sort h1 carry `pf-app__title--step`, Open and Done do not; `.pf-app__title--step` uses `--type-24-size/line`. `.pf-app__label` is sentence case (no `text-transform`), 14/22, weight 600, no tracking, and sits 24px below the previous group and 8px above its own content. `.pf-app__item-title` is sans (`--font-sans`) 20/28 weight 600, so Sort has one serif. No screen renders more than one serif element (computed in the story suite: elements whose font-family is the display font ≤ 1, Open allows the paper hand image which is not text).
- [ ] **Step 2:** FAIL. **Step 3:** Implement. **Step 4:** green; screenshots of Open, Snap, Check, Sort at 1x before and after, sent to Jake. **Step 5:** decisions.md, design.md type roles, Typography ramp row; commit `style(app): app type pass`.

### Task 5: Undo and acknowledgement

**Files:** `src/app/ritual.ts`, `src/app/ritual.test.ts`, `src/app/MorningRitual.tsx`, `src/app/MorningRitual.test.tsx`, `src/app/screens/Done.tsx`.

**Interfaces:** `RitualState` gains `history: Array<{ index: number; itemId: string }>`. Actions gain `{ type: 'undo' }` (reverts the latest choice: clears that decision, sets `inboxIndex` back, `step: 'sort'`) and `{ type: 'revisit'; itemId: string }` (clears that decision and opens sort at that item; from Done). MorningRitual shows a `Toast` after each choice: `${title} · ${choice.title}` with action "Undo", replaced on the next choice, cleared after a fix toast; after a correction save, Toast "Fixed: <new text>".

- [ ] **Step 1: Failing tests:** reducer `undo reverts only the latest choice`, `undo from done returns to the last item`, `undo with no history does nothing`, `revisit clears the decision and opens that item`; MorningRitual `choosing shows an undo toast and Undo brings the item back`, `saving a fix says Fixed`.
- [ ] **Step 2:** FAIL. **Step 3:** Implement; the Sort support line stays honest ("You can change it later" now true via undo and Done). **Step 4:** green. **Step 5:** commit `feat(app): undo a choice, acknowledge a fix`.

### Task 6: A real Done ending

**Files:** `src/app/screens/Done.tsx`, `src/app/app.css`, `src/styles/motion.css`, tests.

- [ ] **Step 1: Failing tests:** Done shows the one thing on a `.pf-paper` card; decisions are grouped under headings per direction actually used ("Now", "Later", "Share", "Drop") each with its compass letter, as buttons ("Change <title>") that dispatch `revisit`; no `<ul>` default bullets; the action is gold "Back to today" (resets); "Sorted n of 3 / k left for Sunday" copy stays when not all decided; motion.css has a `.pf-done__dial` settle animation inside the no-preference block.
- [ ] **Step 2:** FAIL. **Step 3:** Implement with Dial (decorative) above the title. **Step 4:** green. **Step 5:** commit `feat(app): Done restates the one thing and groups the sort`.

### Task 7: Copy and jargon

**Files:** `src/app/screens/Check.tsx`, `src/app/app.css`, `src/components/ScheduleRow.tsx`, `src/components/CalendarEvent.tsx`, `src/components/ReadRow.tsx` (+ css), `src/components/Icon.tsx` (+ `pencil`), tests, Voice.mdx words list.

- [ ] **Step 1: Failing tests:** Check has no big numeral (`.pf-app__numeral` gone) and reads "Six done yesterday, two moved forward." with the Tally; no "best" ranking anywhere in src/app; labels read "What it read from yesterday · tap a line to fix" and "Today's top 3, as you wrote them"; ReadRow shows a decorative pencil icon; ScheduleRow and CalendarEvent render a non-time value ("due") in the sans face (class `--word`), times stay mono; Icon set includes `pencil`.
- [ ] **Step 2:** FAIL. **Step 3:** Implement; numbers written as words up to ten in this sentence only. **Step 4:** green. **Step 5:** commit `copy: plain words, no ranking, fix affordance`.

### Task 8: Reading state and low-confidence lines

**Files:** `src/app/ritual.ts` (ReadItem `unsure?: boolean`), `src/app/data.ts` (mark `read-2` unsure), `src/app/screens/Check.tsx`, `src/app/MorningRitual.tsx` (`readingMs` prop, default 700, tests pass 0), `src/components/ReadRow.tsx` (`unsure` prop renders a Tag "Not sure"), stories, tests.

- [ ] **Step 1: Failing tests:** Check `reading` renders a `role="status"` "Reading your spread…" with three placeholder rows and no read rows; `reading state is a status and ends on its own` (MorningRitual with `readingMs=50` shows the status then the rows, focus stays on the h1); an unsure row's name is "Fix: run 5k, done, not sure" and shows the Tag; Check orders unsure rows first.
- [ ] **Step 2:** FAIL. **Step 3:** Implement; reduced motion makes the reading pause instant (`matchMedia('(prefers-reduced-motion: reduce)')` or `data-motion="reduced"`). **Step 4:** green. **Step 5:** commit `feat(app): reading state and lines it is not sure about`.

### Task 9: Sheet component and the Input error state

**Files:** create `src/components/Sheet.{tsx,css,test.tsx,stories.tsx}`; modify `src/app/CorrectionSheet.tsx` (composes Sheet), `src/components/Input.{tsx,css,test.tsx,stories.tsx}`, `src/stories/componentDocs.ts`, `design.md`.

**Interfaces:** `Sheet({ title: string; returnFocusTo: HTMLElement | null; onClose: () => void; children })`: bottom sheet dialog, `aria-modal`, labelled by its title, traps Tab, Escape calls onClose, focuses the first field on open, returns focus on unmount. `Input` gains `error?: string`: `aria-invalid`, `aria-describedby` to the message, 2px `accent/default` edge and the message in `text-primary` with a leading note (no red, never scolding).

- [ ] **Step 1: Failing tests:** move the CorrectionSheet focus tests to Sheet (opener returned with body focused, Tab wraps, Escape closes); Input error wiring and CSS.
- [ ] **Step 2:** FAIL. **Step 3:** Implement; CorrectionSheet shows Input error "Write what the line says" when Save is pressed empty (Save stays enabled so the error can show). **Step 4:** green; a11y stories pass. **Step 5:** commit `feat: Sheet component and a calm input error`.

### Task 10: Patterns and changelog

**Files:** create `src/stories/patterns/{ActionBar,Undo,States}.mdx`, `src/stories/Changelog.mdx`; `.storybook/preview.tsx` sort; `src/stories/docs.test.ts` additions.

- [ ] **Step 1: Failing tests:** each pattern page exists with a "When to use" section and embeds or links its stories; Changelog lists v1.0.0, v2.0 (this round's DS v2) and v2.1 (polish) with dates and a component status table generated from `src/components` (every component listed, status stable).
- [ ] **Step 2:** FAIL. **Step 3:** Write the pages (plain language, no em dashes). **Step 4:** green. **Step 5:** commit `docs: patterns and changelog`.

### Task 11: Figma follows code

**Files:** Figma `ZKIX0oa2fm0OwNIGvRWJXJ`; `decisions.md`.

- [ ] **Step 1:** v2 / components: compass ring and desktop chips to border/strong with gold selected; `icon / pencil`; `sheet` component; input `state=error` variant; read row `unsure` variant with the Tag; done list rows.
- [ ] **Step 2:** v2 / screens: update open, snap (shutter + escape), check (sentence + tally, labels, unsure row), sort (escape only), done (new layout), and add `morning / 03 check / reading`; desktop chips and moves text.
- [ ] **Step 3:** Screenshot each changed frame; side-by-side with the coded stories (Playwright) into one review sheet.

### Task 12: Verify, review, Jake's gate

- [ ] **Step 1:** Re-run the critique (two independent assessments) and record the new Nielsen total.
- [ ] **Step 2:** Verifier agent (refute mode) and the whole-branch review; one fix pass, test-first.
- [ ] **Step 3:** Send Jake the before/after sheet and the Figma sheet; merge and deploy only after his OK (deploy with the Vercel CLI; git pushes do not trigger builds).

## Proof

1. Storybook: no white docs-table rows, no ambient tiles behind small stories, no clipped States grid, no theme toggle, "Library" never split (play test), Title Case docs titles (chrome.test.ts).
2. Every ritual step follows the action-bar rule (actionbar.test.tsx) and Snap has a visible "Take the photo" button.
3. Gold counts: Sort ≤ 3 and desktop ≤ 5 gold elements in renders; gold.test.ts green.
4. Undo and revisit covered by reducer and ritual tests; a fix shows "Fixed".
5. Done shows the one thing on paper and grouped decisions; no default bullets.
6. Check has no big numeral or ranking; jargon replaced; pencil affordance.
7. Reading state and unsure lines covered by tests and a story.
8. Sheet is a library component; CorrectionSheet composes it; Input has an error state.
9. Patterns and Changelog pages exist; sidebar order Introduction, Screens, Foundations, Patterns, Components, Changelog.
10. `npm test` green (tokens, unit, stories with a11y at error), typecheck clean.
11. Figma components and screens updated; review sheet sent to Jake.
12. Re-run critique total higher than 22/40; verifier finds no P0/P1.
