import { FC, useState } from 'react'
import AudioAnalyser from 'react-audio-analyser'
import { MdSettingsVoice, MdFiberManualRecord } from 'react-icons/md'
import { Modal } from '../../components/Modal'
import { RecordState, WordInfo } from '../../services/interface'
import WaveSurferPlayer from './WaveSurferPlayer'
import { MilaBot, Play, Wave } from '../../components/Icons'
import { IconButton } from '../../elements/Button'
import api from '../../services/restApi'
import classNames from 'classnames'
import { useSettingStore } from '../../state/settingStore'

const PracticeLoader: FC = () => <span className="practice-loader"></span>

interface WordPracticeProps {
  isOpen: boolean
  isLoading: boolean
  toggleOpen: () => void
  word: string
  userAudio: HTMLAudioElement
  info: WordInfo
  aiAudio: string
  pronunciationMethod: string
}

const toSecond = (value: number) => value / 10000000

const WordPractice: FC<WordPracticeProps> = ({
  isOpen,
  isLoading,
  toggleOpen,
  word,
  userAudio: defaultUserAudio,
  aiAudio,
  info,
  pronunciationMethod
}) => {
  const [themeColor] = useSettingStore((state) => [state.themeColor])
  const [recordState, setRecordState] = useState<RecordState>(RecordState.STOPPED)
  const [status, setStatus] = useState('')
  const [userAudio, setUserAudio] = useState(defaultUserAudio)
  const [tried, setTried] = useState(false)
  const [accuracy, setAccuracy] = useState(info?.score)

  const audioProps = {
    audioType: 'audio/wav',
    status,
    timeslice: 1000,
    stopCallback: async (e) => {
      const audioUrl = URL.createObjectURL(e)
      const audio = new Audio(audioUrl)

      const formData = new FormData()
      formData.append('audio', e, 'audio.wav')
      formData.append('text', word)

      setRecordState(RecordState.ANALYZING)
      const response = await api.feedback.pronunciation(formData)

      setUserAudio(audio)
      setTried(true)
      setAccuracy(
        JSON.parse(response.feedback_json).NBest[0].Words[0].PronunciationAssessment.AccuracyScore
      )
      setRecordState(RecordState.STOPPED)
    },
    errorCallback: (err) => { },
    width: 0,
    height: 0
  }

  const onRecord = () => {
    if (recordState === RecordState.STOPPED) {
      setStatus('recording')
      setRecordState(RecordState.RECORDING)
    } else if (recordState === RecordState.RECORDING) {
      setStatus('inactive')
    }
  }

  const playUserAudio = () => {
    if (tried) {
      userAudio.play()
      return
    }
    userAudio.currentTime = toSecond(info.offset)
    userAudio.play()

    setTimeout(function () {
      userAudio.pause()
      userAudio.currentTime = toSecond(info.offset + info.duration)
    }, info.duration / 10000)
  }

  const playAIAudio = () => {
    const audio = new Audio(aiAudio)
    audio.play()
  }

  return (
    <Modal isOpen={isOpen} onClose={toggleOpen} size="w-[80%] max-w-[500px]">
      <div className={classNames('px-12 max-md:px-4', isLoading ? '' : 'pb-8 pt-12')}>
        {isLoading ? (
          <div className="w-full min-h-[100px] flex justify-center items-center">
            <PracticeLoader />
          </div>
        ) : (
          <>
            <h3 className="text-3xl text-gray-700 text-center">{word}</h3>
            <h4 className="mt-6 text-sm text-gray-500">{pronunciationMethod}</h4>

            {recordState !== RecordState.STOPPED ? (
              <div className="flex justify-center mt-8 mb-8">
                <Wave />
              </div>
            ) : (
              <>
                <div className="mt-4 flex gap-3 items-center">
                  <h3 className="text-lg text-gray-600 w-[60px]">Mila</h3>
                  <div className="flex-1 w-0">
                    <WaveSurferPlayer
                      height={80}
                      barGap={1}
                      barRadius={5}
                      waveColor="#5DE2A2"
                      progressColor="#5DE2A2"
                      url={aiAudio}
                      fillParent
                      barWidth={5}
                      cursorColor="transparent"
                      cursorWidth={2}
                      size="sm"
                    />
                  </div>
                  <button
                    onClick={playAIAudio}
                    className="text-[#5DE2A2] bg-[#4ade80] p-1 rounded-full">
                    <span className="text-white">
                      <Play />
                    </span>
                  </button>
                </div>
                <div className="flex gap-3 items-center">
                  <h3 className="text-lg text-gray-600 w-[60px]">You</h3>
                  <div className="flex-1 w-0">
                    <WaveSurferPlayer
                      height={80}
                      barGap={1}
                      barRadius={5}
                      waveColor={classNames(
                        accuracy < 40 ? '#ef4444' : '',
                        accuracy >= 40 && accuracy < 80 ? '#eab308' : '',
                        accuracy >= 80 ? '#4ade80' : ''
                      )}
                      progressColor="rgb(100, 0, 100)"
                      url={userAudio ? userAudio.src : ''}
                      fillParent
                      barWidth={5}
                      cursorColor="transparent"
                      cursorWidth={2}
                    />
                  </div>
                  <button
                    onClick={playUserAudio}
                    className={classNames(
                      accuracy < 40 ? 'text-[#ef4444] bg-[#ef4444]' : '',
                      accuracy >= 40 && accuracy < 80 ? 'bg-[#eab308]' : '',
                      accuracy >= 80 ? 'text-[#4ade80] bg-[#4ade80]' : '',
                      'p-1 rounded-full'
                    )}>
                    <span className="text-white">
                      <Play />
                    </span>
                  </button>
                </div>
              </>
            )}

            <div className="mt-3 flex flex-col items-center">
              <IconButton
                icon={
                  recordState === RecordState.STOPPED ? (
                    <MdSettingsVoice className={`w-6 h-6 text-${themeColor}-900`} />
                  ) : (
                    <MdFiberManualRecord className={`w-6 h-6 text-${themeColor}-900`} />
                  )
                }
                bgColor={themeColor}
                color="white"
                className="px-16"
                onClick={onRecord}
                disabled={recordState === RecordState.ANALYZING}
              />
              {recordState === RecordState.RECORDING && <h4 className="mt-2">Listening...</h4>}
              {recordState === RecordState.ANALYZING && <h4 className="mt-2">Analyzing...</h4>}
            </div>

            {recordState === RecordState.STOPPED && tried && (
              <div className="mt-4 flex">
                <div className="max-w-5xl flex gap-4 items-end">
                  <div>
                    <MilaBot />
                  </div>

                  <div className="bg-[#F9F8FF] thread thread-bot p-4">
                    <h3>{accuracy}% Match!</h3>
                    {accuracy >= 80 ? 'Great Job!' : 'Please try again.'}
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        <AudioAnalyser {...audioProps} />
      </div>
    </Modal>
  )
}

export default WordPractice
