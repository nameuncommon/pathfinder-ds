import type { Preview } from '@storybook/react-vite'
import '../src/styles/tokens.css'

const preview: Preview = {
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Global theme for components',
      defaultValue: 'dark',
      toolbar: {
        icon: 'circlehollow',
        items: [
          { value: 'dark', icon: 'moon', title: 'Dark' },
          { value: 'light', icon: 'sun', title: 'Light' },
        ],
        showName: true,
      },
    },
  },

  decorators: [
    (Story, context) => {
      const theme = context.globals.theme || 'dark'
      if (typeof document !== 'undefined') {
        document.documentElement.setAttribute('data-theme', theme)
        document.body.style.background = 'var(--surface-base)'
        document.body.style.color = 'var(--text-primary)'
        document.body.style.margin = '0'
        document.body.style.padding = '24px'
        document.body.style.fontFamily = 'var(--font-sans)'
        document.body.style.minHeight = '100vh'
        document.body.style.boxSizing = 'border-box'
      }
      return <Story />
    },
  ],

  parameters: {
    // P0 fix: every story used to float tiny in the unstyled dark canvas
    // with no framing. `centered` gives every story a sane default; the
    // composed Today View story overrides to `padded` + its own max-width
    // wrapper, and the "AllVariants"/"AllStates" grid stories wrap
    // themselves in `StoryGrid` (src/stories/storyGrid.tsx) so they read as
    // intentional framed sheets instead.
    layout: 'centered',

    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo'
    },

    options: {
      // sidebar order. Introduction takes the first slot deliberately:
      // serial-position says first and last are what stick, and someone
      // arriving from the case study needs framing before components.
      // The composed scene keeps the last slot as the proof of assembly.
      storySort: {
        order: [
          'Introduction',
          'Foundations', ['Color', 'Typography', 'Spacing', 'Motion'],
          'Components',
          'Composed',
        ],
      },
    },
  },
};

export default preview;