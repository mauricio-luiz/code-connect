import type { ComponentProps } from 'react'
import { cx } from '../../../lib/cx'

export function Divider({ children, className, ...props }: ComponentProps<'div'>) {
  const line = <span className="h-px flex-1 bg-muted/60" aria-hidden="true" />

  return (
    <div
      role="separator"
      className={cx('flex items-center gap-4 text-paragraph-sm text-text', className)}
      {...props}
    >
      {line}
      {children && <span>{children}</span>}
      {line}
    </div>
  )
}
