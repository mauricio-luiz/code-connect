import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Heading } from './Heading'

describe('Heading', () => {
  it('renders a level 1 heading with its content', () => {
    render(<Heading>Login</Heading>)
    expect(screen.getByRole('heading', { level: 1, name: 'Login' })).toBeInTheDocument()
  })

  it('merges a custom className', () => {
    render(<Heading className="mb-4">Login</Heading>)
    expect(screen.getByRole('heading')).toHaveClass('mb-4')
  })
})
