import { FC, ReactNode, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useAuthStore } from '../../state'
import Loader from '../Loader'
import { Navigate } from 'react-router-dom'
import { appLinks } from '../../utils/constant'
import { i18nCode } from '../../constants'

interface AuthContainerProps {
  children: ReactNode
}

const AuthContainer: FC<AuthContainerProps> = ({ children }) => {
  const [isAADAuthenticated, isUserRegistered, user] = useAuthStore((state) => [
    state.isAADAuthenticated,
    state.isUserRegistered,
    state.user
  ])
  const { i18n } = useTranslation()

  useEffect(() => {
    if (isAADAuthenticated && isUserRegistered) i18n.changeLanguage(i18nCode[user.native_language])
  }, [isAADAuthenticated, isUserRegistered])

  return isAADAuthenticated && !isUserRegistered ? (
    <Navigate to={appLinks.signup} />
  ) : (
    <>
      {isAADAuthenticated && isUserRegistered && children}
      {!isAADAuthenticated && !isUserRegistered && <Loader />}
    </>
  )
}

export default AuthContainer
