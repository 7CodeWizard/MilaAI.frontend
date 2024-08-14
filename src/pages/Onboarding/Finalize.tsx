import { FC, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { BlueMila, SpeechBubbleLeft } from '../../components/Icons'
import TransitionEffect from '../../components/TransitionEffect'
import { useAuthStore } from '../../state'
import { LanguageEnum } from '../../services/interface'
import { fullLanguage } from '../../utils/constant'

const greeting = {
  [LanguageEnum.Chinese]: '谢谢 (Xièxiè)',
  [LanguageEnum.Japanese]: 'ありがとう (Arigatou)',
  [LanguageEnum.British]: 'Thank you',
  [LanguageEnum.American]: 'Thank you',
  [LanguageEnum.German]: 'Danke',
  [LanguageEnum.French]: 'Merci',
  [LanguageEnum.Mexican]: 'Gracias',
  [LanguageEnum.Spanish]: 'Gracias'
}

interface FinalizeProps {
  onGo: () => void
  isLoading: boolean
}

const Finalize: FC<FinalizeProps> = ({ onGo, isLoading }) => {
  const { t } = useTranslation()
  const [targetLanguage, name] = useAuthStore((state) => [state.targetLanguage, state.name])

  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight)
  }, [])

  return (
    <>
      <div className="flex gap-3">
        <div className="flex-1 flex flex-col gap-1.5">
          <TransitionEffect duration={2} className="flex gap-3 items-start">
            <div className="w-[40px]">
              <BlueMila />
            </div>
            <div className="bot-message mt-3">
              <div className="absolute -left-1 top-0">
                <SpeechBubbleLeft />
              </div>
              {greeting[targetLanguage]}, {name}!{' '}
              {t('onboarding.ask-get-started', { language: fullLanguage[targetLanguage] })}
            </div>
          </TransitionEffect>
          <TransitionEffect delay={2} duration={2} className="flex justify-end">
            <button
              className="bg-emerald-500 active:bg-emerald-400 disabled:bg-emerald-200 rounded-full text-white px-7 py-2 mt-2 font-semibold text-sm"
              onClick={onGo}
              disabled={isLoading}>
              {t('onboarding.lets-go')}
            </button>
          </TransitionEffect>
        </div>
      </div>
    </>
  )
}

export default Finalize
