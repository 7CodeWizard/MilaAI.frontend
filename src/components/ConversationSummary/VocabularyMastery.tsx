import { FC } from 'react'
import { VocabularyBook } from '../Icons'
import Mila from '../../assets/images/mila/vocabulary.png'
import { useChatStore } from '../../state'

interface NewWordProps {
  word: string
}

const NewWord: FC<NewWordProps> = ({ word }) => (
  <div className="bg-blue-50 border border-blue-200 text-blue-800 w-fit px-2.5 py-1 rounded-full flex gap-2 items-center">
    <h3 className="font-medium text-blue-800">{word}</h3>
  </div>
)

const VocabularyMastery: FC = () => {
  const [feedback, setFeedback] = useChatStore((state) => [state.feedback, state.setFeedback])

  const tokens = Object.keys(feedback.token_counts)

  return (
    <div className="px-2 py-6">
      <div className="flex flex-col items-center">
        <VocabularyBook />
        <h3 className="mt-4 text-blue-900 dark:text-white text-lg font-medium">
          Vocabulary Mastery
        </h3>
        <h3 className="mt-2 text-blue-900 dark:text-white text-sm font-medium">
          You've used {tokens.length} new words during this conversation. Impressive!
        </h3>
      </div>
      <div className="mt-4 relative pt-4 flex flex-col items-center">
        <img src={Mila} className="absolute top-0 left-0" />
        <h3 className="text-center text-blue-600 dark:text-white font-semibold text-[74px]">
          {tokens.length}
        </h3>
        {/* <div className="mt-2 flex items-center">
          <TrendUp />
          <h3 className="ml-1 text-sm font-medium text-[#047857]">100%</h3>
          <h3 className="ml-2 text-[#475569] text-sm font-medium">vs last week</h3>
        </div> */}
      </div>
      <div className="mt-8 flex flex-col items-center gap-1 h-[180px] overflow-y-auto scrollbar-hide">
        {tokens.map((token, index) => (
          <NewWord word={token} key={index} />
        ))}
      </div>
    </div>
  )
}

export default VocabularyMastery
