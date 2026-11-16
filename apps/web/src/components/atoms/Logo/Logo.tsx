import type { ComponentProps } from 'react'
import { cx } from '../../../lib/cx'

type LogoProps = ComponentProps<'div'>

// Cada parte do logo é posicionada pelos insets definidos no Figma (componente Logo, 127.258×40).
const parts = [
  { src: '/logo/logo-symbol-bottom.svg', inset: 'inset-[35.48%_88.04%_6.09%_0]' },
  { src: '/logo/logo-symbol-top.svg', inset: 'inset-[15.11%_78.6%_26.47%_9.43%]' },
  { src: '/logo/logo-text.svg', inset: 'inset-[0_0_0_26.88%]' },
]

export function Logo({ className, ...props }: LogoProps) {
  return (
    <div
      role="img"
      aria-label="Code Connect"
      className={cx('relative h-10 w-[127.258px] overflow-clip', className)}
      {...props}
    >
      {parts.map(({ src, inset }) => (
        <div key={src} className={cx('absolute', inset)}>
          <img src={src} alt="" aria-hidden="true" className="absolute inset-0 block size-full max-w-none" />
        </div>
      ))}
    </div>
  )
}
