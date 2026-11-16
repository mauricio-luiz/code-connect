import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { describe, expect, it } from 'vitest'
import { AuthFooterLink } from './AuthFooterLink'

describe('AuthFooterLink', () => {
  it('renders the question and a link to the target', () => {
    render(
      <MemoryRouter>
        <AuthFooterLink question="Ainda não tem conta?" linkText="Crie seu cadastro!" to="/cadastro" />
      </MemoryRouter>,
    )
    expect(screen.getByText('Ainda não tem conta?')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Crie seu cadastro!' })).toHaveAttribute('href', '/cadastro')
  })

  it('renders the optional icon', () => {
    const { container } = render(
      <MemoryRouter>
        <AuthFooterLink question="q" linkText="l" to="/x" icon="clipboard" />
      </MemoryRouter>,
    )
    expect(container.querySelector('[data-icon="clipboard"]')).toBeInTheDocument()
  })

  it('supports the inline layout', () => {
    const { container } = render(
      <MemoryRouter>
        <AuthFooterLink question="Já tem conta?" linkText="Faça seu login!" to="/login" layout="inline" />
      </MemoryRouter>,
    )
    expect(container.firstElementChild).toHaveAttribute('data-layout', 'inline')
    expect(container.firstElementChild).not.toHaveClass('flex-col')
  })
})
