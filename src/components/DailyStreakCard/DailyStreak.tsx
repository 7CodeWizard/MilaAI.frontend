import { FC } from 'react'
import { StreakActive, StreakInActive } from '../Icons'
import { WeeklyActivity } from '../../interfaces'

const DailyStreak: FC<{
  days: WeeklyActivity[]
  size?: 'sm' | 'bg'
}> = ({ days, size = 'bg' }) => {
  return (
    <div className="bg-white dark:bg-mila-gray-50 shadow-sm rounded-2xl px-1 py-2 w-full">
      <div className="flex">
        {days.map((t, index) => (
          <div className="flex flex-col gap-1.5 flex-1 items-center justify-center" key={index}>
            <div className="flex-1">
              {t.tried ? (
                <StreakActive
                  width={size === 'sm' ? '29' : '42'}
                  height={size === 'sm' ? '29' : '42'}
                />
              ) : (
                <StreakInActive
                  width={size === 'sm' ? '29' : '42'}
                  height={size === 'sm' ? '29' : '42'}
                />
              )}
            </div>
            <h3 className="dark:text-white">{t.day.slice(0, size === 'sm' ? 1 : 3)}</h3>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DailyStreak
