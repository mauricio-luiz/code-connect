import type { ComponentProps } from 'react'
import { cx } from '../../../lib/cx'
import { Icon, type IconName } from '../Icon'

const variants = {
  primary: 'bg-primary text-bg hover:brightness-95',
}

type ButtonProps = ComponentProps<'button'> & {
  variant?: keyof typeof variants
  icon?: IconName
}

export function Button({
  variant = 'primary',
  icon,
  type = 'button',
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cx(
        'inline-flex h-13 w-full cursor-pointer items-center justify-center gap-2 rounded-sm text-lg font-semibold',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
        variants[variant],
        className,
      )}
      {...props}
    >
      {children}
      {icon && <Icon name={icon} />}
    </button>
  )
}
