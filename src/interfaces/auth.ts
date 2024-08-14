import { DailyStreak } from '.'

export interface AuthResponse {
  message: string
  user: {
    id: number
    username: string
    object_id: string
    full_name: string
    email: string
    native_language: string
    target_language: string
    age_range: string
    daily_commitment: number
    motivation: string
    secondary_goal: string
    interests: string[]
    language_skills: string[]
    daily_streak: string
    last_active_date: string
    icon_id: number
    background_id: number
    stripe_customer_id: string
  }
  user_metrics: {
    id: string
    user_id: string
    target_language: string
    proficiency: string
    level: number
    level_name: string
    experience: number
    next_level_exp_req: number
    stripe_price_id: string
    streak: DailyStreak
    plan_expired_on: string
    is_cancel_scheduled: boolean
  }
}

export interface UserUpdateResponse {
  message: string
  user_metrics: {
    id: number
    user_id: number
    target_language: string
    proficiency: string
    level: number
    level_numeral: number
    level_name: string
    experience: number
    next_level_exp_req: number
  }
}

export interface UserValidationForm {
  email: string
  username: string
}

export interface UserValidationResponse {
  email: boolean
  username: boolean
}
