import { FC } from 'react'
import { Retry } from '../../components/Icons'
import { classNames } from '../../utils'
import { useSettingStore } from '../../state/settingStore'

interface RecognitionErrorProps {
  onRetry: () => void
}

const RecognitionError: FC<RecognitionErrorProps> = ({ onRetry }) => {
  const [themeColor] = useSettingStore((state) => [state.themeColor])

  return (
    <div className="mt-2 mb-4 flex justify-end">
      <div className="max-w-5xl flex flex-col gap-1 items-end">
        <div className="thread bg-gray-50 py-3 px-5">
          <h3 className="mb-2 font-medium text-red-400">
            I could not understand what you were trying to say
          </h3>
          <div className="flex">
            <button
              className={classNames(
                'rounded-lg p-1.5 disabled:bg-blue-300 disabled:border-blue-300 ml-auto',
                `bg-${themeColor}-500 active:bg-${themeColor}-700`,
                themeColor === 'orange'
                  ? 'border-orange-600 disabled:bg-orange-300 disabled:border-orange-300'
                  : '',
                themeColor === 'blue'
                  ? 'border-blue-600 disabled:bg-blue-300 disabled:border-blue-300'
                  : '',
                themeColor === 'pink'
                  ? 'border-pink-600 disabled:bg-pink-300 disabled:border-pink-300'
                  : ''
              )}
              onClick={onRetry}
            >
              <Retry />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RecognitionError
