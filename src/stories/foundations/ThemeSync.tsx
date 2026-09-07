import { useEffect, useState } from 'react'
import { addons } from 'storybook/preview-api'
import { GLOBALS_UPDATED } from 'storybook/internal/core-events'

interface GlobalsUpdatedPayload {
  globals?: Record<string, unknown>
}

function readThemeFromLocation(): string {
  if (typeof window === 'undefined') return 'dark'
  const raw = new URLSearchParams(window.location.search).get('globals') ?? ''
  // globals query looks like "theme:dark;otherKey:value"
  const match = /(?:^|;)theme:([a-z]+)/.exec(raw)
  return match ? match[1] : 'dark'
}

/**
 * Docs-only MDX pages (a `<Meta title="..." />` with no attached CSF file)
 * never mount a story, so the preview.tsx decorator that sets `data-theme`
 * on <html> for live stories never runs on them - `useGlobals` also isn't
 * available here (it throws outside a decorator/story render). This
 * listens to the same preview channel the toolbar uses instead, so the
 * theme toggle still works on these pages.
 */
export function ThemeSync() {
  const [theme, setTheme] = useState<string>(readThemeFromLocation)

  useEffect(() => {
    const channel = addons.getChannel()
    const handleGlobalsUpdated = (payload: GlobalsUpdatedPayload) => {
      const next = payload?.globals?.theme
      if (typeof next === 'string') setTheme(next)
    }
    channel.on(GLOBALS_UPDATED, handleGlobalsUpdated)
    return () => {
      channel.off(GLOBALS_UPDATED, handleGlobalsUpdated)
    }
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    document.body.style.background = 'var(--surface-base)'
    document.body.style.color = 'var(--text-primary)'
    document.body.style.fontFamily = 'var(--font-sans)'
  }, [theme])

  return null
}
