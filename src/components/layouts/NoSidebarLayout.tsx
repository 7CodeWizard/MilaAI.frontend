import { FC } from 'react'
import { Outlet } from 'react-router'
import { MsalAuthenticationTemplate } from '@azure/msal-react'
import { InteractionType } from '@azure/msal-browser'
import Loader from '../Loader'
import './index.css'

const NoSidebarLayout: FC = () => {
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
    >
      <div className="bg-white">
        <div>
          <div className="w-full flex mx-auto h-screen page-container">
            <div className="w-full relative">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </MsalAuthenticationTemplate>
  )
}

export default NoSidebarLayout
