import { Section } from '../services/interface'

export enum ConversationProgress {
  NOT_STARTED,
  STARTED,
  FINISHED
}

export interface CreateCustomConversationInput {
  ai_role: string
  user_role: string
  context: string
}

export interface CreateCustomConversationOutput {
  id: string
  ai_role: string
  user_role: string
  context: string
  conversation_length: 10
  creation_date: string
  creator: string
  environment: string
  likes: number
  proficiency_level: string
  source: string
  times_played: number
  title: string
  userid: 4
  language_details: any
  numeric_id: number
}

export interface ChatsResponse {
  sections: Section[]
  new_continuation_token: string
}

export type ChatFilterType = 'newest' | 'most_liked'

export interface SectionsForm {
  filter_type: ChatFilterType
  search: string
}

export interface LikeResponse {
  total_likes: number
}

export interface Token {
  audio: string
  learned?: boolean
  furigana: string
  kanji_only_length: number
  romanization: string
  token: string
  translation: string
  zhuyin: string
}

export interface RetryBack {
  end_conversation: boolean
  message_count: number
}
