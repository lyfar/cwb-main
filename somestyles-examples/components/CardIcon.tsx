import { type Icon } from '@phosphor-icons/react'

type CardIconProps = {
  icon: Icon
  size?: number | string
  containerClassName?: string
  iconClassName?: string
}

export function CardIcon({
  icon: IconComponent,
  size = 24,
  containerClassName,
  iconClassName,
}: CardIconProps) {
  const containerClasses = ['info-card__icon', containerClassName].filter(Boolean).join(' ')

  return (
    <span className={containerClasses} aria-hidden="true">
      <IconComponent
        size={size}
        weight="duotone"
        color="var(--brand-sky)"
        className={iconClassName}
      />
    </span>
  )
}
