import classNames from 'classnames'
import Tooltip from 'rc-tooltip'
import 'rc-tooltip/assets/bootstrap_white.css'
import { FC, useState } from 'react'
import { useAudio } from '../../hooks/useAudio'
import { useSettingStore } from '../../state/settingStore'
import { useAuthStore, useSectionsStore } from '../../state'
import { LanguageEnum } from '../../services/interface'
import TransitionEffect from '../../components/TransitionEffect'
import Button from '../../components/Button'
import { CircleCheck, Light, Play, Spinner } from '../../components/Icons'
import api from '../../services/restApi'

interface WordProps {
  index: number
  value: string
  hasTranslation?: boolean
  translation?: string
  audio?: string
  romanized_character?: string
  kanji_length?: number
  learned?: boolean
}

const Word: FC<WordProps> = ({
  value,
  learned,
  hasTranslation = false,
  translation = '',
  audio,
  romanized_character,
  kanji_length = 0
}) => {
  const [themeColor, showRomaji, japaneseNotation] = useSettingStore((state) => [
    state.themeColor,
    state.showRomaji,
    state.japaneseNotation
  ])
  const [visible, setVisible] = useState(false)
  const [user] = useAuthStore((state) => [state.user])
  const [sectionId] = useSectionsStore((state) => [state.currentSection.id])
  const { playAudio } = useAudio()
  const [isProcessed, setProcessed] = useState(learned === true)
  const [learnProcessing, setLearnProcessing] = useState(false)
  const [learnedProcessing, setLearnedProcessing] = useState(false)

  const onClickLearned = () => {
    setLearnedProcessing(true)
    api.words.markLearned(sectionId, value).then(() => {
      setProcessed(true)
      setLearnedProcessing(false)
    })
  }

  const onClickLearn = () => {
    setLearnProcessing(true)
    api.words.markLearn(sectionId, value).then(() => {
      setProcessed(true)
      setLearnProcessing(false)
    })
  }

  const Word = (
    <div
      className={classNames(
        hasTranslation ? 'cursor-default' : '',
        visible ? '' : 'hover:text-slate-500',
        'relative text-xl tracking-tight font-medium whitespace-pre bot-word text-slate-800 dark:text-white'
      )}>
      {japaneseNotation === 'Furigana' &&
        user.target_language === LanguageEnum.Japanese &&
        romanized_character && (
          <div className="flex">
            {kanji_length !== 0 && (
              <div>
                <h3 className="text-xs text-center">{romanized_character}</h3>
                <h3
                  className={classNames('tracking-widest text-center text-xl font-japanese')}
                  dangerouslySetInnerHTML={{ __html: value.slice(0, kanji_length) }}
                />
              </div>
            )}
            {kanji_length !== value.length && (
              <div>
                <h3 className="text-xs">&nbsp;</h3>
                <h3
                  className={classNames('tracking-widest text-xl font-japanese')}
                  dangerouslySetInnerHTML={{ __html: value.slice(kanji_length, value.length) }}
                />
              </div>
            )}
          </div>
        )}
      {japaneseNotation === 'Romaji' &&
        user.target_language === LanguageEnum.Japanese &&
        romanized_character && (
          <div className="mr-1">
            <h3 className="text-xs text-center">{romanized_character}</h3>
            <div
              className={classNames('text-center text-xl tracking-widest font-japanese')}
              dangerouslySetInnerHTML={{ __html: value }}
            />
          </div>
        )}
      {user.target_language === LanguageEnum.Chinese && romanized_character && (
        <div className="">
          <h3 className="text-xs text-center">{romanized_character}</h3>
          <h3
            className={classNames('text-center text-xl tracking-widest font-chinese')}
            dangerouslySetInnerHTML={{ __html: value }}
          />
        </div>
      )}
      {!romanized_character && (
        <div>
          {(user.target_language === LanguageEnum.Japanese ||
            user.target_language === LanguageEnum.Chinese) &&
            showRomaji && <h3 className="text-xs">&nbsp;</h3>}
          <div
            className={classNames(
              user.target_language === LanguageEnum.Japanese ||
                user.target_language === LanguageEnum.Chinese
                ? 'text-xl tracking-tight'
                : 'text-lg tracking-tight',
              user.target_language === LanguageEnum.Japanese ? 'font-japanese' : '',
              user.target_language === LanguageEnum.Chinese ? 'font-chinese' : ''
            )}
            dangerouslySetInnerHTML={{ __html: value }}
          />
        </div>
      )}
    </div>
  )

  return translation ? (
    <TransitionEffect effect="fadeIn" duration={3} className="relative">
      <Tooltip
        placement="bottom"
        trigger="click"
        id={Math.random().toString()}
        overlayClassName="opaque"
        overlayStyle={{
          borderRadius: 16,
          overflow: 'hidden'
        }}
        showArrow={false}
        onVisibleChange={(_visible) => {
          if (_visible) playAudio(audio)
          setVisible(_visible)
        }}
        overlayInnerStyle={{
          padding: 0,
          border: 0,
          borderRadius: 16
        }}
        overlay={
          <div className="bg-slate-200 p-2">
            <div className="flex items-center justify-between gap-1">
              <div
                className={classNames(
                  'font-bold px-1 py-2 text-lg',
                  themeColor === 'orange' ? 'text-orange-900' : '',
                  themeColor === 'pink' ? 'text-pink-900' : '',
                  themeColor === 'blue' ? 'text-blue-900' : '',
                  user.target_language === LanguageEnum.Japanese ? 'font-japanese' : '',
                  user.target_language === LanguageEnum.Chinese ? 'font-chinese' : ''
                )}>
                {value}
              </div>
            </div>
            <div
              className={classNames(
                'font-bold px-1 py-2',
                themeColor === 'orange' ? 'text-orange-900' : '',
                themeColor === 'pink' ? 'text-pink-900' : '',
                themeColor === 'blue' ? 'text-blue-900' : ''
              )}>
              {translation}
            </div>
            {!isProcessed && (
              <div className="flex gap-1 mt-1">
                <button
                  onClick={onClickLearned}
                  disabled={learnedProcessing}
                  className="text-xs px-3 py-2 bg-white border border-blue-300 text-blue-800 rounded-lg font-semibold flex gap-1">
                  {learnedProcessing && <Spinner width="15" height="15" />} Add to Word Bank
                </button>
                <button
                  className="text-xs px-3 py-2 bg-white border border-blue-300 text-blue-800 rounded-lg font-semibold flex gap-1"
                  onClick={onClickLearn}
                  disabled={learnedProcessing}>
                  {learnProcessing && <Spinner width="15" height="15" />} Mark as Learned
                </button>
              </div>
            )}
          </div>
        }>
        {Word}
      </Tooltip>
    </TransitionEffect>
  ) : (
    <TransitionEffect effect="fadeIn" duration={3} className="relative">
      {Word}
    </TransitionEffect>
  )
}

export default Word
