import { useLocation } from 'react-router'
import { appLinks } from '../utils/constant'

export const useChat = () => {
  const location = useLocation()

  const isChatPage = () => {
    return location.pathname.indexOf(`${appLinks.section}/`) !== -1
  }

  return {
    isChatPage
  }
}
