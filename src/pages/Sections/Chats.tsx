import { FC, useCallback, useEffect, useState, useRef } from 'react'
import { animateScroll as scroll } from 'react-scroll'
import { useNavigate, useParams } from 'react-router'
import { MdClose } from 'react-icons/md'
import { useReward } from 'react-rewards'

import { useAuthStore, useChatStore, useGlobalStore, useSectionsStore } from '../../state'
import { Loader } from '../../components'
import api from '../../services/restApi'
import Thread from './Thread'
import AskForm from './AskForm'
import ProgressBar from '../../elements/ProgressBar'
import AIThinking from './AIThinking'
import TranslationLoader from './TranslationLoader'
import RecognitionError from './RecognitionError'
import { AskMode } from '../../services/interface'
import { ConversationHeader, RepliedMila } from '../../components/Icons'
import Recommendation from './Recommendation'
import './index.css'
import { Modal } from '../../components/Modal'
import Button from '../../components/Button'
import { useAudio } from '../../hooks/useAudio'
import { useSettingStore } from '../../state/settingStore'
import Translator from '../../components/Translator'
import { useThreadStore } from '../../state/threadStore'
import { useAudioStore } from '../../state/audioStore'
import ConversationSummary from '../../components/ConversationSummary'
import { appLinks } from '../../utils/constant'
import { useTooltipStore } from '../../state/tooltipStore'
import { useProfileStore } from '../../state/profileStore'

const Chats: FC = () => {
  const [
    feedback,
    setFeedback,
    askMode,
    setAskMode,
    setRetry,
    setHintApplied,
    difficulty,
    setStarted,
    setConversationEnded,
    setConversationEnding,
    setFirstMessage
  ] = useChatStore((state) => [
    state.feedback,
    state.setFeedback,
    state.askMode,
    state.setAskMode,
    state.setRetry,
    state.setHintApplied,
    state.studyMode,
    state.setStarted,
    state.setConversationEnded,
    state.setConversationEnding,
    state.setFirstMessage
  ])
  const [setShowTour] = useTooltipStore((state) => [state.setShowTour])
  const [user, setUser] = useAuthStore((state) => [state.user, state.setUser])
  const [hasRecogError, setHasRecogError] = useAudioStore((state) => [
    state.hasRecogError,
    state.setHasRecogError
  ])
  let [
    isAIThinking,
    setAIThinking,
    chatThreads,
    setChatThreads,
    hint,
    setHint,
    isAudioProcessing,
    setDailyLimitReached
  ] = useThreadStore((state) => [
    state.isAIThinking,
    state.setAIThinking,
    state.chatThreads,
    state.setChatThreads,
    state.hint,
    state.setHint,
    state.isAudioProcessing,
    state.setDailyLimitReached
  ])
  const [isMobile] = useGlobalStore((state) => [state.isMobile])
  const [setDailyStreak] = useProfileStore((state) => [state.setDailyStreak])
  const [themeColor] = useSettingStore((state) => [state.themeColor])
  const { playAudio } = useAudio()
  const { id, topic } = useParams()
  const [isLoading, setLoading] = useState(true)
  const navigate = useNavigate()
  const threadContainer = useRef<HTMLDivElement>()
  const { reward } = useReward('rewardId', 'confetti', {
    elementCount: 250,
    zIndex: 50,
    spread: 200,
    lifetime: 400
  })

  const [currentSection, messageCount, setMessageCount] = useSectionsStore((state) => [
    state.currentSection,
    state.messageCount,
    state.setMessageCount
  ])
  const { conversation_length } = currentSection!
  const [isDescriptionOpen, setDescriptionOpen] = useState(true)
  const [firstAudio, setFirstAudio] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;

        if (topic)
          response = await api.chat.intractivefirstChat({ topic })
        else if (id)
          response = await api.chat.firstChat({ difficulty_level: difficulty }, id)

        setMessageCount(response.message_count)
        setFirstAudio(response.audio_response)

        if (response.end_conversation) {
          setConversationEnded(true)
          setLoading(false)
        } else {
          setFeedback(null)
        }

        setLoading(false)
        setTimeout(() => {
          const newChatThreads = [
            {
              type: 'bot',
              message: response.text_response,
              audio_response: response.audio_response,
              slow_response: response.slow_response,
              message_id: response.response_message_id,
              tokenization_response: response.tokenization_response
            }
          ]

          setChatThreads(newChatThreads)
        }, 1500)
      } catch (e) {
        navigate(appLinks.sections)
      }
    }

    setFirstMessage('')
    setDailyLimitReached(false)
    fetchData()
    setConversationEnding(false)

    return () => {
      setChatThreads([])
      setStarted(false)
      setConversationEnded(false)
      setAIThinking(false)
      setConversationEnded(false)
      setHasRecogError(false)
      setFeedback(null)
      setConversationEnding(false)
    }
  }, [])

  const onCloseChat = useCallback(() => {
    setChatThreads([])
    navigate(-1)
    setFeedback(null)
  }, [])

  const startChat = () => {
    setDescriptionOpen(false)
    playAudio(firstAudio)
    setStarted(true)
  }

  const scrollToEnd = () => {
    if (!threadContainer.current) return
    threadContainer.current.scrollTop = threadContainer.current.scrollHeight
  }

  useEffect(() => {
    scroll.scrollToBottom()
    scrollToEnd()
  }, [chatThreads, hint, isAIThinking, isAudioProcessing])

  const onEndConversation = () => {
    reward()
    setShowTour(false)

    setConversationEnding(true)
    api.chat.feedback({ difficulty_level: difficulty }, topic || id).then((resp) => {
      if (resp.streak) setDailyStreak(resp.streak)
      setConversationEnding(false)
      setFeedback({
        ...resp,
        level_before: user.level,
        experience_before: user.experience
      })
      setUser({
        ...user,
        experience: resp.user_experience,
        next_level_exp_req: resp.next_level_exp_req
      })
    })
  }

  const Progress = (
    <div className="flex-1 flex items-center gap-2">
      <ProgressBar completed={(messageCount * 100) / conversation_length} />
      <button
        className="text-black hover:text-gray-400 active:text-black ask-mode"
        onClick={() => {
          if (askMode === AskMode.Text) setAskMode(AskMode.Audio)
          else setAskMode(AskMode.Text)
        }}></button>
      <button onClick={onCloseChat} className="text-black dark:text-white">
        <MdClose size={20} />
      </button>
    </div>
  )

  return isLoading ? (
    <Loader />
  ) : feedback ? (
    <ConversationSummary />
  ) : (
    <div className="w-full h-full p-5 flex gap-2 max-lg:flex-col max-sm:p-0 max-sm:gap-0 bg-white dark:bg-mila-gray-50">
      <div className="h-full max-lg:h-0 flex flex-col overflow-y-hidden bg-white dark:bg-mila-gray-25 rounded-2xl flex-1 chats-container relative">
        <div id="rewardId" className="absolute left-[50%] top-[50%]"></div>

        <div className="flex flex-col flex-1 h-0 max-md:pt-2">
          <div className="flex flex-col flex-1 h-0 rounded-tl-3xl rounded-tr-3xl px-3">
            <div className="flex flex-col shadow-sm rounded-2xl overflow-hidden gap-1 p-2">
              <div className="flex gap-4">
                <ConversationHeader />
                <div className="flex flex-col flex-1">
                  <h3 className="font-medium text-blue-800 text-xl dark:text-white">
                    {topic ? 'Interactive Lessons' : currentSection.title}
                  </h3>
                  {topic ? <p>{topic}</p> : currentSection.goal_user && <p>{currentSection.goal_user}</p>}
                  {isMobile && Progress}
                </div>
              </div>

              <div className="px-4 max-md:hidden">{Progress}</div>
            </div>

            <div
              className="my-2 flex-1 h-0 px-6 md:pt-6 max-sm:px-2 overflow-y-scroll scrollbar-hide scroll-smooth md:shadow-sm rounded-2xl chat-container"
              ref={threadContainer}>
              {chatThreads.map((thread, index) => (
                <Thread
                  thread={thread}
                  key={index}
                  isFirst={index === 0}
                  isLast={index === chatThreads.length - 1 || index === chatThreads.length - 2}
                />
              ))}

              {isAIThinking ? <AIThinking /> : <RepliedMila />}
              {isAudioProcessing && <TranslationLoader />}
              {hasRecogError && (
                <RecognitionError
                  onRetry={() => {
                    setAskMode(AskMode.Audio)
                    setRetry(true)
                  }}
                />
              )}

              {hint && (
                <Recommendation
                  hint={hint}
                  onClick={() => {
                    setHintApplied(true)
                  }}
                  onCancel={() => {
                    setHint(null)
                    setHintApplied(false)
                  }}
                />
              )}
            </div>
          </div>
        </div>
        <AskForm onEndConversation={onEndConversation} />
        <Modal isOpen={isDescriptionOpen} onClose={() => { }}>
          <div className="bg-white rounded-3xl p-8 flex items-center flex-col w-[300px] gap-4 dark:bg-slate-700">
            <h3 className="mt-2 text-xl font-bold text-gray-800 dark:text-white">
              {topic ? 'Interactive Lessons' : currentSection.title}
            </h3>
            <Button
              text="Start Chat"
              width="fit-parent"
              className="mt-2"
              onClick={startChat}
              color={themeColor}
            />
          </div>
        </Modal>
      </div>

      {/* Right panel */}
      <div className="lg:w-[320px] rounded-2xl h-fit max-lg:hidden dark:bg-mila-gray-25 p-1">
        <Translator />
      </div>
    </div>
  )
}

export default Chats
