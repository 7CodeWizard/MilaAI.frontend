import { FC, ReactNode, useEffect } from 'react'
import { useSettingStore } from '../../state/settingStore'

interface ThemeProviderProps {
  children: ReactNode
}

const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
  const [colorMode] = useSettingStore((state) => [state.colorMode])

  useEffect(() => {
    if (location.pathname === '/') {
      document.documentElement.classList.remove('dark')
      return
    }
    if (colorMode === 'dark') document.documentElement.classList.add('dark')
    else document.documentElement.classList.remove('dark')
  }, [colorMode, location.href])

  return <>{children}</>
}

export default ThemeProvider
