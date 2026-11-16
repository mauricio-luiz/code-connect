import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { Input } from './Input'

describe('Input', () => {
  it('forwards native props', () => {
    render(<Input placeholder="usuario123" type="password" required />)
    const input = screen.getByPlaceholderText('usuario123')
    expect(input).toHaveAttribute('type', 'password')
    expect(input).toBeRequired()
  })

  it('accepts typing', async () => {
    render(<Input placeholder="x" />)
    const input = screen.getByPlaceholderText('x')
    await userEvent.type(input, 'abc')
    expect(input).toHaveValue('abc')
  })
})
