import type { ComponentProps } from 'react'
import { cx } from '../../../lib/cx'

const variants = {
  lead: 'text-2xl text-text',
  body: 'text-base text-text',
  small: 'text-sm text-text',
  muted: 'text-base text-muted',
}

type TextProps = ComponentProps<'p'> & {
  variant?: keyof typeof variants
}

export function Text({ variant = 'body', className, ...props }: TextProps) {
  return <p className={cx(variants[variant], className)} {...props} />
}
