import { FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { BlueMila, SpeechBubbleLeft, SpeechBubbleRight } from '../../components/Icons'
import TransitionEffect from '../../components/TransitionEffect'
import './index.css'
import IsTyping from './IsTyping'

const minuteValue = [5, 10, 15, 20, 25, 30, 45, 60, 0]

interface CommitPerDayProps {
  onSelectCommitPerDay: (value: number) => void
}

const CommitPerDay: FC<CommitPerDayProps> = ({ onSelectCommitPerDay }) => {
  const { t } = useTranslation()
  const minutes = [
    t('onboarding.minutes', { minute: 5 }),
    t('onboarding.minutes', { minute: 10 }),
    t('onboarding.minutes', { minute: 15 }),
    t('onboarding.minutes', { minute: 20 }),
    t('onboarding.minutes', { minute: 25 }),
    t('onboarding.minutes', { minute: 30 }),
    t('onboarding.minutes', { minute: 45 }),
    t('onboarding.minutes', { minute: 60 }),
    t('onboarding.not-sure-yet')
  ]
  const [selectedMinute, setSelectedMinute] = useState(-1)

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

  const onClickMinute = (index: number) => {
    setSelectedMinute(index)
    onSelectCommitPerDay(minuteValue[index])
    setStep(3)
  }

  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight)
  }, [step, isTyping])

  return (
    <>
      <div className="flex gap-3">
        <div className="flex flex-col gap-1.5 flex-1 items-start">
          <TransitionEffect duration={1} className="flex gap-3">
            <div className="w-[40px]">
              <BlueMila />
            </div>
            <div className="bot-message mt-4">
              <div className="absolute -left-1 top-0">
                <SpeechBubbleLeft />
              </div>
              {t('onboarding.thanks-for-sharing')}
            </div>
          </TransitionEffect>

          {step === 0 && isTyping && <IsTyping />}
          {step >= 1 && (
            <TransitionEffect duration={1}>
              <div className="bot-message ml-[50px]">{t('onboarding.ask-commit')}</div>
            </TransitionEffect>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-1.5 items-end mt-2">
        {step === 2 && selectedMinute === -1 && (
          <TransitionEffect duration={1} className="flex flex-col gap-1.5 items-end relative">
            <div className="absolute -right-1 top-0 text-indigo-100">
              <SpeechBubbleRight />
            </div>
            <div className="user-message">{t('onboarding.pick-commit')}</div>
            {minutes.map((minute, index) => (
              <div
                className="user-message"
                key={index}
                onClick={() => {
                  onClickMinute(index)
                }}>
                {minute}
              </div>
            ))}
          </TransitionEffect>
        )}
        {selectedMinute !== -1 && (
          <div className="mt-2 mb-2 flex justify-end relative">
            <div className="absolute -right-1 top-0 text-indigo-500">
              <SpeechBubbleRight />
            </div>
            <div className="user-selected">{minutes[selectedMinute]}</div>
          </div>
        )}
      </div>
    </>
  )
}

export default CommitPerDay
