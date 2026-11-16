import { useId, type ComponentProps } from 'react'
import { cx } from '../../../lib/cx'
import { Input } from '../../atoms/Input'
import { Label } from '../../atoms/Label'

type FormFieldProps = ComponentProps<'input'> & {
  label: string
}

export function FormField({ label, id, className, ...props }: FormFieldProps) {
  const generatedId = useId()
  const inputId = id ?? generatedId

  return (
    <div className={cx('flex flex-col gap-2', className)}>
      <Label htmlFor={inputId}>{label}</Label>
      <Input id={inputId} {...props} />
    </div>
  )
}
