import { test } from 'node:test';
import { strict as assert } from 'node:assert';
import { readFileSync, existsSync, readdirSync } from 'fs';
import { execSync } from 'child_process';
import { resolve } from 'path';
import { fileURLToPath } from 'url';

const root = resolve(fileURLToPath(new URL('.', import.meta.url)), '..');
const dials = ['dial.svg', 'dial-navy.svg', 'dial-cream.svg', 'dial-mono.svg'];

test('every dial colourway is the dial: ring and one star, no dots', () => {
  for (const f of dials) {
    const svg = readFileSync(resolve(root, 'brand', f), 'utf-8');
    assert.match(svg, /viewBox="0 0 200 200"/, f);
    assert.equal((svg.match(/<circle/g) || []).length, 1, `${f} circles`);
    assert.equal((svg.match(/<path/g) || []).length, 1, `${f} paths`);
    assert.match(svg, /<circle cx="100" cy="100" r="95" fill="none"/, `${f} ring must not fill when inlined as a symbol`);
  }
});

test('the dotted star ring is retired', () => {
  assert.equal(existsSync(resolve(root, 'brand', 'star-ring.svg')), false);
  assert.ok(!readdirSync(resolve(root, 'src', 'components')).some((f) => f.startsWith('StarRing')));
  const hits = execSync(
    `grep -rlE "StarRing|star-ring" src .storybook index.html design.md README.md || true`,
    { cwd: root, encoding: 'utf-8' },
  ).trim();
  assert.equal(hits, '', `still referenced in:\n${hits}`);
});

test('the lockup carries the dial without dots', () => {
  const svg = readFileSync(resolve(root, 'brand', 'lockup.svg'), 'utf-8');
  assert.equal((svg.match(/<circle/g) || []).length, 1);
});
