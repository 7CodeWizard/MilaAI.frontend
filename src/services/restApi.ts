import axios, { AxiosResponse } from 'axios'
import {
  UserAuthForm,
  User,
  NewSection,
  StartChat,
  StartInteractiveChat,
  MessageBack,
  TranslateBack,
  PronunciationBack,
  Message,
  GrammarBack,
  Hint,
  Feedback,
  WordPronunciation,
  Vocabulary,
  UpdateUser
} from './interface'
import { msalInstance } from '../App'
import {
  ChatsResponse,
  CreateCustomConversationInput,
  CreateCustomConversationOutput,
  FeedbackInput,
  LeaderboardResponse,
  LearnedWord,
  LikeResponse,
  SectionsForm,
  StatisticsResponse,
  WordDefinition,
  WordProgress,
  AuthResponse,
  UserUpdateResponse,
  UserValidationForm,
  UserValidationResponse,
  Customer,
  CreateSubscriptionInput,
  CreateSubscriptionOutput,
  CreateSubscriptionLinkInput,
  CreateSubscriptionLinkOutput,
  RetryBack
} from '../interfaces'

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL

const refreshToken = () => {
  return new Promise<string>((resolve, reject) => {
    msalInstance
      .acquireTokenSilent({
        scopes: [
          'https://milaaisignin.onmicrosoft.com/tasks-api/tasks.write',
          'https://milaaisignin.onmicrosoft.com/tasks-api/tasks.read'
        ]
      })
      .then((e) => {
        resolve(`Bearer ${e.idToken}`)
      })
      .catch(() => {
        reject()
      })
  })
}

axios.interceptors.request.use(async (config) => {
  try {
    config.headers.Authorization = await refreshToken()
    return config
  } catch (e) {
    return config
  }
})

const responseBody = <T>(response: AxiosResponse<T>) => response.data

const request = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
  patch: <T>(url: string, body: {}) => axios.patch<T>(url, body).then(responseBody),
  postFormData: <T>(url: string, formData: FormData) =>
    axios
      .post<T>(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(responseBody)
}

const dashboard = {
  leaderboard: () => request.post<LeaderboardResponse>('/user/leaderboard', {})
}

const auth = {
  register: (user: UpdateUser) => request.post<AuthResponse>('/user/register', user),
  login: () => request.post<AuthResponse>(`/user/login`, {}),
  validate: (data: UserValidationForm) =>
    request.post<UserValidationResponse>('/user/validation', data)
}

const users = {
  login: (credentials: UserAuthForm) => request.post<User>('/user/login', credentials),
  sectionsMila: () => request.get<ChatsResponse>('/user/sections/mila'),
  sectionsLessons: () => request.get<NewSection[]>('/user/get-lesson-units'),
  sectionsCommunity: (query: SectionsForm) =>
    request.get<ChatsResponse>(
      `/user/sections/community?filter_type=${query.filter_type}&search=${query.search}`
    ),
  sectionsCustom: () => request.get<ChatsResponse>('/user/sections/mine'),
  update: (user: UpdateUser) => request.patch<UserUpdateResponse>('/user/update', user),
  statistics: () => request.post<StatisticsResponse>('/user/statistics', {})
}

const words = {
  markLearn: (sectionId: string, word: string) =>
    request.post(`/conversation/mark_learning/${sectionId}`, { word }),
  markLearned: (sectionId: string, word: string) =>
    request.post(`/conversation/mark_learned/${sectionId}`, { word }),
  define: (word: string) => request.get<WordDefinition>(`/user/word-definitions/${word}`)
}

const chat = {
  firstChat: (difficulty: StartChat, sectionId: string) =>
    request.post<MessageBack>(`/conversation/section/${sectionId}`, difficulty),
  intractivefirstChat: (topic: StartInteractiveChat) =>
    request.post<MessageBack>(`/lesson/interactive_lesson_conversation`, topic),
  feedback: (difficulty: StartChat, sectionId: string) =>
    request.post<Feedback>(`/conversation/complete/${sectionId}`, difficulty),
  message: (message: FormData, sectionId: string) =>
    request.postFormData<MessageBack>(`/conversation/section/${sectionId}/message`, message),
  retry: (sectionId: string, difficulty: number) =>
    request.post<RetryBack>(`/conversation/section/${sectionId}/retry`, {
      difficulty_level: difficulty
    }),
  createCustomConversation: (input: CreateCustomConversationInput) =>
    request.post<CreateCustomConversationOutput>('conversation/create_role_play', input),
  wordBank: () => request.post<LearnedWord[]>('/conversation/learning_words', {}),
  sendFeedback: (input: FeedbackInput) =>
    request.post(`/conversation/feedback/${input.id}`, {
      difficulty_level: input.difficulty_level,
      rating: input.rating,
      feedback: input.feedback
    }),
  like: (id: string) => request.post<LikeResponse>(`conversation/like/${id}`, {}),
  getSlowAudio: (id: string, text: string) =>
    request.post<string>(`conversation/get_slow_audio/${id}`, { text })
}

const feedback = {
  pronunciation: (message: FormData) =>
    request.postFormData<PronunciationBack>('/feedback/pronunciation', message),
  wordPronunciation: (text: string) =>
    request.post<WordPronunciation>('/feedback/wordpronunciation', { text }),
  hint: (sectionId: string) =>
    request.post<Hint>(`/feedback/simulate/${sectionId}`, { difficulty_level: 1 }),
  grammar: (sectionId: string, difficulty_level: number, message: Message) =>
    request.post<GrammarBack>(`/feedback/grammar/${sectionId}`, {
      ...message,
      difficulty_level
    }),
  translate: (sectionId: string, difficulty_level: number, text: string, message_id: number) =>
    request.post<TranslateBack>(`/feedback/translate/${sectionId}`, {
      text,
      difficulty_level,
      message_id
    }),
  translator: (text: string) => request.post<TranslateBack>('/feedback/translator', { text })
}

const vocabulary = {
  progress: () => request.post<WordProgress>('/user/vocabulary/progress', {})
}

const lesson = {
  vocabulary: (message?: FormData) => request.post<Vocabulary>('/lesson/vocabulary', message),  
}

const support = {
  sendFeedback: (subject: string, message: string) =>
    request.post('/user/support', { subject, message })
}

const stripe = {
  createCustomer: () => request.post<{ customer: Customer }>('/stripe/create-customer', {}),
  createSubscription: (input: CreateSubscriptionInput) =>
    request.post<CreateSubscriptionOutput>('/stripe/create-subscription', input),
  reactivateSubscription: () => request.post('/stripe/reactivate-subscription', {}),
  createSubscriptionLink: (input: CreateSubscriptionLinkInput) =>
    request.post<CreateSubscriptionLinkOutput>(`/stripe/create-subscription-link`, input),
  cancelSubscription: () => request.post('/stripe/cancel-subscription', {})
}

const api = {
  auth,
  dashboard,
  users,
  chat,
  feedback,
  lesson,
  support,
  vocabulary,
  stripe,
  words
}

export default api
