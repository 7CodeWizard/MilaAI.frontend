/* eslint-disable react/prop-types */
import { useRef, useState, useEffect } from 'react'
import WaveSurfer from 'wavesurfer.js'
import { classNames } from '../../utils'
import WaveLoader from '../../components/Loader/WaveLoader'

const useWavesurfer = (containerRef, options, onLoad) => {
  const [wavesurfer, setWavesurfer] = useState(null)

  // Initialize wavesurfer when the container mounts
  // or any of the props change
  useEffect(() => {
    if (!containerRef.current) return

    const ws = WaveSurfer.create({
      ...options,
      container: containerRef.current
    })

    ws.load(options.url)
    ws.on('ready', () => {
      onLoad()
    })

    setWavesurfer(ws)

    return () => {
      ws.destroy()
    }
  }, [options.url])

  return wavesurfer
}

const WaveSurferPlayer = (props) => {
  const containerRef = useRef(null)
  const [isLoading, setLoading] = useState(true)

  useWavesurfer(containerRef, props, () => setLoading(false))

  return (
    <div className="relative">
      <div
        ref={containerRef}
        className={classNames('flex-1', props.className, isLoading ? 'opacity-0' : '')}
      />
      {isLoading && (
        <div
          className={classNames(
            'min-w-[300px] h-[80px] absolute left-0 right-0 top-0 flex items-center max-sm:min-w-0 max-sm:flex-1 max-sm:w-0',
            props.size === 'sm' ? 'w-full' : 'justify-center'
          )}>
          <WaveLoader size={props.size ? props.size : 'bg'} />
        </div>
      )}
    </div>
  )
}

export default WaveSurferPlayer
