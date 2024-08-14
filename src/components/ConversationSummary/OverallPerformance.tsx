import { FC } from 'react'
import {
  CircularProgressbarWithChildren as CircularProgressbar,
  buildStyles
} from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import { OverallPerformanceCup, SpeechBubbleRight } from '../Icons'
import Mila from '../../assets/images/mila/overall-mila.png'
import { useChatStore } from '../../state'
import { useSettingStore } from '../../state/settingStore'

const OverallPerformance: FC = () => {
  const [feedback, setFeedback] = useChatStore((state) => [state.feedback, state.setFeedback])
  const [colorMode] = useSettingStore((state) => [state.colorMode])
  const score = JSON.parse(feedback.feedback).score

  return (
    <div className="px-2 py-6 max-sm:py-0">
      <div className="flex flex-col items-center">
        <OverallPerformanceCup />
        <h3 className="mt-4 text-blue-900 dark:text-white text-lg font-medium">
          Overall Performance
        </h3>
        <h3 className="mt-2 text-blue-900 dark:text-white text-sm font-medium">
          {JSON.parse(feedback.feedback).feedback}
        </h3>
      </div>
      <div className="flex flex-col mt-14 max-sm:mt-4 items-center">
        <CircularProgressbar
          value={score}
          className="font-semibold w-40 h-40"
          strokeWidth={12}
          styles={buildStyles({
            strokeLinecap: 'round',
            textColor: 'var(--color-white)',
            trailColor: colorMode === 'dark' ? '#02061733' : 'var(--color-slate-200)',
            backgroundColor: 'var(--color-slate-200)',
            pathColor: colorMode === 'dark' ? '#020617' : '#2563EB'
          })}>
          <div className="text-center">
            <h3 className="text-xs text-[#475569] dark:text-white">Overall Score</h3>
            <h3 className="mt-1 text-xl text-[#0F172A] dark:text-white font-medium">{score}%</h3>
          </div>
        </CircularProgressbar>
      </div>
      <div className="mt-8 max-sm:mt-4 text-center relative">
        <h3 className="mt-4 text-blue-900 dark:text-white text-lg font-medium">Highlights</h3>
        <h3 className="mt-2 text-blue-900 dark:text-white text-sm font-medium">
          This was an awesome sentence!
        </h3>
        <div className="absolute bottom-0 right-0 max-sm:hidden">
          <img src={Mila} />
        </div>
      </div>
      <div className="mt-4">
        <div className="flex flex-col gap-1.5 relative w-fit">
          <div className="absolute -right-1 top-0 text-blue-100">
            <SpeechBubbleRight />
          </div>
          <div className="user-message">
            <h3 className="text-emerald-600">{feedback.best_sentence}</h3>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OverallPerformance
