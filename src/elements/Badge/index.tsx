import { FC } from 'react'
import { classNames } from '../../utils'

interface BadgeProps {
  value: number | string
  color: 'pink' | 'blue' | 'orange'
}

const Badge: FC<BadgeProps> = ({ value, color }) => (
  <span
    className={classNames(
      'flex items-center text-xs text-white rounded-full px-3',
      `bg-${color}-500`
    )}
  >
    {value}
  </span>
)

export default Badge
