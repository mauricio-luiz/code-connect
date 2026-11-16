import type { ComponentProps } from 'react'
import { cx } from '../../../lib/cx'

const variants = {
  lead: 'text-paragraph-lg text-text',
  body: 'text-paragraph text-text',
  small: 'text-paragraph-sm text-text',
  muted: 'text-paragraph text-muted',
}

type TextProps = ComponentProps<'p'> & {
  variant?: keyof typeof variants
}

export function Text({ variant = 'body', className, ...props }: TextProps) {
  return <p className={cx(variants[variant], className)} {...props} />
}
