import { FC } from 'react'
import './index.css'
import { classNames } from '../../utils'

interface AudioAnimationProps {
  size?: 'sm' | 'bg'
}

const AudioAnimation: FC<AudioAnimationProps> = ({ size = 'bg' }) => (
  <div className="playing">
    {Array(size === 'bg' ? 10 : 4)
      .fill('')
      .map((_, index) => (
        <span
          key={index}
          className={classNames(`playing__bar playing__bar${index + 1}`, size)}></span>
      ))}
  </div>
)

export default AudioAnimation
