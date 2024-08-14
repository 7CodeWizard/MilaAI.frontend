import { FC } from 'react'
import classNames from 'classnames'
import { LanguageEnum, WordInfo } from '../../services/interface'
import { useAuthStore } from '../../state'

interface UserWordProps {
  value: string
  info?: WordInfo
  onClick: () => void
}

const UserWord: FC<UserWordProps> = ({ value, info, onClick }) => {
  const [user] = useAuthStore((state) => [state.user])

  if (!info) return <span>{value}</span>
  return (
    <span
      className={classNames(
        'cursor-pointer user-word',
        info.score < 40 ? 'text-pink-600 active:text-red-400' : '',
        info.score >= 40 && info.score < 80 ? 'text-orange-600 active:text-orange-400' : '',
        info.score >= 80 ? 'text-emerald-600 active:text-emerald-400' : '',
        user.target_language === LanguageEnum.Japanese ? 'font-japanese' : '',
        user.target_language === LanguageEnum.Chinese ? 'font-chinese' : '',
        user.target_language === LanguageEnum.Japanese ||
          user.target_language === LanguageEnum.Chinese
          ? 'text-xl'
          : 'text-lg'
      )}
      onClick={onClick}
    >
      {value}
    </span>
  )
}

export default UserWord
