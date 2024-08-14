import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import DailyStreak from './DailyStreak'
import { DailyStreak as IDailyStreak } from '../../interfaces'

const DailyStreakCard: FC<IDailyStreak> = (props) => {
  const { t } = useTranslation()

  return (
    <div className="bg-white dark:bg-mila-gray-25 rounded-3xl shadow-sm p-2">
      <h3 className="text-slate-600 dark:text-white text-3xl font-semibold pl-2">
        {t('dashboard.daily-streak')}
      </h3>
      <h3 className="mt-3 font-medium text-2xl text-slate-600 dark:text-white pl-2">
        {t('dashboard.days-streak', { day: props.daily_streak })}
      </h3>

      <div className="mt-3">
        <DailyStreak days={props.weekly_activity} />
      </div>
    </div>
  )
}

export default DailyStreakCard
