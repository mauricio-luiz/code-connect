import type { ReactNode } from 'react'
import { Heading } from '../../atoms/Heading'
import { Text } from '../../atoms/Text'
import { SocialLogin, type SocialProvider } from '../../organisms/SocialLogin'

type AuthTemplateProps = {
  banner: { src: string; alt: string }
  title: string
  subtitle: string
  children: ReactNode
  footer?: ReactNode
  onSocialSelect?: (provider: SocialProvider) => void
}

export function AuthTemplate({
  banner,
  title,
  subtitle,
  children,
  footer,
  onSocialSelect,
}: AuthTemplateProps) {
  return (
    <main className="relative flex min-h-svh items-center justify-center overflow-hidden bg-bg p-4">
      <img
        src="/simbolo-login.svg"
        alt=""
        aria-hidden="true"
        data-testid="background-symbol"
        className="pointer-events-none absolute -top-10 left-[7%] hidden w-[24%] max-w-[407px] md:block"
      />
      <img
        src="/simbolo-login.svg"
        alt=""
        aria-hidden="true"
        data-testid="background-symbol"
        className="pointer-events-none absolute -right-[2%] bottom-[-8%] hidden w-[24%] max-w-[407px] md:block"
      />

      <section className="relative grid w-full max-w-4xl gap-10 rounded-[32px] bg-surface p-8 md:grid-cols-[407px_1fr] md:p-[54px] md:pr-[77px] md:pl-[77px]">
        <img
          src={banner.src}
          alt={banner.alt}
          className="hidden h-full max-h-[636px] w-[407px] object-cover md:block"
        />

        <div className="mx-auto flex w-full max-w-80 flex-col gap-6 self-center">
          <Heading>{title}</Heading>
          <Text variant="lead">{subtitle}</Text>
          {children}
          <SocialLogin onSelect={onSocialSelect} />
          {footer}
        </div>
      </section>
    </main>
  )
}
