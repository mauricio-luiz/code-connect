import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router'
import { describe, expect, it, vi } from 'vitest'
import { LoginForm } from './LoginForm'

function setup(onSubmit = vi.fn()) {
  render(
    <MemoryRouter>
      <LoginForm onSubmit={onSubmit} />
    </MemoryRouter>,
  )
  return onSubmit
}

describe('LoginForm', () => {
  it('renders fields, remember checkbox, forgot link and submit button', () => {
    setup()
    expect(screen.getByLabelText('Email ou usuário')).toBeInTheDocument()
    expect(screen.getByLabelText('Senha')).toHaveAttribute('type', 'password')
    expect(screen.getByRole('checkbox', { name: 'Lembrar-me' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Esqueci a senha' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Login' })).toHaveAttribute('type', 'submit')
  })

  it('submits the typed values', async () => {
    const onSubmit = setup()
    await userEvent.type(screen.getByLabelText('Email ou usuário'), 'usuario123')
    await userEvent.type(screen.getByLabelText('Senha'), 'segredo')
    await userEvent.click(screen.getByRole('checkbox', { name: 'Lembrar-me' }))
    await userEvent.click(screen.getByRole('button', { name: 'Login' }))
    expect(onSubmit).toHaveBeenCalledWith({
      usuario: 'usuario123',
      senha: 'segredo',
      lembrar: true,
    })
  })

  it('does not submit when required fields are empty', async () => {
    const onSubmit = setup()
    await userEvent.click(screen.getByRole('button', { name: 'Login' }))
    expect(onSubmit).not.toHaveBeenCalled()
  })
})
