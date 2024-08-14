import { FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { BlueMila, SpeechBubbleLeft, SpeechBubbleRight } from '../../components/Icons'
import TransitionEffect from '../../components/TransitionEffect'
import './index.css'
import { LanguageEnum } from '../../services/interface'
import { useAuthStore } from '../../state'
import { fullLanguage } from '../../utils/constant'
import IsTyping from './IsTyping'

const greeting = {
  [LanguageEnum.Chinese]: '好的! (hǎo de!)',
  [LanguageEnum.Japanese]: 'すごい! (Sugoi!)',
  [LanguageEnum.British]: 'Magnificent!',
  [LanguageEnum.American]: 'Magnificent!',
  [LanguageEnum.German]: 'Herrlich!',
  [LanguageEnum.French]: 'Magnifique !',
  [LanguageEnum.Spanish]: '¡Magnífico!'
}

interface MotivationProps {
  onSelectReason: (primaryReason: string, primaryReasonIndex: number, secondaryReason: string) => void
}

const primaryGoals = [
  'Travel and Exploration 🚢',
  'Career Advancement 🏢',
  'Cultural Interest 🍜',
  'Personal Growth 🧠/💪',
  'Family and Relationships 💓',
  'Studies/Academic/University 🎓',
  'Media and Entertainment 🎥',
  'Language Exam Prep 📚',
  'For Fun 🥳'
]

const secondaryGoals = {
  travel: ["Short-Term Travel", "Moving / Living In"],
  career: ["Client/Co-workers Communication", "Opportunities and Networking"],
  culture: ["Likes/Identifies with Culture", "Cultural Nuances", "Family and Heritage", "Family - Passing Down"],
  growth: ["Likes Learning Languages", "Communication and Understanding of Others", "Building Skillset to Boost Confidence"],
  family: ["For My Significant Other", "Family and Heritage", "Expanding Network"],
  academic: ["Refresh Previous Learnings", "Advanced Material", "Enhance Current Learning"],
  ent: ["Understanding Cultural Nuances, Dialogue, etc.", "Books, Manga, Wuxia, Xianxia, or Other Literary Works", "Video Games"],
  exam: ["HSK", "JLPT"],
  fun: [],
}

const Motivation: FC<MotivationProps> = ({ onSelectReason }) => {
  const { t } = useTranslation()
  // const reasons = [
  //   t('onboarding.travel-explore'),
  //   t('onboarding.career-advancement'),
  //   t('onboarding.cultural-interest'),
  //   t('onboarding.personal-growth'),
  //   t('onboarding.family-relationship'),
  //   t('onboarding.media-entertainment'),
  //   t('onboarding.study-academic'),
  //   t('onboarding.other')
  // ]
  const [showSecondaryGoal, setShowSecondaryGoal] = useState(false)
  const [primaryReason, setPrimaryReason] = useState('')
  const [secondaryReason, setSecondaryReason] = useState('')
  const [primaryReasonIndex, setprimaryReasonIndex] = useState(-1)
  const [secondaryGoalChoices, setSecondaryGoalChoices] = useState([])
  const [targetLanguage] = useAuthStore((state) => [state.targetLanguage])

  const [isTyping, setIsTyping] = useState(false)
  const [step, setStep] = useState(0)

  useEffect(() => {
    setTimeout(() => {
      setIsTyping(false)
      setStep(1)
    }, 2000)

    setTimeout(() => {
      setIsTyping(false)
      setStep(2)
    }, 4000)

    setTimeout(() => {
      setIsTyping(true)
    }, 1000)

    setTimeout(() => {
      setIsTyping(true)
    }, 3000)

    setTimeout(() => {
      setStep(3)
    }, 5000)
  }, [])

  const onClickPrimaryGoal = (index: number) => {
    setPrimaryReason(primaryGoals[index])
    setprimaryReasonIndex(index)
    setShowSecondaryGoal(true)
  }

  const onClickSecondaryGoal = (index: number) => {
    setSecondaryReason(secondaryGoalChoices[index])
    setStep(4)
    onSelectReason(primaryGoals[primaryReasonIndex], primaryReasonIndex, secondaryGoalChoices[index])
  }

  useEffect(() => {
    switch (primaryReasonIndex) {
      case 0:
        setSecondaryGoalChoices(secondaryGoals.travel)
        break;
      case 1:
        setSecondaryGoalChoices(secondaryGoals.career)
        break;
      case 2:
        setSecondaryGoalChoices(secondaryGoals.culture)
        break;
      case 3:
        setSecondaryGoalChoices(secondaryGoals.growth)
        break;
      case 4:
        setSecondaryGoalChoices(secondaryGoals.family)
        break;
      case 5:
        setSecondaryGoalChoices(secondaryGoals.academic)
        break;
      case 6:
        setSecondaryGoalChoices(secondaryGoals.ent)
        break;
      case 7:
        setSecondaryGoalChoices(secondaryGoals.exam)
        break;
      case 8:
        onSelectReason(primaryGoals[primaryReasonIndex], primaryReasonIndex, "")
        break;
      default:
        break;
    }
  }, [primaryReasonIndex])

  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight)
  }, [step, isTyping])

  return (
    <>
      <div className="flex gap-3">
        <div className="flex flex-col gap-1.5 flex-1">
          <TransitionEffect duration={1} className="flex gap-3 items-start">
            <div className="w-[40px]">
              <BlueMila />
            </div>
            <div className="bot-message mt-4">
              <div className="absolute -left-1 top-0">
                <SpeechBubbleLeft />
              </div>
              <p>{greeting[targetLanguage]} {t('onboarding.lets-make-most-of-time')}</p>
            </div>
          </TransitionEffect>

          {step === 0 && isTyping && <IsTyping />}
          {step >= 1 && (
            <TransitionEffect duration={1}>
              <p className="bot-message ml-[50px]">
                {t('onboarding.ask-motivation', { language: fullLanguage[targetLanguage] })}
              </p>
            </TransitionEffect>
          )}
          {step === 1 && isTyping && <IsTyping />}
          {step >= 2 && (
            <TransitionEffect duration={1}>
              <p className="bot-message ml-[50px]">{t('onboarding.ask-goal')}</p>
            </TransitionEffect>
          )}
        </div>
      </div>

      {step === 3 && (
        <div className="flex flex-col gap-1.5 items-end mt-2">
          <TransitionEffect className="flex flex-col gap-1.5 items-end relative" duration={2}>
            <div className="absolute -right-1 top-0 text-indigo-100">
              <SpeechBubbleRight />
            </div>
            <div className="user-message">{t('onboarding.pick-motivation')}</div>
            {showSecondaryGoal ?
              <>
                <p className="user-selected">{primaryReason}</p>
                {secondaryGoalChoices.map((goal, index) => (
                  <div
                    className="user-message"
                    key={index}
                    onClick={() => {
                      onClickSecondaryGoal(index)
                    }}>
                    <p>{goal}</p>
                  </div>
                ))}
              </>
              :
              <>
                {primaryGoals.map((goal, index) => (
                  <div
                    className="user-message"
                    key={index}
                    onClick={() => {
                      onClickPrimaryGoal(index)
                    }}>
                    <p>{goal}</p>
                  </div>
                ))}
              </>
            }
          </TransitionEffect>
        </div>
      )}
      {step === 4 && (
        <TransitionEffect className="flex flex-col items-end mt-3 relative" duration={2}>
          <div className="absolute -right-1 top-0 text-indigo-500">
            <SpeechBubbleRight />
          </div>
          <p className="user-selected">{primaryReason}</p>
          {secondaryReason && <p className="mt-2 user-selected">{secondaryReason}</p>}
        </TransitionEffect>
      )}
    </>
  )
}

export default Motivation
