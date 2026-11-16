import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { SocialLoginButton } from './SocialLoginButton'

describe('SocialLoginButton', () => {
  it('renders the label and the icon', () => {
    const { container } = render(<SocialLoginButton icon="/github.png" label="Github" />)
    expect(screen.getByRole('button', { name: 'Github' })).toBeInTheDocument()
    expect(container.querySelector('img')).toHaveAttribute('src', '/github.png')
  })

  it('calls onClick', async () => {
    const onClick = vi.fn()
    render(<SocialLoginButton icon="/github.png" label="Github" onClick={onClick} />)
    await userEvent.click(screen.getByRole('button'))
    expect(onClick).toHaveBeenCalledOnce()
  })
})
