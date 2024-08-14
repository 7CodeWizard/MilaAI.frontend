import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import TransitionEffect from '../../components/TransitionEffect'

const IsTyping: FC = () => {
  const { t } = useTranslation()
  return (
    <TransitionEffect duration={0.5}>
      <h3 className="text-xs text-gray-400 px-1 font-medium ml-[50px]">
        {t('onboarding.is-typing')}
      </h3>
    </TransitionEffect>
  )
}

export default IsTyping
