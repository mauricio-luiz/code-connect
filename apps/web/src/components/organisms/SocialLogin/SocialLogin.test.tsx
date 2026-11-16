import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { SocialLogin } from './SocialLogin'

describe('SocialLogin', () => {
  it('renders the divider title and both providers', () => {
    render(<SocialLogin />)
    expect(screen.getByText('ou entre com outras contas')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Github' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Gmail' })).toBeInTheDocument()
  })

  it('reports the selected provider', async () => {
    const onSelect = vi.fn()
    render(<SocialLogin onSelect={onSelect} />)
    await userEvent.click(screen.getByRole('button', { name: 'Github' }))
    await userEvent.click(screen.getByRole('button', { name: 'Gmail' }))
    expect(onSelect).toHaveBeenNthCalledWith(1, 'github')
    expect(onSelect).toHaveBeenNthCalledWith(2, 'google')
  })
})
