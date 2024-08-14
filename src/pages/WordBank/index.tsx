import { FC, useEffect, useState } from 'react'
import api from '../../services/restApi'
import { WordBook } from '../../components/Icons'
import WordsLearnedChart from './WordsLearnedChart'
import SearchBar from './SearchBar'
import { LearnedWord } from '../../interfaces'
import { useTranslation } from 'react-i18next'
import Flashcard from './Flashcard'

const WordBank: FC = () => {
  const [words, setWords] = useState<LearnedWord[]>([])
  const [isLoading, setLoading] = useState(true)
  const { t } = useTranslation()
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    setLoading(true)
    api.chat.wordBank().then((resp) => {
      setWords(resp)
      setLoading(false)
    })
  }, [])

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + words.length) % words.length);
  };

  return (
    <div className="px-4 lg:py-14 flex justify-center max-lg:pt-4 max-lg:pb-20 max-lg:px-2">
      <div className="bg-white dark:bg-mila-gray-50 rounded-xl p-2 w-full lg:px-24">
        <div className="p-2 bg-white dark:bg-mila-gray-25 rounded-lg flex justify-between max-sm:flex-col">
          <div className="flex gap-4">
            <div className="min-w-[52px]">
              <WordBook />
            </div>
            <div className="flex flex-col">
              <h3 className="text-yellow-900 dark:text-white font-semibold text-2xl">
                {t('wordbank.title')}
              </h3>
              <h3 className="text-yellow-800 dark:text-white">{t('wordbank.description')}</h3>
            </div>
          </div>
        </div>
        <div className="lg:py-10 flex flex-col gap-2 mt-5">
          {isLoading ?
            <p className='h-screen flex flex-col items-center justify-center'>Loading...</p>
            :
            <div className="flex flex-col justify-center items-center gap-4">
              <Flashcard
                word={words[currentIndex].word}
                romanization={words[currentIndex].romanization}
                handlePrev={handlePrev}
                handleNext={handleNext}
                currentIndex={currentIndex}
                totalWords={words.length}
              />
            </div>
          }
        </div>
        <div className="mt-4 p-2 bg-white dark:bg-mila-gray-25 shadow-sm rounded-lg flex flex-col">
          <h3 className="text-3xl p-2 text-slate-700 dark:text-white font-semibold max-sm:text-2xl">
            {t('wordbank.progress')}
          </h3>
          <WordsLearnedChart />
        </div>
        {/* <SearchBar /> */}
      </div>
    </div>
  )
}

export default WordBank
