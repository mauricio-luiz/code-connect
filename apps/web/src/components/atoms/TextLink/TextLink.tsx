import { Link, type LinkProps } from 'react-router'
import { cx } from '../../../lib/cx'

const variants = {
  underline: 'text-paragraph-sm text-text underline',
  primary: 'inline-flex items-center gap-3 text-paragraph text-primary',
}

type TextLinkProps = LinkProps & {
  variant?: keyof typeof variants
}

export function TextLink({ variant = 'underline', className, ...props }: TextLinkProps) {
  return <Link className={cx(variants[variant], className)} {...props} />
}
