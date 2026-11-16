import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { AuthTemplate } from './AuthTemplate'

const banner = { src: '/banner.png', alt: 'Banner de teste' }

describe('AuthTemplate', () => {
  it('renders title, subtitle, banner, children and footer', () => {
    render(
      <AuthTemplate banner={banner} title="Login" subtitle="Boas-vindas!" footer={<p>Rodapé</p>}>
        <p>Formulário</p>
      </AuthTemplate>,
    )
    expect(screen.getByRole('heading', { name: 'Login' })).toBeInTheDocument()
    expect(screen.getByText('Boas-vindas!')).toBeInTheDocument()
    expect(screen.getByAltText('Banner de teste')).toHaveAttribute('src', '/banner.png')
    expect(screen.getByText('Formulário')).toBeInTheDocument()
    expect(screen.getByText('Rodapé')).toBeInTheDocument()
  })

  it('renders the decorative background symbols', () => {
    render(
      <AuthTemplate banner={banner} title="t" subtitle="s">
        x
      </AuthTemplate>,
    )
    expect(screen.getAllByTestId('background-symbol')).toHaveLength(2)
  })

  it('forwards social login selection', async () => {
    const onSocialSelect = vi.fn()
    render(
      <AuthTemplate banner={banner} title="t" subtitle="s" onSocialSelect={onSocialSelect}>
        x
      </AuthTemplate>,
    )
    await userEvent.click(screen.getByRole('button', { name: 'Github' }))
    expect(onSocialSelect).toHaveBeenCalledWith('github')
  })
})
