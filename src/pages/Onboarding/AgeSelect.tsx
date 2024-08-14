import { FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { BlueMila, SpeechBubbleLeft, SpeechBubbleRight } from '../../components/Icons'
import TransitionEffect from '../../components/TransitionEffect'
import './index.css'
import { useAuthStore } from '../../state'
import { LanguageEnum } from '../../services/interface'
import { fullLanguage } from '../../utils/constant'
import IsTyping from './IsTyping'

const greeting = {
  [LanguageEnum.Chinese]: '太棒了! (Tài bàng le!)',
  [LanguageEnum.Japanese]: '素晴らしいですね! (Subarashii desu ne!)',
  [LanguageEnum.British]: "That's great!",
  [LanguageEnum.American]: "That's great!",
  [LanguageEnum.German]: 'Das ist großartig!',
  [LanguageEnum.French]: "C'est génial!",
  [LanguageEnum.Spanish]: '¡Eso es genial!'
}

interface AgeSelectProps {
  onSelectAge: (age: string) => void
}

const AgeSelect: FC<AgeSelectProps> = ({ onSelectAge }) => {
  const { t } = useTranslation()
  const ages = [
    t('onboarding.under-18'),
    '18-24',
    '25-34',
    '35-44',
    '45-54',
    '55-64',
    t('onboarding.above-65')
  ]
  const [selectedAge, setSelectedAge] = useState(-1)
  const [targetLanguage] = useAuthStore((state) => [state.targetLanguage])
  const [isTyping, setIsTyping] = useState(false)
  const [step, setStep] = useState(0)

  useEffect(() => {
    setTimeout(() => {
      setIsTyping(true)
    }, 1000)

    setTimeout(() => {
      setIsTyping(false)
      setStep(1)
    }, 2000)

    setTimeout(() => {
      setStep(2)
    }, 3000)
  }, [])

  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight)
  }, [selectedAge, step, isTyping])

  const onClickAge = (index: number) => {
    setSelectedAge(index)
    onSelectAge(ages[index])
  }

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
              {greeting[targetLanguage]}{' '}
              {t('onboarding.excited-to-help', { language: fullLanguage[targetLanguage] })}
            </div>
          </TransitionEffect>

          {step === 0 && isTyping && <IsTyping />}
          {step >= 1 && (
            <TransitionEffect duration={1}>
              <div className="bot-message ml-[50px]">{t('onboarding.ask-age-range')}</div>
            </TransitionEffect>
          )}
        </div>
      </div>

      {step === 2 && selectedAge === -1 && (
        <div className="flex flex-col gap-1.5 items-end mt-2">
          <TransitionEffect className="flex flex-col gap-1.5 items-end relative" duration={2}>
            <div className="absolute -right-1 top-0 text-indigo-100">
              <SpeechBubbleRight />
            </div>
            <div className="user-message">{t('onboarding.pick-age-range')}</div>
            {ages.map((age, index) => (
              <div
                className="user-message"
                key={index}
                onClick={() => {
                  onClickAge(index)
                }}>
                {age}
              </div>
            ))}
          </TransitionEffect>
        </div>
      )}
      {selectedAge !== -1 && (
        <div className="my-2 flex justify-end relative">
          <div className="absolute -right-1 top-0 text-indigo-500">
            <SpeechBubbleRight />
          </div>
          <div className="user-selected">{ages[selectedAge]}</div>
        </div>
      )}
    </>
  )
}

export default AgeSelect
