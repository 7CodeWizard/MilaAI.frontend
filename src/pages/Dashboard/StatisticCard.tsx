import { FC, JSX } from 'react'
import { classNames } from '../../utils'
import Skeleton from '../../elements/Skeleton'

interface StatisticCardProps {
  icon: JSX.Element
  value: number
  label: string
  color: 'emerald' | 'orange' | 'pink' | 'blue'
  loading?: boolean
}

const StatisticCard: FC<StatisticCardProps> = ({ icon, label, value, color, loading }) => (
  <div
    className={classNames(
      'flex flex-col gap-2 px-2.5 py-2 rounded-2xl w-full shadow-sm',
      color === 'emerald' ? 'bg-emerald-300' : '',
      color === 'pink' ? 'bg-pink-300' : '',
      color === 'orange' ? 'bg-orange-300' : '',
      color === 'blue' ? 'bg-blue-50 dark:bg-blue-300' : ''
    )}>
    {icon}
    {loading ? (
      <div className="w-[50px] h-[30px] my-2">
        <Skeleton variant="rectangular" width="full" height="full" isLoading />
      </div>
    ) : (
      <h3
        className={classNames(
          'text-3xl font-semibold',
          color === 'emerald' ? 'text-emerald-800' : '',
          color === 'pink' ? 'text-pink-800' : '',
          color === 'orange' ? 'text-orange-800' : '',
          color === 'blue' ? 'text-blue-800' : ''
        )}>
        {value}
      </h3>
    )}

    <h3
      className={classNames(
        'text-sm font-semibold',
        color === 'emerald' ? 'text-emerald-700' : '',
        color === 'pink' ? 'text-pink-700' : '',
        color === 'orange' ? 'text-orange-700' : '',
        color === 'blue' ? 'text-blue-700' : ''
      )}>
      {label}
    </h3>
  </div>
)

export default StatisticCard
