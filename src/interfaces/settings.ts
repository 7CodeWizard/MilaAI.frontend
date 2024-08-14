import { LanguageEnum } from '../services/interface'

export type ThemeColor = 'blue' | 'orange' | 'pink'

export interface ITargetLanguageOption {
  flag: JSX.Element
  value: LanguageEnum
  label: JSX.Element
}

export interface IThemeColorOptions {
  color: ThemeColor
  bgColor: string
}
