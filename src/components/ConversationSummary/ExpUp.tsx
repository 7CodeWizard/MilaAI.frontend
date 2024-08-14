import { FC, useEffect, useState } from 'react'
import { ArrowRight, ExpUpSheld, levelIcons } from '../Icons'
import ProgressBar from '../../elements/ProgressBar'
import Mila from '../../assets/images/mila/expup-mila.png'
import { useChatStore } from '../../state'
import { levelNames } from '../../constants'
import TransitionEffect from '../TransitionEffect'
import levelup_url from './../../assets/sounds/level-up.mp3'
import { useAudio } from '../../hooks/useAudio'

interface ExpUpProps {
  played: boolean
}

const ExpUp: FC<ExpUpProps> = ({ played }) => {
  const [feedback, setFeedback] = useChatStore((state) => [state.feedback, state.setFeedback])
  const [experience, setExperience] = useState(feedback.experience_before)
  const { playAudio } = useAudio()

  useEffect(() => {
    if (!played) return
    if (experience < feedback.user_experience) {
      setTimeout(() => {
        setExperience((exp) => exp + 3)
      }, 30)
    } else {
      if (played) {
        playAudio(levelup_url)
      }
    }
  }, [experience, played])

  return (
    <div className="px-2 py-6">
      <div className="flex flex-col items-center">
        <ExpUpSheld />
        <h3 className="mt-4 text-blue-900 dark:text-white text-lg font-medium">EXP UP!</h3>
        <h3 className="mt-2 text-blue-900 dark:text-white text-sm font-medium">
          "One step closer to language mastery!"
        </h3>
      </div>
      <div className="mt-8 py-10 flex justify-around items-center">
        <TransitionEffect effect="fadeLeft" once duration={1}>
          <div className="flex flex-col items-center">
            <div className="w-[65px] h-[65px]">{levelIcons[feedback.level_before]}</div>
            <h3 className="text-xs text-slate-700 dark:text-white font-semibold italic">
              {levelNames[feedback.level_before]}
            </h3>
          </div>
        </TransitionEffect>
        <TransitionEffect effect="fadeLeft" once duration={0.8} delay={1}>
          <div className="text-blue-600 dark:text-white">
            <ArrowRight />
          </div>
        </TransitionEffect>
        <TransitionEffect effect="fadeLeft" once duration={1} delay={1.8}>
          <div className="flex flex-col items-center">
            <div className="w-[65px] h-[65px]">{levelIcons[feedback.user_level]}</div>
            <h3 className="text-xs text-slate-700 dark:text-white font-semibold italic">
              {levelNames[feedback.user_level]}
            </h3>
          </div>
        </TransitionEffect>
      </div>
      <div className="mt-8">
        <ProgressBar
          completed={(experience * 100) / (feedback.user_experience + feedback.next_level_exp_req)}
        />
        <div className="relative flex mt-2">
          <div className="absolute top-0">
            <img src={Mila} />
          </div>
          <div className="ml-auto text-sm text-[#0F172A] font-medium">
            {experience}/{feedback.user_experience + feedback.next_level_exp_req}
          </div>
        </div>
      </div>
      <h3 className="mt-20 text-center dark:text-white text-lg font-medium">Good Job!</h3>
    </div>
  )
}

export default ExpUp
