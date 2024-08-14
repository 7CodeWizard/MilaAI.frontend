import { FC, ReactNode, useEffect } from 'react'
import { useGlobalStore } from '../../state'

interface ResponsiveLayoutInterface {
  children: ReactNode
}

const ResponsiveLayout: FC<ResponsiveLayoutInterface> = ({ children }) => {
  const [setIsMobile, setIsIPad, setCountry, setIpAddress] = useGlobalStore((state) => [
    state.setIsMobile,
    state.setIsIPad,
    state.setCountry,
    state.setIpAddress
  ])

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth <= 760)
      setIsIPad(window.innerWidth > 760 && window.innerWidth <= 1024)
    }

    window.addEventListener('resize', handleResize)
    setIsMobile(window.innerWidth <= 760)
    setIsIPad(window.innerWidth > 760 && window.innerWidth <= 1024)

    fetch('https://ipapi.co/json').then(async (res) => {
      const { country_name, ip } = await res.json()
      setCountry(country_name)
      setIpAddress(ip)
    })

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return <>{children}</>
}

export default ResponsiveLayout
