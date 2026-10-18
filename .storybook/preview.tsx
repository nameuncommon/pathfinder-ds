import type { Preview } from '@storybook/react-vite'
import '../src/styles/tokens.css'
import '../src/styles/fonts.css'
import '../src/styles/surfaces.css'
import '../src/styles/motion.css'
import '../src/stories/stories.css'

const preview: Preview = {
  globalTypes: {
    transparency: {
      name: 'Transparency',
      description: 'Reduce Transparency: glass becomes solid navy with no blur',
      defaultValue: 'full',
      toolbar: {
        icon: 'contrast',
        items: [
          { value: 'full', title: 'Glass' },
          { value: 'reduced', title: 'Reduced transparency' },
        ],
        showName: true,
      },
    },
    motion: {
      name: 'Motion',
      description: 'Reduce Motion: animations and transitions stop',
      defaultValue: 'full',
      toolbar: {
        icon: 'lightning',
        items: [
          { value: 'full', title: 'Motion' },
          { value: 'reduced', title: 'Reduced motion' },
        ],
        showName: true,
      },
    },
  },

  decorators: [
    (Story, context) => {
      if (typeof document !== 'undefined') {
        // dark only for now: light is a later pass, so there is no theme switch
        document.documentElement.setAttribute('data-theme', 'dark')
        document.documentElement.setAttribute('data-transparency', context.globals.transparency || 'full')
        document.documentElement.setAttribute('data-motion', context.globals.motion || 'full')
        document.body.style.background = 'var(--surface-base)'
        document.body.style.color = 'var(--text-primary)'
        document.body.style.margin = '0'
        // fullscreen stories (the screens) own their canvas edge to edge
        document.body.style.padding = context.parameters.layout === 'fullscreen' ? '0' : '24px'
        document.body.style.fontFamily = 'var(--font-sans)'
        document.body.style.minHeight = '100vh'
        document.body.style.boxSizing = 'border-box'
      }
      return <Story />
    },
  ],

  parameters: {
    // P0 fix: every story used to float tiny in the unstyled dark canvas
    // with no framing. `centered` gives every story a sane default; stories
    // that need a wider canvas override this to `padded`, and the "AllVariants"/"AllStates" grid stories wrap
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
      test: 'error'
    },

    options: {
      // sidebar order. Introduction takes the first slot deliberately:
      // serial-position says first and last are what stick, and someone
      // arriving from the case study needs framing before components.
      // The composed scene keeps the last slot as the proof of assembly.
      storySort: {
        order: [
          'Introduction',
          'Screens',
          'Foundations', ['Colour', 'Typography', 'Spacing', 'Glass', 'Ambient', 'Paper', 'Bearings', 'Logo', 'Icons', 'Motion', 'Voice and content', 'Accessibility'],
          'Patterns', ['Action bar', 'Undo and acknowledgement', 'States'],
          'Components',
          'Changelog',
        ],
      },
    },
  },
};

export default preview;