import assert from 'node:assert/strict'
import { readdirSync, readFileSync } from 'node:fs'
import { test } from 'node:test'
import { fileURLToPath } from 'node:url'

const dir = fileURLToPath(new URL('../src/app/img/', import.meta.url))
const SIGNATURE = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])

const TABLE = new Uint32Array(256)
for (let n = 0; n < 256; n++) {
  let c = n
  for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1
  TABLE[n] = c >>> 0
}

export function crc32(buf) {
  let c = 0xffffffff
  for (const byte of buf) c = TABLE[(c ^ byte) & 0xff] ^ (c >>> 8)
  return (c ^ 0xffffffff) >>> 0
}

/** Returns a list of problems; empty when the PNG is structurally sound. */
export function pngProblems(data) {
  const problems = []
  if (!data.subarray(0, 8).equals(SIGNATURE)) return ['bad signature']
  let pos = 8
  let sawEnd = false
  while (pos < data.length) {
    if (pos + 12 > data.length) {
      problems.push('truncated chunk header')
      break
    }
    const len = data.readUInt32BE(pos)
    const type = data.toString('latin1', pos + 4, pos + 8)
    const end = pos + 8 + len + 4
    if (end > data.length) {
      problems.push(`truncated ${type} chunk`)
      break
    }
    const stored = data.readUInt32BE(pos + 8 + len)
    const computed = crc32(data.subarray(pos + 4, pos + 8 + len))
    if (stored !== computed) {
      problems.push(
        `${type} CRC mismatch (stored 0x${stored.toString(16)}, computed 0x${computed.toString(16)})`,
      )
    }
    if (type === 'IEND') sawEnd = true
    pos = end
  }
  if (!sawEnd) problems.push('missing IEND')
  return problems
}

test('crc32 matches the PNG spec check value', () => {
  assert.equal(crc32(Buffer.from('123456789')), 0xcbf43926)
})

test('the checker catches a corrupted chunk', () => {
  const files = readdirSync(dir).filter((f) => f.endsWith('.png'))
  const copy = Buffer.from(readFileSync(dir + files[0]))
  copy[29] ^= 0xff // flip a byte of the IHDR CRC
  assert.ok(pngProblems(copy).some((p) => p.startsWith('IHDR CRC mismatch')))
})

for (const file of readdirSync(dir).filter((f) => f.endsWith('.png'))) {
  test(`src/app/img/${file} is a valid PNG (signature and every chunk CRC)`, () => {
    assert.deepEqual(pngProblems(readFileSync(dir + file)), [])
  })
}
