import type { ComponentProps } from 'react'
import { cx } from '../../../lib/cx'

export function Heading({ className, ...props }: ComponentProps<'h1'>) {
  return (
    <h1
      className={cx('text-subtitle font-semibold text-text', className)}
      {...props}
    />
  )
}
