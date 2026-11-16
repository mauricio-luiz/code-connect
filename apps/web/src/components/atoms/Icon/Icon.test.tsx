import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Icon } from './Icon'

describe('Icon', () => {
  it('renders the requested icon as a decorative svg', () => {
    const { container } = render(<Icon name="arrow-right" />)
    const svg = container.querySelector('svg')
    expect(svg).toHaveAttribute('data-icon', 'arrow-right')
    expect(svg).toHaveAttribute('aria-hidden', 'true')
  })

  it('renders the login icon', () => {
    const { container } = render(<Icon name="login" />)
    expect(container.querySelector('[data-icon="login"]')).toBeInTheDocument()
  })
})
