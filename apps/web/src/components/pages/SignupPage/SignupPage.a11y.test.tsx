import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { describe, expect, it } from 'vitest'
import { axe } from '../../../test/a11y'
import { SignupPage } from './SignupPage'

describe('SignupPage accessibility', () => {
  it('has no WCAG AA violations', async () => {
    const { container } = render(
      <MemoryRouter>
        <SignupPage />
      </MemoryRouter>,
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})
