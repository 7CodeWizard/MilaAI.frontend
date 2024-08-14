import { FC } from 'react'
import {
  CircularProgressbarWithChildren as CircularProgressbar,
  buildStyles
} from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import { classNames } from '../../utils'

export interface CircleProgressProps {
  text?: string
  percentage?: number
  size?: number
  className?: string
  themeColor?: 'blue' | 'orange' | 'pink' | 'emerald'
}

export const CircleProgressSkeleton: FC<CircleProgressProps> = ({
  text,
  size = 50,
  className = ''
}) => {
  return (
    <div style={{ width: size, height: size }}>
      <CircularProgressbar
        value={30}
        className="font-semibold"
        strokeWidth={13}
        styles={buildStyles({
          strokeLinecap: 'round',
          textColor: 'var(--color-white)',
          trailColor: 'var(--color-slate-200)',
          backgroundColor: 'var(--color-slate-200)',
          pathColor: 'var(--color-slate-400)'
        })}>
        <span className={`text-xs font-semibold ${className}`}>{text}</span>
      </CircularProgressbar>
    </div>
  )
}

const CircleProgress: FC<CircleProgressProps> = ({
  text,
  percentage,
  size = 50,
  className = '',
  themeColor = 'blue'
}) => {
  const percent = Math.max(0, Math.min(100, percentage))

  return (
    <div style={{ width: size, height: size }}>
      <CircularProgressbar
        value={percent}
        className="font-semibold"
        strokeWidth={13}
        styles={buildStyles({
          strokeLinecap: 'round',
          textColor: 'var(--color-white)',
          trailColor: classNames(
            themeColor === 'blue' ? 'var(--color-blue-200)' : '',
            themeColor === 'orange' ? 'var(--color-orange-200)' : '',
            themeColor === 'pink' ? 'var(--color-pink-200)' : '',
            themeColor === 'emerald' ? 'var(--color-emerald-200)' : ''
          ),
          backgroundColor: classNames(
            themeColor === 'blue' ? 'var(--color-blue-200)' : '',
            themeColor === 'orange' ? 'var(--color-orange-200)' : '',
            themeColor === 'pink' ? 'var(--color-pink-200)' : '',
            themeColor === 'emerald' ? 'var(--color-emerald-200)' : ''
          ),
          pathColor: classNames(
            themeColor === 'blue' ? 'var(--color-blue-900)' : '',
            themeColor === 'orange' ? 'var(--color-orange-900)' : '',
            themeColor === 'pink' ? 'var(--color-pink-900)' : '',
            themeColor === 'emerald' ? 'var(--color-emerald-900)' : ''
          )
        })}>
        <span className={`text-slate-700 font-semibold ${className}`}>{text}</span>
      </CircularProgressbar>
    </div>
  )
}

CircleProgress.defaultProps = {
  size: 50,
  className: ''
}

export default CircleProgress
