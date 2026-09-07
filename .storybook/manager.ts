import { addons } from 'storybook/manager-api';
import { create } from 'storybook/theming/create';
import tokens from '../tokens/tokens.json';

// The manager chrome is themed from tokens.json like everything else, so the
// Storybook UI can't drift from the system it documents. Dark mode only: the
// manager has no theme toggle, and dark is this system's first-class theme.
const primitives = tokens.primitives.color as Record<string, string>;
const dark = tokens.semantic.dark as Record<string, string>;

/** Resolve a semantic token, which is either a `{primitive/ref}` or a literal hex. */
const token = (name: string): string => {
  const value = dark[name];
  return value.startsWith('{') ? primitives[value.slice(1, -1)] : value;
};

const theme = create({
  base: 'dark',
  brandTitle: 'pathfinder ds',
  brandUrl: 'https://github.com/nameuncommon/pathfinder-ds',
  brandImage: '/brand-mark.svg',
  brandTarget: '_self',

  colorPrimary: token('accent/default'),
  colorSecondary: token('accent/default'),

  appBg: token('surface/base'),
  appContentBg: token('surface/base'),
  appPreviewBg: token('surface/base'),
  appBorderColor: token('border/subtle'),
  appBorderRadius: tokens.primitives.radius.md,

  fontBase: tokens.primitives.font.sans,
  fontCode: tokens.primitives.font.mono,

  textColor: token('text/primary'),
  textMutedColor: token('text/muted'),
  textInverseColor: primitives['ink/950'],

  barBg: token('surface/raised'),
  barTextColor: token('text/muted'),
  barSelectedColor: token('accent/default'),
  barHoverColor: token('accent/hover'),

  inputBg: token('surface/raised'),
  inputBorder: token('border/subtle'),
  inputTextColor: token('text/primary'),
  inputBorderRadius: tokens.primitives.radius.sm,
});

addons.setConfig({
  theme,
});
