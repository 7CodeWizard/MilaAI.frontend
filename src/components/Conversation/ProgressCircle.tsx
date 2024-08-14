import { FC } from 'react'
import { StudyMode } from '../../services/interface'
import { ConversationProgress } from '../../interfaces'
import {
  EasyFinished,
  EasyNotStarted,
  EasyStarted,
  HardFinished,
  HardNotStarted,
  HardStarted,
  MediumFinished,
  MediumNotStarted,
  MediumStarted
} from '../Icons'

interface ProgressCircleProps {
  difficulty: StudyMode
  progress: ConversationProgress
}

const ProgressCircle: FC<ProgressCircleProps> = ({ difficulty, progress }) => (
  <div className="min-w-[42px]">
    {difficulty === StudyMode.CONVERSATION_EASY &&
      progress === ConversationProgress.NOT_STARTED && <EasyNotStarted />}
    {difficulty === StudyMode.CONVERSATION_EASY && progress === ConversationProgress.STARTED && (
      <EasyStarted />
    )}
    {difficulty === StudyMode.CONVERSATION_EASY && progress === ConversationProgress.FINISHED && (
      <EasyFinished />
    )}
    {difficulty === StudyMode.CONVERSATION_MEDIUM &&
      progress === ConversationProgress.NOT_STARTED && <MediumNotStarted />}
    {difficulty === StudyMode.CONVERSATION_MEDIUM && progress === ConversationProgress.STARTED && (
      <MediumStarted />
    )}
    {difficulty === StudyMode.CONVERSATION_MEDIUM && progress === ConversationProgress.FINISHED && (
      <MediumFinished />
    )}
    {difficulty === StudyMode.CONVERSATION_HARD &&
      progress === ConversationProgress.NOT_STARTED && <HardNotStarted />}
    {difficulty === StudyMode.CONVERSATION_HARD && progress === ConversationProgress.STARTED && (
      <HardStarted />
    )}
    {difficulty === StudyMode.CONVERSATION_HARD && progress === ConversationProgress.FINISHED && (
      <HardFinished />
    )}
  </div>
)

export default ProgressCircle
