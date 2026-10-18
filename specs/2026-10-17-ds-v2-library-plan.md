# Pathfinder DS v2 Library Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make pathfinder-ds one aligned v2 design system across Figma and Storybook: the new dial logo everywhere, tint tokens, the six v1 leftovers redesigned, the nine Figma-only parts coded, Lucide icons, five states, screen stories, docs, motion, content rules, and real browser a11y and interaction tests.

**Architecture:** tokens.json stays the single source; new alpha tint tokens flow through `tokens/build.mjs` to CSS and are mirrored by hand as Figma variables. Components stay one folder (`src/components/`), screens stay in `src/app/screens/` and get state props so Storybook renders the real screens. Storybook regains its Vitest browser runner (Playwright Chromium) so every story is an a11y test and play functions are interaction tests. Figma work happens in three files through `use_figma`.

**Tech Stack:** Vite 8, React 19, TypeScript 6, Storybook 10.6 (`@storybook/addon-vitest`, `@storybook/addon-a11y`, `@storybook/addon-docs`), Vitest 5 (jsdom suite plus browser project on `@vitest/browser-playwright`), node:test for tokens, `lucide-react`, Figma Plugin API via `use_figma`, Vercel.

**Spec:** `~/Developer/aurora-archive/_projects/_pathfinder/pathfinderDsStorybookV2Spec.html` (approved 2026-10-17; read it first, it wins over this plan on intent). Parent: `pathfinderAppSpec.html` in the same folder.

**Worktree:** `~/Developer/projects/pathfinder-ds-v2-library`, branch `ds-v2-library` off main `52519b6`. All repo work happens there.

## Global Constraints

- tokens.json is the single source of truth; never hand-edit `src/styles/tokens.css`, Figma variables or `design.md` values without changing tokens.json first.
- Figma naming: lowercase, ` / ` delimited pages, layers and variant values. Token naming: lowercase, slash-delimited.
- Fictional brand only. No Stampin' Up! content.
- Plain language; no em dashes in public copy (README, Storybook docs, UI strings).
- Contrast measured over the worst case (glass 6% cream over the 10% gold glow on navy/950): 4.5:1 text, 3:1 control boundaries and focus indicators, muted text never below 60% cream.
- Tap targets at least 44px; compass choices at least 64px.
- Every design decision appends one line to `decisions.md`: `what I did | why over the alternative`.
- Logo rule: the **dial** cut at 24px and up, the **star** cut (compass rose P alone) below 24px.
- Figma files: DS `ZKIX0oa2fm0OwNIGvRWJXJ`, brand mark `YvFbHaXgIBzzJlHoHpuzyw`, planner insert `l2Rtjhk0BUsKLRA6duTgIu`. Load `figma:figma-use` (plus `figma:figma-generate-library` for components and variables, `figma:figma-generate-design` for screens) before any `use_figma`. Gotchas: set a bound paint, then patch opacity on a copy of `fills`; `createInstance()` resets paint opacity.
- Chrome safety: never wrap, symlink or write anything pointing at the Chrome binary. Screenshots only via `"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --user-data-dir="$(mktemp -d)" ...`. Playwright's own Chromium (installed by `npx playwright install chromium`) is separate and allowed.
- No AI attribution in commits. Never push or deploy to production before Jake's final OK (Task 20).
- Sample week everywhere: 2027 W42, Oct 18 to 24, today Friday Oct 22.

## Review Focus

1. **The logo at exactly 24px and at 23px**: 24 renders the dial (ring, 4 dots, star), 23 renders the star alone. Pinned in Task 2 (`Dial` boundary tests).
2. **Click-opened correction sheet closed with Escape in Safari**: focus lands back on the row that opened it, not on `body`. Pinned in Task 9 (jsdom test with `body` focused at mount) and Task 18 (play function).
3. **Large text (200% zoom) and long strings in the new parts**: a 60-character inbox item, toast message or calendar event title wraps; nothing truncates, overlaps or loses its tap target. Pinned in Tasks 10, 11 and 13 (long-text stories, checked by the a11y runner, plus a jsdom assertion that no `text-overflow: ellipsis` / fixed height is applied).
4. **Reduced transparency and reduced motion on every new part**: glass becomes `#1D2A4A` with no blur; motion becomes fade or instant. Pinned in Task 8 (surfaces test covers new classes) and Task 17 (toolbar globals plus a motion test).
5. **Keyboard through the tab bar and sidebar**: every item reachable by Tab, current item has `aria-current="page"`, focus indicator visible. Pinned in Tasks 10 and 11.

---

## Phase A: Logo

### Task 1: Brand mark Figma file

**Files:** Figma `YvFbHaXgIBzzJlHoHpuzyw` only; `decisions.md`.

**Interfaces:**
- Consumes: approved review frame `review / ring mark · option 2` (node `49:2`), section "option 3 · refined" and row "small cut / compare" B.
- Produces: `seal` component set with variants `style=dial, tone=gold` and `style=dial, tone=navy` (dotted `star ring` and plain `ring` variants removed); `mark` set unchanged as the star cut; `favicon` uses the star cut. Exported SVG of `style=dial, tone=gold` for Task 2.

Dial geometry on the 200 grid (verbatim from the spec): ring outer diameter 200, stroke 10 inside; four cardinal dots, diameter 13, centred 74 from the middle; the compass rose P scaled to 112 tall about its ray crossing (100,100) so the N, S and W tips sit on the dots' axes. One colour bound to the `brand/mark` variable family (`VariableID:1:4` is gold).

- [ ] **Step 1:** Read-only `use_figma`: list instances of `18:48` and `18:38` across the file's pages (one call per page, in parallel) so nothing is orphaned.
- [ ] **Step 2:** Rebuild `18:38` (`style=ring, tone=gold`) in place as `style=dial, tone=gold` with the geometry above, layer names `ring`, `cardinal dot / n|e|s|w`, `compass rose p`. Same for `18:74` as `style=dial, tone=navy`. Swap every instance of the `star ring` variants to the matching dial variant, then delete `18:48` and `18:84`. Return ids and counts.
- [ ] **Step 3:** Update the `usage` and `lockups` pages: lockups use the dial at 24px and up, small-size examples use the star; add a size-rule note ("dial at 24px and up, star below").
- [ ] **Step 4:** Move the review frame `49:2` to `archive / explorations`. Delete the stray sketch `New Jake` (`50:422`) only after asking Jake (it is his).
- [ ] **Step 5:** Screenshot `seal`, `lockups` and `usage`; check the dial matches the approved review row and nothing shows the dotted ring.
- [ ] **Step 6:** Export `style=dial, tone=gold` as SVG (`exportAsync({format:'SVG_STRING'})`), save to `brand/_source/dial-figma.svg` in the worktree for Task 2.
- [ ] **Step 7:** decisions.md: `Logo is the dial (solid ring, four cardinal dots, compass rose P) at 24px and up and the P star alone below 24px; the dotted star ring is retired | the 24 small dots fell below 2.3% of the mark's height and vanished at small sizes; the dial passed the 20px squint test at large sizes and the star keeps the P readable at 16px`. Commit `brand: dial logo replaces the star ring in the brand file`.

### Task 2: Repo brand assets and the Dial component

**Files:**
- Create: `brand/dial.svg`, `brand/dial-navy.svg`, `brand/dial-cream.svg`, `brand/dial-mono.svg`, `src/components/Dial.tsx`, `src/components/Dial.test.tsx`, `src/components/Dial.stories.tsx`, `tokens/brand.test.mjs`
- Modify: `brand/lockup.svg`, `brand/previews/*` (regenerate), `public/og.png`, `public/brand-mark.svg` (stays the star), `src/components/AppBar.tsx`, `src/components/AppBar.css`, `src/components/AppBar.test.tsx`, `.storybook/manager.ts` (brandImage stays star at sidebar size), `design.md` (component list and table), `README.md`
- Delete: `brand/star-ring.svg`, `src/components/StarRing.tsx`, `StarRing.test.tsx`, `StarRing.stories.tsx`

**Interfaces:**
- Produces: `export function Dial(props: { size?: number; label?: string }): JSX.Element` in `src/components/Dial.tsx`. Default `size` 40, default `label` `'Pathfinder'`. Renders `<svg role="img" aria-label={label} viewBox="0 0 200 200">` in `currentColor` (colour from `--brand-mark`). `size >= 24` draws the dial; `size < 24` draws the star only. Exported constant `DIAL_MIN_SIZE = 24`.
- AppBar keeps `AppBarProps` unchanged; its disc renders `<Dial size={34} />` and loses its gold edge.

- [ ] **Step 1: Write failing tests** in `Dial.test.tsx`:
  - `renders the dial at 24px`: `render(<Dial size={24} />)`, the svg has 5 `circle` elements (ring plus 4 dots) and 1 `path`.
  - `renders the star alone at 23px`: `size={23}` gives 0 `circle` elements and 1 `path`.
  - `is an image named Pathfinder`: `getByRole('img', { name: 'Pathfinder' })`, `width` and `height` equal `'40'`, `viewBox` `'0 0 200 200'`.
  - `takes a label`: `label="Pathfinder home"` changes the accessible name.
  - In `AppBar.test.tsx` add `the disc shows the dial`: the header contains `getByRole('img', { name: 'Pathfinder' })` with 5 circles.
  - In `tokens/brand.test.mjs` (node:test): every `brand/dial*.svg` parses, has `viewBox="0 0 200 200"`, contains 5 `<circle` (ring drawn as a stroked circle) and 1 `<path`; `brand/star-ring.svg` does not exist; `grep` of `src`, `.storybook`, `index.html`, `design.md` finds no `StarRing` or `star-ring`.
- [ ] **Step 2:** Run `npx vitest run src/components/Dial.test.tsx src/components/AppBar.test.tsx && node --test tokens/brand.test.mjs`. Expected: FAIL (no Dial).
- [ ] **Step 3:** Write `brand/dial*.svg` from `brand/_source/dial-figma.svg`, cleaned to `<circle>` ring (cx 100, cy 100, r 95, stroke-width 10, fill none) + 4 dot circles + the star path scaled by 112/137 about (100,100) (`transform="translate(100 100) scale(0.8175) translate(-100 -100)"` on the existing star path from `StarRing.tsx`). Colourways: gold `#C9A35A`, navy `#16213B`, cream `#F3EEE3`, mono `#000000`. Implement `Dial` with the same geometry; delete StarRing files; update AppBar and its CSS (remove the disc's gold border).
- [ ] **Step 4:** Rebuild `brand/lockup.svg` with the dial at the left (wordmark paths unchanged). Regenerate `brand/previews/*.png` and `public/og.png` from an HTML page rendered by headless Chrome (Global Constraints command) at the existing pixel sizes; og keeps its layout, only the mark changes. Favicons stay the star.
- [ ] **Step 5:** Run `npm test`, `npx tsc -b --noEmit`, `npm run lint`, `npm run build-storybook`. Expected: all pass.
- [ ] **Step 6:** decisions.md: `StarRing renamed Dial and picks its cut by size (dial at 24px and up, star below) | one component enforces the logo size rule so no caller can put the dots at favicon size`; and `App bar disc drops its gold edge | the dial's own ring already draws that circle; two rings read as a double outline`. Commit `feat: Dial component and dial brand assets`.

### Task 3: DS Figma file logo swap

**Files:** Figma `ZKIX0oa2fm0OwNIGvRWJXJ`; `decisions.md`.

**Interfaces:** Produces `brand / dial` (renamed from `brand / star ring`, same node so instances stay linked) and an updated `brand / app badge`.

- [ ] **Step 1:** Read-only: find every instance of `brand / star ring` and `brand / app badge` on all pages (parallel per page), including the cover and every sidebar and app bar.
- [ ] **Step 2:** Rebuild `brand / star ring` in place to the dial geometry (Task 1), rename it `brand / dial`, set its description to the size rule. Update `brand / app badge`: dial inside, no gold edge. Where an instance sits under 24px, swap it to the star (`mark` from the brand library or the local star component).
- [ ] **Step 3:** Screenshot `v2 / components` brand section, `morning / 01 open` and `desktop / this week`; check sidebar lockup and app bar.
- [ ] **Step 4:** decisions.md line for the in-place rebuild. Commit `figma: dial logo in the DS file`.

### Task 4: Insert, portfolio and the other sessions

**Files:** Figma `l2Rtjhk0BUsKLRA6duTgIu`; `~/Developer/projects/jakereategui-portfolio` (only if no live session owns it); `brand/kit/README.md` (asset kit); vault `_claude/_resume/` briefs if a session doesn't answer.

- [ ] **Step 1:** Check `~/Developer/aurora-archive/_claude/_resume/` and `ListAgents` for sessions working in the insert file, pathfinder-site, pathfinder-film and the portfolio. Ask Jake before editing the insert file.
- [ ] **Step 2:** Insert file: replace every mark on the spreads and cover with the dial (24px and up) or star (below), paper colourway navy on cream. Screenshot each changed page.
- [ ] **Step 3:** Write `brand/kit/README.md`: the size rule, the four dial SVGs, the star SVGs, colours, clear space (one dot diameter on every side), and "do not recolour the dots separately". Commit `brand: logo asset kit`.
- [ ] **Step 4:** SendMessage to the pathfinder-site and pathfinder-film sessions: the brief (what changed, the size rule, the kit path on branch `ds-v2-library`, "please swap the logo, favicon and OG image, and reply when done"). If no session is live, write `pathfinderLogoSwap.resume.md` handoffs in the vault `_resume/` for Jake.
- [ ] **Step 5:** Portfolio: swap Pathfinder mark assets in the case study if no session owns the repo; otherwise brief it the same way.
- [ ] **Step 6:** Record acknowledgements (reply or commit hash) in the plan's progress notes.

## Phase B: Tokens and test pipeline

### Task 5: Tint tokens

**Files:**
- Modify: `tokens/tokens.json` (`semantic.dark`), `tokens/build.test.mjs`, `tokens/contrast.test.mjs`, `src/components/BearingTag.css`, `CompassChoice.css`, `AppBar.css`, `Tag.css`, `DateChip.css`, `src/app/app.css`, `src/styles/surfaces.css`, `design.md`, `brand/palette.md`
- Regenerate: `src/styles/tokens.css`

**Interfaces:**
- Produces dark semantic tokens (8-digit hex, same pattern as `surface/glass`): `bearing/health/fill` `#9BC2A529`, `bearing/health/edge` `#9BC2A566`, and the same pair for `people #E3A48C`, `home #9DB6DB`, `work #D9C38A`, `craft #C3A9DB` (fill alpha 29 = 16%, edge alpha 66 = 40%); `accent/selected-edge` `#C9A35A99` (60%), `accent/selected-fill` `#C9A35A1A` (10%), `accent/badge-edge` `#C9A35A73` (45%), `accent/nav-active` `#C9A35A24` (14%). CSS vars follow the generator (`--bearing-health-fill`, ...). Light block gets no entries (dark only).

- [ ] **Step 1: Write failing tests.** `build.test.mjs`: one regex assertion per new var in the dark block. `contrast.test.mjs`: replace the computed `composite(c, worst, 0.16)` bearing check with the token's own 8-digit fill (`composite(fillHex, worst, 1)`) and keep `>= 4.5`.
- [ ] **Step 2:** `npm test` fails on the missing vars.
- [ ] **Step 3:** Add the tokens to tokens.json, run `node tokens/build.mjs`, replace every tint `color-mix(...)` in the listed CSS with `var(--...)`. Glow colours that mix with `--effect-glow-peak` stay as they are (they are not tints).
- [ ] **Step 4:** `npm test` passes; `grep -rn "color-mix" src` lists only the glow lines in `surfaces.css` and `app.css` (write the remaining count in the commit body).
- [ ] **Step 5:** design.md and palette.md mirror the new tokens. decisions.md: `Tint opacities became alpha tokens (ten bearing, four gold), dark only | hand-applied paint opacity is what createInstance resets; a bound alpha variable at paint opacity 1 cannot be reset`. Commit `feat(tokens): tint tokens`.

### Task 6: Figma tint variables and the open-screen fix

**Files:** Figma DS file; `decisions.md`.

- [ ] **Step 1:** Create the 14 variables in the semantic collection with the Task 5 names and values in the dark mode; light and `v1 dark` modes copy the dark value. Scopes: fills `["FRAME_FILL","SHAPE_FILL"]`, edges `["STROKE_COLOR"]`.
- [ ] **Step 2:** Rebind every bearing tag fill and edge, compass selected state, app badge edge and active nav fill on `v2 / components` to these variables at paint opacity 1. Then sweep instances on `v2 / screens` and reset any overridden opacity.
- [ ] **Step 3:** Verify by query: no paint on `v2 / components` or `v2 / screens` bound to a bearing or gold variable has `opacity < 1`. Screenshot `morning / 01 open`: the tags show "health", "people", "home" on tinted pills.
- [ ] **Step 4:** Update the cover's variable count. decisions.md line. Commit `figma: tint variables, open screen tags readable again`.

### Task 7: Browser test pipeline

**Files:**
- Modify: `package.json`, `vite.config.ts`, `.storybook/main.ts`, `.storybook/preview.tsx` (`a11y.test: 'error'`), `.claude/rules/build.md` (replace the "no Storybook test-runner addon" paragraph with the new scripts), `decisions.md`
- Create: `.storybook/vitest.setup.ts`, `vitest.shims.d.ts`

**Interfaces:**
- Produces scripts: `"test:unit": "node --test \"tokens/*.test.mjs\" && vitest run --project unit"`, `"test:stories": "vitest run --project storybook"`, `"test": "npm run test:unit && npm run test:stories"`. Vitest projects: `unit` (existing jsdom config) and `storybook` (`storybookTest()` plugin, browser mode, `@vitest/browser-playwright`, `chromium`, headless).

- [ ] **Step 1:** `npm i -D @storybook/addon-vitest@^10.6.0 @vitest/browser-playwright playwright` and `npx playwright install chromium`. Add `@storybook/addon-vitest` to `.storybook/main.ts` addons.
- [ ] **Step 2:** Split `vite.config.ts` `test` into the two projects above; `.storybook/vitest.setup.ts` calls `setProjectAnnotations` with preview and the a11y annotations.
- [ ] **Step 3:** Set `a11y.test` to `'error'`. Run `npm run test:stories`. Expected: every existing story runs in Chromium; any a11y violation fails. Fix real violations found (each fix gets a decisions.md line only if it is a design decision).
- [ ] **Step 4:** `npm test` passes end to end.
- [ ] **Step 5:** decisions.md: `Reintroduced the Storybook Vitest browser runner (Playwright Chromium) and set a11y tests to error | jsdom cannot measure contrast, glass or focus, so the a11y gate the v2 library promises would check nothing real; reverses the Task 12 scaffold decision`. Commit `test: story tests in a real browser, a11y gates the build`.

## Phase C: Figma design pass (gate)

### Task 8: The six leftovers in Figma

**Files:** Figma DS file `v2 / components`; `decisions.md`.

- [ ] **Step 1:** Build `checkbox`, `tag`, `toast`, `input`, `empty state`, `date chip` as v2 component sets per the spec's direction table, from existing variables only (glass fill and edge, `border/strong`, gold, the v2 text styles). Variants: checkbox `checked=false|true`, `disabled=false|true`; tag `size=default`; toast `action=none|one`; input `state=default|filled`; empty state `action=none|one`, `surface=glass|dots`; date chip `selected=false|true`. Interaction states (hover, focus, pressed) go on a spec frame next to each set, not as variants (v1 discipline).
- [ ] **Step 2:** Return ids; screenshot each set and its spec frame.
- [ ] **Step 3:** Measure in a read-only call: control edges 3:1 against worst-case glass, text 4.5:1. List the numbers.

### Task 9: Lucide icons in Figma

- [ ] **Step 1:** Import the chosen Lucide SVGs (24 grid, stroke 2, round caps) as components `icon / <name>` with a `color` bound to `text/primary`. Proposed set, reviewed at the gate: today `sun`, week `calendar-range`, inbox `inbox`, library `library`, capture `plus`, calendar `calendar`, projects `folder-kanban`, look back `history`, back `chevron-left`, try again `rotate-ccw`, offline `cloud-off`, check `check`.
- [ ] **Step 2:** Add icons beside the labels in `tab bar` and `sidebar / nav item` (labels stay). Screenshot both.

### Task 10: Five states in Figma, then the gate

- [ ] **Step 1:** Build frames on `v2 / screens`: `morning / 02 snap / blurry`, `morning / 03 check / nothing new`, `morning / 04 sort / empty`, `morning / offline` (toast over open), `morning / 01 open / snap skipped`, from library instances only, copy per the spec's states table and the content rules (Task 16).
- [ ] **Step 2:** **Gate.** Send Jake screenshots of Tasks 8, 9 and 10, numbered. Stop Phase E until he approves; apply his changes in Figma first. Log approval date in decisions.md.

## Phase D: Code that does not wait on the gate

### Task 11: The three fixes

**Files:** `src/app/app.css`, `src/components/ReadRow.css`, `src/components/ReadRow.tsx`, `src/app/CorrectionSheet.tsx`, `src/app/MorningRitual.tsx`, `src/app/screens/Check.tsx`, tests beside them.

**Interfaces:** `CorrectionSheetProps` gains `returnFocusTo: HTMLElement | null` (required). Check passes the clicked row element; CorrectionSheet focuses it on unmount instead of reading `document.activeElement`.

- [ ] **Step 1: Write failing tests.**
  - `CorrectionSheet returns focus to the opener even when body had focus`: create a button, `document.body.focus()`, render the sheet with `returnFocusTo={button}`, unmount, expect `document.activeElement === button`.
  - `snippet and snap images use explicit half size`: render ReadRow with a snippet; the `img` has `width` and `height` attributes equal to half its source size (from `src/app/assets.ts` metadata), and its computed style has no `zoom`.
- [ ] **Step 2:** Run them; FAIL.
- [ ] **Step 3:** Replace the three `zoom: 0.5` rules in `app.css` and the one in `ReadRow.css` with `width`/`height` set from the asset's natural size halved (add `width`/`height` to each entry in `assets.ts` if missing) plus `max-width: 100%; height: auto`. Implement `returnFocusTo`.
- [ ] **Step 4:** Title focus: change `.pf-app__title:focus-visible` to `outline: 1px solid var(--focus-ring); outline-offset: 6px; border-radius: var(--radius-sm)`. Verify contrast of `#D8B76F` against the worst case is at least 3:1 (add an assertion in `contrast.test.mjs`).
- [ ] **Step 5:** Tests pass. decisions.md line for the lighter focus style. Commit `fix: image sizing, correction sheet focus, lighter title focus`.

### Task 12: Phone parts coded

**Files:** Create `TabBar`, `Viewfinder`, `DotGrid`, `AppBadge` (`.tsx`, `.css`, `.test.tsx`, `.stories.tsx` each) in `src/components/`; modify `src/app/screens/Snap.tsx`, `src/app/app.css` to use them.

**Interfaces:**
- `TabBar({ active: 'today'|'week'|'inbox'|'library', onSelect?: (tab) => void, onCapture?: () => void })`: `nav` with `aria-label="Main"`, four links/buttons, the active one `aria-current="page"`, centre capture button `aria-label="Capture"`, each at least 44px.
- `Viewfinder({ found: boolean, weekCode?: string, corners?: number, children })`: the gold brackets when `found`; the status pill text `Found W42 · 4 corners`.
- `DotGrid({ surface: 'navy'|'cream', fade?: boolean })`: decorative, `aria-hidden="true"`.
- `AppBadge({ size?: number })`: circular navy tile holding `<Dial size={Math.round(size*0.77)} />`; `size` default 44.

- [ ] **Step 1: Failing tests:** TabBar marks only the active tab with `aria-current="page"`, every control's box is at least 44 by 44 (jsdom: assert the CSS class sets `min-height: 44px` via `getComputedStyle` after importing the CSS), Tab reaches all five controls in order; Viewfinder shows the pill text only when `found`; DotGrid is `aria-hidden`; AppBadge contains the dial at 44 and the star at 28.
- [ ] **Step 2:** FAIL. **Step 3:** Implement to match Figma `tab bar`, `viewfinder`, `paper / dot grid`, `paper / dot grid on cream`, `brand / app badge` (pull values with `get_design_context` after loading `figma:figma-design-to-code`). Move the viewfinder and dot field markup out of `app.css` into the components; Snap uses `Viewfinder`. Stories include a long-label TabBar story.
- [ ] **Step 4:** `npm test` passes (a11y on the new stories included). Commit `feat: tab bar, viewfinder, dot grid, app badge`.

### Task 13: Desktop parts coded

**Files:** Create `SidebarNavItem`, `GlassPanel`, `CalendarEvent`, `MapBox` in `src/components/` (same four files each).

**Interfaces:**
- `SidebarNavItem({ label: string, href: string, active?: boolean, count?: number, icon?: ReactNode })`: `a` with `aria-current="page"` when active; count rendered as a gold badge with visually hidden " to sort".
- `GlassPanel({ title?: string, children })`: `section` with `aria-labelledby` when titled; glass with reduced-transparency fallback. Check against `GlassCard` first: if Figma `glass panel` and code `GlassCard` are the same part, extend `GlassCard` and skip this file (log the call).
- `CalendarEvent({ time: string, title: string, bearing: Bearing, kind?: 'event'|'appointment'|'bill'|'reminder', amount?: string })`: bearing-coloured left rule plus the bearing word for screen readers (never colour alone).
- `MapBox({ children })`: per Figma `map / box`.

- [ ] **Step 1: Failing tests:** active nav item has `aria-current`; count announces "3 to sort"; CalendarEvent exposes the bearing name in text (`getByText('health', { exact: false })` or visually hidden); a 60-character event title is fully in the DOM with no `text-overflow: ellipsis` in computed style.
- [ ] **Step 2:** FAIL. **Step 3:** Implement to match Figma. **Step 4:** pass, commit `feat: desktop parts`.

## Phase E: After the gate

### Task 14: The six leftovers coded

**Files:** `Checkbox`, `Tag`, `Toast`, `Input`, `EmptyState`, `DateChip` in `src/components/` (modify in place; add `.test.tsx` where missing); `src/app/CorrectionSheet.tsx` uses `Input`.

- [ ] **Step 1: Failing tests per component:** Checkbox is a native checkbox with a visible label and `disabled` support; Tag has no status variants (neutral only) and no colour prop; Toast is `role="status"` with optional action button; Input has a `label` prop wired by `htmlFor` and gold focus class; EmptyState renders title (heading level prop, default 2), line and optional action; DateChip `selected` sets `aria-pressed`.
- [ ] **Step 2:** FAIL. **Step 3:** Rebuild each to the approved Figma set; remove v1 variant props and update every caller and story. **Step 4:** pass, commit `feat: v1 leftovers redesigned for v2`.

### Task 15: Icons in code

- [ ] **Step 1:** `npm i lucide-react`. Create `src/components/Icon.tsx`: `Icon({ name: IconName, size?: 20|24 })` wrapping the approved Lucide set, `aria-hidden="true"`, `strokeWidth={2}`; `IconName` is the union of the approved names.
- [ ] **Step 2:** Failing test: every `IconName` renders an svg with `aria-hidden` and stroke width 2. Then wire icons into TabBar, SidebarNavItem, AppBar back button (replacing the inline chevron). Pass; commit `feat: Lucide icons`.

### Task 16: States in the screens and content rules

**Files:** `src/app/screens/*.tsx`, `src/app/ritual.ts`, `src/app/MorningRitual.tsx`, tests; `src/stories/foundations/Voice.mdx`.

**Interfaces:**
- `Snap` gains `photo?: 'ok'|'blurry'`; `Check` gains `reads` possibly empty (renders the nothing-new EmptyState); `Sort` handles an empty inbox (EmptyState "All sorted"); `Open` gains `snapSkipped?: boolean` and `lastSync?: string`; a shared `offline?: boolean` shows the Toast "Saved on this phone. It will sync when you are back online."
- [ ] **Step 1: Failing tests:** each prop renders its state copy; the ritual reducer reaches empty inbox and snap skipped in `/app`; the blurry snap still offers "Skip today".
- [ ] **Step 2:** Implement with the approved Figma copy. **Step 3:** Write `Voice.mdx` (the spec's content rules, each with a do and a don't). Tests pass; commit `feat: five states and voice and content rules`.

## Phase F: Storybook

### Task 17: Screen stories, desktop composition, toolbar switches

**Files:** Create `src/stories/screens/*.stories.tsx` (one file per screen), `src/stories/screens/DesktopThisWeek.tsx` and its story; modify `.storybook/preview.tsx` (globals `transparency: 'full'|'reduced'`, `motion: 'full'|'reduced'` set `data-transparency` / `data-motion` on `html`; `storySort` adds `Screens` after `Components`), `src/styles/surfaces.css` (honour `[data-transparency=reduced]` as well as the media query).

- [ ] **Step 1:** Stories import the real screens from `src/app/screens` with fixture data from `src/app/data.ts`: open, snap, check, sort 1 of 3, 2 of 3, 3 of 3, done, fix what I read, plus the five states. Each sets `parameters.design = { type: 'figma', url: <node url> }` and `layout: 'fullscreen'` at 390 by 844.
- [ ] **Step 2:** `DesktopThisWeek` composes SidebarNavItem, CalendarEvent, GlassPanel/GlassCard, BearingTag, CompassChoice chips, ProgressBar and Dial at a fixed 1440 by 900, data from Figma `desktop / this week`.
- [ ] **Step 3:** Failing test then implementation: with `data-transparency="reduced"`, `.pf-glass` computes `backdrop-filter: none` and background `#1D2A4A` (extend `tokens/surfaces.test.mjs`).
- [ ] **Step 4:** `npm test` passes. Commit `feat(storybook): screen stories, desktop this week, transparency and motion switches`.

### Task 18: Docs, states stories, interaction tests

**Files:** every `*.stories.tsx` in `src/components/` (add `tags: ['autodocs']`, docs description, a `States` story, Figma link); create `src/stories/foundations/{Glass,Ambient,Paper,Bearings,Logo,Icons,Accessibility}.mdx`; extend `Motion.mdx`.

- [ ] **Step 1:** Each component's docs: what it is for, when to use it and when not, do and don't as live examples, accessibility notes, tokens used, Figma link. Interactive components get a `States` story rendering default, hover, focus, pressed, disabled side by side (forced with state classes `is-hover`, `is-focus`, `is-active` mirrored in each CSS file next to the pseudo-class).
- [ ] **Step 2:** Play functions: `CompassChoice` (click Later, `aria-pressed` and callback), `CorrectionSheet` (click a row, type, Save shows the corrected text; reopen, Escape, focus back on the row), `MorningRitual` full flow (open, snap, check, sort three times, done shows "All sorted").
- [ ] **Step 3:** Foundations pages per the spec section 5 list; Logo page states the 24px rule with both cuts rendered.
- [ ] **Step 4:** `npm test` passes; `npm run build-storybook` succeeds. Commit `docs: v2 library docs, states stories, interaction tests`.

### Task 19: Motion and the alignment pass

- [ ] **Step 1:** Implement the five signature moments with existing motion tokens only; each wrapped in `@media (prefers-reduced-motion: no-preference)` and `[data-motion=full]`. Test: with `data-motion="reduced"` the tally renders its final number immediately.
- [ ] **Step 2:** Alignment: for every component, screenshot the Storybook story (headless Chrome) and the Figma component; list differences; fix Figma where code settled something, fix code where Figma is the approved design. Update counts in `design.md`, the Figma cover and `Introduction.mdx` so all three match. decisions.md line per settled difference.
- [ ] **Step 3:** Commit `chore: motion moments and Figma to code alignment`.

### Task 20: Verify and deploy

- [ ] **Step 1:** Run every Proof check below; record results in this file under Proof.
- [ ] **Step 2:** Dispatch the `verifier` agent (fresh context, refute mode) on the branch; fix P0 and P1.
- [ ] **Step 3:** Ask Jake for the final OK. Then merge `ds-v2-library` to main, push, confirm the Vercel production deploy, re-run Lighthouse mobile on `/app/`.

## Proof

Done when all are true (copied from the spec, with how to check):

1. Dial and star are the only Pathfinder logo in the brand file, DS file, insert file, pathfinder-ds and portfolio: Task 1 to 4 screenshots, `tokens/brand.test.mjs` green, site and film acknowledgements recorded.
2. tokens.json holds every tint; `grep -rn "color-mix" src` lists glow lines only; `npm test` green; open screen tags show their words (Task 6 screenshot).
3. Jake's gate approval of Tasks 8 to 10 logged in decisions.md before Task 14 started.
4. Every `v2 / components` part has a Storybook entry with docs, a States story and a Figma link, and the reverse holds; counts match in design.md, Figma cover and Introduction.
5. 9 screen frames and 5 states each have a story; Task 19 side-by-side shows no unexplained component-level difference.
6. `npm test` runs token, unit, a11y and interaction tests in one command, green.
7. The three fixes: images measured at half natural size at 390 and 1440 wide; focus returns to the opening row (test plus manual Safari check by Jake); title focus indicator measured at 3:1 or better.
8. Production live; Lighthouse mobile accessibility on `/app/` at 95 or higher.
9. Verifier finds no P0 or P1.
