import { FC, useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import {
  BlueMila,
  OnboardingMila,
  SpeechBubbleLeft,
  SpeechBubbleRight
} from '../../components/Icons'
import TransitionEffect from '../../components/TransitionEffect'
import IsTyping from './IsTyping'
import api from '../../services/restApi'

interface AskNameProps {
  onSetName: (name: string) => void
}

const AskName: FC<AskNameProps> = ({ onSetName }) => {
  const { t } = useTranslation()
  const [name, setName] = useState('')
  const [isContinue, setIsContinue] = useState(false)
  const [step, setStep] = useState(0)
  const [isTyping, setIsTyping] = useState(false)

  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight)
  }, [isContinue, isTyping, step])

  useEffect(() => {
    setTimeout(() => {
      setStep(1)
      setIsTyping(false)
    }, 2000)

    setTimeout(() => {
      setStep(2)
      setIsTyping(false)
    }, 4000)

    setTimeout(() => {
      setStep(3)
      setIsTyping(false)
    }, 6000)

    setTimeout(() => {
      setStep(4)
    }, 7000)

    // Typing
    setTimeout(() => {
      setIsTyping(true)
    }, 1000)

    setTimeout(() => {
      setIsTyping(true)
    }, 3000)

    setTimeout(() => {
      setIsTyping(true)
    }, 5000)
  }, [])

  const onContinue = () => {
    if (!name) {
      toast.error(t('onboarding.invalid-name-error'), {
        position: 'top-center',
        duration: 2000
      })
      return
    }

    api.auth
      .validate({
        email: '',
        username: name
      })
      .then((res) => {
        if (!res.username) {
          toast.error(t('onboarding.duplicate-username-error'), {
            position: 'top-center',
            duration: 2000
          })

          return
        }

        setTimeout(() => {
          setIsContinue(true)
          onSetName(name)
        }, 500)
      })
  }

  return (
    <>
      <div className="flex gap-3">
        <div className="flex-1 flex flex-col gap-1.5">
          <TransitionEffect duration={1} className="flex gap-3 items-start">
            <div className="w-[40px]">
              <BlueMila />
            </div>
            <div className="bot-message mt-4">
              <div className="absolute -left-1 top-0">
                <SpeechBubbleLeft />
              </div>
              {t('onboarding.lets-get-acquainted')}
            </div>
          </TransitionEffect>
          {step === 0 && isTyping && <IsTyping />}
          {step >= 1 && (
            <TransitionEffect duration={2} className="ml-[50px]">
              <OnboardingMila />
            </TransitionEffect>
          )}
          {step === 1 && isTyping && <IsTyping />}
          {step >= 2 && (
            <TransitionEffect duration={2}>
              <div className="bot-message ml-[50px]">{t('onboarding.learn-much-together')}</div>
            </TransitionEffect>
          )}
          {step === 2 && isTyping && <IsTyping />}
          {step >= 3 && (
            <TransitionEffect duration={2}>
              <div className="bot-message ml-[50px]">{t('onboarding.ask-name')}</div>
            </TransitionEffect>
          )}
          {!isContinue && (
            <>
              {step >= 4 && (
                <TransitionEffect duration={1}>
                  <div className="flex flex-col items-end">
                    <div className="bg-indigo-100 px-3 py-2.5 font-medium text-sm w-fit text-white rounded-full relative">
                      <div className="absolute -right-1 top-0 text-indigo-100">
                        <SpeechBubbleRight />
                      </div>
                      <input
                        placeholder={t('onboarding.type-your-name')}
                        className="bg-indigo-100 placeholder-indigo-400 outline-none text-indigo-800 w-[160px]"
                        value={name}
                        onChange={(e) => {
                          setName(e.currentTarget.value)
                        }}
                      />
                    </div>
                    <button
                      className="bg-indigo-200 rounded-full text-indigo-800 px-3 py-2 mt-2 font-semibold text-sm active:bg-indigo-500"
                      onClick={onContinue}>
                      {t('onboarding.continue')}
                    </button>
                  </div>
                </TransitionEffect>
              )}
            </>
          )}
          {isContinue && (
            <TransitionEffect duration={2} className="flex flex-col items-end relative">
              <div className="absolute -right-1 top-0 text-indigo-500">
                <SpeechBubbleRight />
              </div>
              <div className="user-selected">{name}</div>
            </TransitionEffect>
          )}
        </div>
      </div>
    </>
  )
}

export default AskName
