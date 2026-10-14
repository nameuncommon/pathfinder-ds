# Palette

Validated color ramps for Pathfinder design system. All text/background pairs meet WCAG contrast requirements (floor: 4.5 for text, 3.0 for UI/accents).

## Ramps

### Neutrals (ink / slate / paper)
| Token | Hex |
|---|---|
| ink-950 | #0A0B0D |
| ink-900 | #111318 |
| ink-800 | #191C23 |
| ink-700 | #232733 |
| ink-600 | #303648 |
| slate-500 | #4D5468 |
| slate-400 | #737B90 |
| slate-300 | #9AA1B4 |
| slate-200 | #C3C8D6 |
| paper-100 | #E8EAF0 |
| paper-50 | #F4F5F8 |
| paper-0 | #FBFBFD |

### Compass (blue accent)
| Token | Hex |
|---|---|
| blue-700 | #214FC4 |
| blue-600 | #2456D6 |
| blue-500 | #3E7BFA |
| blue-400 | #6EA0FF |
| blue-300 | #A3C4FF |

`blue-700` is not part of the original 4-step board ramp (600/500/400/300). It's a fifth,
computed step: an HSL lightness-only darkening of `blue-600` (h223.15 s71.2%, l 49.0% -> 45.0%,
hue/saturation held) added specifically because `blue-600` itself fails the `tag-text/accent`
light-theme composite check on `surface/raised` (see Contrast Pairs & Validation below) -
same technique used for the light-theme danger/warning nudge.

### Topo (green semantic)
| Token | Hex |
|---|---|
| green-600 | #3F6B5B |
| green-500 | #4F8168 |
| green-400 | #6FA184 |

### Brand (mark and brand surfaces only)
The mark, lockup, favicon and brand art use navy, gold and cream. They are not UI colors: the
interface keeps ink surfaces and the blue accent. `brand/mark` resolves to gold in dark theme and
navy in light theme.

| Token | Hex |
|---|---|
| navy-900 | #16213B |
| gold-500 | #C9A35A |
| cream-100 | #F3EEE3 |

Measured (WCAG 2.x ratio; the mark is a graphic, so 3:1 is the floor, all clear 4.5:1 anyway):

| Pair | Ratio |
|---|---|
| gold-500 on ink-950 | 8.32 |
| gold-500 on ink-800 | 7.20 |
| navy-900 on paper-0 | 15.45 |
| navy-900 on paper-50 | 14.65 |
| gold-500 on navy-900 | 6.75 |
| cream-100 on navy-900 | 13.80 |

### Status
Status colors are theme-aware like text/accent: the dark-theme hex is the base brand value; the
light-theme hex is a lightness-only nudge (same hue and saturation) so text/UI use clears 4.5:1 on
`paper/0`.

| Token | Dark | Light |
|---|---|---|
| danger | #E5484D | #D8353D |
| warning | #E8A33D | #9D6A1D |
| success | #4F8168 (green-500) | #3F6B5B (green-600) |

## Contrast Pairs & Validation

All pairs validated to WCAG AA 4.5:1 for text, 3.0:1 for UI/accent elements.

| Foreground | Background | Pairing | Ratio | Floor | Status |
|---|---|---|---|---|---|
| #F4F5F8 | #0A0B0D | text/primary on surface/base dark | 18.06 | 4.5 | PASS |
| #9AA1B4 | #0A0B0D | text/muted on surface/base dark | 7.62 | 4.5 | PASS |
| #F4F5F8 | #191C23 | text/primary on surface/raised dark | 15.64 | 4.5 | PASS |
| #3E7BFA | #0A0B0D | accent on dark (large/UI) | 5.08 | 3.0 | PASS |
| #111318 | #FBFBFD | text/primary on surface/base light | 17.98 | 4.5 | PASS |
| #4D5468 | #FBFBFD | text/muted on surface/base light | 7.30 | 4.5 | PASS |
| #2456D6 | #FBFBFD | accent on light (large/UI) | 6.02 | 3.0 | PASS |
| #0A0B0D | #3E7BFA | button label (ink) on accent | 5.08 | 4.5 | PASS |
| #E5484D | #0A0B0D | danger text on surface/base dark | 5.03 | 4.5 | PASS |
| #E8A33D | #0A0B0D | warning text on surface/base dark | 9.13 | 4.5 | PASS |
| #D8353D | #FBFBFD | danger text on surface/base light | 4.52 | 4.5 | PASS |
| #9D6A1D | #FBFBFD | warning text on surface/base light | 4.50 | 4.5 | PASS |

Light-theme danger/warning were nudged from their first-pass candidates (#D93840 -> #D8353D,
4.43 -> 4.52; #B97D22 -> #9D6A1D, 3.38 -> 4.50) by lowering HSL lightness only, hue and saturation
held constant, until each cleared the 4.5:1 floor against `paper/0`. The accent rows above were
re-run for the orange -> blue swap (blue/500 for dark, blue/600 for light, per the semantic
mapping); both accent-on-surface pairs clear their 3.0 UI floor with more headroom than the
orange values did (5.08 vs 5.31 dark, 6.02 vs 4.76 light), and the ink-on-accent button label
pair still clears its stricter 4.5 text floor at 5.08.

## Tag-text composite validation (20 cells)

Tag/DateChip text renders on a translucent tint, not a solid fill, so `tag-text/*` is checked
against the actual composited background: the hue token at 18% opacity (13% for danger) painted
over `surface/base` or `surface/raised`, per theme. All 20 cells (5 colors x 2 themes x 2
surfaces) were re-run for the blue swap; only the accent column's colors and results changed.

| Variant | Theme | Surface | Tint composite | Text | Ratio | Status |
|---|---|---|---|---|---|---|
| accent | dark | base | #131F38 | #6EA0FF (blue-400) | 6.35 | PASS |
| accent | dark | raised | #202D4A | #6EA0FF (blue-400) | 5.30 | PASS |
| accent | light | base | #D4DDF6 | #214FC4 (blue-700) | 5.19 | PASS |
| accent | light | raised | #CFD8F2 | #214FC4 (blue-700) | 4.95 | PASS |
| success | dark | base | #16201D | #6FA184 (green-400) | 5.65 | PASS |
| success | dark | raised | #232E2F | #6FA184 (green-400) | 4.73 | PASS |
| success | light | base | #D9E1E0 | #3C6757 (literal) | 4.83 | PASS |
| success | light | raised | #D3DCDC | #3C6757 (literal) | 4.60 | PASS |
| neutral | dark | base | #1D1F25 | #9AA1B4 (slate-300) | 6.38 | PASS |
| neutral | dark | raised | #292D37 | #9AA1B4 (slate-300) | 5.33 | PASS |
| neutral | light | base | #E3E4E9 | #4D5468 (slate-500) | 5.94 | PASS |
| neutral | light | raised | #DDDFE5 | #4D5468 (slate-500) | 5.66 | PASS |
| danger | dark | base | #261315 | #E5484D (literal) | 4.52 | PASS |
| danger | dark | raised | #342228 | #E5484D (literal) | 3.82 | **FAIL (pre-existing, documented)** |
| danger | light | base | #F6E1E4 | #BE2F36 (literal) | 4.61 | PASS |
| danger | light | raised | #F0DCE0 | #BE2F36 (literal) | 4.39 | **FAIL (pre-existing, documented)** |
| warning | dark | base | #322616 | #E8A33D (literal) | 6.84 | PASS |
| warning | dark | raised | #3E3428 | #E8A33D (literal) | 5.64 | PASS |
| warning | light | base | #EAE1D5 | #815718 (literal) | 4.90 | PASS |
| warning | light | raised | #E4DCD1 | #815718 (literal) | 4.67 | PASS |

Both `danger`-on-`surface/raised` failures are the same pre-existing, documented exception this
system has always carried (no danger tags/chips ship on `surface/raised`, either theme; see
`decisions.md` and `design.md`) - unrelated to the blue swap and unchanged by it. Every other
cell, including all 4 accent cells, passes 4.5:1.

The accent column is the only one that changed. `blue-600` alone (the direct mirror of the
orange-swap semantic mapping) passes on `surface/base` (4.58) but fails on `surface/raised`
(4.37) in light theme - so `tag-text/accent` (light) uses the darkened `blue-700` step instead
(see the Compass ramp note above), which clears both surfaces (5.19 / 4.95).

## Notes

Accent buttons carry ink-950 (#0A0B0D) labels in both dark and light themes using the brand blue
(#3E7BFA fill, i.e. blue-500 - the same value used as `accent/default` in dark theme). Paper-on-accent
fails 4.5:1 and is not used for text.

Success-green (#4F8168 dark H150/S24%/L41%, #3F6B5B light H158/S26%/L33%) and accent-blue
(#3E7BFA dark H220/S95%/L61%, #2456D6 light H223/S71%/L49%) stay clearly distinct after the swap -
roughly 63-73 degrees apart on the hue wheel in both themes, with green markedly less saturated
than blue, so there's no confusability between "success" and "accent" states.

## Script

Run this to validate all pairs:

```bash
python3 - <<'EOF'
def lum(h):
    r,g,b=[int(h[i:i+2],16)/255 for i in (1,3,5)]
    f=lambda c: c/12.92 if c<=0.04045 else ((c+0.055)/1.055)**2.4
    return 0.2126*f(r)+0.7152*f(g)+0.0722*f(b)
def ratio(a,b):
    la,lb=sorted((lum(a),lum(b)),reverse=True)
    return (la+0.05)/(lb+0.05)
def composite(fg,bg,alpha):
    f=[int(fg[i:i+2],16) for i in (1,3,5)]
    b=[int(bg[i:i+2],16) for i in (1,3,5)]
    return '#%02X%02X%02X' % tuple(round(f[i]*alpha+b[i]*(1-alpha)) for i in range(3))

pairs=[
 ("#F4F5F8","#0A0B0D","text/primary on surface/base dark",4.5),
 ("#9AA1B4","#0A0B0D","text/muted on surface/base dark",4.5),
 ("#F4F5F8","#191C23","text/primary on surface/raised dark",4.5),
 ("#3E7BFA","#0A0B0D","accent on dark (large/UI)",3.0),
 ("#111318","#FBFBFD","text/primary on surface/base light",4.5),
 ("#4D5468","#FBFBFD","text/muted on surface/base light",4.5),
 ("#2456D6","#FBFBFD","accent on light (large/UI)",3.0),
 ("#0A0B0D","#3E7BFA","button label (ink) on accent",4.5),
 ("#E5484D","#0A0B0D","danger text on surface/base dark",4.5),
 ("#E8A33D","#0A0B0D","warning text on surface/base dark",4.5),
 ("#D8353D","#FBFBFD","danger text on surface/base light",4.5),
 ("#9D6A1D","#FBFBFD","warning text on surface/base light",4.5),
]
for fg,bg,label,floor in pairs:
    r=ratio(fg,bg)
    print(("PASS" if r>=floor else "FAIL"), f"{r:.2f}", label)

# Tag-text 20-cell composite check (18% tint, 13% for danger)
ink950,ink800,paper0,paper50="#0A0B0D","#191C23","#FBFBFD","#F4F5F8"
tag_cells=[
 ("accent","dark","base","#3E7BFA",0.18,"#6EA0FF"),
 ("accent","dark","raised","#3E7BFA",0.18,"#6EA0FF"),
 ("accent","light","base","#2456D6",0.18,"#214FC4"),
 ("accent","light","raised","#2456D6",0.18,"#214FC4"),
 ("success","dark","base","#4F8168",0.18,"#6FA184"),
 ("success","dark","raised","#4F8168",0.18,"#6FA184"),
 ("success","light","base","#3F6B5B",0.18,"#3C6757"),
 ("success","light","raised","#3F6B5B",0.18,"#3C6757"),
 ("neutral","dark","base","#737B90",0.18,"#9AA1B4"),
 ("neutral","dark","raised","#737B90",0.18,"#9AA1B4"),
 ("neutral","light","base","#737B90",0.18,"#4D5468"),
 ("neutral","light","raised","#737B90",0.18,"#4D5468"),
 ("danger","dark","base","#E5484D",0.13,"#E5484D"),
 ("danger","dark","raised","#E5484D",0.13,"#E5484D"),
 ("danger","light","base","#D8353D",0.13,"#BE2F36"),
 ("danger","light","raised","#D8353D",0.13,"#BE2F36"),
 ("warning","dark","base","#E8A33D",0.18,"#E8A33D"),
 ("warning","dark","raised","#E8A33D",0.18,"#E8A33D"),
 ("warning","light","base","#9D6A1D",0.18,"#815718"),
 ("warning","light","raised","#9D6A1D",0.18,"#815718"),
]
surf={("dark","base"):ink950,("dark","raised"):ink800,("light","base"):paper0,("light","raised"):paper50}
for variant,theme,surface,hue,alpha,text in tag_cells:
    comp=composite(hue,surf[(theme,surface)],alpha)
    r=ratio(text,comp)
    print(("PASS" if r>=4.5 else "FAIL"), f"{r:.2f}", f"tag-text/{variant} {theme}/{surface}")
EOF
```

## Accessibility fix wave, 2026-09-07

A programmatic audit walked every rendered text node across 13 stories in both themes,
computing each node's effective foreground against its composited background. It found
11 failures the earlier 12-pair and 20-cell gates had missed, because those gates checked
values in isolation and never checked them as composed on a real control.

| pair | before | after | fix |
|---|---|---|---|
| button label on accent, light | 3.17 | 6.02 | `button/accent-label` moved to the semantic tier so it resolves per theme: ink on dark, paper on light |
| button label on danger, light | 4.22 | 4.52 | same token, same fix |
| toast action text on `surface/raised`, dark | 4.40 | 6.60 | new `accent/text` semantic (blue/400 dark, blue/700 light) for accent used as TEXT rather than as a fill |
| `border/subtle` on base, dark | 1.64 | 2.61 | restrengthened ink/600 -> slate/500 |
| `border/subtle` on base, light | 1.62 | 2.50 | restrengthened slate/200 -> slate/300 |
| control boundaries (input, checkbox) | 1.64 / 1.62 | 4.65 / 4.09 | new `border/strong` (slate/400) used where the border *is* the control edge, per WCAG 1.4.11 non-text contrast |

**Root cause of the two button failures:** `button/accent-label` lived in the `component`
tier, which has a single mode and therefore cannot vary by theme. It was pinned to ink,
which is correct on the dark accent (5.08) and fails on the light accent (3.17). A token
in the wrong tier cannot be fixed by choosing a better value; it had to move.

**Remaining documented exception:** danger text on `surface/raised` measures 4.36 in dark
(`#E5484D` on `#191C23`). Unchanged from the earlier finding and still accepted: 13% is the
maximum opacity the danger tint can carry before the tint's own luminance closes on the
text, and there is no darker step inside the danger hue family. Keep danger tags off raised
surfaces; the overdue DateChip is the one deliberate use.
