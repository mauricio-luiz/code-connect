import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Logo } from './Logo'

describe('Logo', () => {
  it('exposes an accessible name and renders the three logo parts', () => {
    const { container } = render(<Logo />)
    expect(screen.getByRole('img', { name: 'Code Connect' })).toBeInTheDocument()
    expect(container.querySelectorAll('img')).toHaveLength(3)
  })

  it('merges a custom className', () => {
    render(<Logo className="opacity-50" />)
    expect(screen.getByRole('img', { name: 'Code Connect' })).toHaveClass('opacity-50')
  })
})
