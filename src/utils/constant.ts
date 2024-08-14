import { LanguageEnum } from '../services/interface'

export const GLOBAL_STORE = 'GLOBAL_STORE'
export const SIGNUP_STORE = 'SIGNUP_STORE'
export const AUTH_STORE = 'AUTH_STORE'

export const AUTH_ERROR = {
  ONBOARD_FAILED: 'User not registered in our system.',
  TOKEN_INVALID: 'Invalid or expired token.'
}

export const VALID_AUDIO_MIN = 0.5

export const appLinks = {
  about: '/about',
  features: '/',
  howitworks: '/howitworks',
  faq: '/faq',
  contact: '/contact',
  signup: '/signup',
  onboarding: '/onboarding',
  signin: '/signin',
  section: '/app/section',
  sections: '/app/sections',
  sectionsLesson: '/app/sections/lessons',
  sectionsCommunity: '/app/sections/community',
  sectionsMine: '/app/sections/mine',
  createMyConversation: '/app/sections/mine/create',
  dashboard: '/app/dashboard',
  home: '/app/home',
  settings: '/app/settings',
  interactive_lesson: '/app/lesson/interactive_lesson_conversation',
  lessons: '/app/lessons',
  translator: '/app/translator',
  wordlesson: '/app/lessons/word',
  wordbank: '/app/wordbank',
  listening: '/app/listening',
  culture: '/app/culture',
  feedback: '/app/feedback',
  support: '/app/support',
  membership: '/app/membership',
  subscribe: '/app/membership/subscribe',
  help: '/help',
  privacyPolicy: '/help/privacy-policy',
  termsConditions: '/help/terms-conditions'
}

export const socialLinks = {
  linkedin: 'https://www.linkedin.com/company/mila-ai-ltd',
  instagram: 'https://www.instagram.com/learnwithmila',
  discord: 'https://discord.com/invite/TQ7aehathr',
}

export const tips = [
  '🔊 Want to perfect your pronunciation? Click on your own words to practice saying them again.',
  '✏️ Made a typo or want to rephrase? Edit your message and send it anew to replace the old one.',
  '🔍 Curious about how a word sounds? Click on words from the AI to hear the pronunciation.',
  '💾 Found a useful word? Save it! Click on words from the AI to add them to your language learning bank.',
  '🤔 Stuck and not sure how to proceed? Click on the hint message for a helpful suggestion to guide you forward.'
]

export const MAX_LEVEL = 50
export const MAX_EXP = 50 * 50 ** 1.5

export const fullLanguage = {
  [LanguageEnum.British]: 'British Language',
  [LanguageEnum.American]: 'American English',
  [LanguageEnum.French]: 'French',
  [LanguageEnum.Mexican]: 'Mexican Spanish',
  [LanguageEnum.Spanish]: 'Spanish',
  [LanguageEnum.German]: 'German',
  [LanguageEnum.Japanese]: 'Japanese',
  [LanguageEnum.Chinese]: 'Chinese'
}

export const feedbackTextByScore = ['', 'Not Quite! 😓', 'Almost! 🧐', 'Great! 🥳']
export const FREE_TRIAL = 'price_trial'
export const DAILY_LIMIT_REACH = 'Daily limit Reached'
