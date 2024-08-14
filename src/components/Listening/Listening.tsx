import { FC, useEffect, useState } from 'react'
import AudioAnalyser from 'react-audio-analyser'
import { useParams } from 'react-router'

import { MdClose, MdKeyboard, MdSettingsVoice } from 'react-icons/md'
import { BsTranslate } from 'react-icons/bs'
import { IconButton } from '../../elements/Button'
import api from '../../services/restApi'
import { useTooltipStore } from '../../state/tooltipStore'

import { AskMode, StudyMode, UserWord } from '../../services/interface'
import { useChatStore, useGlobalStore, useSectionsStore } from '../../state'
import AudioAnimation from '../AudioAnimation'
import { useSettingStore } from '../../state/settingStore'
import { classNames } from '../../utils'
import { useThreadStore } from '../../state/threadStore'
import { Light, Spinner } from '../Icons'
import useASR from '../../hooks/useASR'
import { useAudioStore } from '../../state/audioStore'
import { DAILY_LIMIT_REACH, VALID_AUDIO_MIN } from '../../utils/constant'
import { useAudio } from '../../hooks/useAudio'
import { Modal } from '../Modal'
import Translator from '../Translator'

let audioStream = null

const Listening: FC = () => {
  const [themeColor] = useSettingStore((state) => [state.themeColor])
  const { stopAudio } = useAudio()
  const [setConversationEnded] = useChatStore((state) => [state.setConversationEnded])
  const [status, setStatus] = useState('')
  const [isCancelled, setCancelled] = useState(false)
  const [isHintFetching, setHintFetching] = useState(false)
  const [isTranslatorOpen, setIsTranslatorOpen] = useState(false)
  const { id, topic } = useParams()
  const { startASR, stopASR } = useASR()

  const getMicrophonePermissionInitial = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      stream.getTracks().forEach((track) => track.stop())
    } catch (error) {
      console.error('Error requesting microphone permission:', error)
    }
  }

  const stop = async () => {
    stopASR()
    setStatus('inactive')
    setRecordingStarted(false)
  }

  const start = async () => {
    await getMicrophonePermission()
    setCancelled(false)
    setRecordingStarted(true)
    setStatus('recording')
  }

  useEffect(() => {
    getMicrophonePermissionInitial()
  }, [])

  const [
    setAskMode,
    retry,
    setRetry,
    studyMode,
    firstMessage,
    setFirstMessage,
    isConversationEnding
  ] = useChatStore((state) => [
    state.setAskMode,
    state.retry,
    state.setRetry,
    state.studyMode,
    state.firstMessage,
    state.setFirstMessage,
    state.isConversationEnding
  ])
  const [setHasRecogError] = useAudioStore((state) => [state.setHasRecogError])
  const [setTooltip, audioModeTried] = useTooltipStore((state) => [
    state.setTooltip,
    state.audioModeTried
  ])
  let [
    isAudioProcessing,
    setIsAudioProcessing,
    hint,
    setHint,
    setChatThreads,
    chatThreads,
    setAIThinking,
    isAIThinking,
    isDailyLimitReached,
    setDailyLimitReached
  ] = useThreadStore((state) => [
    state.isAudioProcessing,
    state.setIsAudioProcessing,
    state.hint,
    state.setHint,
    state.setChatThreads,
    state.chatThreads,
    state.setAIThinking,
    state.isAIThinking,
    state.isDailyLimitReached,
    state.setDailyLimitReached
  ])

  const [setMessageCount] = useSectionsStore((state) => [state.setMessageCount])

  const handleRecord = async (audioBlob: Blob) => {
    const formData = new FormData()
    formData.append('audio', audioBlob, 'audio.wav')
    const audioUrl = URL.createObjectURL(audioBlob)
    const audio = new Audio(audioUrl)
    setHasRecogError(false)
    setHint(null)

    try {
      setIsAudioProcessing(true)

      formData.append('section_model', JSON.stringify({ difficulty_level: studyMode }))
      let response;

      if (topic) {
        response = await api.chat.message(formData, topic)
      }
      else {
        response = await api.chat.message(formData, id)
      }

      if (response.end_conversation) {
        setConversationEnded(true)
      }

      if (!firstMessage) {
        setFirstMessage(response.user_message)
      }

      const feedback = response.feedback_json ? JSON.parse(response.feedback_json) : null

      const userWord: UserWord = {}
      if (feedback && feedback.NBest) {
        feedback.NBest[0].Words.forEach((w) => {
          userWord[w.Word] = {
            score: w.PronunciationAssessment.AccuracyScore,
            duration: w.Duration,
            offset: w.Offset
          }
        })
      }

      const user_text = response.user_message

      chatThreads = [
        ...chatThreads,
        {
          type: 'user',
          message: user_text,
          message_id: response.user_message_id,
          grammar: {
            corrected_text: {
              feedback: '',
              score: 0
            }
          },
          lastAIMessage: chatThreads[chatThreads.length - 1].message,
          audioUser: audio
        }
      ]

      if (feedback) {
        chatThreads[chatThreads.length - 1].pronunciation = {
          feedback_json: response.feedback_json,
          feedback_text: response.feedback_text
        }
        chatThreads[chatThreads.length - 1].words = userWord
      }

      setChatThreads([
        ...chatThreads,
        {
          type: 'bot',
          message: response.text_response,
          message_id: response.response_message_id,
          audio_response: response.audio_response,
          slow_response: response.slow_response,
          isLast: response.end_conversation,
          tokenization_response: response.tokenization_response
        }
      ])

      if (!audioModeTried) setTooltip('USER_THREAD')
      setMessageCount(response.message_count)
      setAIThinking(false)
      setIsAudioProcessing(false)
    } catch (error) {
      if (error.response.data && error.response.data.message === DAILY_LIMIT_REACH) {
        setDailyLimitReached(true)
        setAIThinking(false)
        return
      }

      setIsAudioProcessing(false)
      setHasRecogError(true)
    }
  }

  const isValidAudio = async (e: Blob) => {
    return new Promise((resolve) => {
      const audioUrl = URL.createObjectURL(e)
      const audio = new Audio(audioUrl)
      audio.onloadedmetadata = () => {
        if (audio.duration < VALID_AUDIO_MIN) resolve(false)
        else resolve(true)
      }
    })
  }

  const audioProps = {
    audioType: 'audio/wav',
    status,
    timeslice: 1000,
    width: 0,
    height: 0,
    startCallback: async (e) => {
      audioStream = e.target.stream

      startASR(audioStream, () => {
        stop()
      })
    },
    stopCallback: async (e) => {
      if (isCancelled) return

      const isValid = await isValidAudio(e)
      if (!isValid) return

      handleRecord(e)
      setRetry(false)
      await revokeMicrophonePermission()
    }
  }

  const [isRecordingStarted, setRecordingStarted] = useState(false)
  const [setRecordingPermission] = useGlobalStore((state) => [state.setRecordingPermission])

  const revokeMicrophonePermission = async () => {
    ; (audioStream as MediaStream).getTracks().forEach((track) => {
      track.enabled = false
      track.stop()
    })
    audioStream = null
  }

  const getMicrophonePermission = async () => {
    if ('MediaRecorder' in window) {
      try {
        setRecordingPermission(true)
      } catch (error) {
        alert(error)
      }
    } else {
      alert('The MediaRecorder API is not supported in your browser.')
    }
  }

  const onClickRecording = async () => {
    stopAudio()
    if (isRecordingStarted) {
      stop()
    } else {
      start()
    }
  }

  const fetchHint = () => {
    if (isHintFetching) return

    setHintFetching(true)

    api.feedback
      .hint(id)
      .then((hintResponse) => {
        setHint(hintResponse)
        setHintFetching(false)
      })
      .catch(() => {
        setHintFetching(false)
      })
  }

  const openTranslator = () => {
    setIsTranslatorOpen(!isTranslatorOpen);
  }

  const onKeyboardOrCancel = () => {
    if (isRecordingStarted) {
      setCancelled(true)
      setStatus('inactive')
      setRecordingStarted(false)
      setRetry(false)
      revokeMicrophonePermission()
      stopASR()
      return
    }

    setAskMode(AskMode.Text)
  }

  useEffect(() => {
    if (retry) {
      onClickRecording()
    }
  }, [retry])

  return (
    <div className="relative z-10">
      <Modal isOpen={isTranslatorOpen} onClose={() => { setIsTranslatorOpen(false) }} size="w-full md:w-2/3 mx-auto">
        <Translator />
      </Modal>
      <div className="flex justify-center items-center h-full gap-4 relative">
        <div className="absolute left-0">
          <AudioAnalyser {...audioProps} />
        </div>
        <button
          type="button"
          className={classNames(
            'p-3 rounded-full shadow-md',
            `bg-${themeColor}-100 hover:bg-${themeColor}-200`
          )}
          onClick={onKeyboardOrCancel}>
          {isRecordingStarted ? (
            <MdClose
              className={classNames(
                'w-5 h-5',
                themeColor === 'blue' ? 'text-blue-900' : '',
                themeColor === 'orange' ? 'text-orange-900' : '',
                themeColor === 'pink' ? 'text-pink-900' : ''
              )}
            />
          ) : (
            <MdKeyboard
              className={classNames(
                'w-5 h-5',
                themeColor === 'blue' ? 'text-blue-900' : '',
                themeColor === 'orange' ? 'text-orange-900' : '',
                themeColor === 'pink' ? 'text-pink-900' : ''
              )}
            />
          )}
        </button>
        <div className="relative">
          {!isRecordingStarted ? (
            <IconButton
              icon={
                <MdSettingsVoice
                  className={classNames(
                    'w-7 h-7',
                    themeColor === 'blue' ? 'text-blue-900' : '',
                    themeColor === 'orange' ? 'text-orange-900' : '',
                    themeColor === 'pink' ? 'text-pink-900' : ''
                  )}
                />
              }
              color="white"
              bgColor={themeColor}
              size="ring"
              onClick={onClickRecording}
              disabled={
                isAIThinking || isConversationEnding || isAudioProcessing || isDailyLimitReached
              }
              type="button"
              shadow
              className="record-button"
            />
          ) : (
            <div
              className={classNames(
                'w-[76px] h-[76px] rounded-full flex justify-center items-center cursor-pointer px-1',
                themeColor === 'blue' ? 'bg-blue-500' : '',
                themeColor === 'orange' ? 'bg-orange-500' : '',
                themeColor === 'pink' ? 'bg-pink-500' : ''
              )}
              onClick={onClickRecording}>
              <AudioAnimation />
            </div>
          )}
        </div>
        <button
          type="button"
          className={classNames(
            'rounded-full shadow-md w-11 h-11 hint-button flex items-center justify-center',
            `bg-${themeColor}-100 hover:bg-${themeColor}-200 disabled:bg-slate-100`,
            themeColor === 'blue' ? 'text-blue-900' : '',
            themeColor === 'orange' ? 'text-orange-900' : '',
            themeColor === 'pink' ? 'text-pink-900' : ''
          )}
          disabled={
            hint !== null || studyMode !== StudyMode.CONVERSATION_EASY || isConversationEnding
          }
          onClick={fetchHint}>
          {isHintFetching ? (
            <div className="px-1">
              <Spinner width="15" height="15" />
            </div>
          ) : (
            <Light />
          )}
        </button>
        <button
          type="button"
          className={classNames(
            'flex lg:hidden p-3 rounded-full shadow-md',
            `bg-${themeColor}-100 hover:bg-${themeColor}-200`
          )}
          onClick={openTranslator}
        >
          <BsTranslate
            className={classNames(
              'w-5 h-5',
              themeColor === 'blue' ? 'text-blue-900' : '',
              themeColor === 'orange' ? 'text-orange-900' : '',
              themeColor === 'pink' ? 'text-pink-900' : ''
            )}
          />
        </button>
      </div>
    </div>
  )
}

export default Listening
