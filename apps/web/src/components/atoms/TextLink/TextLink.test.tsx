import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { describe, expect, it } from 'vitest'
import { TextLink } from './TextLink'

describe('TextLink', () => {
  it('renders a link to the target route', () => {
    render(
      <MemoryRouter>
        <TextLink to="/cadastro">Crie seu cadastro!</TextLink>
      </MemoryRouter>,
    )
    expect(screen.getByRole('link', { name: 'Crie seu cadastro!' })).toHaveAttribute('href', '/cadastro')
  })

  it('applies the variant classes', () => {
    render(
      <MemoryRouter>
        <TextLink to="/x" variant="primary">x</TextLink>
      </MemoryRouter>,
    )
    expect(screen.getByRole('link')).toHaveClass('text-primary')
  })
})
