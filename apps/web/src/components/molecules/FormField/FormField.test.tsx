import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { FormField } from './FormField'

describe('FormField', () => {
  it('associates the label with the input', () => {
    render(<FormField label="Senha" type="password" />)
    expect(screen.getByLabelText('Senha')).toHaveAttribute('type', 'password')
  })

  it('uses a custom id when provided', () => {
    render(<FormField label="Email" id="email" />)
    expect(screen.getByLabelText('Email')).toHaveAttribute('id', 'email')
  })

  it('accepts typing', async () => {
    render(<FormField label="Email" />)
    await userEvent.type(screen.getByLabelText('Email'), 'a@b.c')
    expect(screen.getByLabelText('Email')).toHaveValue('a@b.c')
  })
})
