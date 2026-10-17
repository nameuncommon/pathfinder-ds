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
    assert.match(darkBlock, /--accent-default:\s*var\(--gold-500\)/,
      'dark block should have --accent-default: var(--gold-500)');
  });

  await t.test('dark theme block contains tag-text/accent ref (C2 contrast fix)', () => {
    const darkMatch = css.match(/:root\[data-theme="dark"\]\s*\{([\s\S]*?)\n\}/);
    assert(darkMatch, 'dark theme block should exist');
    const darkBlock = darkMatch[1];
    assert.match(darkBlock, /--tag-text-accent:\s*var\(--gold-400\)/,
      'dark block should have --tag-text-accent: var(--gold-400)');
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

  await t.test('v2 primitives', () => {
    const expected = {
      '--navy-950': '#0E1628', '--navy-800': '#1D2A4A', '--gold-400': '#D8B76F',
      '--bearing-health': '#9BC2A5', '--bearing-people': '#E3A48C', '--bearing-home': '#9DB6DB',
      '--bearing-work': '#D9C38A', '--bearing-craft': '#C3A9DB',
      '--effect-blur-glass': '24px', '--effect-glow-peak': '0.1',
      '--type-56-size': '56px', '--type-56-line': '56px',
    };
    for (const [name, val] of Object.entries(expected)) {
      assert.match(css, new RegExp(`${name}:\\s*${val}\\s*;`), `${name} should be ${val}`);
    }
    assert.match(css, /--font-display:\s*'Cormorant Garamond', Georgia, serif;/);
  });

  await t.test('v2 dark semantic tokens', () => {
    const darkBlock = css.match(/:root\[data-theme="dark"\]\s*\{([\s\S]*?)\n\}/)[1];
    const expected = {
      '--surface-base': 'var\\(--navy-950\\)', '--surface-raised': 'var\\(--navy-800\\)',
      '--surface-glass': '#F3EEE30F', '--surface-glass-edge': '#F3EEE329',
      '--surface-glass-strong': '#F3EEE31A', '--surface-glass-strong-edge': '#F3EEE347',
      '--surface-glass-fallback': 'var\\(--navy-800\\)', '--surface-paper': 'var\\(--cream-100\\)',
      '--text-on-paper': 'var\\(--navy-900\\)', '--text-primary': 'var\\(--cream-100\\)',
      '--text-secondary': '#F3EEE3B3', '--text-muted': '#F3EEE399',
      '--accent-default': 'var\\(--gold-500\\)', '--accent-hover': 'var\\(--gold-400\\)',
      '--accent-text': 'var\\(--gold-500\\)', '--focus-ring': 'var\\(--gold-400\\)',
      '--border-subtle': '#2C3A5C', '--button-accent-label': 'var\\(--ink-950\\)',
      '--brand-mark': 'var\\(--gold-500\\)',
    };
    for (const [name, val] of Object.entries(expected)) {
      assert.match(darkBlock, new RegExp(`${name}:\\s*${val}\\s*;`), `${name} should be ${val}`);
    }
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
