import { FC, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router'
import ReactGA from 'react-ga4'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import axios from 'axios'
import useMembership from '../../hooks/useMembership'

import { MsalAuthenticationTemplate } from '@azure/msal-react'
import { InteractionType } from '@azure/msal-browser'
import Loader from '../Loader'

import { Sidebar } from '../Sidebar'
import './index.css'
import AuthContainer from './AuthContainer'
import MobileSidebar from '../Sidebar/MobileSidebar'
import { DAILY_LIMIT_REACH } from '../../utils/constant'

const STRIPE_KEY = import.meta.env.VITE_AAD_REDIRECT_URL

const DashboardLayout: FC = () => {
  const location = useLocation()
  const stripePromise = loadStripe(STRIPE_KEY)
  const { showMembershipError } = useMembership()

  useEffect(() => {
    ReactGA.send({ hitType: 'pageview', page: location.pathname })
  }, [location])

  useEffect(() => {
    axios.interceptors.response.use(
      (config) => config,
      (res) => {
        if (res.response.data && res.response.data.message === DAILY_LIMIT_REACH)
          showMembershipError(true)
        else if (res.response.status === 403) showMembershipError()
        throw res
      }
    )
  }, [])

  return (
    <MsalAuthenticationTemplate
      interactionType={InteractionType.Redirect}
      authenticationRequest={{
        scopes: [
          'https://milaaisignin.onmicrosoft.com/tasks-api/tasks.write',
          'https://milaaisignin.onmicrosoft.com/tasks-api/tasks.read'
        ]
      }}
      loadingComponent={Loader}
      errorComponent={(err) => {
        err.login()
        return <></>
      }}>
      <AuthContainer>
        <Elements stripe={stripePromise}>
          <div className="bg-white overflow-x-clip dark:bg-mila-gray-50">
            <Sidebar />
            <MobileSidebar />
            <div className="lg:ml-[270px]">
              <div className="w-full flex mx-auto page-container">
                <div className="w-full relative">
                  <Outlet />
                </div>
              </div>
            </div>
          </div>
        </Elements>
      </AuthContainer>
    </MsalAuthenticationTemplate>
  )
}

export default DashboardLayout
