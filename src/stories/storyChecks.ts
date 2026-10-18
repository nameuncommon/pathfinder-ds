import { expect } from 'storybook/test'

// Gold things in a render: own-text, fill, border or icon in gold, not counting what sits inside a gold thing.
export const goldThings = (root: HTMLElement) => {
  const gold = /rgba?\((201, 163, 90|216, 183, 111)/
  const hits: Element[] = []
  for (const el of root.querySelectorAll('*')) {
    if (hits.some((h) => h.contains(el))) continue
    const s = getComputedStyle(el)
    const r = el.getBoundingClientRect()
    if (!r.width || !r.height || s.visibility === 'hidden') continue
    const ownText = [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent?.trim())
    const border = s.borderTopStyle !== 'none' && parseFloat(s.borderTopWidth) > 0 && gold.test(s.borderTopColor)
    const svg = el.tagName.toLowerCase() === 'svg' && (gold.test(s.color) || gold.test(s.fill) || gold.test(s.stroke))
    if ((ownText && gold.test(s.color)) || gold.test(s.backgroundColor) || border || svg) hits.push(el)
  }
  return hits
}
const label = (el: Element) => `${el.tagName.toLowerCase()}.${el.getAttribute('class') ?? ''}`

export const goldAtMost = (n: number) => async ({ canvasElement }: { canvasElement: HTMLElement }) => {
  const hits = goldThings(canvasElement)
  await expect(hits.length, hits.map(label).join(' | ')).toBeLessThanOrEqual(n)
}
