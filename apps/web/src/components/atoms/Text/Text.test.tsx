import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Text } from './Text'

describe('Text', () => {
  it('renders the content with the body variant by default', () => {
    render(<Text>Olá</Text>)
    expect(screen.getByText('Olá')).toHaveClass('text-paragraph')
  })

  it('applies the selected variant', () => {
    render(<Text variant="lead">Olá</Text>)
    expect(screen.getByText('Olá')).toHaveClass('text-paragraph-lg')
  })
})
