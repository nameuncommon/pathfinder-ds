import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const tokensPath = resolve(__dirname, 'tokens.json');
const cssPath = resolve(__dirname, '..', 'src', 'styles', 'tokens.css');

const tokens = JSON.parse(readFileSync(tokensPath, 'utf-8'));

// Helper: convert slash names to kebab-case CSS variable names
const toVarName = (key, category = null) => {
  const name = key.replace(/\//g, '-');
  if (category === 'space') return `--space-${name}`;
  if (category === 'radius') return `--radius-${name}`;
  if (category === 'motion') return `--motion-${name}`;
  if (category === 'font') return `--font-${name}`;
  return `--${name}`;
};

// Helper: resolve references like {ref} to var(--ref-name)
// Validates refs: accepts flat names (md, 1) and slash forms (ink/950, radius/md, duration/fast)
// For slash forms, checks category/name pairing exists before resolving
// Throws if ref is not found in any primitives category
export const resolveRef = (value, primitives) => {
  if (typeof value !== 'string') return value;
  const match = value.match(/^\{(.+)\}$/);
  if (!match) return value;
  const ref = match[1];

  // Strategy 1: Search for ref as a full key in any category (handles ink/950, etc.)
  for (const [cat, values] of Object.entries(primitives)) {
    if (ref in values) {
      return `var(${toVarName(ref, cat)})`;
    }
  }

  // Strategy 2: If ref contains /, try splitting as category/name (handles radius/md)
  if (ref.includes('/')) {
    const [category, name] = ref.split('/');
    if (primitives[category] && name in primitives[category]) {
      return `var(${toVarName(name, category)})`;
    }
  }

  // Neither strategy worked - throw with helpful context
  throw new Error(`Unresolvable token reference {${ref}}: not found in any primitive category (checked: ${Object.keys(primitives).join(', ')})`);
};

// Helper: format value with units
// Note: object-valued tokens (currently only the `type` category's
// scale/N -> {size, line} entries) never reach this function - the
// primitives loop below special-cases `category === 'type'` before
// calling formatValue, so every value seen here is a string or number.
const formatValue = (key, value, category) => {
  if (typeof value === 'string') {
    if (value.startsWith('{')) return resolveRef(value, tokens.primitives);
    return value; // Raw string (shadow, easing)
  }
  // Numeric: add units
  if (category === 'space' || category === 'radius') return `${value}px`;
  if (category === 'motion') {
    if (key.startsWith('duration/')) return `${value}ms`;
    return value; // ease is a string
  }
  return `${value}px`;
};

let css = '/* Design tokens generated from tokens.json */\n\n';

// Primitives on :root
css += ':root {\n';
for (const [category, values] of Object.entries(tokens.primitives)) {
  if (category === 'type') {
    // Type scales: scale/11 → --type-11-size / --type-11-line
    for (const [key, val] of Object.entries(values)) {
      const name = key.replace(/scale\//, '');
      css += `  ${toVarName(`type-${name}-size`)}: ${val.size}px;\n`;
      css += `  ${toVarName(`type-${name}-line`)}: ${val.line}px;\n`;
    }
  } else {
    for (const [key, value] of Object.entries(values)) {
      const formatted = formatValue(key, value, category);
      if (formatted === null) continue;
      css += `  ${toVarName(key, category)}: ${formatted};\n`;
    }
  }
}
css += '}\n\n';

// Semantic dark theme
css += ':root[data-theme="dark"] {\n';
for (const [key, value] of Object.entries(tokens.semantic.dark)) {
  const resolved = resolveRef(value, tokens.primitives);
  css += `  ${toVarName(key)}: ${resolved};\n`;
}
css += '}\n\n';

// Semantic light theme
css += ':root[data-theme="light"] {\n';
for (const [key, value] of Object.entries(tokens.semantic.light)) {
  const resolved = resolveRef(value, tokens.primitives);
  css += `  ${toVarName(key)}: ${resolved};\n`;
}
css += '}\n\n';

// Component tier on :root
css += '/* Component tokens */\n';
css += ':root {\n';
for (const [key, value] of Object.entries(tokens.component)) {
  const resolved = resolveRef(value, tokens.primitives);
  css += `  ${toVarName(key)}: ${resolved};\n`;
}
css += '}\n';

// Write CSS file
mkdirSync(dirname(cssPath), { recursive: true });
writeFileSync(cssPath, css, 'utf-8');
console.log(`Generated ${cssPath}`);
