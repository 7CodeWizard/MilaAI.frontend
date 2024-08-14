import { FC } from 'react'
import { ThinkingMila } from '../../components/Icons'
import './index.css'
import { useSettingStore } from '../../state/settingStore'
import { classNames } from '../../utils'

const AIThinking: FC = () => {
  const [themeColor] = useSettingStore((state) => [state.themeColor])

  return (
    <div className="mb-4">
      <div
        className={classNames(
          'thread thread-bot w-fit ml-14 p-6 dark:bg-slate-700',
          themeColor === 'blue' ? 'bg-[#F9F8FF]' : '',
          themeColor === 'orange' ? 'bg-orange-200' : '',
          themeColor === 'pink' ? 'bg-pink-200' : ''
        )}>
        <div className={classNames('chat-loader', themeColor)} />
      </div>
      <div>
        <ThinkingMila />
      </div>
    </div>
  )
}

export default AIThinking
