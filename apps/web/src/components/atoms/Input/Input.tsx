import type { ComponentProps } from 'react'
import { cx } from '../../../lib/cx'

export function Input({ className, ...props }: ComponentProps<'input'>) {
  return (
    <input
      className={cx(
        'h-10 w-full rounded-sm bg-input px-4 text-sm text-bg placeholder:text-bg/70',
        'focus:outline-2 focus:outline-primary',
        className,
      )}
      {...props}
    />
  )
}
