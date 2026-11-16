import type { ComponentProps } from 'react'
import { cx } from '../../../lib/cx'

type SocialLoginButtonProps = Omit<ComponentProps<'button'>, 'children'> & {
  icon: string
  label: string
}

export function SocialLoginButton({
  icon,
  label,
  className,
  type = 'button',
  ...props
}: SocialLoginButtonProps) {
  return (
    <button
      type={type}
      className={cx(
        'flex cursor-pointer flex-col items-center gap-1 text-label text-text',
        'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary',
        className,
      )}
      {...props}
    >
      <img src={icon} alt="" className="size-8 object-contain" />
      {label}
    </button>
  )
}
