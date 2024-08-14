import { FC, useState } from 'react'
import { BookMark, BookSearch, Play, PlaySlow, Spinner } from '../../components/Icons'
import { classNames } from '../../utils'
import Skeleton from '../../elements/Skeleton'
import api from '../../services/restApi'
import { useAudio } from '../../hooks/useAudio'
import ProgressBar from '../../elements/ProgressBar'
import { WordDefinition, WordMeaning } from '../../interfaces'

interface WordProps {
  word: string
  romanization: string
  confidence: number
}

export const WordSkeleton: FC = () => (
  <div className="shadow-sm px-4 py-2 rounded-lg flex flex-col bg-slate-50 dark:bg-mila-gray-25">
    <div className="flex max-md:flex-col">
      <div className="flex w-[250px] gap-1 items-center">
        <div className="w-[200px] h-[18px] my-2">
          <Skeleton variant="rectangular" width="full" height="full" isLoading />
        </div>
      </div>
      <div className="flex-1 flex justify-end gap-2 max-sm:mt-2">
        <button
          className="bg-slate-300 border-blue-600 rounded-lg p-1.5 text-white dark:text-mila-gray-50"
          disabled
        >
          <Play />
        </button>
        {/* <button className='bg-slate-300 border-blue-600 rounded-lg p-1.5' disabled>
          <PlaySlow />
        </button> */}
        {/* <button
          className='border-slate-300 rounded-lg px-3 py-1.5 flex items-center gap-2 text-white bg-slate-300' disabled
        >
          <BookSearch />
          <h3 className='text-sm font-semibold'>Define</h3>
        </button>
        <button className='ml-auto text-slate-300'>
          <BookMark />
        </button> */}
      </div>
    </div>
  </div>
)

interface WordData {
  partOfSpeech: string
  meanings: WordMeaning[]
}

const Word: FC<WordProps> = ({ word, romanization, confidence }) => {
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
  }

  return (
    <div className="shadow-sm px-4 py-2 rounded-lg flex flex-col bg-slate-50 dark:bg-mila-gray-25">
      <div className="flex max-md:flex-col">
        <div className="flex w-[250px] gap-4 items-center">
          <h3 className="text-2xl font-semibold text-blue-900 dark:text-white">{word}</h3>
          <h3 className="flex-1 italic text-blue-900 dark:text-white">{romanization}</h3>
        </div>
        <div className="flex-1 flex gap-2 max-sm:mt-2">
          <div className="w-[100px] flex items-center pr-4">
            <ProgressBar completed={confidence * 100} />
          </div>
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
              'rounded-lg px-3 py-1.5 flex items-center gap-2 border border-blue-600',
              opened ? 'text-blue-800 bg-blue-50' : 'text-white bg-blue-600 active:bg-blue-700'
            )}
            disabled={isDefining}
            onClick={onDefine}
          >
            {isDefining ? <Spinner width="20" height="20" /> : <BookSearch />}
            <h3 className="text-sm font-semibold">Define</h3>
          </button>
          {/* <button className='ml-auto text-[#3B82F6]'>
            <BookMark />
          </button> */}
        </div>
      </div>
      {opened && (
        <div className="mt-2 text-blue-900 flex-1 px-4 py-1 leading-7">
          {wordData.map((data, wordIndex) => (
            <div key={wordIndex} className="mb-3">
              {data.partOfSpeech !== 'n/a' && (
                <h3 className="text-blue-900 font-bold -ml-2">{data.partOfSpeech}</h3>
              )}
              <div>
                {data.meanings.map((meaing, index) => (
                  <div key={index} className="mb-1">
                    <h3 className="text-sm font-medium">
                      {index + 1}. {meaing.definition}
                    </h3>
                    <h3 className="italic text-sm text-slate-500">{meaing.example}</h3>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Word
