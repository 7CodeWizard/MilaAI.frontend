import { useAudioStore } from '../state/audioStore'

export const useAudio = () => {
  const [audio, setAudio] = useAudioStore((state) => [state.audio, state.setAudio])

  const playAudio = (src: string, onFinished?: Function) => {
    if (audio === null) {
      const newAudio = new Audio(src)
      setAudio(newAudio)
      newAudio.play()
      newAudio.onended = () => {
        if (onFinished) onFinished()
      }
    } else {
      audio.pause()
      audio.currentTime = 0
      audio.src = src
      audio.play()
      setAudio(audio)
      audio.onended = () => {
        if (onFinished) onFinished()
      }
    }
  }

  const stopAudio = () => {
    if (!audio) return
    audio.currentTime = 0
    audio.pause()
  }

  return {
    playAudio,
    stopAudio
  }
}
