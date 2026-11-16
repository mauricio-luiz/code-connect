import { cx } from '../../../lib/cx'
import { Divider } from '../../atoms/Divider'
import { SocialLoginButton } from '../../molecules/SocialLoginButton'

export type SocialProvider = 'github' | 'google'

const providers: Array<{ id: SocialProvider; label: string; icon: string }> = [
  { id: 'github', label: 'Github', icon: '/github.png' },
  { id: 'google', label: 'Gmail', icon: '/google.png' },
]

type SocialLoginProps = {
  onSelect?: (provider: SocialProvider) => void
  title?: string
  className?: string
}

export function SocialLogin({
  onSelect,
  title = 'ou entre com outras contas',
  className,
}: SocialLoginProps) {
  return (
    <div className={cx('flex flex-col items-center gap-2', className)}>
      <Divider className="w-full">{title}</Divider>
      <div className="flex gap-6">
        {providers.map(({ id, label, icon }) => (
          <SocialLoginButton
            key={id}
            icon={icon}
            label={label}
            onClick={() => onSelect?.(id)}
          />
        ))}
      </div>
    </div>
  )
}
