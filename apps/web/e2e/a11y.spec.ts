import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

// WCAG 2.0/2.1/2.2 level A + AA (includes color-contrast, which jsdom cannot check).
const WCAG_AA_TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']

const routes = [
  { name: 'login', path: '/login' },
  { name: 'cadastro', path: '/cadastro' },
]

for (const { name, path } of routes) {
  test(`${name} page has no WCAG AA violations`, async ({ page }) => {
    await page.goto(path)
    await page.waitForLoadState('networkidle')
    const { violations } = await new AxeBuilder({ page }).withTags(WCAG_AA_TAGS).analyze()
    expect(violations, JSON.stringify(violations, null, 2)).toEqual([])
  })
}
