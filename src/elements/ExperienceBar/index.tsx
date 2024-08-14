import { FC } from 'react'
import { classNames } from '../../utils'
import { useSettingStore } from '../../state/settingStore'

interface ExperienceBarProps {
  progress: number
}

const ExperienceBar: FC<ExperienceBarProps> = ({ progress }) => {
  const themeColor = useSettingStore((state) => state.themeColor)

  return (
    <div className="w-full h-[8px] rounded-full relative bg-slate-300 overflow-hidden">
      <div
        className={classNames(
          'absolute left-0 top-0 h-full rounded-full',
          themeColor === 'blue' ? 'bg-blue-500' : '',
          themeColor === 'orange' ? 'bg-orange-500' : '',
          themeColor === 'pink' ? 'bg-pink-500' : ''
        )}
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  )
}

export default ExperienceBar
