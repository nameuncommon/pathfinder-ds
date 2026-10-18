# Pathfinder logo kit

The Pathfinder logo has two cuts of one drawing.

| Cut | Use at | Files |
|---|---|---|
| **Dial**: a solid ring around the compass rose P | 24px and up (lockups, app icon, covers, end cards, OG images) | `brand/dial.svg` (gold), `dial-navy.svg`, `dial-cream.svg`, `dial-mono.svg` |
| **Mark**: the compass rose P alone | below 24px (favicons, inline UI) | `brand/mark.svg` (gold), `mark-inverted.svg`, `mark-cream.svg`, `mark-mono.svg`, `favicon.svg` |

- Lockup: `brand/lockup.svg` (dial plus the Cormorant Garamond SemiBold wordmark, `currentColor`).
- Previews: `brand/previews/dial-512.png`, `dial-128.png`, `lockup-512.png`, `lockup-128.png`.
- Colourways: gold `#C9A35A` on navy, navy `#16213B` on cream `#F3EEE3`, cream on navy, black or white for one-colour use.
- Clear space: one bowl height of the P on every side.
- Never recolour the ring and star separately, never rotate (north up), never add dots (the dotted star ring and the four-dot dial are both retired).
- Figma source: brand mark file `YvFbHaXgIBzzJlHoHpuzyw`, components `dial` and `mark`, rules on the `usage` page.
- In React (pathfinder-ds): `<Dial size={n} />` picks the cut by size.
