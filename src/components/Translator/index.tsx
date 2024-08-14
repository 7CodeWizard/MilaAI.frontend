import { FC, useEffect, useState } from 'react'
import { useDebounce } from 'use-debounce'
import { useAuthStore } from '../../state'
import api from '../../services/restApi'
import { MdClose } from 'react-icons/md'
import { useSettingStore } from '../../state/settingStore'
import { classNames } from '../../utils'
import { Play, PlaySlow } from '../Icons'
import { useAudio } from '../../hooks/useAudio'
import { useTranslation } from 'react-i18next'

const Translator: FC = () => {
  const { playAudio, stopAudio } = useAudio()
  const [user] = useAuthStore((state) => [state.user])
  const [originalText, setOriginalText] = useState('')
  const [translatedText, setTranslatedText] = useState('')
  const [isTranslating, setTranslating] = useState(false)
  const [themeColor] = useSettingStore((state) => [state.themeColor])
  const [debouncedString] = useDebounce(originalText, 1000)
  const [audio, setAudio] = useState({
    normal: '',
    slow: ''
  })
  const { t } = useTranslation()

  useEffect(() => {
    if (!debouncedString) return
    setTranslating(true)
    setAudio({
      normal: '',
      slow: ''
    })

    api.feedback.translator(debouncedString).then((res) => {
      setTranslating(false)
      setTranslatedText(res.translated_text)
      setAudio({
        normal: res.audio_response,
        slow: res.slow_response
      })
    })
  }, [debouncedString])

  useEffect(() => {
    return () => {
      stopAudio()
    }
  }, [])

  const onClear = () => {
    setOriginalText('')
    setTranslatedText('')
    setAudio({
      normal: '',
      slow: ''
    })
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="bg-white dark:bg-mila-gray-50 shadow-sm rounded-2xl p-5">
        <div className="flex justify-between">
          <h3 className="font-bold text-blue-950 dark:text-white">{user.native_language}</h3>
          <button onClick={onClear} className="text-white">
            <MdClose />
          </button>
        </div>
        <textarea
          className="border-none outline-none bg-transparent mt-4 w-full text-neutral-500 min-h-[100px] resize-none"
          placeholder={t('enter-text')}
          value={originalText}
          onChange={(e) => {
            setOriginalText(e.currentTarget.value)
          }}
        />
      </div>

      <div className="bg-white dark:bg-mila-gray-50 shadow-sm rounded-2xl p-5">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-blue-950 dark:text-white">{user.target_language}</h3>
          {isTranslating && <div className={classNames('chat-loader mr-4', themeColor)} />}
        </div>
        <textarea
          className="border-none outline-none bg-transparent mt-4 w-full text-neutral-500 min-h-[70px] resize-none"
          value={translatedText}
          readOnly
        />
        <div className="flex gap-1 justify-end">
          <button
            className={classNames(
              `bg-${themeColor}-100 active:bg-${themeColor}-200 text-${themeColor}-900`,
              'rounded-lg p-2 shadow-sm'
            )}
            disabled={!audio.normal}
            onClick={() => {
              playAudio(audio.normal)
            }}>
            <Play />
          </button>
          <button
            className={classNames(
              `bg-${themeColor}-100 active:bg-${themeColor}-200 text-${themeColor}-900`,
              'rounded-lg p-2 shadow-sm',
              themeColor === 'orange' ? 'border-orange-600' : '',
              themeColor === 'blue' ? 'border-blue-600' : '',
              themeColor === 'pink' ? 'border-pink-600' : ''
            )}
            disabled={!audio.slow}
            onClick={() => {
              playAudio(audio.slow)
            }}>
            <PlaySlow />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Translator
