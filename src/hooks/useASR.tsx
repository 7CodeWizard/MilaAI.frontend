import { useSettingStore } from '../state/settingStore'

const MIN_DECIBELS = -45

const useASR = () => {
  const DELAY = useSettingStore((state) => state.autoSubmitThreadhold * 1000)
  let started = false

  const startASR = (stream: MediaStream, onFinished?: Function) => {
    started = true

    const audioContext = new AudioContext()
    const audioStreamSource = audioContext.createMediaStreamSource(stream)
    const analyser = audioContext.createAnalyser()
    analyser.minDecibels = MIN_DECIBELS
    audioStreamSource.connect(analyser)

    const bufferLength = analyser.frequencyBinCount
    const domainData = new Uint8Array(bufferLength)

    let lastCallTime = Date.now()

    const isSoundDetected = () => {
      analyser.getByteFrequencyData(domainData)

      for (let i = 0; i < bufferLength; i++) {
        if (domainData[i] > 0) {
          return true
        }
      }
      return false
    }

    const detectSound = () => {
      if (isSoundDetected()) {
        lastCallTime = Date.now()
      }

      window.requestAnimationFrame(detectSound)
    }

    function checkFunctionCall() {
      if (!started) return

      const currentTime = Date.now()
      const elapsedTime = currentTime - lastCallTime

      if (elapsedTime >= DELAY) {
        onFinished()
        return
      } else {
        setTimeout(checkFunctionCall, 100)
      }
    }

    checkFunctionCall()

    window.requestAnimationFrame(detectSound)
  }

  const stopASR = () => {
    started = false
  }

  return {
    startASR,
    stopASR
  }
}

export default useASR
