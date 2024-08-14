import { PublicClientApplication } from '@azure/msal-browser'
import { MsalProvider } from '@azure/msal-react'
import { Toaster } from 'react-hot-toast'
import ReactGA from 'react-ga4'
import { RouterProvider } from 'react-router'

import { Loader } from './components'
import { router } from './routes'

import { EventType } from '@azure/msal-browser'
import { useEffect } from 'react'
import NotificationManager from './components/Container/NotificationManager'
import ResponsiveLayout from './components/layouts/ResponsiveLayout'
import api from './services/restApi'
import { useAuthStore } from './state'
import { AUTH_ERROR } from './utils/constant'
import TooltipProvider from './components/layouts/TooltipProvider'
import { useProfileStore } from './state/profileStore'
import ThemeProvider from './components/layouts/ThemeProvider'

ReactGA.initialize('G-3CCMQ5JPNX')

const b2cPolicies = {
  names: {
    signUpSignIn: 'B2C_1_MilaAuth'
  },
  authorities: {
    signUpSignIn: {
      authority: 'https://milaaisignin.b2clogin.com/milaaisignin.onmicrosoft.com/B2C_1_MilaAuth'
    }
  },
  authorityDomain: 'milaaisignin.b2clogin.com'
}

export const msalInstance = new PublicClientApplication({
  auth: {
    clientId: '7dd575b5-bd13-486f-adaa-047a664bd355',
    authority: b2cPolicies.authorities.signUpSignIn.authority,
    knownAuthorities: [b2cPolicies.authorityDomain],
    redirectUri: import.meta.env.VITE_AAD_REDIRECT_URL,
    postLogoutRedirectUri: '/'
  }
})

function App() {
  const [user, setUser, setUserRegistered, setAADAuthenticated] = useAuthStore((state) => [
    state.user,
    state.setUser,
    state.setUserRegistered,
    state.setAADAuthenticated
  ])
  const [setDailyStreak] = useProfileStore((state) => [state.setDailyStreak])

  const signIn = () => {
    api.auth
      .login()
      .then((resp) => {
        setUser({
          experience: resp.user_metrics.experience,
          id: resp.user.id,
          level: resp.user_metrics.level,
          level_name: resp.user_metrics.level_name,
          next_level_exp_req: resp.user_metrics.next_level_exp_req,
          token: '',
          age_range: resp.user.age_range,
          daily_commitment: resp.user.daily_commitment,
          email: resp.user.email,
          full_name: resp.user.full_name,
          motivation: resp.user.motivation,
          native_language: resp.user.native_language,
          proficiency: resp.user_metrics.proficiency,
          target_language: resp.user_metrics.target_language,
          username: resp.user.username,
          background_id: resp.user.background_id,
          icon_id: resp.user.icon_id,
          stripe_customer_id: resp.user.stripe_customer_id,
          stripe_price_id: resp.user_metrics.stripe_price_id,
          is_cancel_scheduled: resp.user_metrics.is_cancel_scheduled,
          plan_expired_on: resp.user_metrics.plan_expired_on
        })

        setAADAuthenticated(true)
        setUserRegistered(true)
        setDailyStreak(resp.user_metrics.streak)
      })
      .catch((err) => {
        if (err.response.data.message === AUTH_ERROR.ONBOARD_FAILED) {
          setUser(null)
          setAADAuthenticated(true)
          setUserRegistered(false)
        } else if (err.response.data.message === AUTH_ERROR.TOKEN_INVALID) {
          setUser(null)
          setAADAuthenticated(false)
        }
      })
  }

  useEffect(() => {
    signIn()

    setUserRegistered(false)
    setAADAuthenticated(false)
  }, [])

  useEffect(() => {
    msalInstance.initialize().then(() => {
      if (!msalInstance.getActiveAccount() && msalInstance.getAllAccounts().length > 0) {
        msalInstance.setActiveAccount(msalInstance.getAllAccounts()[0])
      }

      msalInstance.enableAccountStorageEvents()
      msalInstance.addEventCallback((event) => {
        if (event.eventType === EventType.LOGIN_SUCCESS) {
          const account = (event.payload as any).account
          msalInstance.setActiveAccount(account)

          signIn()
        }
      })
    })
  }, [])

  return (
    <MsalProvider instance={msalInstance}>
      <Toaster
        containerStyle={{
          overflowY: 'auto'
        }}
        containerClassName="scrollbar-hide"
      />
      <ThemeProvider>
        <TooltipProvider>
          <ResponsiveLayout>
            <NotificationManager>
              <RouterProvider router={router} fallbackElement={<Loader />} />
            </NotificationManager>
          </ResponsiveLayout>
        </TooltipProvider>
      </ThemeProvider>
    </MsalProvider>
  )
}

export default App
