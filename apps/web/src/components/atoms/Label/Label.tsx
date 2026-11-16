import type { ComponentProps } from 'react'
import { cx } from '../../../lib/cx'

export function Label({ className, ...props }: ComponentProps<'label'>) {
  return (
    <label className={cx('text-paragraph text-text', className)} {...props} />
  )
}
