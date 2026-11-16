import type { ComponentProps } from 'react'
import { cx } from '../../../lib/cx'

export function Input({ className, ...props }: ComponentProps<'input'>) {
  return (
    <input
      className={cx(
        'w-full rounded-sm bg-input px-4 py-2 text-paragraph-sm text-surface placeholder:text-surface',
        'focus:outline-2 focus:outline-primary',
        className,
      )}
      {...props}
    />
  )
}
