import { FC } from 'react'
import { useSettingStore } from '../../state/settingStore'
import { classNames } from '../../utils'

interface ProgressBarProps {
  completed: number
}

const ProgressBar: FC<ProgressBarProps> = ({ completed }) => {
  const [themeColor] = useSettingStore((state) => [state.themeColor])

  return (
    <div
      className={classNames(
        'h-[8px] w-full relative rounded-full overflow-hidden dark:bg-slate-500',
        themeColor === 'orange' ? 'bg-orange-100' : '',
        themeColor === 'blue' ? 'bg-indigo-100' : '',
        themeColor === 'pink' ? 'bg-pink-100' : ''
      )}>
      <div
        className={classNames(
          'absolute left-0 top-0 bottom-0 rounded-full transition-all duration-300 dark:bg-slate-700',
          themeColor === 'orange' ? 'bg-orange-500' : '',
          themeColor === 'blue' ? 'bg-indigo-500' : '',
          themeColor === 'pink' ? 'bg-pink-500' : ''
        )}
        style={{ width: `${completed}%` }}
      />
    </div>
  )
}

export default ProgressBar
