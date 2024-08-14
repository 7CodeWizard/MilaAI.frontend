import { FC } from 'react'
import { classNames } from '../../utils'

interface SlickProgressBarProps {
  length: number
  active: number
}

interface ProgressItemProps {
  active: boolean
}

const ProgressItem: FC<ProgressItemProps> = ({ active }) => (
  <div
    className={classNames(
      'flex-1 h-[6px] rounded-full',
      active ? 'bg-blue-700 dark:bg-slate-700' : 'bg-blue-300 dark:bg-slate-400'
    )}
  />
)

const SlickProgressBar: FC<SlickProgressBarProps> = ({ length, active }) => (
  <div className="flex gap-2">
    {Array(length)
      .fill(0)
      .map((_, index) => (
        <ProgressItem key={index} active={index === active} />
      ))}
  </div>
)

export default SlickProgressBar
