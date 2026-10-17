// WCAG 2.2 contrast helpers. Hex in, no dependencies.
const parse = (hex) => {
  const h = hex.replace('#', '');
  const n = (i) => parseInt(h.slice(i, i + 2), 16);
  return { rgb: [n(0), n(2), n(4)], alpha: h.length === 8 ? n(6) / 255 : null };
};

const toHex = (rgb) =>
  '#' + rgb.map((v) => Math.round(Math.min(255, Math.max(0, v))).toString(16).padStart(2, '0')).join('').toUpperCase();

const luminance = (rgb) => {
  const [r, g, b] = rgb.map((v) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

// Alpha-composite fg over bg; alpha from an 8-digit fg hex wins when present.
export const composite = (fgHex, bgHex, alpha) => {
  const fg = parse(fgHex);
  const a = fg.alpha ?? alpha;
  const bg = parse(bgHex).rgb;
  return toHex(fg.rgb.map((v, i) => v * a + bg[i] * (1 - a)));
};

export const contrast = (fgHex, bgHex) => {
  const l1 = luminance(parse(fgHex).rgb);
  const l2 = luminance(parse(bgHex).rgb);
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
};
