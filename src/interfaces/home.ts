export interface IStatistics {
  conversation_statistics: {
    easy_conversation_completed: number
    medium_conversation_completed: number
    hard_conversation_completed: number
    total_conversation_completed: number
  }
  vocabulary_statistics: {
    this_month_words: number
    this_week_words: number
    today_new_words: number
    total_words: number
  }
}

export interface StatisticsResponse extends IStatistics {
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
    daily_streak: number
    last_active_date: string
    icon_id: number
    background_id: number
  }
}

export interface LeaderboardUser {
  user_id: number
  username: string
  target_language: string
  proficiency: string
  level: number
  level_name: string
  experience: number
  icon_id: number
  background_id: number
}

export interface LeaderboardResponse {
  current_user: LeaderboardUser
  all_users: LeaderboardUser[]
}

export interface WeeklyActivity {
  day: string
  tried: boolean
}

export interface DailyStreak {
  daily_streak: number
  weekly_activity: WeeklyActivity[]
}
