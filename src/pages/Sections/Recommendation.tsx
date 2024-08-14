import { FC, useEffect, useState } from 'react'
import {
  Close,
  LightBulbGreen,
  Message,
  Microphone,
  Play,
  PlaySlow,
  Spinner
} from '../../components/Icons'
import { Hint, IRomaji, LanguageEnum, StudyMode } from '../../services/interface'
import { useAudio } from '../../hooks/useAudio'
import { useSettingStore } from '../../state/settingStore'
import { classNames, getSplittedWords } from '../../utils'
import HintWord from './HintWord'
import api from '../../services/restApi'
import { useAuthStore, useChatStore } from '../../state'
import { Token } from '../../interfaces'
import { useParams } from 'react-router'

interface IWord {
  [key: string]: string
}

interface RecommendationProps {
  hint: Hint
  onClick: () => void
  onCancel: () => void
}

const Recommendation: FC<RecommendationProps> = ({
  hint,
  onClick,
  onCancel,
}) => {
  const { playAudio } = useAudio()
  const [themeColor, showRomaji, japaneseNotation, chineseNotation] = useSettingStore((state) => [
    state.themeColor,
    state.showRomaji,
    state.japaneseNotation,
    state.chineseNotation
  ])
  const { id } = useParams()
  const [studyMode] = useChatStore((state) => [state.studyMode])
  const [words, setWords] = useState<string[]>([])
  const [kanjiLengthMap, setKanjiLengthMap] = useState<{
    [key: string]: number
  }>({})
  const [tokens, setTokens] = useState<Token[]>([])
  const [user] = useAuthStore((state) => [state.user])
  const [romajiMap, setRomajiMap] = useState<IWord>({})
  const [wordMap, setWordMap] = useState<IWord>({})
  const [audioMap, setAudioMap] = useState<IWord>()
  const [slowAudio, setSlowAudio] = useState('')
  const [isSlowAudioFetching, setSlowAudioFetching] = useState(false)
  const [isTranslated, setTranslated] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(-1)
  const [isFinished, setFinished] = useState(false)

  const onClickPlay = (e) => {
    e.stopPropagation()
    playAudio(hint.audio_response)
  }

  const onClickPlaySlow = (e) => {
    e.stopPropagation()

    if (!slowAudio) {
      setSlowAudioFetching(true)
      api.chat
        .getSlowAudio(id, hint.simulated_response)
        .then((audio) => {
          setSlowAudio(audio)
          playAudio(audio)
          setSlowAudioFetching(false)
        })
        .catch(() => {
          setSlowAudioFetching(false)
        })
      return
    }

    playAudio(slowAudio)
  }

  const onComplete = (index: number) => {
    index++
    while (index < words.length && wordMap[words[index]] === undefined) {
      index++
    }
    if (index >= words.length) {
      setCurrentIndex(Number.MAX_VALUE)
      setFinished(true)
      return
    }
    setCurrentIndex(index)
  }

  const onClickMessageOrPlay = () => {
    if (!isFinished) onComplete(-1)
    else {
      onClick()
    }
  }

  return (
    <div className="mb-[10px] flex justify-end mt-2">
      <div className="max-w-5xl flex gap-4 items-center flex-row-reverse">
        <div
          className={classNames(
            'thread px-4 py-4 text-center ml-24 border-2 border-dashed relative',
            themeColor === 'blue' ? 'border-blue-900 bg-blue-50' : '',
            themeColor === 'orange' ? 'border-orange-900 bg-orange-50' : '',
            themeColor === 'pink' ? 'border-pink-900 bg-pink-50' : ''
          )}
        >
          <div className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 w-fit h-fit">
            <LightBulbGreen />
          </div>
          {!isTranslated ? (
            <h3
              className={classNames(
                'text-left font-medium text-gray-800 border-b pb-1 border-dotted border-b-gray-700 mb-1',
                user.target_language === LanguageEnum.Chinese
                  ? 'font-chinese text-xl'
                  : 'text-base',
                user.target_language === LanguageEnum.Japanese
                  ? 'font-japanese text-xl'
                  : 'text-base'
              )}
            >
              {hint.simulated_response}
            </h3>
          ) : (
            <div className="flex flex-wrap border-b pb-1 border-dotted border-b-gray-700">
              {tokens.map(
                (
                  { token, furigana, zhuyin, translation, audio, kanji_only_length, romanization },
                  index
                ) => (
                  <HintWord
                    isTooltipOpen={index === currentIndex}
                    index={index}
                    key={index}
                    value={token}
                    hasTranslation={!!translation}
                    translation={translation}
                    audio={audio}
                    romanized_character={
                      showRomaji
                        ? user.target_language === LanguageEnum.Japanese
                          ? japaneseNotation === 'Furigana'
                            ? furigana
                            : romanization
                          : chineseNotation === 'Romaji'
                            ? romanization
                            : zhuyin
                        : null
                    }
                    kanji_length={kanji_only_length}
                    onComplete={() => {
                      onComplete(index)
                    }}
                    onCloseTooltip={() => {
                      setCurrentIndex(-1)
                    }}
                  />
                )
              )}
            </div>
          )}
          <h3 className="text-gray-400 mt-2 text-sm italic font-medium">{hint.translation}</h3>

          <div className="mt-2 flex gap-1 justify-end">
            <button
              onClick={onClickPlay}
              className={classNames(
                'rounded-lg p-2',
                `bg-${themeColor}-100 active:bg-${themeColor}-200 text-${themeColor}-900`
              )}
            >
              <Play />
            </button>
            <button
              onClick={onClickPlaySlow}
              className={classNames(
                'rounded-lg',
                `bg-${themeColor}-100 active:bg-${themeColor}-200 text-${themeColor}-900`,
                isSlowAudioFetching ? 'py-[7px] px-[10px]' : 'p-2'
              )}
            >
              {isSlowAudioFetching ? <Spinner /> : <PlaySlow />}
            </button>
            {/* <button
              onClick={onClickMessageOrPlay}
              className="rounded-lg p-1.5 bg-red-500 border-red-700 disabled:bg-red-400"
              disabled={!isTranslated}>
              {isFinished ? <Message /> : <Microphone />}
            </button> */}
            <button
              onClick={onCancel}
              className={classNames(
                'rounded-lg p-2',
                `bg-${themeColor}-100 active:bg-${themeColor}-200 text-${themeColor}-900`
              )}
            >
              <Close />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Recommendation
