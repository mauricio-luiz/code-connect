import { configureAxe } from 'vitest-axe'

/** WCAG tags covered: level A and AA of 2.0, 2.1 and 2.2. */
export const WCAG_AA_TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']

// jsdom has no layout engine, so color-contrast is verified in the Playwright suite (e2e/).
export const axe = configureAxe({
  runOnly: { type: 'tag', values: WCAG_AA_TAGS },
  rules: { 'color-contrast': { enabled: false } },
})
