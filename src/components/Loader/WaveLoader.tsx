import classNames from 'classnames'
import { FC } from 'react'

interface WaveLoaderProps {
  size?: 'sm' | 'bg'
}

const WaveLoader: FC<WaveLoaderProps> = ({ size = 'bg' }) => {
  return (
    <div className={classNames('flex items-center', size === 'bg' ? 'justify-center' : '')}>
      <div className="wave-loader-element"></div>
      <div className="wave-loader-element"></div>
      <div className="wave-loader-element"></div>
      {size === 'bg' && (
        <>
          <div className="wave-loader-element"></div>
          <div className="wave-loader-element"></div>
          <div className="wave-loader-element"></div>
          <div className="wave-loader-element"></div>
          <div className="ave-loader-element"></div>
        </>
      )}
    </div>
  )
}

export default WaveLoader
