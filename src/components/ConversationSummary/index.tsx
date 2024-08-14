import { FC, useState } from 'react'
import { useNavigate } from 'react-router'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import SlickProgressBar from './SlickProgressBar'
import './index.css'
import { ArrowLeft, ArrowRight, ConversationSummaryMedal, SummaryBack, SummaryLike } from '../Icons'
import OverallPerformance from './OverallPerformance'
import { classNames } from '../../utils'
import { appLinks } from '../../utils/constant'
import ExpUp from './ExpUp'
import PronunciationPractice from './PronunciationPractice'
import VocabularyMastery from './VocabularyMastery'
import Feedback from './Feedback'
import { useChatStore, useSectionsStore } from '../../state'
import StreakReview from './StreakReview'
import useMembership from '../../hooks/useMembership'

const ConversationSummary: FC = () => {
  const navigate = useNavigate()
  const [feedback, setFeedback] = useChatStore((state) => [state.feedback, state.setFeedback])
  const [currentSection] = useSectionsStore((state) => [state.currentSection])
  const [expPlayed, setExpPlayed] = useState(false)
  const { isFreeUser } = useMembership()
  const screenCount = feedback.streak ? (isFreeUser() ? 4 : 6) : isFreeUser() ? 3 : 5

  const settings = {
    dots: false,
    arrows: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: (
      <div>
        <button className="shadow-sm p-2 bg-blue-400 dark:bg-mila-gray-25 rounded-full text-[#EFF6FF]">
          <ArrowRight />
        </button>
      </div>
    ),
    prevArrow: (
      <div>
        <button className="shadow-sm p-2 bg-blue-400 dark:bg-mila-gray-25 rounded-full text-[#EFF6FF]">
          <ArrowLeft />
        </button>
      </div>
    )
  }
  const [active, setActive] = useState(0)

  return (
    <div
      className={classNames(
        'w-full h-full flex flex-col overflow-y-auto items-center max-md:px-4 max-md:pt-4 md:py-14'
      )}>
      <div className="p-2 bg-white dark:bg-mila-gray-25 shadow-sm rounded-lg flex justify-between w-[650px] mb-2 max-md:w-full">
        <div className="flex gap-4">
          <ConversationSummaryMedal />
          <div className="flex flex-col">
            <h3 className="text-blue-900 dark:text-white font-semibold text-2xl">
              Congratulations!
            </h3>
            <h3 className="text-blue-800 dark:text-white">Check out your stats.</h3>
          </div>
        </div>
      </div>

      <div className="w-[650px] shadow-sm p-2 rounded-lg max-md:w-full">
        <div>
          <SlickProgressBar length={screenCount} active={active} />
        </div>
        <div className="my-6">
          <Slider
            {...settings}
            afterChange={(index) => {
              setActive(index)

              if (feedback.streak && isFreeUser() && index === 1) {
                setExpPlayed(true)
              } else if (feedback.streak && !isFreeUser() && index === 2) {
                setExpPlayed(true)
              } else if (!feedback.streak && isFreeUser() && index === 0) {
                setExpPlayed(true)
              } else if (!feedback.streak && !isFreeUser() && index === 1) {
                setExpPlayed(true)
              }
            }}>
            {feedback.streak && (
              <div className="w-[500px]">
                <StreakReview />
              </div>
            )}
            {!isFreeUser() && (
              <div className="w-[500px]">
                <OverallPerformance />
              </div>
            )}
            <div>
              <ExpUp played={expPlayed} />
            </div>
            {!isFreeUser() && (
              <div>
                <PronunciationPractice />
              </div>
            )}
            <div>
              <VocabularyMastery />
            </div>
            <div>
              <Feedback />
            </div>
          </Slider>
        </div>
        <div className="flex gap-2 mt-3">
          <button
            className="flex flex-1 items-center justify-center gap-1 bg-blue-600 dark:bg-mila-gray-25 dark:active:bg-slate-500 py-2 font-semibold text-sm text-white rounded-lg active:bg-blue-700"
            onClick={() => {
              navigate(appLinks.sectionsMine)
              setFeedback(null)
            }}>
            <SummaryBack />
            Back To Chat List
          </button>
          {currentSection.source === 'community' && (
            <button className="flex flex-1 items-center justify-center gap-1 bg-blue-600 dark:bg-mila-gray-25 dark:active:bg-slate-500 py-2 font-semibold text-sm text-white rounded-lg active:bg-blue-700 disabled:bg-slate-400">
              <SummaryLike />
              Like
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default ConversationSummary
