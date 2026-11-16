import { cx } from '../../../lib/cx'
import { Icon, type IconName } from '../../atoms/Icon'
import { Text } from '../../atoms/Text'
import { TextLink } from '../../atoms/TextLink'

type AuthFooterLinkProps = {
  question: string
  linkText: string
  to: string
  icon?: IconName
  /** `stacked`: pergunta acima do link, centralizado. `inline`: pergunta e link lado a lado. */
  layout?: 'stacked' | 'inline'
  className?: string
}

export function AuthFooterLink({
  question,
  linkText,
  to,
  icon,
  layout = 'stacked',
  className,
}: AuthFooterLinkProps) {
  const inline = layout === 'inline'

  return (
    <div
      data-layout={layout}
      className={cx(
        'flex gap-2',
        inline ? 'flex-wrap items-center' : 'flex-col items-center',
        className,
      )}
    >
      <Text variant={inline ? 'body' : 'small'}>{question}</Text>
      <TextLink to={to} variant="primary">
        {linkText}
        {icon && <Icon name={icon} className="text-2xl" />}
      </TextLink>
    </div>
  )
}
