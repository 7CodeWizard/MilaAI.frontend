import { IOption } from '../elements/Select'
import { ITargetLanguageOption, IThemeColorOptions } from '../interfaces'
import { CN_O, ES_O, FR_O, GE_O, JP_O, MX_O, UK_O, US_O } from '../components/Icons'
import { LanguageEnum } from '../services/interface'

export const nativeLanguageOptions: IOption[] = [
  {
    label: 'American English',
    value: 'American English'
  },
  {
    label: 'British English',
    value: 'British English'
  },
  {
    label: '普通话',
    value: 'Mandarin Chinese'
  },
  {
    label: 'Español',
    value: 'Spanish'
  },
  {
    label: 'Mexicano',
    value: 'Mexican Spanish'
  },
  {
    label: 'Français',
    value: 'French'
  },
  {
    label: 'Deutsch',
    value: 'German'
  },
  {
    label: 'Italiano',
    value: 'Italian'
  },
  {
    label: '日本語',
    value: 'Japanese'
  },
  {
    label: 'Русский',
    value: 'Russian'
  },
  {
    label: 'Português',
    value: 'Portuguese'
  },
  {
    label: 'Português Brasileiro',
    value: 'Brazilian Portuguese'
  },
  {
    label: 'Čeština',
    value: 'Czech'
  },
  {
    label: 'Dansk',
    value: 'Danish'
  },
  {
    label: 'Nederlands',
    value: 'Dutch'
  },
  {
    label: 'Suomi',
    value: 'Finnish'
  },
  {
    label: 'Ελληνικά',
    value: 'Greek'
  },
  {
    label: 'עִבְֿרִית‎',
    value: 'Hebrew'
  },
  {
    label: 'Bahasa Indonesia',
    value: 'Indonesian'
  },
  {
    label: '한국어',
    value: 'Korean'
  },
  {
    label: 'Norsk',
    value: 'Norwegian'
  },
  {
    label: 'Polski',
    value: 'Polish'
  },
  {
    label: 'Română',
    value: 'Romanian'
  },
  {
    label: 'Svenska',
    value: 'Swedish'
  },
  {
    label: 'Türkçe',
    value: 'Turkish'
  },
  {
    label: 'Українська',
    value: 'Ukrainian'
  }
]

export const dailyCommitOptions: IOption[] = [
  {
    label: '5 minutes',
    value: 5
  },
  {
    label: '10 minutes',
    value: 10
  },
  {
    label: '15 minutes',
    value: 15
  },
  {
    label: '20 minutes',
    value: 20
  },
  {
    label: '30 minutes',
    value: 30
  },
  {
    label: '40 minutes',
    value: 40
  },
  {
    label: '50 minutes',
    value: 50
  },
  {
    label: '60 minutes',
    value: 60
  }
]

export const proficiencyOptions: IOption[] = [
  {
    label: 'Just Started 🌱',
    value: 'Novice'
  },
  {
    label: 'Beginner 🌱',
    value: 'Beginner'
  },
  {
    label: 'Intermediate 🌾',
    value: 'Intermediate'
  },
  {
    label: 'Advanced 🌲',
    value: 'Advanced'
  },
  {
    label: 'Master 🌳',
    value: 'Master'
  }
]

export const targetLanguages: ITargetLanguageOption[] = [
  {
    flag: <UK_O />,
    value: LanguageEnum.British,
    label: (
      <>
        English
        <br />
        (UK)
      </>
    )
  },
  {
    flag: <US_O />,
    value: LanguageEnum.American,
    label: (
      <>
        English
        <br />
        (US)
      </>
    )
  },
  {
    flag: <FR_O />,
    value: LanguageEnum.French,
    label: <>French</>
  },
  {
    flag: <MX_O />,
    value: LanguageEnum.Mexican,
    label: (
      <>
        Spanish
        <br />
        (MX)
      </>
    )
  },
  {
    flag: <ES_O />,
    value: LanguageEnum.Spanish,
    label: (
      <>
        Spanish
        <br />
        (ES)
      </>
    )
  },
  {
    flag: <GE_O />,
    value: LanguageEnum.German,
    label: <>German</>
  },
  {
    flag: <JP_O />,
    value: LanguageEnum.Japanese,
    label: <>Japanese</>
  },
  {
    flag: <CN_O />,
    value: LanguageEnum.Chinese,
    label: <>Chinese</>
  }
]

export const themeColors: IThemeColorOptions[] = [
  {
    color: 'blue',
    bgColor: 'bg-blue-300'
  },
  {
    color: 'orange',
    bgColor: 'bg-orange-300'
  },
  {
    color: 'pink',
    bgColor: 'bg-pink-300'
  }
]

export const i18nCode = {
  'American English': 'en',
  'British English': 'en',
  Italian: 'it',
  'Mandarin Chinese': 'cn',
  Korean: 'ko',
  Spanish: 'es',
  Mexican: 'mx',
  French: 'fr',
  German: 'ge',
  Japanese: 'jp',
  Russian: 'ru',
  'Brazilian Portuguese': 'pt',
  Czech: 'cz',
  Danish: 'da',
  Dutch: 'du',
  Finnish: 'fi',
  Greek: 'gr',
  Indonesian: 'id',
  Norwegian: 'no',
  Polish: 'po',
  Romanian: 'ro',
  Swedish: 'sw',
  Turkish: 'tr',
  Ukrainian: 'ua'
}

export enum ProficiencyEnum {
  Novice = 'Novice',
  Beginner = 'Beginner',
  Intermediate = 'Intermediate',
  Advanced = 'Advanced',
  Master = 'Master'
}
