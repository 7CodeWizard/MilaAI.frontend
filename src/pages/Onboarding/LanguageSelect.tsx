import { FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { BlueMila, SpeechBubbleLeft, SpeechBubbleRight } from '../../components/Icons'
import './index.css'
import TransitionEffect from '../../components/TransitionEffect'
import IsTyping from './IsTyping'
import Select, { IOption } from '../../elements/Select'
import { nativeLanguageOptions } from '../../constants'

interface LanguageSelectProps {
  onSelectLanguage: (LanguageEnum) => void
}

const LanguageSelect: FC<LanguageSelectProps> = ({ onSelectLanguage }) => {
  const { t } = useTranslation()
  const [isSelected, setSelected] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [step, setStep] = useState(0)
  const [nativeLanguage, setNativeLanguage] = useState<IOption>(nativeLanguageOptions[0])

  useEffect(() => {
    setTimeout(() => {
      setIsTyping(true)
    }, 1500)

    setTimeout(() => {
      setIsTyping(false)
      setStep(1)
    }, 2000)
    setTimeout(() => {
      setStep(2)
    }, 3500)
  }, [])

  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight)
  }, [isSelected, isTyping, step])

  const onClickLang = () => {
    setSelected(true)
    onSelectLanguage(nativeLanguage.value)
  }

  return (
    <>
      <div className="flex gap-3">
        <div className="flex flex-col gap-1.5 w-full">
          <TransitionEffect delay={0.5} duration={2} className="flex gap-3 items-start">
            <div className="w-[40px]">
              <BlueMila />
            </div>
            <div className="bot-message mt-4">
              <div className="absolute -left-1 top-0">
                <SpeechBubbleLeft />
              </div>
              {t('onboarding.hi')}
            </div>
          </TransitionEffect>
          {step === 0 && isTyping && <IsTyping />}
          {step >= 1 && (
            <TransitionEffect duration={2}>
              <div className="bot-message ml-[50px]">{t('onboarding.ask-language')}</div>
            </TransitionEffect>
          )}
        </div>
      </div>

      {step === 2 && !isSelected && (
        <div className="flex flex-col gap-1.5 items-end mt-2">
          <TransitionEffect duration={2} className="flex flex-col gap-1.5 items-end relative">
            <div className="absolute -right-1 top-0 text-indigo-50">
              <SpeechBubbleRight />
            </div>
            <div className="user-message">{t('onboarding.pick-language')}</div>
            <Select
              options={nativeLanguageOptions}
              value={nativeLanguage}
              onChange={(val) => {
                setNativeLanguage(val)
              }}
              position="top"
              className="flex-1 w-full"
            />
            <button
              className="bg-indigo-200 rounded-full text-indigo-800 px-3 py-2 font-semibold text-sm active:bg-indigo-500"
              onClick={() => {
                onClickLang()
              }}>
              {t('onboarding.continue')}
            </button>
          </TransitionEffect>
        </div>
      )}
      {isSelected && (
        <TransitionEffect duration={2} className="mt-3 mb-2 flex justify-end relative">
          <div className="absolute -right-1 top-0 text-indigo-500">
            <SpeechBubbleRight />
          </div>
          <div className="user-selected">{nativeLanguage.label}</div>
        </TransitionEffect>
      )}
    </>
  )
}

export default LanguageSelect
