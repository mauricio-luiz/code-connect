import type { ReactNode } from 'react'
import { Heading } from '../../atoms/Heading'
import { Logo } from '../../atoms/Logo'
import { Text } from '../../atoms/Text'
import { SocialLogin, type SocialProvider } from '../../organisms/SocialLogin'

type AuthTemplateProps = {
  /** `position` é o `object-position` do recorte da foto (ex.: `'56% center'`). */
  banner: { src: string; alt: string; position?: string }
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
        className="pointer-events-none absolute -top-10 left-[7%] hidden w-[24%] max-w-[407px] lg:block"
      />
      <img
        src="/simbolo-login.svg"
        alt=""
        aria-hidden="true"
        data-testid="background-symbol"
        className="pointer-events-none absolute right-[7.4%] bottom-0 hidden w-[24%] max-w-[407px] lg:block"
      />

      <section className="relative grid w-full max-w-[996px] gap-8 rounded-[32px] border border-bg bg-surface p-4 sm:px-[85px] sm:py-[52px] lg:grid-cols-[407px_410px] lg:justify-between lg:px-[78px] lg:py-14">
        <div className="relative aspect-[160/194] overflow-hidden sm:aspect-[247/214] lg:aspect-auto">
          <img
            src={banner.src}
            alt={banner.alt}
            style={banner.position ? { objectPosition: banner.position } : undefined}
            className="absolute inset-0 size-full object-cover"
          />
          <div className="absolute bottom-9 left-1/2 -translate-x-1/2">
            <Logo />
          </div>
        </div>

        <div className="flex w-full flex-col gap-6 self-center lg:px-8">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-6">
              <Heading>{title}</Heading>
              <Text variant="lead">{subtitle}</Text>
            </div>
            {children}
            <SocialLogin onSelect={onSocialSelect} />
          </div>
          {footer}
        </div>
      </section>
    </main>
  )
}
