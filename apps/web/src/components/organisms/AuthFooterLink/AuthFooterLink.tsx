import { cx } from '../../../lib/cx'
import { Icon, type IconName } from '../../atoms/Icon'
import { Text } from '../../atoms/Text'
import { TextLink } from '../../atoms/TextLink'

type AuthFooterLinkProps = {
  question: string
  linkText: string
  to: string
  icon?: IconName
  className?: string
}

export function AuthFooterLink({
  question,
  linkText,
  to,
  icon,
  className,
}: AuthFooterLinkProps) {
  return (
    <div className={cx('flex flex-col items-center gap-3', className)}>
      <Text variant="small">{question}</Text>
      <TextLink to={to} variant="primary">
        {linkText}
        {icon && <Icon name={icon} />}
      </TextLink>
    </div>
  )
}
