import { FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { BlueMila, SpeechBubbleLeft, SpeechBubbleRight } from '../../components/Icons'
import TransitionEffect from '../../components/TransitionEffect'
import './index.css'
import { LanguageEnum } from '../../services/interface'
import { useAuthStore } from '../../state'
import IsTyping from './IsTyping'
import { ProficiencyEnum } from '../../constants'

const greeting = {
  [LanguageEnum.Chinese]: '太好了! (tài hǎo le!)',
  [LanguageEnum.Japanese]: 'すごい! (Sugoi!)',
  [LanguageEnum.British]: 'Magnificent!',
  [LanguageEnum.American]: 'Magnificent!',
  [LanguageEnum.German]: 'Herrlich!',
  [LanguageEnum.French]: 'Magnifique !',
  [LanguageEnum.Spanish]: '¡Magnífico!'
}

interface ProficiencyProps {
  onSelectProficiency: (proficiency: string) => void
  motivation: string
}

const Proficiency: FC<ProficiencyProps> = ({ onSelectProficiency, motivation }) => {
  const { t } = useTranslation()
  const [proficiency, setProficiency] = useState('')
  const [targetLanguage] = useAuthStore((state) => [state.targetLanguage])

  const [isTyping, setIsTyping] = useState(false)
  const [step, setStep] = useState(0)
  const proficiencies = [
    {
      header: t('onboarding.just-started'),
      description: t('onboarding.just-started.description'),
      proficiency: ProficiencyEnum.Novice
    },
    {
      header: t('onboarding.beginner'),
      description: t('onboarding.beginner.description'),
      proficiency: ProficiencyEnum.Beginner
    },
    {
      header: t('onboarding.intermediate'),
      description: t('onboarding.intermediate.description'),
      proficiency: ProficiencyEnum.Intermediate
    },
    {
      header: t('onboarding.advanced'),
      description: t('onboarding.advanced.description'),
      proficiency: ProficiencyEnum.Advanced
    },
    {
      header: t('onboarding.master'),
      description: t('onboarding.master.description'),
      proficiency: ProficiencyEnum.Master
    }
  ]

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

  const onClickProficiency = (index: number) => {
    setProficiency(proficiencies[index].header)
    onSelectProficiency(proficiencies[index].proficiency)
    setStep(4)
  }

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
              {greeting[targetLanguage]} {t('onboarding.motivation-guide-journey', { motivation })}
            </div>
          </TransitionEffect>

          {step === 0 && isTyping && <IsTyping />}
          {step >= 1 && (
            <TransitionEffect duration={1}>
              <div className="bot-message ml-[50px]">{t('onboarding.ask-proficiency')}</div>
            </TransitionEffect>
          )}
          {step === 1 && isTyping && <IsTyping />}
          {step >= 2 && (
            <TransitionEffect duration={1}>
              <div className="bot-message ml-[50px]">{t('onboarding.ask-to-choose-option')}</div>
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
            <div className="user-message">{t('onboarding.pick-experience')}</div>
            {proficiencies.map((proficiency, index) => (
              <div
                className="user-message max-w-[300px] flex flex-col gap-2"
                key={index}
                onClick={() => {
                  onClickProficiency(index)
                }}>
                <h3 className="text-right">{proficiency.header}</h3>
                <h3 className="text-right">{proficiency.description}</h3>
              </div>
            ))}
          </TransitionEffect>
        </div>
      )}
      {step === 4 && (
        <TransitionEffect className="flex flex-col items-end mt-3 relative" duration={2}>
          <div className="absolute -right-1 top-0 text-indigo-500">
            <SpeechBubbleRight />
          </div>
          <div className="user-selected">{proficiency}</div>
        </TransitionEffect>
      )}
    </>
  )
}

export default Proficiency
