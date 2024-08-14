import { FC } from 'react'
import { Streak as StreakIcon } from '../Icons'
import { useChatStore } from '../../state'
import DailyStreak from '../DailyStreakCard/DailyStreak'
import Wow from '../../assets/images/common/wow.png'

const StreakReview: FC = () => {
  const [feedback, setFeedback] = useChatStore((state) => [state.feedback, state.setFeedback])

  return (
    <div className="flex flex-col justify-center items-center px-1 py-6">
      <StreakIcon />

      <h3 className="mt-4 text-blue-900">You're on a</h3>
      <div className="mt-6 text-6xl text-blue-900 font-semibold relative text-center w-full">
        {feedback.streak.daily_streak}

        <div className="absolute -top-4 right-0">
          <img src={Wow} />
        </div>
      </div>
      <h3 className="mt-6 text-blue-900">Day Streak!</h3>
      <h3 className="mt-6 text-slate-700 text-sm font-medium text-center">
        Studying everyday is the key to language learning success!
      </h3>

      <div className="mt-20 w-full">
        <DailyStreak days={feedback.streak.weekly_activity} size="sm" />
      </div>
    </div>
  )
}

export default StreakReview
