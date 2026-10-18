import { test } from 'node:test';
import { strict as assert } from 'node:assert';
import { readFileSync } from 'fs';
import { contrast, composite } from './contrast.mjs';

test('sanity: white on black is 21', () => {
  assert.equal(Math.round(contrast('#FFFFFF', '#000000') * 100) / 100, 21);
});

test('worst case passes', () => {
  const worst = composite('#F3EEE3', composite('#C9A35A', '#0E1628', 0.10), 0.06);
  assert.ok(contrast(composite('#F3EEE3', worst, 0.6), worst) >= 4.5, 'muted text on glass');
  assert.ok(contrast('#C9A35A', worst) >= 4.5, 'gold accent on glass');
  assert.ok(contrast('#0A0B0D', '#C9A35A') >= 4.5, 'button label on gold');
  assert.ok(contrast('#16213B', '#F3EEE3') >= 4.5, 'text on paper');
  const tokens = JSON.parse(readFileSync(new URL('./tokens.json', import.meta.url), 'utf-8'));
  const dark = tokens.semantic.dark;
  for (const b of ['health', 'people', 'home', 'work', 'craft']) {
    const c = tokens.primitives.color[`bearing/${b}`];
    assert.ok(contrast(c, composite(dark[`bearing/${b}/fill`], worst, 1)) >= 4.5, `bearing ${b} on its fill token`);
  }
  // the selected compass edge is a state indicator: 3:1 against its own selected fill
  const selected = composite(dark['accent/selected-fill'], worst, 1);
  assert.ok(contrast('#C9A35A', selected) >= 3, 'selected edge on selected fill');
});

test('8-digit hex alpha wins', () => {
  assert.equal(composite('#FFFFFF80', '#000000', 1).toUpperCase(), composite('#FFFFFF', '#000000', 128 / 255).toUpperCase());
});
