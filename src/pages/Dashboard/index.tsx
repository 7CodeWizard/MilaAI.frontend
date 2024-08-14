import { FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useAuthStore } from '../../state'
import Leaderboard from './Leaderboard'
import StatisticCard from './StatisticCard'
import {
  Lightening,
  NewWordMonth,
  NewWordToday,
  NewWordWeek,
  Statistics,
  SunCloudy,
  Sunny
} from '../../components/Icons'
import api from '../../services/restApi'
import { IStatistics } from '../../interfaces'
import Skeleton from '../../elements/Skeleton'
import DailyStreakCard from '../../components/DailyStreakCard'
import { useProfileStore } from '../../state/profileStore'

const Dashboard: FC = () => {
  const [user] = useAuthStore((state) => [state.user])
  const [dailyStreak] = useProfileStore((state) => [state.dailyStreak])
  const { t } = useTranslation()

  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<IStatistics>({
    conversation_statistics: {
      easy_conversation_completed: 0,
      hard_conversation_completed: 0,
      medium_conversation_completed: 0,
      total_conversation_completed: 0
    },
    vocabulary_statistics: {
      this_month_words: 0,
      this_week_words: 0,
      today_new_words: 0,
      total_words: 0
    }
  })

  useEffect(() => {
    setLoading(true)
    api.users.statistics().then((res) => {
      setData({
        conversation_statistics: res.conversation_statistics,
        vocabulary_statistics: res.vocabulary_statistics
      })
      setLoading(false)
    })
  }, [])

  return (
    <div className="px-4 lg:py-10 flex justify-center max-lg:pt-4 max-lg:pb-20 max-lg:px-2">
      <div className="bg-white rounded-xl p-2 w-full lg:px-14 dark:bg-mila-gray-50">
        <div className="bg-white dark:bg-mila-gray-25 text-blue-600 dark:text-white text-4xl font-semibold shadow-sm rounded-2xl px-4 py-4">
          {t('dashboard.welcome-back')}, {user.full_name}
        </div>

        {dailyStreak && (
          <div className="mt-4">
            <DailyStreakCard {...dailyStreak} />
          </div>
        )}

        <div className="mt-3 shadow-sm p-2 rounded-3xl bg-white dark:bg-mila-gray-25">
          <h3 className="text-3xl font-semibold text-slate-600 dark:text-white mt-4 pl-1">
            {t('dashboard.top-learners')}
          </h3>
          <div className="mt-3">
            <Leaderboard />
          </div>
        </div>

        <div className="mt-3 shadow-sm p-2 rounded-3xl bg-white dark:bg-mila-gray-25">
          <h3 className="text-slate-600 dark:text-white text-3xl font-semibold mt-4 pl-1">
            {t('dashboard.progress')}
          </h3>
          <div className="flex gap-2 mt-3 max-lg:flex-col">
            <div className="shadow-sm p-2 rounded-3xl flex-1 flex flex-col">
              <h3 className="text-slate-600 dark:text-white text-3xl font-semibold mt-1 flex-1">
                {t('dashboard.chats-completed')}
              </h3>
              <div className="mt-2 flex gap-2">
                <StatisticCard
                  icon={<Sunny />}
                  label={t('guided')}
                  value={data.conversation_statistics.easy_conversation_completed}
                  color="emerald"
                  loading={loading}
                />
                <StatisticCard
                  icon={<SunCloudy />}
                  label={t('supportive')}
                  value={data.conversation_statistics.medium_conversation_completed}
                  color="orange"
                  loading={loading}
                />
                <StatisticCard
                  icon={<Lightening />}
                  label={t('independent')}
                  value={data.conversation_statistics.hard_conversation_completed}
                  color="pink"
                  loading={loading}
                />
              </div>
              <div className="mt-2 flex gap-4 bg-blue-50 dark:bg-blue-500 rounded-2xl p-5 items-center justify-center">
                <Statistics />
                {loading ? (
                  <div className="w-[50px] h-[35px] my-2">
                    <Skeleton variant="rectangular" width="full" height="full" isLoading />
                  </div>
                ) : (
                  <h3 className="text-blue-800 dark:text-white text-4xl font-semibold">
                    {data.conversation_statistics.total_conversation_completed}
                  </h3>
                )}
                <h3 className="text-blue-800 dark:text-white text-sm font-semibold">
                  {t('dashboard.total')}
                </h3>
              </div>
            </div>
            <div className="shadow-sm p-2 rounded-3xl flex-1">
              <h3 className="text-3xl font-semibold text-slate-600 dark:text-white mt-1">
                {t('dashboard.new-words-learned')}
              </h3>
              <div className="mt-2 flex gap-2">
                <StatisticCard
                  icon={<NewWordToday />}
                  label={t('today')}
                  value={data.vocabulary_statistics.today_new_words}
                  color="blue"
                  loading={loading}
                />
                <StatisticCard
                  icon={<NewWordWeek />}
                  label={t('week')}
                  value={data.vocabulary_statistics.this_week_words}
                  color="blue"
                  loading={loading}
                />
                <StatisticCard
                  icon={<NewWordMonth />}
                  label={t('month')}
                  value={data.vocabulary_statistics.this_month_words}
                  color="blue"
                  loading={loading}
                />
              </div>
              <div className="mt-2 flex gap-4 bg-blue-50 dark:bg-blue-500 rounded-2xl p-5 items-center justify-center">
                <Statistics />
                {loading ? (
                  <div className="w-[50px] h-[35px] my-2">
                    <Skeleton variant="rectangular" width="full" height="full" isLoading />
                  </div>
                ) : (
                  <h3 className="text-blue-800 dark:text-white text-4xl font-semibold">
                    {data.vocabulary_statistics.total_words}
                  </h3>
                )}
                <h3 className="text-blue-800 dark:text-white text-sm font-semibold">
                  {t('dashboard.total')}
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
