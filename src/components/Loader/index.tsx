import { FC, useEffect, useState } from 'react'
import { MilaLogoDark, MilaLogoLight } from '../Icons'
import MilaHead from '../../assets/images/loading/mila-head.png'
import MilaBody from '../../assets/images/loading/mila-body.png'
import ProgressBar from '../../elements/ProgressBar'
import { tips } from '../../utils/constant'
import TransitionEffect from '../TransitionEffect'
import { useSettingStore } from '../../state/settingStore'

const MAX_ROTATION = 358
const MIN_ROTATION = 339
const MID_ROTATION = (MAX_ROTATION + MIN_ROTATION) / 2

const Loader: FC = () => {
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [tip, setTip] = useState('')
  const [rotation, setRotation] = useState(MIN_ROTATION)
  const [colorMode] = useSettingStore((state) => [state.colorMode])

  useEffect(() => {
    let current_progress = 0
    let step = 2
    let dir = 1
    let mid = 0

    const interval = setInterval(function () {
      current_progress += step
      const progress = Math.round((Math.atan(current_progress) / (Math.PI / 2)) * 100 * 1000) / 1000
      setLoadingProgress(progress)
      if (progress >= 100) {
        clearInterval(interval)
      } else if (progress >= 80) {
        step = 0.5
      }
    }, 50)

    setTip(tips[Math.floor(tips.length * Math.random())])

    const headRotationInterval = setInterval(() => {
      setRotation((prev) => {
        if (prev > MAX_ROTATION || prev < MIN_ROTATION) dir *= -1
        if (prev === MID_ROTATION) {
          mid++
          if (mid < 10) {
            return prev
          } else {
            mid = 0
          }
        }
        return prev + dir * 0.5
      })
    }, 40)

    return () => {
      clearInterval(interval)
      clearInterval(headRotationInterval)
    }
  }, [])

  return (
    <TransitionEffect
      duration={2}
      effect="fadeIn"
      className="fixed left-0 right-0 top-0 bottom-0 flex flex-col justify-center items-center bg-white dark:bg-mila-gray-50 z-[1000] max-sm:px-10">
      <div className="relative">
        <img
          src={MilaHead}
          className="z-10 relative transform origin-center"
          style={{
            transform: `rotate(${rotation}deg)`
          }}
        />
        <img src={MilaBody} className="-mt-10 ml-2.5" />
      </div>
      <div className="mt-8">{colorMode === 'light' ? <MilaLogoLight /> : <MilaLogoDark />}</div>
      <div className="mt-12 w-[400px] max-sm:w-full">
        <ProgressBar completed={loadingProgress} />

        <div className="mt-8">
          <h3 className="font-medium text-slate-600 dark:text-white">{tip}</h3>
        </div>
      </div>
    </TransitionEffect>
  )
}

export default Loader
