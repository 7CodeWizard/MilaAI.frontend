import { FC } from 'react'
import {
  CircularProgressbarWithChildren as CircularProgressbar,
  buildStyles
} from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import { PronunciationPracticeAnalyze } from '../Icons'
import Mila from '../../assets/images/mila/pronunciation-practice.png'
import { useChatStore } from '../../state'
import { roundToTwoDecimals } from '../../utils'

const PronunciationPractice: FC = () => {
  const [feedback, setFeedback] = useChatStore((state) => [state.feedback, state.setFeedback])

  const score = (
    (feedback.aggregate_accuracy_score + feedback.aggregate_fluency_score) /
    2
  ).toFixed(1)

  return (
    <div className="px-2 py-6">
      <div className="flex flex-col items-center">
        <PronunciationPracticeAnalyze />
        <h3 className="mt-6 text-blue-900 dark:text-white text-lg font-medium">
          Pronunciation Practice
        </h3>
        <h3 className="mt-2 text-blue-900 dark:text-white text-sm font-medium">
          Your pronunciation is getting better. Let's continue working on it.
        </h3>
      </div>
      <div className="flex flex-col mt-14 items-center">
        <CircularProgressbar
          value={Number(score)}
          className="font-semibold w-40 h-40"
          strokeWidth={12}
          styles={buildStyles({
            strokeLinecap: 'round',
            textColor: 'var(--color-white)',
            trailColor: 'var(--color-slate-200)',
            backgroundColor: 'var(--color-slate-200)',
            pathColor: '#2563EB'
          })}>
          <div className="text-center circular-content">
            <h3 className="text-xs text-[#475569] dark:text-white">
              Pronunciation
              <br />
              Score
            </h3>
            <h3 className="mt-1 text-xl text-[#0F172A] dark:text-white font-medium max-sm:text-base">
              {score}%
            </h3>
          </div>
        </CircularProgressbar>
      </div>
      <div className="relative">
        <img src={Mila} className="absolute -top-14 right-0" />
      </div>
      <div className="mt-8 flex flex-col gap-2">
        <h3 className="font-semibold text-center dark:text-white">Pronunciation Breakdown</h3>
        <div className="flex justify-between font-medium text-sm dark:text-white">
          <h3>Accuracy</h3>
          <h3>{roundToTwoDecimals(feedback.aggregate_accuracy_score)}%</h3>
        </div>
        <div className="flex justify-between font-medium text-sm dark:text-white">
          <h3>Fluency</h3>
          <h3>{roundToTwoDecimals(feedback.aggregate_fluency_score)}%</h3>
        </div>
      </div>
    </div>
  )
}

export default PronunciationPractice
