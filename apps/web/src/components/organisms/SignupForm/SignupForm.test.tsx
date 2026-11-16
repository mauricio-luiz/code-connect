import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { SignupForm } from './SignupForm'

function setup(onSubmit = vi.fn()) {
  render(<SignupForm onSubmit={onSubmit} />)
  return onSubmit
}

describe('SignupForm', () => {
  it('renders fields, remember checkbox and submit button', () => {
    setup()
    expect(screen.getByLabelText('Nome')).toBeInTheDocument()
    expect(screen.getByLabelText('Email')).toHaveAttribute('type', 'email')
    expect(screen.getByLabelText('Senha')).toHaveAttribute('type', 'password')
    expect(screen.getByRole('checkbox', { name: 'Lembrar-me' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Cadastrar' })).toHaveAttribute('type', 'submit')
  })

  it('submits the typed values', async () => {
    const onSubmit = setup()
    await userEvent.type(screen.getByLabelText('Nome'), 'Maria Silva')
    await userEvent.type(screen.getByLabelText('Email'), 'maria@example.com')
    await userEvent.type(screen.getByLabelText('Senha'), 'segredo')
    await userEvent.click(screen.getByRole('checkbox', { name: 'Lembrar-me' }))
    await userEvent.click(screen.getByRole('button', { name: 'Cadastrar' }))
    expect(onSubmit).toHaveBeenCalledWith({
      nome: 'Maria Silva',
      email: 'maria@example.com',
      senha: 'segredo',
      lembrar: true,
    })
  })

  it('does not submit when required fields are empty', async () => {
    const onSubmit = setup()
    await userEvent.click(screen.getByRole('button', { name: 'Cadastrar' }))
    expect(onSubmit).not.toHaveBeenCalled()
  })
})
