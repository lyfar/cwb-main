import {
  NumberCircleEight,
  NumberCircleFive,
  NumberCircleFour,
  NumberCircleNine,
  NumberCircleOne,
  NumberCircleSeven,
  NumberCircleSix,
  NumberCircleThree,
  NumberCircleTwo,
} from '@phosphor-icons/react'
import type { Icon } from '@phosphor-icons/react'

type NumberBadgeProps = {
  value: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
  size?: number | string
  className?: string
}

const numberIcons: Record<NumberBadgeProps['value'], Icon> = {
  1: NumberCircleOne,
  2: NumberCircleTwo,
  3: NumberCircleThree,
  4: NumberCircleFour,
  5: NumberCircleFive,
  6: NumberCircleSix,
  7: NumberCircleSeven,
  8: NumberCircleEight,
  9: NumberCircleNine,
}

export function NumberBadge({ value, size = 22, className }: NumberBadgeProps) {
  const IconComponent = numberIcons[value]
  const classes = ['criteria-card__number', className].filter(Boolean).join(' ')

  return (
    <span className={classes} aria-hidden="true">
      <IconComponent size={size} weight="duotone" color="var(--brand-sky)" />
    </span>
  )
}
