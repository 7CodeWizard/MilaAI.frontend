import { FC, ReactNode, useEffect, useState } from 'react'
import Joyride, { CallBackProps, Step, EVENTS } from 'react-joyride'
import { useTooltipStore } from '../../state/tooltipStore'
import { useChatStore } from '../../state'
import { AskMode } from '../../services/interface'
import { ThinkingMila } from '../Icons'

const threadSteps: Step[] = [
  {
    target: '.play-button',
    content: 'Tap to replay the voice.',
    disableBeacon: true
  },
  {
    target: '.play-slow-button',
    content: 'Tap for slower playback.',
    disableBeacon: true
  },
  {
    target: '.translate-button',
    content: 'Tap to translate this message.',
    disableBeacon: true
  },
  {
    target: '.bot-word',
    content: 'Tap any word for its translation.',
    disableBeacon: true
  },
  {
    target: '.hint-button',
    content: 'Need a hint? Tap here.',
    disableBeacon: true
  }
]

const recordingSteps: Step[] = [
  {
    target: '.record-button',
    content: 'Tap to record your voice.',
    disableBeacon: true
  }
]

const userMessageSteps: Step[] = [
  {
    target: '.user-audio-play',
    content: 'Tap to listen to your recording.',
    disableBeacon: true
  },
  {
    target: '.user-feedback',
    content: 'Tap for feedback on your response.',
    disableBeacon: true
  },
  {
    target: '.user-redo',
    content: 'To redo, tap here and recall your message.',
    disableBeacon: true
  },
  {
    target: '.user-word',
    content: 'Tap words to work on pronunciation.',
    disableBeacon: true
  }
]

const endConversationSteps: Step[] = [
  {
    target: '.end-button',
    content: 'Ready to finish? Tap here to end and earn XP. You can also continue and end later.',
    styles: {
      beacon: {
        top: -24
      }
    }
  }
]

interface TooltipProviderProps {
  children: ReactNode
}

const TooltipProvider: FC<TooltipProviderProps> = ({ children }) => {
  const [steps, setSteps] = useState<Step[]>([])
  const [run, setRun] = useState(false)

  const [
    tooltip,
    setTooltip,
    audioModeTried,
    textModeTried,
    setAudioModeTried,
    controlsTried,
    setControlsTried,
    showTour,
    setShowTour
  ] = useTooltipStore((state) => [
    state.tooltip,
    state.setTooltip,
    state.audioModeTried,
    state.textModeTried,
    state.setAudioModeTried,
    state.controlsTried,
    state.setControlsTried,
    state.showTour,
    state.setShowTour
  ])
  const [askMode, isConversationEnded] = useChatStore((state) => [
    state.askMode,
    state.isConversationEnded
  ])

  useEffect(() => {
    if (!showTour) return
    if (tooltip === 'THREAD_CONTROLS') {
      setRun(true)
      setControlsTried(true)
      setSteps([...threadSteps])
    } else if (tooltip === 'RECORD') {
      setRun(true)
      setControlsTried(true)
      setSteps([...recordingSteps])
    } else if (tooltip === 'USER_THREAD') {
      if (
        (textModeTried && askMode === AskMode.Text) ||
        (audioModeTried && askMode === AskMode.Audio)
      )
        return
      setSteps([...userMessageSteps])
      setRun(true)
      if (!textModeTried && askMode === AskMode.Text) setAudioModeTried(true)
      if (!audioModeTried && askMode === AskMode.Audio) setAudioModeTried(true)
    }
  }, [tooltip])

  useEffect(() => {
    if (!showTour) return
    if (isConversationEnded) {
      setSteps([...endConversationSteps])
      setRun(true)
    }
  }, [isConversationEnded])

  useEffect(() => {
    if (!showTour) return
    if (askMode === AskMode.Audio && controlsTried) {
      setTooltip('RECORD')
    }
  }, [askMode])

  const callback = (data: CallBackProps) => {
    const { type } = data
    if (type === EVENTS.TOUR_END) {
      setRun(false)

      if (tooltip === 'THREAD_CONTROLS') {
        if (askMode === AskMode.Audio) {
          setTooltip('RECORD')
        }
      }
    }
  }

  return (
    <>
      {showTour && (
        <Joyride
          callback={callback}
          steps={steps}
          continuous
          run={run}
          locale={{
            last: 'OK'
          }}
          hideBackButton
          tooltipComponent={({ primaryProps, step, skipProps }) => (
            <div className="bg-white py-3 px-6 rounded-2xl">
              <div className="flex flex-col items-center gap-2">
                <ThinkingMila width="70" height="40" />
                <h3 className="text-sm">{step.content}</h3>
              </div>
              <div className="flex mt-3 justify-between gap-3">
                <button
                  {...skipProps}
                  className="bg-slate-400 text-sm text-white rounded-md px-2 py-1"
                  onClick={(e) => {
                    setShowTour(false)
                    skipProps.onClick(e)
                  }}>
                  Skip
                </button>
                <button
                  {...primaryProps}
                  onClick={(e) => {
                    primaryProps.onClick(e)
                    if (step.target === '.end-button') {
                      setShowTour(false)
                    }
                  }}
                  className="bg-blue-400 text-sm text-white rounded-md px-2 py-1">
                  OK
                </button>
              </div>
            </div>
          )}
        />
      )}
      {children}
    </>
  )
}

export default TooltipProvider
