import { FC } from 'react'
import { useSettingStore } from '../../state/settingStore'
import { classNames } from '../../utils'

const TranslationLoader: FC = () => {
  const [themeColor] = useSettingStore((state) => [state.themeColor])

  return (
    <div className="mb-4 flex justify-end">
      <div className="thread bg-gray-50 p-6">
        <div className={classNames('chat-loader', themeColor)} />
      </div>
    </div>
  )
}

export default TranslationLoader
