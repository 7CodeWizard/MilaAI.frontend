import classNames from 'classnames'
import AudioAnalyser from 'react-audio-analyser'
import { FC, useState } from 'react'
import { useAudio } from '../../hooks/useAudio'
import { useSettingStore } from '../../state/settingStore'
import { MdSettingsVoice } from 'react-icons/md'
import AudioAnimation from '../../components/AudioAnimation'
import { LanguageEnum, RecordState } from '../../services/interface'
import api from '../../services/restApi'
import { useAuthStore, useGlobalStore } from '../../state'
import TransitionEffect from '../../components/TransitionEffect'

interface WordProps {
  index: number
  value: string
  hasTranslation?: boolean
  translation?: string
  audio?: string
  isTooltipOpen: boolean
  romanized_character?: string
  kanji_length?: number
  onComplete: () => void
  onCloseTooltip: () => void
}

const Word: FC<WordProps> = ({
  value,
  hasTranslation = false,
  translation = '',
  audio,
  isTooltipOpen,
  romanized_character,
  kanji_length = 0,
  onComplete,
  onCloseTooltip
}) => {
  const [isRecordingStarted, setRecordingStarted] = useState(false)
  const [user] = useAuthStore((state) => [state.user])
  const [themeColor, showRomaji, japaneseNotation] = useSettingStore((state) => [
    state.themeColor,
    state.showRomaji,
    state.japaneseNotation
  ])
  const { playAudio } = useAudio()
  const [recordState, setRecordState] = useState<RecordState>(RecordState.STOPPED)
  const [status, setStatus] = useState('')
  const [accuracy, setAccuracy] = useState(0)
  const [setRecordingPermission, setStreamData, audioStream] = useGlobalStore((state) => [
    state.setRecordingPermission,
    state.setStreamData,
    state.streamData
  ])

  const audioProps = {
    audioType: 'audio/wav',
    status,
    timeslice: 1000,
    startCallback: (e) => {
      setStreamData(e.target.stream)
    },
    stopCallback: async (e) => {
      if (recordState === RecordState.STOPPED) return
      const formData = new FormData()
      formData.append('audio', e, 'audio.wav')
      formData.append('text', value)

      setRecordState(RecordState.ANALYZING)
      const response = await api.feedback.pronunciation(formData)
      try {
        const value = JSON.parse(response.feedback_json).NBest[0].Words[0].PronunciationAssessment
          .AccuracyScore
        setAccuracy(value)
        if (value >= 50) onComplete()
      } catch (e) {
        setAccuracy(0)
      }
      setRecordState(RecordState.STOPPED)
    },
    width: 0,
    height: 0
  }

  const onPlayAudio = async () => {
    if (!audio) return
    playAudio(audio)
  }

  const onClose = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setRecordingStarted(false)
    setRecordState(RecordState.STOPPED)
    setStatus('inactive')
    onCloseTooltip()
    e.stopPropagation()
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

  const revokeMicrophonePermission = async () => {
    ; (audioStream as MediaStream).getTracks().forEach((track) => {
      track.stop()
    })
    setStreamData(null)
  }

  const onClickRecording = async () => {
    if (recordState === RecordState.ANALYZING) return
    setRecordingStarted(!isRecordingStarted)

    if (recordState === RecordState.STOPPED) {
      await getMicrophonePermission()
      setStatus('recording')
      setRecordState(RecordState.RECORDING)
    } else if (recordState === RecordState.RECORDING) {
      await revokeMicrophonePermission()
      setStatus('inactive')
    }
  }

  return (
    <TransitionEffect effect="fadeIn">
      <div
        className={classNames(
          hasTranslation ? 'cursor-pointer' : '',
          'relative max-sm:text-sm text-xl font-medium whitespace-pre',
          themeColor === 'orange' ? 'text-orange-900' : '',
          themeColor === 'pink' ? 'text-pink-900' : '',
          themeColor === 'blue' ? 'text-blue-900' : ''
        )}
        onClick={onPlayAudio}>
        {japaneseNotation === 'Furigana' &&
          user.target_language === LanguageEnum.Japanese &&
          romanized_character && (
            <div className="flex">
              {kanji_length !== 0 && (
                <div>
                  <h3 className="text-xs font-japanese text-center">{romanized_character}</h3>
                  <h3
                    className={classNames(
                      'tracking-widest text-center text-xl font-japanese',
                      accuracy === 0 ? `text-[#172554]` : '',
                      accuracy > 0 && accuracy < 50 ? 'text-red-600' : '',
                      accuracy >= 50 ? 'text-emerald-600' : ''
                    )}>
                    {value.slice(0, kanji_length)}
                  </h3>
                </div>
              )}
              {kanji_length !== value.length && (
                <div>
                  <h3 className="text-xs">&nbsp;</h3>
                  <h3
                    className={classNames(
                      'tracking-widest text-xl',
                      accuracy === 0 ? 'text-[#172554]' : '',
                      accuracy > 0 && accuracy < 50 ? 'text-red-600' : '',
                      accuracy >= 50 ? 'text-emerald-600' : '',
                      'font-japanese'
                    )}>
                    {value.slice(kanji_length, value.length)}
                  </h3>
                </div>
              )}
            </div>
          )}
        {japaneseNotation === 'Romaji' &&
          user.target_language === LanguageEnum.Japanese &&
          romanized_character && (
            <div className="mr-1">
              <h3 className="text-xs text-center">{romanized_character}</h3>
              <h3
                className={classNames(
                  'text-center text-xl',
                  accuracy === 0 ? 'text-[#172554]' : '',
                  accuracy > 0 && accuracy < 50 ? 'text-red-600' : '',
                  accuracy >= 50 ? 'text-emerald-600' : '',
                  'font-japanese'
                )}>
                {value}
              </h3>
            </div>
          )}
        {user.target_language === LanguageEnum.Chinese && romanized_character && (
          <div className="mr-1">
            <h3 className="text-xs text-center">{romanized_character}</h3>
            <h3
              className={classNames(
                'text-center text-xl',
                accuracy === 0 ? 'text-[#172554]' : '',
                accuracy > 0 && accuracy < 50 ? 'text-red-600' : '',
                accuracy >= 50 ? 'text-emerald-600' : '',
                'font-chinese'
              )}>
              {value}
            </h3>
          </div>
        )}
        {!romanized_character && (
          <div>
            {(user.target_language === LanguageEnum.Japanese ||
              user.target_language === LanguageEnum.Chinese) &&
              showRomaji && <h3 className="text-xs">&nbsp;</h3>}
            <h3
              className={classNames(
                user.target_language === LanguageEnum.Japanese ||
                  user.target_language === LanguageEnum.Chinese
                  ? 'text-xl'
                  : 'text-base',
                user.target_language === LanguageEnum.Japanese ? 'font-japanese' : '',
                user.target_language === LanguageEnum.Chinese ? 'font-chinese' : '',
                accuracy === 0 ? 'text-[#172554]' : '',
                accuracy > 0 && accuracy < 50 ? 'text-red-600' : '',
                accuracy >= 50 ? 'text-emerald-600' : ''
              )}>
              {value}
            </h3>
          </div>
        )}
        {hasTranslation && isTooltipOpen && (
          <div
            className={classNames(
              'absolute rounded-2xl overflow-hidden z-[100] min-w-[150px] left-[50%] -translate-x-1/2',
              themeColor === 'blue' ? 'bg-blue-50' : '',
              themeColor === 'orange' ? 'bg-orange-50' : '',
              themeColor === 'pink' ? 'bg-pink-50' : ''
            )}>
            <button className="absolute z-20 right-0 top-0 p-2" onClick={onClose}>
              X
            </button>
            <div className="px-4 pt-4 flex items-center justify-center text#-[172554] font-bold text-sm">
              {value}
            </div>
            <div className="px-4 flex items-center justify-center text#-[172554] font-bold text-sm mt-2">
              {translation}
            </div>
            <div className="flex w-full">
              <div
                className="p-2 text-white cursor-pointer text-sm flex-1 flex justify-center"
                onClick={(e) => {
                  e.stopPropagation()
                }}>
                <div className="relative px-4 flex flex-col justify-center items-center">
                  {!isRecordingStarted ? (
                    <div
                      className={classNames(
                        'w-[40px] h-[40px] rounded-full flex justify-center items-center cursor-pointer px-1',
                        themeColor === 'blue' ? 'bg-blue-500' : '',
                        themeColor === 'orange' ? 'bg-orange-500' : '',
                        themeColor === 'pink' ? 'bg-pink-500' : ''
                      )}
                      onClick={onClickRecording}>
                      <MdSettingsVoice className="text-white w-5 h-5" />
                    </div>
                  ) : (
                    <div
                      className={classNames(
                        'w-[40px] h-[40px] rounded-full flex justify-center items-center cursor-pointer px-1',
                        themeColor === 'blue' ? 'bg-blue-500' : '',
                        themeColor === 'orange' ? 'bg-orange-500' : '',
                        themeColor === 'pink' ? 'bg-pink-500' : ''
                      )}
                      onClick={onClickRecording}>
                      <AudioAnimation size="sm" />
                    </div>
                  )}
                  {recordState === RecordState.ANALYZING && (
                    <div className={classNames('chat-loader my-3', themeColor)} />
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {isTooltipOpen && <AudioAnalyser {...audioProps} />}
      </div>
    </TransitionEffect>
  )
}

export default Word
