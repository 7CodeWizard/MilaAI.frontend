import { lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { appLinks } from '../utils/constant'
import { withSuspense } from '../hocs'
import DashboardLayout from '../components/layouts/DashboardLayout'
import Chats from '../pages/Sections/Chats'
import LandingPageLayout from '../components/layouts/LandingPageLayout'
import Settings from '../pages/Settings'

import About from '../pages/Landing/About'
import Home from '../pages/Landing/Home'
import HowItWorks from '../pages/Landing/HowItWorks'
import FAQ from '../pages/Landing/Faq'
import Contact from '../pages/Landing/Contact'
import Page404 from '../pages/Landing/Page404'
import Sections from '../pages/Sections'
import Culture from '../pages/Culture'
import Listening from '../pages/Listening'
import Dashboard from '../pages/Dashboard'
import SectionsMine from '../pages/SectionsMine'
import WordBank from '../pages/WordBank'
import Support from '../pages/Support'
import SectionsCommunity from '../pages/SectionsCommunity'
import PrivacyPolicy from '../pages/Help/PrivacyPolicy'
import TermsConditions from '../pages/Help/TermsConditions'
import SectionsLessons from '../pages/SectionsLessons'

const Onboarding = lazy(() => import('../pages/Onboarding'))
const Translator = withSuspense(lazy(() => import('../pages/Translator')))

export const router = createBrowserRouter([
  {
    errorElement: <Page404 />
  },
  {
    path: appLinks.signup,
    element: <Onboarding />
  },
  {
    path: '/app',
    element: <DashboardLayout />,
    children: [
      {
        path: '',
        element: <Dashboard />
      },
      {
        path: appLinks.home,
        element: <Dashboard />
      },
      {
        path: appLinks.sections,
        element: <Sections />
      },
      {
        path: appLinks.interactive_lesson,
        element: <Chats />
      },
      {
        path: `${appLinks.interactive_lesson}/:topic`,
        element: <Chats />
      },
      {
        path: appLinks.lessons,
        element: <SectionsLessons />
      },
      {
        path: appLinks.sectionsCommunity,
        element: <SectionsCommunity />
      },
      {
        path: appLinks.sectionsMine,
        element: <SectionsMine />
      },
      {
        path: appLinks.settings,
        element: <Settings />
      },
      {
        path: appLinks.support,
        element: <Support />
      },
      {
        path: appLinks.translator,
        element: <Translator />
      },
      {
        path: appLinks.culture,
        element: <Culture />
      },
      {
        path: appLinks.wordbank,
        element: <WordBank />
      },
      {
        path: appLinks.listening,
        element: <Listening />
      },
      {
        path: `${appLinks.section}/:id`,
        element: <Chats />
      }
    ]
  },
  {
    path: appLinks.help,
    children: [
      {
        path: appLinks.privacyPolicy,
        element: <PrivacyPolicy />
      },
      {
        path: appLinks.termsConditions,
        element: <TermsConditions />
      }
    ]
  },
  {
    path: '/',
    element: <LandingPageLayout />,
    children: [
      {
        path: '',
        element: <Home />
      },
      {
        path: appLinks.about,
        element: <About />
      },
      {
        path: appLinks.howitworks,
        element: <HowItWorks />
      },
      {
        path: appLinks.faq,
        element: <FAQ />
      },
      {
        path: appLinks.contact,
        element: <Contact />
      }
    ]
  }
])
