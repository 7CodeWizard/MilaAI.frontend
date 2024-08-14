import { FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  BlueMila,
  CHINESE_CIRCLE,
  FRENCH_CIRCLE,
  GERMANY_CIRCLE,
  ITALIAN_CIRCLE,
  JAPANESE_CIRCLE,
  SPANISH_CIRCLE,
  SpeechBubbleLeft,
  SpeechBubbleRight,
  UK_CIRCLE,
  US_CIRCLE
} from '../../components/Icons'
import './index.css'
import TransitionEffect from '../../components/TransitionEffect'
import { LanguageEnum } from '../../services/interface'
import { useAuthStore } from '../../state'
import IsTyping from './IsTyping'

interface Lang {
  value: LanguageEnum
  label: string
  flag: JSX.Element
}

const langs: Lang[] = [
  {
    value: LanguageEnum.British,
    label: 'English (UK)',
    flag: <UK_CIRCLE />
  },
  {
    value: LanguageEnum.American,
    label: 'English (US)',
    flag: <US_CIRCLE />
  },
  {
    value: LanguageEnum.French,
    label: 'French',
    flag: <FRENCH_CIRCLE />
  },
  {
    value: LanguageEnum.Mexican,
    label: 'Spanish (MX)',
    flag: <ITALIAN_CIRCLE />
  },
  {
    value: LanguageEnum.Spanish,
    label: 'Spanish (ES)',
    flag: <SPANISH_CIRCLE />
  },
  {
    value: LanguageEnum.German,
    label: 'German',
    flag: <GERMANY_CIRCLE />
  },
  {
    value: LanguageEnum.Japanese,
    label: 'Japanese',
    flag: <JAPANESE_CIRCLE />
  },
  {
    value: LanguageEnum.Chinese,
    label: 'Mandarin',
    flag: <CHINESE_CIRCLE />
  }
]

interface TargetLanguageSelectProps {
  onSelectLanguage: (lang: string) => void
}

const TargetLanguageSelect: FC<TargetLanguageSelectProps> = ({ onSelectLanguage }) => {
  const { t } = useTranslation()
  const [selectedLang, setSelectedLang] = useState(-1)
  const [name] = useAuthStore((state) => [state.name])

  const [step, setStep] = useState(0)
  const [isTyping, setIsTyping] = useState(false)

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
  }, [step, isTyping])

  const onClickLang = (index: number) => {
    setSelectedLang(index)
    onSelectLanguage(langs[index].value)
  }

  return (
    <>
      <div className="flex gap-3">
        <div className="flex-1 flex flex-col gap-1.5">
          <TransitionEffect duration={1} className="flex gap-3">
            <div className="w-[40px]">
              <BlueMila />
            </div>
            <div className="bot-message mt-6">
              <div className="absolute -left-1 top-0">
                <SpeechBubbleLeft />
              </div>
              {t('onboarding.nice-to-meet-you', { name })}
            </div>
          </TransitionEffect>

          {step === 0 && isTyping && <IsTyping />}
          {step >= 1 && (
            <TransitionEffect duration={2}>
              <div className="bot-message ml-[50px]">{t('onboarding.ask-target-language')}</div>
            </TransitionEffect>
          )}
        </div>
      </div>

      {step >= 2 && selectedLang === -1 && (
        <div className="flex flex-col gap-1.5 items-end mt-2">
          <TransitionEffect className="flex flex-col gap-1.5 items-end relative" duration={2}>
            <div className="absolute -right-1 top-0 text-indigo-100">
              <SpeechBubbleRight />
            </div>
            <div className="user-message">{t('onboarding.pick-target-language')}</div>
            {langs.map((lang, index) => (
              <div
                className="user-message flex gap-1"
                key={index}
                onClick={() => {
                  onClickLang(index)
                }}>
                {lang.flag}
                {lang.label}
              </div>
            ))}
          </TransitionEffect>
        </div>
      )}
      {selectedLang !== -1 && (
        <TransitionEffect duration={2} className="my-2 flex justify-end relative">
          <div className="absolute -right-1 top-0 text-indigo-500">
            <SpeechBubbleRight />
          </div>
          <div className="user-selected flex gap-1">
            {langs[selectedLang].flag}
            {langs[selectedLang].label}
          </div>
        </TransitionEffect>
      )}
    </>
  )
}

export default TargetLanguageSelect
