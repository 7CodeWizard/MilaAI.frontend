import { FC, useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'

import api from '../../services/restApi'

import { MdSend, MdSettingsVoice } from 'react-icons/md'
import { BsTranslate } from "react-icons/bs";

import Listening from '../../components/Listening/Listening'
import { IconButton } from '../../elements/Button'

import { useChatStore, useSectionsStore } from '../../state'
import { AskMode, ChatThreadProps, StudyMode } from '../../services/interface'
import { useParams } from 'react-router'
import { useSettingStore } from '../../state/settingStore'
import { useThreadStore } from '../../state/threadStore'
import { Cup, Light } from '../../components/Icons'
import { useAudioStore } from '../../state/audioStore'
import Button from '../../components/Button'
import { classNames } from '../../utils'
import { useTooltipStore } from '../../state/tooltipStore'
import { DAILY_LIMIT_REACH } from '../../utils/constant'
import { Modal } from '../../components/Modal';
import Translator from '../../components/Translator';

interface AskFormProps {
  onEndConversation: () => void
}

const AskForm: FC<AskFormProps> = ({ onEndConversation }) => {
  const { id, topic } = useParams()

  let [
    askMode,
    setAskMode,
    hintApplied,
    setHintApplied,
    difficulty,
    isConversationEnded,
    setConversationEnded,
    firstMessage,
    setFirstMessage,
    isConversationEnding
  ] = useChatStore((state) => [
    state.askMode,
    state.setAskMode,
    state.hintApplied,
    state.setHintApplied,
    state.studyMode,
    state.isConversationEnded,
    state.setConversationEnded,
    state.firstMessage,
    state.setFirstMessage,
    state.isConversationEnding
  ])
  const [setHasRecogError] = useAudioStore((state) => [state.setHasRecogError])
  let [
    setAIThinking,
    isAIThinking,
    setChatThreads,
    setIsAudioProcessing,
    chatThreads,
    hint,
    setHint,
    isDailyLimitReached,
    setDailyLimitReached
  ] = useThreadStore((state) => [
    state.setAIThinking,
    state.isAIThinking,
    state.setChatThreads,
    state.setIsAudioProcessing,
    state.chatThreads,
    state.hint,
    state.setHint,
    state.isDailyLimitReached,
    state.setDailyLimitReached
  ])
  const [setTooltip, textModeTried] = useTooltipStore((state) => [
    state.setTooltip,
    state.textModeTried
  ])
  const [themeColor, audioOnly] = useSettingStore((state) => [state.themeColor, state.audioOnly])
  const [setMessageCount] = useSectionsStore((state) => [state.setMessageCount])
  const [isHintFetching, setHintFetching] = useState(false)
  const [isOpeningTranslator, setOpeningTranslator] = useState(false)
  const [isTranslatorOpen, setIsTranslatorOpen] = useState(false)

  useEffect(() => {
    setHint(null)

    return () => {
      setIsAudioProcessing(false)
      setHasRecogError(false)
      setHint(null)
    }
  }, [])

  useEffect(() => {
    setFocus('msg')
  }, [chatThreads])

  useEffect(() => {
    if (hintApplied) {
      setAskMode(AskMode.Text)
      setValue('msg', hint.simulated_response)
      setHint(null)

      setHintApplied(false)
    }
  }, [hintApplied])

  const { register, handleSubmit, setValue, setFocus } = useForm()

  const sendMsgHandler = async (data: string) => {
    const user_text = JSON.parse(data).msg
    if (user_text.length === 0) return

    setHasRecogError(false)

    if (!firstMessage) setFirstMessage(user_text)

    setValue('msg', '')
    setHint(null)

    const formData = new FormData()
    formData.append('text', user_text || '')
    formData.append('section_model', JSON.stringify({ difficulty_level: difficulty }))

    const newChatThreads: ChatThreadProps[] = [
      ...chatThreads,
      {
        type: 'user',
        message: user_text,
        message_id: null,
        grammar: {
          corrected_text: {
            feedback: '',
            score: 0
          }
        },
        lastAIMessage: chatThreads[chatThreads.length - 1].message
      }
    ]
    setChatThreads(newChatThreads)
    setAIThinking(true)

    try {
      let response;

      if (topic) {
        response = await api.chat.message(formData, topic)
      }
      else {
        response = await api.chat.message(formData, id)
      }

      setMessageCount(response.message_count)

      if (response.end_conversation) {
        setConversationEnded(true)
      }

      setChatThreads([
        ...chatThreads,
        {
          type: 'user',
          message: user_text,
          message_id: response.user_message_id,
          grammar: {
            corrected_text: {
              feedback: '',
              score: 0
            }
          },
          lastAIMessage: chatThreads[chatThreads.length - 1].message
        },
        {
          type: 'bot',
          message_id: response.response_message_id,
          message: response.text_response,
          audio_response: response.audio_response,
          slow_response: response.slow_response,
          isLast: response.end_conversation,
          tokenization_response: response.tokenization_response
        }
      ])

      if (!firstMessage && !textModeTried) setTooltip('USER_THREAD')

      setAIThinking(false)
    } catch (error) {
      if (error.response.data && error.response.data.message === DAILY_LIMIT_REACH) {
        setAIThinking(false)
        setDailyLimitReached(true)
        return
      }
      setTimeout(() => {
        setChatThreads([
          ...newChatThreads,
          {
            type: 'bot',
            message_id: null,
            message: "I don't understand"
          }
        ])
      }, 1500)
    }
  }

  const fetchHint = () => {
    if (isHintFetching) return

    setHintFetching(true)

    api.feedback
      .hint(id)
      .then((hintResponse) => {
        setHint(hintResponse)
        setHintFetching(false)
      })
      .catch(() => {
        setHintFetching(false)
      })
  }

  const openTranslator = () => {
    setIsTranslatorOpen(!isTranslatorOpen);
  }

  return (
    <div className="px-3 pb-1">
      <Modal isOpen={isTranslatorOpen} onClose={() => { setIsTranslatorOpen(false) }} size="w-full">
        <Translator />
      </Modal>
      <form
        className="flex flex-col w-full relative"
        onSubmit={handleSubmit((data) => {
          sendMsgHandler(JSON.stringify(data))
        })}>
        <div className="flex w-full gap-3 py-1">
          {(askMode === AskMode.Audio || audioOnly) && (
            <div className="w-full flex justify-center items-center relative px-4 max-md:px-0 shadow-sm rounded-2xl py-1">
              <Listening />
            </div>
          )}
          {askMode === AskMode.Text && !audioOnly && (
            <div className="w-full flex gap-2">
              <div className="flex-1 flex shadow-sm p-2 rounded-2xl gap-2">
                <div className="flex-1 w-full">
                  <input
                    type="text"
                    className="border border-slate-200 rounded-2xl text-base h-12 font-medium outline-none w-full p-4 dark:bg-transparent dark:border-[#475569] dark:text-white"
                    name="msg"
                    placeholder="Type something ..."
                    disabled={isAIThinking || isConversationEnding || isDailyLimitReached}
                    {...register('msg')}
                  />
                </div>
                <div className="flex">
                  <IconButton
                    icon={
                      <MdSend
                        className={classNames(
                          'w-6 h-6',
                          themeColor === 'blue' ? 'text-blue-900' : '',
                          themeColor === 'orange' ? 'text-orange-900' : '',
                          themeColor === 'pink' ? 'text-pink-900' : ''
                        )}
                      />
                    }
                    color="white"
                    bgColor={themeColor}
                    clickHandler={handleSubmit((data) => {
                      sendMsgHandler(JSON.stringify(data))
                    })}
                    type="submit"
                    loading={isAIThinking}
                    disabled={isAIThinking || isConversationEnding}
                  />
                </div>
                <div className="flex">
                  <IconButton
                    icon={
                      <MdSettingsVoice
                        className={classNames(
                          'w-6 h-6',
                          themeColor === 'blue' ? 'text-blue-900' : '',
                          themeColor === 'orange' ? 'text-orange-900' : '',
                          themeColor === 'pink' ? 'text-pink-900' : ''
                        )}
                      />
                    }
                    color="white"
                    bgColor={themeColor}
                    clickHandler={() => {
                      setAskMode(AskMode.Audio)
                    }}
                  />
                </div>
                <div className="flex">
                  <IconButton
                    className="hint-button"
                    icon={
                      <span
                        className={classNames(
                          themeColor === 'blue' ? 'text-blue-900' : '',
                          themeColor === 'orange' ? 'text-orange-900' : '',
                          themeColor === 'pink' ? 'text-pink-900' : ''
                        )}>
                        <Light />
                      </span>
                    }
                    color="white"
                    bgColor={themeColor}
                    clickHandler={fetchHint}
                    type="button"
                    loading={isHintFetching}
                    disabled={
                      hint !== null ||
                      difficulty !== StudyMode.CONVERSATION_EASY ||
                      isHintFetching ||
                      isConversationEnding
                    }
                  />
                </div>
                <div className="flex lg:hidden">
                  <IconButton
                    icon={
                      <BsTranslate
                        className={classNames(
                          'w-6 h-6',
                          themeColor === 'blue' ? 'text-blue-900' : '',
                          themeColor === 'orange' ? 'text-orange-900' : '',
                          themeColor === 'pink' ? 'text-pink-900' : ''
                        )}
                      />
                    }
                    color="white"
                    bgColor={themeColor}
                    clickHandler={openTranslator}
                    type="button"
                    loading={isOpeningTranslator}
                  />
                </div>
              </div>
            </div>
          )}
          <div
            className={classNames(
              'shadow-sm p-2 rounded-2xl',
              isConversationEnded ? 'block' : 'hidden'
            )}>
            <Button
              color="emerald"
              text="End"
              icon={<Cup />}
              iconPosition="end"
              className="h-full end-button"
              disabled={!isConversationEnded || isConversationEnding}
              onClick={onEndConversation}
              type="button"
            />
          </div>
        </div>
      </form>
    </div>
  )
}

export default AskForm
