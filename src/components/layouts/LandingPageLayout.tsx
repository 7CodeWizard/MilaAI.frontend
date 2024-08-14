import { FC } from 'react'
import { Navigate, Outlet } from 'react-router'
import Header from '../../pages/Landing/Header'
import { useAuthStore } from '../../state'
import { appLinks } from '../../utils/constant'

const LandingPageLayout: FC = () => {
  const [isUserRegistered, isAADAuthenticated] = useAuthStore((state) => [
    state.isUserRegistered,
    state.isAADAuthenticated
  ])

  if (isAADAuthenticated && isUserRegistered) return <Navigate to={appLinks.home} />
  return (
    <>
      <Header />
      <div className="w-full mt-40 max-sm:mt-14">
        <Outlet />
      </div>
    </>
  )
}

export default LandingPageLayout
