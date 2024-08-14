import { FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet'

import { MsalAuthenticationTemplate } from '@azure/msal-react'
import { InteractionType } from '@azure/msal-browser'

import ProgressBar from '../../elements/ProgressBar'
import LanguageSelect from './LanguageSelect'
import { LanguageEnum } from '../../services/interface'
import AskName from './AskName'
import TargetLanguageSelect from './TargetLanguage'
import AgeSelect from './AgeSelect'
import CommitPerDay from './CommitPerDay'
import Motivation from './Motivation'
import Finalize from './Finalize'
import { useAuthStore } from '../../state'
import api from '../../services/restApi'
import { Navigate, useNavigate } from 'react-router'
import { FREE_TRIAL, appLinks } from '../../utils/constant'
import Proficiency from './Proficiency'
import { CircleCheck, IntroMeetUp } from '../../components/Icons'
import { Loader } from '../../components'
import { i18nCode } from '../../constants'
import Interests from './Interests'
import LanguageSkills from './LanguageSkills'

const Onboarding: FC = () => {
  const { t, i18n } = useTranslation()
  const [step, setStep] = useState(-1)
  const [commmitPerDay, setCommitPerDay] = useState(5)
  const [primaryGoal, setPrimaryGoal] = useState('')
  const [secondaryGoal, setSecondaryGoal] = useState('')
  const [showInterests, setShowInterests] = useState(false)
  const [motivationOrigin, setMotivationOrigin] = useState('')
  const [userInterests, setUserInterests] = useState([""])
  const [languageSkills, setLanguageSkills] = useState([""])
  const [isFinalizing, setFinalizing] = useState(false)
  const navigate = useNavigate()

  const [
    setNativeLanguage,
    setTargetLanguage,
    setAge,
    setName,
    name,
    age,
    nativeLanguage,
    targetLanguage,
    setUser,
    proficiency,
    setProficiency,
    setUserRegistered,
    isUserRegistered,
    isAADAuthenticated
  ] = useAuthStore((state) => [
    state.setNativeLanguage,
    state.setTargetLanguage,
    state.setAge,
    state.setName,
    state.name,
    state.age,
    state.nativeLanguage,
    state.targetLanguage,
    state.setUser,
    state.proficiency,
    state.setProficiency,
    state.setUserRegistered,
    state.isUserRegistered,
    state.isAADAuthenticated
  ])

  const onSelectLanguage = (lang: LanguageEnum) => {
    setNativeLanguage(lang)
    i18n.changeLanguage(i18nCode[lang])

    setTimeout(() => {
      setStep(1)
    }, 1000)
  }

  const onSetName = (name: string) => {
    setName(name)
    setStep(2)
  }

  const onSelectTargetLanguage = (lang: LanguageEnum) => {
    setTargetLanguage(lang)
    setTimeout(() => {
      setStep(3)
    }, 1000)
  }

  const onSelectAge = (age: string) => {
    setAge(age)
    setTimeout(() => {
      setStep(4)
    }, 1000)
  }

  const onSelectCommitPerDay = (value: number) => {
    setCommitPerDay(value)
    setTimeout(() => {
      setStep(5)
    }, 1000)
  }

  const onSelectReason = (primaryReason: string, primaryReasonIndex: number, secondaryReason: string) => {
    setPrimaryGoal(primaryReason)
    setSecondaryGoal(secondaryReason)
    setMotivationOrigin(primaryReason)
    if (primaryReasonIndex === 3 || primaryReasonIndex === 8) {
      setShowInterests(true)
      setTimeout(() => {
        setStep(6)
      }, 1000)
    } else {
      setTimeout(() => {
        setStep(7)
      }, 1000)
    }
  }

  const onSelectInterests = (value: Array<string>) => {
    setUserInterests(value);
    setTimeout(() => {
      setStep(7)
    }, 1000)
  }

  const onSelectLanuageSkills = (value: Array<string>) => {
    setLanguageSkills(value);
    setTimeout(() => {
      setStep(8)
    }, 1000)
  }

  const onSelectProficiency = (value: string) => {
    setProficiency(value)
    setTimeout(() => {
      setStep(9)
    }, 1000)
  }

  const onFinalize = () => {
    setFinalizing(true)
    api.auth
      .register({
        full_name: name,
        age_range: age,
        native_language: nativeLanguage,
        target_language: targetLanguage,
        daily_commitment: commmitPerDay,
        motivation: primaryGoal,
        secondary_goal: secondaryGoal,
        interests: userInterests,
        language_skills: languageSkills,
        username: name,
        proficiency: proficiency,
        background_id: 0,
        icon_id: 0
      })
      .then((resp) => {
        setFinalizing(false)
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
          secondary_goal: resp.user.secondary_goal,
          interests: resp.user.interests,
          language_skills: resp.user.language_skills,
          native_language: resp.user.native_language,
          proficiency: resp.user_metrics.proficiency,
          target_language: resp.user_metrics.target_language,
          username: resp.user.username,
          icon_id: resp.user.icon_id,
          background_id: resp.user.background_id,
          is_cancel_scheduled: resp.user_metrics.is_cancel_scheduled,
          plan_expired_on: resp.user_metrics.plan_expired_on,
          stripe_price_id: FREE_TRIAL
        })
        setUserRegistered(true)
        navigate(appLinks.sections)
      })
  }

  useEffect(() => {
    setTimeout(() => {
      setStep(0)
    }, 2000)
  }, [])

  if (isUserRegistered && isAADAuthenticated) return <Navigate to={appLinks.home} />

  return (
    <>
      <Helmet>
        <meta name="name" content="Sign up" />
        <meta name="description" content="Sign up Mila for your language learning journey." />
      </Helmet>

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
        <div className="flex w-full min-h-screen pt-[100px] overflow-x-hidden">
          <div className="fixed left-0 top-0 right-0 bg-white z-20 pt-6 px-6">
            <div className="shadow-sm p-2 rounded-xl">
              <div className="flex gap-4">
                <IntroMeetUp />
                <div>
                  <h3 className="text-xl font-semibold text-indigo-700">
                    {t('onboarding.introduction-meetup')}
                  </h3>
                  <h3 className="text-indigo-700">{t('onboarding.with-mila')}</h3>
                </div>
              </div>
              <div className="mt-2 px-8">
                <ProgressBar completed={(100 * step) / 8} />
              </div>
            </div>
          </div>

          <div className="flex-1 flex flex-col justify-end p-6">
            <div className="p-8 flex flex-col items-center">
              <h3 className="text-indigo-700 font-semibold">{t('onboarding.goals')}</h3>
              <div className="mt-5">
                <div className="flex gap-2 items-center text-sm text-[#1E3A8A]">
                  <CircleCheck />
                  <div className="font-medium">
                    <h3 className="text-indigo-950">👋 {t('onboarding.nice-to-meet')}</h3>
                    <h3 className="text-indigo-950">{t('onboarding.introduce-yourself')}</h3>
                  </div>
                </div>
                <div className="flex gap-2 items-center mt-5 text-sm text-[#1E3A8A]">
                  <CircleCheck />
                  <div className="font-medium">
                    <h3 className="text-indigo-950">💭 {t('onboarding.get-to-know-me')}</h3>
                    <h3 className="text-indigo-950">{t('onboarding.share-few-details')}</h3>
                  </div>
                </div>
                <div className="flex gap-2 items-center mt-5 text-sm text-slate-800">
                  <CircleCheck />
                  <div className="font-medium">
                    <h3 className="text-indigo-950">🚀 {t('onboarding.lets-go')}</h3>
                    <h3 className="text-indigo-950">{t('onboarding.learn-how-to')}</h3>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative flex justify-center mb-8">
              <div className="h-[1px] bg-indigo-200 absolute top-[50%] left-0 right-0 z-[-1]" />
              <h3 className="font-medium text-indigo-700 bg-white w-fit px-2">
                {t('onboarding.meeting-up-with-mila')}
              </h3>
            </div>

            {step >= 0 && <LanguageSelect onSelectLanguage={onSelectLanguage} />}
            {step > 0 && <AskName onSetName={onSetName} />}
            {step > 1 && <TargetLanguageSelect onSelectLanguage={onSelectTargetLanguage} />}
            {step > 2 && <AgeSelect onSelectAge={onSelectAge} />}
            {step > 3 && <CommitPerDay onSelectCommitPerDay={onSelectCommitPerDay} />}
            {step > 4 && <Motivation onSelectReason={onSelectReason} />}
            {step > 5 && showInterests &&
              <Interests onSelectInterests={onSelectInterests} />
            }
            {step > 6 && (
              <LanguageSkills onSelectLanguageSkills={onSelectLanuageSkills} />
            )}
            {step > 7 && (
              <Proficiency onSelectProficiency={onSelectProficiency} motivation={primaryGoal} />
            )}
            {step > 8 && <Finalize onGo={onFinalize} isLoading={isFinalizing} />}
          </div>
        </div>
      </MsalAuthenticationTemplate>
    </>
  )
}

export default Onboarding
