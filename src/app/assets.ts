// Rendered handwriting (Caveat in Figma, shipped as images; Caveat never ships
// as a web font) and the snapped page. Vite hashes and base-prefixes the URLs.
import { reads, topThree } from './data'
import oneThing from './img/one-thing.png'
import read1 from './img/read-1.png'
import read2 from './img/read-2.png'
import read3 from './img/read-3.png'
import snapW42 from './img/snap-w42.png'
import top1 from './img/top-1.png'
import top2 from './img/top-2.png'
import top3 from './img/top-3.png'
import type { ReadItem } from './ritual'

const snippets: Record<string, string> = {
  'read-1': read1,
  'read-2': read2,
  'read-3': read3,
  'top-1': top1,
  'top-2': top2,
  'top-3': top3,
  'one-thing': oneThing,
}

export function snippet(id: string): string | undefined {
  return Object.prototype.hasOwnProperty.call(snippets, id) ? snippets[id] : undefined
}

/**
 * The handwriting image for a read item, only while its text is still the
 * original from data.ts. After a correction the image would contradict the
 * saved text, so callers fall back to showing the text.
 */
export function snippetFor(item: ReadItem): string | undefined {
  const original = [...reads, ...topThree].find((r) => r.id === item.id)
  return original && original.text === item.text ? snippet(item.id) : undefined
}

export const snapImage: string | undefined = snapW42
