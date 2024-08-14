import { FC, useState } from 'react'
import { BookSearch, Play, Spinner } from '../../components/Icons'
import { MdArrowCircleLeft, MdArrowCircleRight } from "react-icons/md";
import { classNames } from '../../utils'
import api from '../../services/restApi'
import { useAudio } from '../../hooks/useAudio'
import { WordMeaning } from '../../interfaces'

interface WordProps {
  word: string
  romanization: string
  handlePrev: () => void
  handleNext: () => void
  currentIndex: number
  totalWords: number
}

interface WordData {
  partOfSpeech: string
  meanings: WordMeaning[]
}

const Flashcard: FC<WordProps> = ({ word, romanization, handlePrev, handleNext, currentIndex, totalWords }) => {
  const [opened, setOpened] = useState(false)
  const [isFetching, setFetching] = useState(false)
  const { playAudio } = useAudio()
  const [audioURL, setAudioURL] = useState('')
  const [isDefined, setDefined] = useState(false)
  const [isDefining, setDefining] = useState(false)
  const [wordData, setWordData] = useState<WordData[]>([])

  const onDefine = () => {
    if (!isDefined) {
      setDefining(true)
      api.words
        .define(word)
        .then((res) => {
          setDefining(false)
          setDefined(true)
          setOpened(true)

          const data: WordData[] = []
          const partOfSpeeches = [...new Set(res.meanings.map((t) => t.partOfSpeech))]
          for (let part of partOfSpeeches) {
            data.push({
              partOfSpeech: part,
              meanings: res.meanings.filter((t) => t.partOfSpeech === part)
            })
          }

          setWordData(data)
        })
        .catch(() => {
          setDefining(false)
        })
      return
    }
    setDefined(false)
    setOpened(!opened)
  }

  const onPlay = () => {
    if (!audioURL) {
      setFetching(true)

      api.feedback.wordPronunciation(word).then((res) => {
        const audio = Object.values(res.audio_response_path)[0]
        playAudio(audio)
        setAudioURL(audio)
        setFetching(false)
      })
    } else {
      playAudio(audioURL)
    }
    setAudioURL("")
  }

  const onPrev = () => {
    setAudioURL("")
    setDefined(false)
    setOpened(false)
    handlePrev()
  }
  const onNext = () => {
    setAudioURL("")
    setDefined(false)
    setOpened(false)
    handleNext()
  }

  return (
    <>
      <div className="h-80 w-64 md:w-72 lg:h-[30rem] lg:w-[26rem] mx-auto py-10 bg-white border dark:bg-mila-gray-25 shadow-md rounded-lg overflow-y-auto flex flex-col justify-start items-center">
        <div className="h-full px-6 text-left flex flex-col justify-between">
          <p className="text-2xl font-bold mb-4 text-center">{word} <span className="font-light text-base">({romanization})</span></p>
          {opened && (
            <div className="mt-2 text-blue-900 flex-1 px-2 md:px-4 py-1 leading-7">
              {wordData.map((data, wordIndex) => (
                <div key={wordIndex} className="mb-3">
                  {data.partOfSpeech !== 'n/a' && (
                    <p className="text-blue-900 font-bold -ml-2">{data.partOfSpeech}</p>
                  )}
                  <div>
                    {data.meanings.map((meaning, index) => (
                      <div key={index} className="mb-1">
                        <p className="text-sm font-medium">
                          {index + 1}. {meaning.definition}
                        </p>
                        <p className="italic text-sm text-slate-500">{meaning.example}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className={`flex flex-row items-center justify-center gap-2`}>
            <button
              className={classNames(
                'bg-blue-600 active:bg-blue-700 border-blue-600 rounded-lg text-white',
                isFetching ? 'px-[8.5px] py-2' : 'p-2'
              )}
              onClick={onPlay}
              disabled={isFetching}
            >
              {isFetching ? <Spinner width="23" height="23" /> : <Play />}
            </button>
            <button
              className={classNames(
                'rounded-lg px-3 py-2 flex items-center gap-2 border border-blue-600',
                opened ? 'text-blue-800 bg-blue-50' : 'text-white bg-blue-600 active:bg-blue-700'
              )}
              disabled={isDefining}
              onClick={onDefine}
            >
              {isDefining ? <Spinner width="20" height="20" /> : <BookSearch />}
              {opened ? "Close" : "Define"}
            </button>
          </div>
        </div>
      </div>
      <div className="pt-4 lg:pt-6 flex flex-row justify-center items-center gap-4">
        <button onClick={onPrev} className="text-orange-500">
          <MdArrowCircleLeft size={32} />
        </button>
        <p>{currentIndex + 1} / {totalWords}</p>
        <button onClick={onNext} className="text-orange-500">
          <MdArrowCircleRight size={32} />
        </button>
      </div>
    </>
  )
}

export default Flashcard