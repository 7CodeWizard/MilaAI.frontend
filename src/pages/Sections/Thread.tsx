import { useState, useEffect, FC, useRef } from 'react'
import classNames from 'classnames'
import { useParams } from 'react-router'
import WaveSurferPlayer from './WaveSurferPlayer'

import api from '../../services/restApi'

import {
  ChatThreadProps,
  StudyMode,
  WordInfo,
  LanguageEnum,
  AskMode
} from '../../services/interface'
import PronunciationModal from './PronunciationModal'
import BotWord from './BotWord'
import { useAuthStore, useChatStore, useSectionsStore } from '../../state'
import { LangConvert, MilaHint, Play, PlaySlow, Retry, Spinner } from '../../components/Icons'
import './index.css'
import UserWord from './UserWord'
import WordPractice from './WordPractice'
import TransitionEffect from '../../components/TransitionEffect'
import { useAudio } from '../../hooks/useAudio'
import { useSettingStore } from '../../state/settingStore'
import { getSplittedWords } from '../../utils'
import { useThreadStore } from '../../state/threadStore'
import { Token } from '../../interfaces'
import { useTooltipStore } from '../../state/tooltipStore'
import useMembership from '../../hooks/useMembership'

enum FeedbackStatus {
  INITIAL = 0,
  FETCHING = 1,
  FETCHED = 2
}

enum ThreadType {
  BOT = 'bot',
  USER = 'user'
}

interface ThreadProps {
  thread: ChatThreadProps
  isFirst: boolean
  isLast: boolean
}

const Thread: FC<ThreadProps> = ({ thread, isFirst, isLast }) => {
  const { showMembershipError } = useMembership()
  const [translation, setTranslation] = useState<string>(
    'Message in your native language is loading...'
  )

  const [studyMode, isStarted, setConversationEnded, askMode] = useChatStore((state) => [
    state.studyMode,
    state.isStarted,
    state.setConversationEnded,
    state.askMode
  ])
  const [setMessageCount] = useSectionsStore((state) => [state.setMessageCount])
  const [chatThreads, setChatThreads, setAIThinking, isAIThinking, setHint] = useThreadStore(
    (state) => [
      state.chatThreads,
      state.setChatThreads,
      state.setAIThinking,
      state.isAIThinking,
      state.setHint
    ]
  )
  const [translating, setTranslating] = useState(false)

  const [themeColor, showRomaji, autoRecord, japaneseNotation, chineseNotation] = useSettingStore(
    (state) => [
      state.themeColor,
      state.showRomaji,
      state.autoRecord,
      state.japaneseNotation,
      state.chineseNotation
    ]
  )
  const [setRetry] = useChatStore((state) => [state.setRetry])
  const { id, topic } = useParams()

  const [user] = useAuthStore((state) => [state.user])
  const [isWordPracticeOpen, setWordPracticeOpen] = useState(false)
  const [isWordPracticeLoading, setWordPracticeLoading] = useState(false)
  let [isOpenPronunciation, setIsOpenPronunciation] = useState(false)
  const [feedbackString, setFeedbackString] = useState('')
  const [userWord, setUserWord] = useState<string>()
  const [userWordInfo, setUserWordInfo] = useState<WordInfo>()
  const [aiWordPronunciation, setAIWordPronunciation] = useState('')
  const [pronunciationMethod, setPronunciationMethod] = useState('')
  const [isTranslateShown, setTranslateShown] = useState(false)
  const [isFeedbackShown, setFeedbackShown] = useState(false)
  const [retrying, setRetrying] = useState(false)
  const { playAudio, stopAudio } = useAudio()
  const [isTranslated, setTranslated] = useState(false)
  const [slowAudio, setSlowAudio] = useState('')
  const [isSlowAudioFetching, setSlowAudioFetching] = useState(false)
  const [feedbackStatus, setFeedbackStatus] = useState<FeedbackStatus>(FeedbackStatus.INITIAL)
  const [tokens, setTokens] = useState<Token[]>([])
  const [tooltip, setTooltip] = useTooltipStore((state) => [state.tooltip, state.setTooltip])
  const messageContainer = useRef<HTMLDivElement>()

  const message = thread?.message || null
  const threadAudio = thread?.audio_response || null

  const userWordsMap = thread?.words
  const userWords = getSplittedWords(message, userWordsMap || {})

  const handleAudioPlayback = (audioSource: string, first?: boolean) => {
    if (!isStarted) return
    playAudio(audioSource, () => {
      if (thread.isLast) setConversationEnded(true)
      else if (thread.type === ThreadType.BOT && askMode === AskMode.Audio && first && autoRecord) {
        setRetry(true)
      }
    })
  }

  const toggleWordPracticeOpen = () => {
    if (isWordPracticeOpen) {
      setUserWordInfo(null)
    }
    setWordPracticeOpen(!isWordPracticeOpen)
  }

  const onClickPlaySlow = () => {
    if (!slowAudio) {
      setSlowAudioFetching(true)
      api.chat
        .getSlowAudio(id, thread.message)
        .then((audio) => {
          setSlowAudio(audio)
          handleAudioPlayback(audio)
          setSlowAudioFetching(false)
        })
        .catch(() => {
          setSlowAudioFetching(false)
        })
      return
    }

    handleAudioPlayback(slowAudio)
  }

  const onRetry = () => {
    if (isAIThinking) return

    setRetrying(true)
    api.chat
      .retry(id, studyMode)
      .then((res) => {
        setChatThreads(chatThreads.slice(0, chatThreads.length - 2))
        setHint(null)
        setRetrying(false)
        setConversationEnded(res.end_conversation)
        setMessageCount(res.message_count)
      })
      .catch(() => {
        alert('eror')
        setRetrying(false)
      })
  }

  const translate = async () => {
    if (isTranslated) {
      setTranslateShown(!isTranslateShown)
      return
    }

    setTranslating(true)
    const responseTranslation = await api.feedback.translate(
      topic || id,
      studyMode,
      message,
      thread.message_id
    )
    setTranslation(responseTranslation.translated_text)
    setTranslateShown(true)
    setTranslated(true)
    setTranslating(false)
  }

  const contextTranslate = async () => {
    if (message) {
      try {
        if (isFirst && tooltip === '') {
          setTooltip('THREAD_CONTROLS')
        }
      } catch (error) { }
    }
  }

  const fetchGrammar = async () => {
    if (feedbackStatus === FeedbackStatus.FETCHED) {
      setFeedbackShown(!isFeedbackShown)
      return
    }
    try {
      setFeedbackStatus(FeedbackStatus.FETCHING)

      try {
        const responseGrammar = await api.feedback.grammar(topic || id, studyMode, {
          message_id: thread.message_id
            ? thread.message_id
            : chatThreads[chatThreads.length - 2].message_id,
          text: message,
          ai_text: thread.lastAIMessage
        })

        const { feedback } = responseGrammar.corrected_text
        setFeedbackString(feedback)
      } catch (e) { }

      setFeedbackShown(true)
      setFeedbackStatus(FeedbackStatus.FETCHED)
    } catch (error) { }
  }

  useEffect(() => {
    if (threadAudio) handleAudioPlayback(threadAudio, true)
    if (user.stripe_price_id) contextTranslate()

    return () => {
      stopAudio()
      setAIThinking(false)
    }
  }, [])

  useEffect(() => {
    if (thread.tokenization_response) setTokens(thread.tokenization_response)
  }, [message])

  return (
    <TransitionEffect
      effect="fadeIn"
      duration={2}
      className={classNames('flex', thread.type === ThreadType.BOT ? '' : 'justify-end')}>
      <div className={classNames('flex flex-col max-w-xl', feedbackString ? 'mb-7' : 'mb-3')}>
        <div
          className={classNames(
            'flex gap-4 justify-end flex-col',
            thread.type === ThreadType.USER ? 'flex-row-reverse' : ''
          )}>
          <div
            className={classNames(
              'flex flex-col gap-2 p-4 thread min-w-[330px] relative transition-all duration-1000',
              thread.type !== ThreadType.USER ? 'bg-slate-100 thread-bot dark:bg-slate-700' : '',
              thread.type === ThreadType.USER && themeColor === 'blue' ? 'bg-blue-25' : '',
              thread.type === ThreadType.USER && themeColor === 'orange' ? 'bg-orange-50' : '',
              thread.type === ThreadType.USER && themeColor === 'pink' ? 'bg-pink-50' : ''
            )}
            ref={messageContainer}>
            {thread.type === ThreadType.BOT &&
              (tokens && tokens.length > 0) &&
              studyMode !== StudyMode.CONVERSATION_HARD && (
                <>
                  <div
                    className={classNames(
                      'flex flex-wrap',
                      showRomaji &&
                        (user.target_language === LanguageEnum.Japanese ||
                          user.target_language === LanguageEnum.Chinese)
                        ? 'gap-y-3'
                        : ''
                    )}>
                    {tokens && tokens.map(
                      (
                        {
                          token,
                          translation,
                          furigana,
                          audio,
                          romanization,
                          kanji_only_length,
                          zhuyin,
                          learned
                        },
                        index
                      ) => (
                        <BotWord
                          index={index}
                          key={index}
                          value={token.replace(/\s/g, '&nbsp;')}
                          hasTranslation={!!translation}
                          translation={translation}
                          audio={audio}
                          learned={learned}
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
                          kanji_length={kanji_only_length || 0}
                        />
                      )
                    )}
                  </div>
                </>
              )}

            {studyMode === StudyMode.CONVERSATION_HARD && thread.type === ThreadType.BOT && (
              <WaveSurferPlayer
                height={80}
                barGap={1}
                barRadius={5}
                waveColor="#5DE2A2"
                progressColor="#5DE2A2"
                url={thread.audio_response}
                fillParent
                barWidth={5}
                cursorColor="transparent"
                cursorWidth={2}
              />
            )}
            {((thread.type === ThreadType.BOT &&
              (tokens && tokens.length === 0) &&
              studyMode !== StudyMode.CONVERSATION_HARD) ||
              (thread.type !== ThreadType.BOT && !thread.words)) && (
                <div
                  className={classNames(
                    'relative tracking-tight font-medium text-lg',
                    user.target_language === LanguageEnum.Chinese ? 'font-chinese text-xl' : '',
                    user.target_language === LanguageEnum.Japanese ? 'font-japanese text-xl' : '',
                    thread.type === ThreadType.BOT ? 'text-slate-800 dark:text-white' : '',
                    thread.type === ThreadType.USER && themeColor === 'blue' ? 'text-blue-700' : '',
                    thread.type === ThreadType.USER && themeColor === 'orange'
                      ? 'text-orange-700'
                      : '',
                    thread.type === ThreadType.USER && themeColor === 'pink' ? 'text-pink-700' : ''
                  )}>
                  {thread.message}
                </div>
              )}

            {thread.type === ThreadType.USER && userWordsMap && (
              <div>
                {userWords.map((word, index) => (
                  <UserWord
                    key={index}
                    value={word}
                    info={userWordsMap[word]}
                    onClick={() => {
                      if (!user.stripe_price_id) {
                        showMembershipError()
                        return
                      }
                      toggleWordPracticeOpen()
                      setWordPracticeLoading(true)
                      setUserWordInfo(userWordsMap[word])
                      api.feedback.wordPronunciation(word).then((response) => {
                        setAIWordPronunciation(Object.values(response.audio_response_path)[0])
                        setPronunciationMethod(response.feedback)
                        setUserWord(word)
                        setWordPracticeLoading(false)
                      })
                    }}
                  />
                ))}
              </div>
            )}

            <div
              className={classNames('flex', thread.type !== ThreadType.USER ? '' : 'justify-end')}>
              <div className="flex gap-1 flex-wrap items-center w-full">
                <div
                  className={classNames(
                    thread.type === ThreadType.USER ? 'ml-auto' : '',
                    'flex gap-1'
                  )}>
                  {thread.audioUser && (
                    <>
                      <button
                        className={classNames(
                          `bg-${themeColor}-50 active:bg-${themeColor}-200 user-audio-play`,
                          'rounded-lg p-2 shadow-sm ml-auto',
                          themeColor === 'orange' ? 'border-orange-100 text-orange-900' : '',
                          themeColor === 'blue' ? 'border-blue-100 text-blue-900' : '',
                          themeColor === 'pink' ? 'border-pink-100 text-pink-900' : ''
                        )}
                        onClick={() => {
                          playAudio(thread.audioUser.src)
                        }}>
                        <Play />
                      </button>
                    </>
                  )}
                  {thread.type === ThreadType.USER && (
                    <button
                      className={classNames(
                        `bg-${themeColor}-50 active:bg-${themeColor}-200 user-feedback`,
                        'rounded-lg shadow-sm',
                        feedbackStatus === FeedbackStatus.FETCHING ? 'p-[7px]' : 'p-2',

                        isFeedbackShown && themeColor === 'blue'
                          ? 'border-blue-100 bg-blue-500 text-white'
                          : '',
                        !isFeedbackShown && themeColor === 'blue'
                          ? 'border-blue-100 text-blue-900'
                          : '',
                        isFeedbackShown && themeColor === 'orange'
                          ? 'border-orange-100 bg-orange-500 text-white'
                          : '',
                        !isFeedbackShown && themeColor === 'orange'
                          ? 'border-orange-100 text-orange-900'
                          : '',
                        isFeedbackShown && themeColor === 'pink'
                          ? 'border-pink-100 bg-pink-500 text-white'
                          : '',
                        !isFeedbackShown && themeColor === 'pink'
                          ? 'border-pink-100 text-pink-900'
                          : ''
                      )}
                      disabled={feedbackStatus === FeedbackStatus.FETCHING}
                      onClick={() => {
                        if (user.stripe_price_id === null) {
                          showMembershipError()
                          return
                        }
                        fetchGrammar()
                      }}>
                      {feedbackStatus === FeedbackStatus.FETCHING ? (
                        <Spinner width="24" height="24" />
                      ) : (
                        <MilaHint />
                      )}
                    </button>
                  )}
                  {thread.type === ThreadType.USER && isLast && (
                    <button
                      className={classNames(
                        'rounded-lg disabled:bg-slate-50 disabled:border-blue-300 user-redo shadow-sm',
                        `bg-${themeColor}-50 active:bg-${themeColor}-200 text-${themeColor}-900`,
                        themeColor === 'orange'
                          ? 'border-orange-100 disabled:bg-slate-50 disabled:border-slate-50'
                          : '',
                        themeColor === 'blue'
                          ? 'border-blue-100 disabled:bg-slate-50 disabled:border-slate-50'
                          : '',
                        themeColor === 'pink'
                          ? 'border-pink-100 disabled:bg-slate-50 disabled:border-slate-50'
                          : '',
                        retrying ? 'p-[7px]' : 'p-2'
                      )}
                      disabled={isAIThinking || retrying}
                      onClick={onRetry}>
                      {retrying ? <Spinner width="24" height="24" /> : <Retry />}
                    </button>
                  )}

                  {thread.audio_response && (
                    <>
                      <button
                        className={classNames(
                          'rounded-lg p-2 shadow-sm play-button dark:bg-slate-800 dark:active:bg-slate-400 dark:text-white',
                          `bg-${themeColor}-50 active:bg-${themeColor}-200`,
                          themeColor === 'orange' ? 'border-orange-100 text-orange-900' : '',
                          themeColor === 'blue' ? 'border-blue-100 text-blue-900' : '',
                          themeColor === 'pink' ? 'border-pink-100 text-pink-900' : ''
                        )}
                        onClick={() => handleAudioPlayback(thread.audio_response || '')}>
                        <Play />
                      </button>
                    </>
                  )}

                  <button
                    className={classNames(
                      'rounded-lg shadow-sm',
                      `bg-${themeColor}-50 active:bg-${themeColor}-200 play-slow-button`,
                      themeColor === 'orange' ? 'border-orange-100 text-orange-900' : '',
                      themeColor === 'blue' ? 'border-blue-100 text-blue-900' : '',
                      themeColor === 'pink' ? 'border-pink-100 text-pink-900' : '',
                      isSlowAudioFetching ? 'py-[7px] px-[10px]' : 'p-2',
                      thread.type === ThreadType.BOT
                        ? 'dark:bg-slate-800 dark:active:bg-slate-400 dark:text-white'
                        : ''
                    )}
                    onClick={onClickPlaySlow}
                    disabled={isSlowAudioFetching}>
                    {isSlowAudioFetching ? <Spinner /> : <PlaySlow />}
                  </button>

                  {thread.type === ThreadType.BOT && studyMode !== StudyMode.CONVERSATION_HARD && (
                    <button
                      className={classNames(
                        isTranslateShown && themeColor === 'blue' ? 'bg-blue-500 text-white' : '',
                        !isTranslateShown && themeColor === 'blue'
                          ? 'bg-blue-50 text-blue-900'
                          : '',
                        isTranslateShown && themeColor === 'orange'
                          ? 'bg-orange-500 text-white'
                          : '',
                        !isTranslateShown && themeColor === 'orange'
                          ? 'bg-orange-50 text-orange-900'
                          : '',
                        isTranslateShown && themeColor === 'pink' ? 'bg-pink-500 text-white' : '',
                        !isTranslateShown && themeColor === 'pink'
                          ? 'bg-pink-50 text-pink-900'
                          : '',
                        'rounded-lg shadow-sm translate-button dark:active:bg-slate-400 dark:text-white',
                        translating ? 'p-[7px]' : 'p-2',
                        isTranslateShown ? 'dark:bg-slate-400' : 'dark:bg-slate-800'
                      )}
                      disabled={translating}
                      onClick={() => {
                        translate()
                      }}>
                      {translating ? <Spinner width="24" height="24" /> : <LangConvert />}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
          <PronunciationModal
            isOpen={isOpenPronunciation}
            thread={thread}
            toggleModal={() => {
              setIsOpenPronunciation(!isOpenPronunciation)
            }}
          />

          {userWordInfo && (
            <WordPractice
              isOpen={isWordPracticeOpen}
              toggleOpen={toggleWordPracticeOpen}
              word={userWord}
              userAudio={thread.audioUser}
              aiAudio={aiWordPronunciation}
              info={userWordInfo}
              pronunciationMethod={pronunciationMethod}
              isLoading={isWordPracticeLoading}
            />
          )}
        </div>

        {studyMode !== StudyMode.CONVERSATION_HARD &&
          thread.type === ThreadType.BOT &&
          isTranslateShown &&
          translation.length > 0 && (
            <div className="-mt-6 pt-10 px-4 pb-4 rounded-br-2xl rounded-bl-2xl bg-slate-200 text-slate-800 dark:bg-slate-600 dark:text-white">
              {translation}
            </div>
          )}

        {thread.type === ThreadType.USER &&
          feedbackStatus === FeedbackStatus.FETCHED &&
          isFeedbackShown && (
            <div
              className={classNames(
                '-mt-6 pt-9 px-4 pb-4 rounded-br-2xl rounded-bl-2xl',
                themeColor === 'orange' ? 'bg-orange-200 text-orange-700' : '',
                themeColor === 'blue' ? 'bg-blue-200 text-blue-700' : '',
                themeColor === 'pink' ? 'bg-pink-200 text-pink-700' : ''
              )}>
              {feedbackString}
            </div>
          )}
      </div>
    </TransitionEffect>
  )
}

export default Thread
