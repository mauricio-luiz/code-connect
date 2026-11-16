import type { ComponentProps } from 'react'
import { cx } from '../../../lib/cx'
import { Icon } from '../Icon'

type CheckboxProps = Omit<ComponentProps<'input'>, 'type'> & {
  label: string
}

export function Checkbox({ label, className, ...props }: CheckboxProps) {
  return (
    <label
      className={cx('inline-flex cursor-pointer items-center gap-2 text-muted', className)}
    >
      <span className="relative inline-flex size-6">
        <input
          type="checkbox"
          className="peer size-6 cursor-pointer appearance-none rounded-sm border border-primary bg-transparent"
          {...props}
        />
        <Icon
          name="check"
          className="pointer-events-none absolute inset-0 m-auto hidden size-4 text-primary peer-checked:block"
        />
      </span>
      {label}
    </label>
  )
}
