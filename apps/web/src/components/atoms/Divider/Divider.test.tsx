import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Divider } from './Divider'

describe('Divider', () => {
  it('renders a separator with centered text', () => {
    render(<Divider>ou entre com outras contas</Divider>)
    expect(screen.getByRole('separator')).toHaveTextContent('ou entre com outras contas')
  })

  it('renders without text', () => {
    render(<Divider />)
    expect(screen.getByRole('separator')).toHaveTextContent('')
  })
})
