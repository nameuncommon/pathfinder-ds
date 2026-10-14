import { test } from 'node:test';
import { strict as assert } from 'node:assert';
import { execSync } from 'child_process';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { fileURLToPath } from 'url';
import { resolveRef } from './build.mjs';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const cssPath = resolve(__dirname, '..', 'src', 'styles', 'tokens.css');
const projectRoot = resolve(__dirname, '..');

test('tokens.json → CSS pipeline', async (t) => {
  // Build the CSS from tokens.json
  execSync('node tokens/build.mjs', { cwd: projectRoot });

  // Read the generated CSS
  const css = readFileSync(cssPath, 'utf-8');

  await t.test('contains primitive color ink/950', () => {
    assert.match(css, /--ink-950:\s*#0A0B0D/);
  });

  await t.test('contains space-4 primitive', () => {
    assert.match(css, /--space-4:\s*16px/);
  });

  await t.test('contains radius-md primitive', () => {
    assert.match(css, /--radius-md:\s*10px/);
  });

  await t.test('contains motion duration base', () => {
    assert.match(css, /--motion-duration-base:\s*180ms/);
  });

  await t.test('contains font-mono primitive', () => {
    assert.match(css, /--font-mono:\s*'Geist Mono'/);
  });

  await t.test('component tier with button-accent-label', () => {
    assert.match(css, /--button-accent-label:\s*var\(--ink-950\)/);
  });

  await t.test('dark theme block contains accent-default ref', () => {
    // Extract the dark theme block (from selector to closing brace)
    const darkMatch = css.match(/:root\[data-theme="dark"\]\s*\{([\s\S]*?)\n\}/);
    assert(darkMatch, 'dark theme block should exist');
    const darkBlock = darkMatch[1];
    assert.match(darkBlock, /--accent-default:\s*var\(--blue-500\)/,
      'dark block should have --accent-default: var(--blue-500)');
  });

  await t.test('dark theme block contains tag-text/accent ref (C2 contrast fix)', () => {
    const darkMatch = css.match(/:root\[data-theme="dark"\]\s*\{([\s\S]*?)\n\}/);
    assert(darkMatch, 'dark theme block should exist');
    const darkBlock = darkMatch[1];
    assert.match(darkBlock, /--tag-text-accent:\s*var\(--blue-400\)/,
      'dark block should have --tag-text-accent: var(--blue-400)');
  });

  await t.test('light theme block contains accent-default ref', () => {
    // Extract the light theme block (from selector to closing brace)
    const lightMatch = css.match(/:root\[data-theme="light"\]\s*\{([\s\S]*?)\n\}/);
    assert(lightMatch, 'light theme block should exist');
    const lightBlock = lightMatch[1];
    assert.match(lightBlock, /--accent-default:\s*var\(--blue-600\)/,
      'light block should have --accent-default: var(--blue-600)');
  });

  await t.test('light theme block contains tag-text/accent ref (blue-swap contrast fix)', () => {
    const lightMatch = css.match(/:root\[data-theme="light"\]\s*\{([\s\S]*?)\n\}/);
    assert(lightMatch, 'light theme block should exist');
    const lightBlock = lightMatch[1];
    assert.match(lightBlock, /--tag-text-accent:\s*var\(--blue-700\)/,
      'light block should have --tag-text-accent: var(--blue-700)');
  });

  await t.test('no unresolved braces in CSS', () => {
    // Remove comments and check for unresolved {ref} patterns
    const cssNoComments = css.replace(/\/\*[\s\S]*?\*\//g, '');
    assert(!cssNoComments.match(/{\w+\}/), 'CSS should not contain unresolved {ref} patterns');
  });

  await t.test('rejects bogus token references', () => {
    // Load the real tokens to test resolveRef
    const tokens = JSON.parse(readFileSync(resolve(__dirname, 'tokens.json'), 'utf-8'));

    // This ref does not exist in any category
    assert.throws(
      () => resolveRef('{nonexistent/ref}', tokens.primitives),
      /Unresolvable token reference/,
      'resolveRef should throw on unresolvable refs'
    );
  });

  await t.test('brand/mark is gold in dark theme and navy in light theme', () => {
    const darkBlock = css.match(/:root\[data-theme="dark"\]\s*\{([\s\S]*?)\n\}/)[1];
    const lightBlock = css.match(/:root\[data-theme="light"\]\s*\{([\s\S]*?)\n\}/)[1];
    assert.match(css, /--gold-500:\s*#C9A35A/);
    assert.match(css, /--navy-900:\s*#16213B/);
    assert.match(darkBlock, /--brand-mark:\s*var\(--gold-500\)/);
    assert.match(lightBlock, /--brand-mark:\s*var\(--navy-900\)/);
  });
});
