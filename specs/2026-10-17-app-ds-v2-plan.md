# Pathfinder App + DS v2 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship pathfinder-ds v2 (tokens, Figma library, code components) and a clickable Figma prototype plus a coded, phone-sized web version of the Pathfinder morning ritual, with v1 frozen as the "before".

**Architecture:** tokens.json stays the single source; the generator gains new categories and an automated contrast test. v1-only code is removed from main (it lives on in tag `v1.0.0` and a frozen Vercel project). The existing Vite app shell (`index.html` + `src/App.tsx`) becomes the morning ritual, built to `storybook-static/app/` so one Vercel project serves Storybook at `/` and the app at `/app/`. Figma work happens in the same file and mirrors tokens.json.

**Tech Stack:** Vite 8, React 19, TypeScript 6, Storybook 10, node:test (tokens), Vitest + Testing Library + jsdom (components and app), Fontsource, Figma Plugin API via `use_figma`, Vercel.

**Spec:** `~/Developer/aurora-archive/_projects/_pathfinder/pathfinderAppSpec.html` (read it first; its tables are the value source). Context: `~/Developer/aurora-archive/_projects/_pathfinder/pathfinderSystemSpec.md`.

**Out of scope (separate plan later):** the portfolio case-study pages (DS v2 and app) in `~/Developer/projects/jakereategui-portfolio`.

## Global Constraints

- tokens.json is the single source of truth; never hand-edit `src/styles/tokens.css`, Figma variables, or `design.md` values without changing tokens.json first.
- Figma naming: lowercase, ` / ` delimited pages, layers and variant values.
- Token naming: lowercase, slash-delimited.
- Fictional brand only. No Stampin' Up! content.
- Plain language in all UI copy; no em dashes in public copy (README, Storybook docs, UI strings).
- Contrast: 4.5:1 for text, 3:1 for meaningful control boundaries, measured over the worst-case background (glass over the 10% gold glow peak).
- Tap targets at least 44px; compass choices at least 64px.
- Every design decision appends one line to `decisions.md` (`what I did | why over the alternative`).
- Handwriting is rendered in Caveat in Figma and shipped as images; Caveat never ships as a web font.
- Sample week everywhere: 2027 W42, Oct 18 to 24, today Friday Oct 22.
- Figma file key: `ZKIX0oa2fm0OwNIGvRWJXJ`. Load `figma:figma-use` (and `figma:figma-generate-library` or `figma:figma-generate-design` as noted) before any `use_figma` call. Known gotchas: set a bound paint, then patch opacity on a copy of `fills`; `createInstance()` resets paint opacity, so reapply on every instance.

## Review Focus

1. **Very long inbox item or choice text** (a 3-line "Later" detail, a 60-character item): rows grow, nothing overlaps or truncates. Pinned in Task 6 (`CompassChoice` long-detail test) and Task 8 (long item test).
2. **Reduced transparency on**: every glass surface becomes the solid fallback `#1D2A4A`. Pinned in Task 4 (surfaces test).
3. **Keyboard and screen reader through the whole ritual**: every step reachable by Tab, the compass is a radio group, glyphs announce "done"/"moved", progress announces "step 3 of 4". Pinned in Tasks 5, 6, 8.
4. **Skipping the snap**: the flow goes straight to Sort and never shows a read it does not have. Pinned in Task 7 (reducer test).
5. **Sorting the last inbox item**: the flow ends on an "All sorted" state instead of an empty Sort screen or a crash. Pinned in Task 7.

---

### Task 1: Freeze v1

**Files:**
- Modify: `README.md` (add "v1 (frozen)" link), `decisions.md`

**Interfaces:**
- Produces: git tag `v1.0.0` at `ece6127`; Vercel project `pathfinder-ds-v1` serving the v1 Storybook; its URL recorded in README.

- [ ] **Step 1:** `git tag -a v1.0.0 ece6127 -m "pathfinder-ds v1: desktop, keyboard-first (frozen before v2)"` then `git push origin v1.0.0`.
- [ ] **Step 2:** `git worktree add ../pathfinder-ds-v1 v1.0.0`, then in it: `npm ci && npm run build-storybook`.
- [ ] **Step 3:** From `../pathfinder-ds-v1/storybook-static`, deploy as a new project: `vercel deploy --prod --yes --name pathfinder-ds-v1` (personal scope; confirm the scope prompt with Jake if the CLI asks).
- [ ] **Step 4:** Verify: `curl -s -o /dev/null -w "%{http_code}" <url>` prints `200`, and the page title contains Storybook.
- [ ] **Step 5:** Remove the worktree (`git worktree remove ../pathfinder-ds-v1`). Add the URL to README under "Versions", append to decisions.md: `Froze v1 at tag v1.0.0 on its own Vercel project | the case study needs a live before; one project's production URL is replaced by the next deploy`.
- [ ] **Step 6:** Commit: `git add README.md decisions.md .gitignore && git commit -m "docs: freeze v1 at v1.0.0 with its own deploy"`.

### Task 2: Retire v1-only code

**Files:**
- Delete: `src/components/CommandBar.{tsx,css,stories.tsx}`, `src/components/TaskRow.{tsx,css,stories.tsx}`, `src/stories/TodayView.stories.tsx`, `src/stories/SearchView.stories.tsx`
- Modify: `src/stories/storyGrid.tsx` (remove the TaskRow note), `package.json` (remove `cmdk`), `src/stories/Introduction.mdx`, `CLAUDE.md`, `design.md`, `.claude/rules/build.md` (component counts), `decisions.md`

- [ ] **Step 1:** Delete the files and `npm uninstall cmdk`.
- [ ] **Step 2:** Run `grep -rn "TaskRow\|CommandBar\|cmdk\|TodayView\|SearchView" src .storybook` and fix every hit.
- [ ] **Step 3:** Replace "9 of 16" style counts with the v2 wording: "v2 components are built in code and Figma; v1 is frozen at tag v1.0.0" (exact counts are updated again in Task 12).
- [ ] **Step 4:** Verify: `npx tsc -b --noEmit`, `npm run lint`, `npm test`, `npm run build-storybook` all succeed.
- [ ] **Step 5:** decisions.md: `Deleted command bar, task row and the two composed v1 views from main | keyboard-first desktop patterns that the phone-first v2 does not use; they survive in v1.0.0 and the frozen deploy`. Commit `chore: retire v1-only components and views`.

### Task 3: Tokens v2 (pipeline + contrast test)

**Files:**
- Modify: `tokens/tokens.json`, `tokens/build.mjs`, `tokens/build.test.mjs`
- Create: `tokens/contrast.mjs`, `tokens/contrast.test.mjs`
- Modify: `package.json` (`"test": "node --test tokens/"`, so every `tokens/*.test.mjs` runs; Task 5 appends `&& vitest run`)

**Interfaces:**
- Produces CSS custom properties used by every later task:
  `--navy-950 #0E1628`, `--navy-800 #1D2A4A`, `--gold-400 #D8B76F`, `--bearing-health #9BC2A5`, `--bearing-people #E3A48C`, `--bearing-home #9DB6DB`, `--bearing-work #D9C38A`, `--bearing-craft #C3A9DB`, `--effect-blur-glass 24px`, `--effect-glow-peak 0.1`, `--type-56-size 56px`, `--type-56-line 56px`, `--font-display`.
  Dark semantic: `--surface-base var(--navy-950)`, `--surface-raised var(--navy-800)`, `--surface-glass #F3EEE30F`, `--surface-glass-edge #F3EEE329`, `--surface-glass-strong #F3EEE31A`, `--surface-glass-strong-edge #F3EEE347`, `--surface-glass-fallback var(--navy-800)`, `--surface-paper var(--cream-100)`, `--text-on-paper var(--navy-900)`, `--text-primary var(--cream-100)`, `--text-secondary #F3EEE3B3`, `--text-muted #F3EEE399`, `--accent-default var(--gold-500)`, `--accent-hover var(--gold-400)`, `--accent-text var(--gold-500)`, `--focus-ring var(--gold-400)`, `--border-subtle #2C3A5C`, `--button-accent-label var(--ink-950)`, `--brand-mark var(--gold-500)`.
- `tokens/contrast.mjs` exports `contrast(fgHex: string, bgHex: string): number` and `composite(fgHex: string, bgHex: string, alpha: number): string` (8-digit hex input allowed; alpha from the hex wins when present).

- [ ] **Step 1: Write failing tests.** In `build.test.mjs`: assert each primitive and dark-semantic value above (regex per line, same style as the existing tests); change the two dark assertions to `--accent-default: var(--gold-500)` and `--tag-text-accent: var(--gold-400)` (dark `tag-text/accent` becomes `{gold/400}`). Keep all light-block assertions as they are (light is dormant). In `contrast.test.mjs`, `test('worst case passes')` builds `worst = composite('#F3EEE3', composite('#C9A35A', '#0E1628', 0.10), 0.06)` and asserts:
  `contrast(composite('#F3EEE3', worst, 0.6), worst) >= 4.5`, `contrast('#C9A35A', worst) >= 4.5`, `contrast('#0A0B0D', '#C9A35A') >= 4.5`, `contrast('#16213B', '#F3EEE3') >= 4.5`, and for each bearing colour `contrast(c, composite(c, worst, 0.16)) >= 4.5`. Also `contrast('#FFFFFF', '#000000')` is `21` (sanity).
- [ ] **Step 2:** `npm test` fails on the new assertions.
- [ ] **Step 3:** Add the values to tokens.json (primitives `color`, new `effect` category, `type` `scale/56`, `font/display`: `'Cormorant Garamond', Georgia, serif`; dark semantic keys as listed). In `build.mjs` add `effect` to `toVarName` (prefix `--effect-`) and make `formatValue` emit unitless numbers for keys starting `glow` and `px` otherwise. Implement `contrast.mjs` with the WCAG 2.2 relative-luminance formula.
- [ ] **Step 4:** `npm test` passes; `grep -c "{" src/styles/tokens.css` shows no unresolved refs (existing test covers it).
- [ ] **Step 5:** decisions.md lines for: navy/950 background, gold accent, 8-digit hex for alpha tokens (`Figma colour variables and CSS both accept alpha hex, so opacity tokens stay single-valued`), 10% glow cap (copy the measured numbers from the spec). Commit `tokens: v2 palette, glass, bearings, display type, contrast test`.

### Task 4: Fonts, base styles, glass surfaces

**Files:**
- Create: `src/styles/fonts.css`, `src/styles/surfaces.css`, `tokens/surfaces.test.mjs`
- Modify: `src/index.css`, `.storybook/preview.tsx` (import both), `package.json` (Fontsource deps)

**Interfaces:**
- Produces classes: `.pf-glass` (fill `--surface-glass`, 1px `--surface-glass-edge`, `backdrop-filter: blur(var(--effect-blur-glass))`), `.pf-glass--strong`, `.pf-glass--nudge` (edge gold at 60%: `#C9A35A99`), `.pf-paper` (bg `--surface-paper`, text `--text-on-paper`), `.pf-ambient` (navy/950 background with two radial-gradient glows whose peak alpha is `var(--effect-glow-peak)` and a dot-field layer: 16px grid of 1px cream dots at 12% alpha, masked to fade out over the top 240px).

- [ ] **Step 1:** Verify package names with `npm view @fontsource/geist-sans version`, `npm view @fontsource/geist-mono version`, `npm view @fontsource/cormorant-garamond version`; install the three that resolve (if Geist Sans has a different Fontsource name, use the one `npm search fontsource geist` lists and note it in decisions.md).
- [ ] **Step 2: Failing test** `surfaces.test.mjs`: reads `surfaces.css` and asserts it contains `@media (prefers-reduced-transparency: reduce)` with `.pf-glass` setting `background: var(--surface-glass-fallback)` and `backdrop-filter: none`, and the same fallback under `@supports not (backdrop-filter: blur(1px))`.
- [ ] **Step 3:** Write `fonts.css` (Geist 400/500/600, Geist Mono 500, Cormorant Garamond 600 only) and `surfaces.css`; set `body` font to `var(--font-sans)`, background `var(--surface-base)`, colour `var(--text-primary)`; default `data-theme="dark"` on `<html>` in `index.html`.
- [ ] **Step 4:** `npm test` passes; `npm run storybook` shows foundations pages on navy/950.
- [ ] **Step 5:** Commit `style: v2 fonts and glass surfaces with reduced-transparency fallback`.

### Task 5: Component test harness + Button and Mark

**Files:**
- Modify: `package.json` (devDeps `vitest`, `@testing-library/react`, `@testing-library/user-event`, `jsdom`; script `"test": "node --test tokens/ && vitest run"`), `vite.config.ts` (`test: { environment: 'jsdom' }`), `src/components/Button.{tsx,css,stories.tsx}`
- Create: `src/components/Mark.{tsx,stories.tsx}`, `src/components/Mark.test.tsx`, `src/components/Button.test.tsx`

**Interfaces:**
- `ButtonVariant = 'primary' | 'quiet' | 'secondary' | 'ghost' | 'danger'`; `quiet` uses `.pf-glass--strong` and `--text-primary`; `primary` fill `--accent-default`, label `--button-accent-label`; md height 52px, radius 14px.
- `type MarkType = 'task' | 'done' | 'moved' | 'dropped' | 'matters' | 'note'`; `Mark({ type, tone = 'gold', size = 20, decorative = false }: { type: MarkType; tone?: 'gold' | 'navy'; size?: number; decorative?: boolean })` renders an inline SVG (24 viewBox, 2px round stroke, paths from the spec's mark set; copy them from the Figma `mark` component set `502:340`), `role="img"` and `aria-label` equal to the type word, or `aria-hidden` when `decorative`.

- [ ] **Step 1: Failing tests.** `Mark.test.tsx`: renders each of the six types with `getByRole('img', { name: type })`; `decorative` removes the role. `Button.test.tsx`: `variant="quiet"` has class `pf-button--quiet`; primary button text colour resolves to `var(--button-accent-label)` via the CSS class (assert class, not computed style).
- [ ] **Step 2:** `npx vitest run` fails.
- [ ] **Step 3:** Implement; add stories (`Mark` grid of 6 types × 2 tones on navy and on `.pf-paper`; Button `Quiet` story).
- [ ] **Step 4:** `npm test` passes; Storybook a11y panel shows no violations on Button and Mark stories.
- [ ] **Step 5:** Commit `feat: button quiet variant, mark glyphs, vitest harness`.

### Task 6: App components

**Files (each with `.tsx`, `.css`, `.stories.tsx`, `.test.tsx` in `src/components/`):** `BearingTag`, `GlassCard`, `ScheduleRow`, `ReadRow`, `CompassChoice`, `ProgressBar`, `Tally`, `AppBar`, `StarRing`

**Interfaces:**
- `type Bearing = 'health' | 'people' | 'home' | 'work' | 'craft'`
- `BearingTag({ bearing }: { bearing: Bearing })`: pill with dot, label is the bearing word in caps (12/18, +6%); fill `color-mix(in srgb, var(--bearing-<b>) 16%, transparent)`, edge 40%.
- `GlassCard({ tone = 'default', as = 'div', children }: { tone?: 'default' | 'nudge'; as?: 'div' | 'section'; children: ReactNode })`, radius 16, padding 14/16.
- `ScheduleRow({ time, title, bearing }: { time: string; title: string; bearing: Bearing })`.
- `ReadRow({ mark, text, snippetSrc, onFix }: { mark: MarkType; text: string; snippetSrc?: string; onFix: () => void })`: a `<button>` min-height 44, `aria-label` `Fix: ${text}`; shows `snippetSrc` image (alt = text) when given, else the text.
- `CompassChoice({ direction, title, detail, checked, onSelect }: { direction: 'N' | 'E' | 'S' | 'W'; title: string; detail: string; checked: boolean; onSelect: () => void })`: `role="radio"`, `aria-checked`, min-height 64, detail wraps; used inside a `role="radiogroup"` with an accessible name.
- `ProgressBar({ step, total }: { step: number; total: number })`: `role="progressbar"`, `aria-valuenow={step}`, `aria-valuemax={total}`, `aria-valuetext={`Step ${step} of ${total}`}`.
- `Tally({ done, moved }: { done: number; moved: number })`: row of `Mark` (decorative) with one `aria-label` on the container: `${done} done, ${moved} moved`.
- `StarRing({ size = 40 })`: inline SVG from `brand/` (add `brand/star-ring.svg`, exported from Figma brand file node `18:48`), `role="img"` `aria-label="Pathfinder"`.
- `AppBar({ onBack }: { onBack?: () => void })`: 44px row, back button (`aria-label="Back"`) when `onBack` given, centred 52px navy/800 disc with `StarRing` 40, gold 45% edge.

- [ ] **Step 1: Failing tests,** one file per component, asserting the interface above: roles and names; `CompassChoice` with a 140-character `detail` renders the full text (no `text-overflow`) and stays a single radio; `ReadRow` click calls `onFix`; `ProgressBar` valuetext `Step 3 of 4`; `Tally` name `6 done, 2 moved`; `BearingTag` text `HEALTH` via `textContent.toUpperCase()` check on the `bearing` word.
- [ ] **Step 2:** Tests fail.
- [ ] **Step 3:** Implement with tokens only (no raw hex except the documented `color-mix` percentages and the nudge edge from Task 4).
- [ ] **Step 4:** `npm test` passes; Storybook a11y panel clean for every new story.
- [ ] **Step 5:** decisions.md lines for: BearingTag as a new component instead of extending Tag (`Tag is status colour; bearings are user life areas, different meaning`), compass as radio group. Commit `feat: v2 app components`.

### Task 7: Ritual state (reducer)

**Files:**
- Create: `src/app/ritual.ts`, `src/app/ritual.test.ts`, `src/app/data.ts`

**Interfaces:**
- `type Step = 'open' | 'snap' | 'check' | 'sort' | 'done'`
- `interface RitualState { step: Step; snapped: boolean; inboxIndex: number; decisions: Record<string, Direction>; reads: ReadItem[] }`
- `type Action = { type: 'next' } | { type: 'back' } | { type: 'skipSnap' } | { type: 'fixRead'; id: string; text: string } | { type: 'choose'; direction: Direction } | { type: 'leaveForSunday' }`
- `ritualReducer(state: RitualState, action: Action, inboxSize: number): RitualState`, `initialRitual(reads: ReadItem[]): RitualState`
- `data.ts` exports `today` (`{ weekday: 'Fri', date: 22, month: 'Oct', week: 42, year: 2027 }`), `oneThing` ('Ship the planner film, tell 3 people'), `schedule` (Dentist 9:30 health; Lunch with Sam 12:00 people; Electric bill · $84 due home), `reads` (done 'draft the brief', done 'run 5k', moved 'call the dentist'), `topThree` ('finish the film color pass', 'case study images', 'call the dentist'), `inbox` (3 items, first 'Book flights for March', source 'Said on the move · Wednesday'), `choices` (N Now / Write it into this week's spread; E Later / Give it a date. It waits in the app until then.; S Share / Hand it to someone or a shared list; W Drop / Let it go on purpose. Logged, not lost.), `yesterday` (`{ done: 6, moved: 2 }`).

- [ ] **Step 1: Failing tests:** open→next→snap; snap→next sets `snapped` and goes to check; `skipSnap` goes to sort with `snapped=false`; `back` from sort after skip returns to snap (not check); `fixRead` replaces the text of that id only; `choose` records the decision for the current item and advances `inboxIndex`; choosing on the last item goes to `done`; `leaveForSunday` goes to `done` and keeps earlier decisions; `back` from open stays on open.
- [ ] **Step 2:** Tests fail. **Step 3:** Implement. **Step 4:** Tests pass.
- [ ] **Step 5:** Commit `feat: morning ritual state`.

### Task 8: Morning ritual screens (coded)

**Files:**
- Create: `src/app/MorningRitual.tsx`, `src/app/screens/{Open,Snap,Check,Sort,Done}.tsx`, `src/app/CorrectionSheet.tsx`, `src/app/app.css`, `src/app/MorningRitual.test.tsx`, `public/app/` assets (from Task 11; use placeholders named exactly as in Task 11 until then)
- Modify: `src/App.tsx` (renders `MorningRitual`), `index.html` (title "Pathfinder · morning ritual")

**Interfaces:** consumes Tasks 4 to 7. Layout per the spec's ritual table: max width 390, ambient background, app bar, eyebrow + display title + supporting line, main action pinned at the bottom of the viewport (sticky, safe-area padding), content scrolls; titles are `<h1>`.

- [ ] **Step 1: Failing tests** (`MorningRitual.test.tsx`, user-event): full keyboard path Tab/Enter through open → snap → check → sort ×3 → done ("All sorted" heading); "Skip today" goes to the Sort heading; activating a read row opens a dialog (`role="dialog"`, name "Fix what I read") whose save updates the row's accessible name; each step's `<h1>` text matches the spec ("Good morning, Jake", "Snap the spread", "Check the read", "Sort the inbox"); a 60-character inbox title renders in full.
- [ ] **Step 2:** Tests fail. **Step 3:** Implement screens with the components; copy is exactly the spec's. **Step 4:** Tests pass; `npm run dev` and check at 390×844 and 320×568 (content scrolls, bottom action stays visible).
- [ ] **Step 5:** Commit `feat: coded morning ritual`.

### Task 9: Build and deploy `/app`

**Files:**
- Modify: `vite.config.ts` (`base: '/app/'`), `package.json` (`"build:app": "vite build --outDir storybook-static/app --emptyOutDir"`), `vercel.json` (`"buildCommand": "npm run build-storybook && npm run build:app"`)

- [ ] **Step 1:** `npm run build-storybook && npm run build:app` locally; `npx vite preview --outDir storybook-static` serves Storybook at `/` and the ritual at `/app/`.
- [ ] **Step 2:** Push a branch and open a Vercel preview (`vercel deploy`); verify both paths return 200.
- [ ] **Step 3:** Lighthouse (chrome-devtools MCP `lighthouse_audit`, mobile) on `<preview>/app/`: accessibility ≥ 95; fix and redeploy until it passes.
- [ ] **Step 4:** Commit `build: serve the ritual at /app beside storybook`. Production promotion waits for Jake.

### Task 10: Figma foundations and library pages

**Skills:** `figma:figma-use` + `figma:figma-generate-library`.

- [ ] **Step 1:** Rename every existing page except `app / exploration` with a `v1 / ` prefix (cover stays first). Create pages `v2 / foundations`, `v2 / components`, `v2 / screens`.
- [ ] **Step 2:** Mirror Task 3's tokens into variables: add primitives (navy/950, navy/800, gold/400, bearing/*), FLOAT `effect/blur/glass` 24, `effect/glow/peak` 0.1, `type/scale/56/size|line`; set the dark mode of `semantic` to Task 3's dark values (alpha colours as RGBA); leave light mode values untouched. Explicit scopes on every new variable.
- [ ] **Step 3:** Text styles for the nine ramp roles (spec table), named `type / <role>`; effect styles `glass / blur` (background blur 24) and `elevation / badge`.
- [ ] **Step 4:** Move the parts board components (all of `app / parts` except `compass / option`, which is deleted) to `v2 / components`, laid out in labelled sections. Rebind every literal colour to variables and apply text styles. Reapply instance opacities per the gotcha.
- [ ] **Step 5:** Build the missing components: `app bar`, `tab bar` (Today, Week, Inbox, Library + centre capture), `progress bar` (variant `step=1..4`), `viewfinder`, `tally`, `glass panel`, `sidebar / nav item` (variant `state=default|active`), `compass / choice` gets `state=default|selected` (selected: gold 60% edge, 10% gold fill).
- [ ] **Step 6:** Audit script: return every node on `v2 / components` with an unbound SOLID fill or stroke; expect an empty list. Screenshot the page.
- [ ] **Step 7:** decisions.md lines for the page structure and any variable that could not be expressed. Commit decisions.

### Task 11: Figma screens, prototype, assets

**Skills:** `figma:figma-use` + `figma:figma-generate-design`.

- [ ] **Step 1:** Rebuild the four ritual screens, a "done / all sorted" screen, a correction overlay ("Fix what I read": the snippet, a text field, Save), and the desktop "this week" on `v2 / screens` from library instances only; set glows to the 10% peak cap.
- [ ] **Step 2:** Prototype reactions: open → snap (button), snap → check (on tap of viewfinder), snap → sort (Skip today), check → sort (Looks right), read row → correction overlay (overlay, close returns), each compass choice → next item state, last → done, back chevrons → previous. Starting flow named `morning ritual`.
- [ ] **Step 3:** Audit: no unbound colours on `v2 / screens`; every frame's text uses a `type / *` style; screenshot each screen.
- [ ] **Step 4:** Export assets at 2x (via `get_screenshot` URL + `curl`) into `public/app/`: `snap-w42.png` (the cream page), `read-1.png`, `read-2.png`, `read-3.png`, `top-1.png`, `top-2.png`, `top-3.png`, `one-thing.png` (each handwriting snippet on transparent or cream as on screen). Commit `assets: rendered handwriting and snap image`.
- [ ] **Step 5:** Share the prototype link with Jake.

### Task 12: Docs and verification

**Files:** `design.md`, `README.md`, `CLAUDE.md`, `.claude/rules/build.md`, `src/stories/Introduction.mdx`, `src/stories/foundations/*.mdx`, `decisions.md`

- [ ] **Step 1:** Update `design.md` to mirror the v2 tokens (generated values, the ramp, the glass and paper rules, the 10% glow cap); update component counts everywhere to the real numbers (`grep -rn "of 16\|components are built" .`).
- [ ] **Step 2:** README: v2 summary, links to `/` Storybook, `/app/`, the frozen v1 URL, and the Figma prototype.
- [ ] **Step 3:** Run `npm test`, `npx tsc -b --noEmit`, `npm run lint`, `npm run build-storybook && npm run build:app`; all pass.
- [ ] **Step 4:** Dispatch the `verifier` agent (model sonnet) with the spec, this plan and the branch diff, instructed to refute "v2 matches the spec and the proof below holds". Resolve P0/P1.
- [ ] **Step 5:** Commit `docs: v2 design spec, counts and links`.

## Proof

Done when all of these hold:
- `git tag` lists `v1.0.0`; the `pathfinder-ds-v1` URL returns 200 and shows v1 (blue accent).
- `npm test` green, including the worst-case contrast test and the reduced-transparency surfaces test.
- Figma: the audit scripts in Tasks 10 and 11 return empty lists; the `morning ritual` prototype clicks through open, snap, check (with one correction), sort ×3 and done, plus skip and back.
- `/app/` on the Vercel preview: full ritual works by keyboard; Lighthouse accessibility ≥ 95 on mobile.
- Verifier pass with no open P0/P1.
