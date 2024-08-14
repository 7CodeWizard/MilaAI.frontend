import { DailyStreak, Token } from '../interfaces'

export enum AskMode {
  Audio = 'audio',
  Text = 'text'
}

export enum RecordState {
  STOPPED = 0,
  RECORDING = 1,
  ANALYZING = 2
}

export enum LanguageEnum {
  American = 'American English',
  British = 'British English',
  Spanish = 'Spanish',
  Mexican = 'Mexican Spanish',
  French = 'French',
  German = 'German',
  Japanese = 'Japanese',
  Chinese = 'Mandarin Chinese'
}

export enum StudyMode {
  CONVERSATION_EASY = 1,
  CONVERSATION_MEDIUM = 2,
  CONVERSATION_HARD = 3,
  LESSON_WORD = 4,
  START = 5,
  CONTINUE = 6
}

interface UserAuthForm {
  email: string
  password: string
}

interface Notification {
  id: string
  title: string
  message: string
  okText?: string
  cancelText?: string
  onCallback?: Function
  cancelCallback?: Function
}

interface User {
  id: number
  age_range?: string
  email?: string
  full_name?: string
  native_language?: string
  target_language?: string
  username?: string
  daily_commitment?: number
  stripe_customer_id?: string
  stripe_price_id?: string
  token: string
  motivation?: string
  secondary_goal?: string
  interests?: Array<string>
  language_skills?: Array<string>
  proficiency?: string
  level: number
  level_name: string
  experience: number
  next_level_exp_req: number
  icon_id: number
  background_id: number
  is_cancel_scheduled: boolean
  plan_expired_on: string
}

interface UpdateUser {
  email?: string
  username?: string
  full_name?: string
  native_language?: string
  target_language?: string
  age_range?: string
  daily_commitment?: number
  motivation?: string
  secondary_goal?: string
  interests?: Array<string>
  language_skills?: Array<string>
  proficiency?: string
  icon_id: number
  background_id: number
}

interface StartChat {
  difficulty_level: number
}

interface MessageBack {
  user_message: string
  text_response: string
  audio_response: string
  slow_response: string
  message_count: number
  end_conversation: boolean
  feedback_json?: string
  feedback_text?: string
  user_message_id: number
  response_message_id: number
  tokenization_response: Token[]
}

interface Feedback {
  feedback: string
  token_counts: {
    [key: string]: number
  }
  avg_sentence_length: string
  user_experience: number
  user_level: number
  next_level_exp_req: number
  level_before: number
  experience_before: number
  best_sentence: string
  aggregate_pronunciation_score: number
  aggregate_accuracy_score: number
  aggregate_fluency_score: number
  streak: DailyStreak
}

interface Audio {
  path: string
  status_code: number
  filename: string
  send_header_only: boolean
  media_type: string
  backgroud: string
  raw_headers: [string[]]
  stat_result: string
}

interface Message {
  message_id: number
  text: string
  ai_text: string
}

interface PronunciationBack {
  feedback_text: string
  feedback_json: string
}

interface PronunciationAssessment {
  AccuracyScore: number
  ErrorType: string
  FluencyScore?: number
  CompletenessScore?: number
  PronScore?: number
}

interface Word {
  Word: string
  Offset: number
  Duration: number
  PronunciationAssessment: PronunciationAssessment
}

interface NBest {
  Confidence: number
  Lexical: string
  ITN: string
  MaskedITN: string
  Display: string
  PronunciationAssessment: PronunciationAssessment
  Words: Word[]
}

interface FeedbackJson {
  Id: string
  RecognitionStatus: string
  Offset: number
  Duration: number
  Channel: number
  DisplayText: string
  SNR: number
  NBest: NBest[]
}

interface GrammarBack {
  corrected_text: {
    score: number
    feedback: string
  }
}

interface TranslateBack {
  translated_text: string
  slow_response: string
  audio_response: string
  words: Array<{
    [key: string]: string
  }>
}

interface ContextTranslateBack {
  tokenization_response: Token[]
}

interface Hint {
  simulated_response: string
  translation: string
  audio_response: string
  slow_response: string
}

interface Section {
  proficiency_level: string
  goal_user: string
  title: string
  source: 'mila' | 'community' | 'mine'
  background_id?: number
  icon_id?: number
  conversation_length: number
  language_details: {
    [key: string]: {
      ai_role: string
      user_role: string
      context: string
    }
  }
  progress?: {
    [key: string]: {
      difficulty_level: number
      is_completed: boolean
    }
  }
  id: string
  numeric_id: number
  likes: number
  times_played: number
  creator: string
  creation_date: string
}

export interface Lesson {  
  lesson_name: string;  
  lesson_topic: string;  
} 

interface StartInteractiveChat {
  topic: string; 
}

interface NewSection {
  [key: string]: Lesson[];
}

interface WordInfo {
  duration: number
  offset: number
  score: number
}

interface WordPronunciation {
  audio_response_path: {
    [key: string]: string
  }
  feedback: string
}

interface UserWord {
  [key: string]: WordInfo
}

interface Vocabulary {
  user_message: string
  text_response: string
  audio_response: string
  words: Array<{
    [key: string]: string
  }>
}

interface ChatThreadProps {
  type: string
  message_id: number
  feedbackScore?: number
  message?: string
  audio_response?: string
  slow_response?: string
  audioUser?: HTMLAudioElement
  pronunciation?: PronunciationBack
  grammar?: GrammarBack
  words?: UserWord
  isLast?: boolean
  lastAIMessage?: string
  tokenization_response?: Token[]
  practiceWords?: {
    [key: string]: string
  }
  onFeedback?: () => void
}

interface TargetLanguage {
  target_language: LanguageEnum
}

interface IWord {
  [key: string]: string
}

interface IRomaji {
  [key: string]: string[]
}

interface ChatThreadArr extends Array<ChatThreadProps> {}

type JapaneseNotation = 'Furigana' | 'Romaji'
type ChineseNotation = 'Zhuyin' | 'Romaji'

export type {
  UserAuthForm,
  TargetLanguage,
  Message,
  GrammarBack,
  PronunciationBack,
  User,
  UpdateUser,
  MessageBack,
  TranslateBack,
  ContextTranslateBack,
  StartChat,
  StartInteractiveChat,
  PronunciationAssessment,
  Word,
  UserWord,
  FeedbackJson,
  NBest,
  Section,
  NewSection,
  Hint,
  Audio,
  ChatThreadProps,
  ChatThreadArr,
  Feedback,
  WordInfo,
  WordPronunciation,
  Vocabulary,
  Notification,
  IWord,
  IRomaji,
  JapaneseNotation,
  ChineseNotation
}
