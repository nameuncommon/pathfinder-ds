import * as a11yAddonAnnotations from '@storybook/addon-a11y/preview'
import { setProjectAnnotations } from '@storybook/react-vite'
import * as projectAnnotations from './preview'

// Story tests use the same decorators, globals and a11y settings as Storybook itself.
setProjectAnnotations([a11yAddonAnnotations, projectAnnotations])
