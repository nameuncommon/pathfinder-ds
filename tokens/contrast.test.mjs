import { test } from 'node:test';
import { strict as assert } from 'node:assert';
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
  for (const c of ['#9BC2A5', '#E3A48C', '#9DB6DB', '#D9C38A', '#C3A9DB']) {
    assert.ok(contrast(c, composite(c, worst, 0.16)) >= 4.5, `bearing ${c} on its tint`);
  }
});

test('8-digit hex alpha wins', () => {
  assert.equal(composite('#FFFFFF80', '#000000', 1).toUpperCase(), composite('#FFFFFF', '#000000', 128 / 255).toUpperCase());
});
