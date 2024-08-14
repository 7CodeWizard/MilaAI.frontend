import { FC } from 'react'
import {
  CircularProgressbarWithChildren as CircularProgressbar,
  buildStyles
} from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import { GrammarCheck, SpeechBubbleRight } from '../Icons'
import Mila from '../../assets/images/mila/grammar-check.png'

const Grammar: FC = () => (
  <div className="px-2 py-6">
    <div className="flex flex-col items-center">
      <GrammarCheck />
      <h3 className="mt-4 text-blue-900 text-lg font-medium">Grammar Check</h3>
      <h3 className="mt-2 text-blue-900 text-sm font-medium">
        You've got a good grasp of grammar, but there are a few areas to focus on.
      </h3>
    </div>
    <div className="flex flex-col mt-8 items-center relative">
      <img src={Mila} className="left-0 -bottom-5 absolute" />
      <CircularProgressbar
        value={40}
        className="font-semibold w-40 h-40"
        strokeWidth={12}
        styles={buildStyles({
          strokeLinecap: 'round',
          textColor: 'var(--color-white)',
          trailColor: 'var(--color-slate-200)',
          backgroundColor: 'var(--color-slate-200)',
          pathColor: '#2563EB'
        })}>
        <div className="text-center">
          <h3 className="text-xs text-[#475569]">Grammar Score</h3>
          <h3 className="mt-1 text-xl text-[#0F172A] font-medium">40%</h3>
        </div>
      </CircularProgressbar>
    </div>
    <div className="mt-16 pl-6">
      <div className="flex flex-col gap-1.5 relative w-full">
        <div className="absolute -right-1 top-0 text-blue-50">
          <SpeechBubbleRight />
        </div>
        <div className="user-message">
          <h3 className="text-emerald-600">This was correct sentence by user.</h3>
        </div>
      </div>
      <h3 className="text-sm text-blue-900 mt-2 pl-2">
        Well done! Your sentence structure is accurate.
      </h3>
    </div>
  </div>
)

export default Grammar
