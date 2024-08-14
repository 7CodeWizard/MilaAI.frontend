import { FC } from 'react'
import { useNavigate } from 'react-router'
import { Helmet } from 'react-helmet'
import 'react-multi-carousel/lib/styles.css'
import ContentCard, { ContentCardProps, ContentCardWithoutButton } from './ContentCard'
import { AndCute, CommunityConnectIcon, Mascot, MoscotMobile } from '../../components/Icons'

import {
  AdaptsIcon,
  AdaptsMiniIcon,
  AnywhereAnytimeIcon,
  AnywhereAnytimeMiniIcon,
  InteractiveIcon,
  InteractiveMiniIcon,
  MaintainMomentum,
  MaintainMomentumMiniIcon,
  RealConversation,
  RealConversationMiniIcon,
  RealWorldIcon,
  RealWorldMiniIcon,
  SpendLessLearnMore,
  SpendLessLearnMoreMiniIcon
} from '../../components/Icons/Home'
import Button from '../../components/Button'
import Microsoft from './../../assets/images/logo/Microsoft.png'
import Tsingua from './../../assets/images/logo/Tsingua.png'
import UCLA from './../../assets/images/logo/UCLA.png'
import Oxford from './../../assets/images/logo/oxford.png'
import Team from './../../assets/images/team/all.png'
import Footer from './Footer'
import './index.css'
import { variantsType } from '../../utils/motion'
import WithMila from './WithMila'
import { appLinks } from '../../utils/constant'

interface ContentCardPropsWithAnim extends ContentCardProps {
  animType: keyof variantsType
}

const contentCards: ContentCardPropsWithAnim[] = [
  {
    title: 'Learning that Adapts to You',
    description:
      'Tired of the one-size-fits-all approach and static lessons from other apps? Experience the evolution of language learning with Mila. Our adaptive AI tailors your learning journey, continually refining your experience to match your unique pace and progress. Start experiencing adaptive learning today!',
    icon: <AdaptsIcon />,
    direction: 'ltr',
    miniIcon: <AdaptsMiniIcon />,
    color: 'purple',
    buttonText: 'Experience Adaptation',
    animType: 'scaleY'
  },
  {
    title: 'Interactive Language Immersion',
    description:
      "Bored with repetitive drills and feeling detached? With Mila, you're the heart of the conversation. Engage in real-time dialogues, ask questions, make statements, and receive instant feedback. Start your immersive, interactive learning now!",
    icon: <InteractiveIcon />,
    direction: 'rtl',
    miniIcon: <InteractiveMiniIcon />,
    color: 'pink',
    buttonText: 'Immerse Yourself',
    animType: 'fadeIn'
  },
  {
    title: 'Real-World Language Application',
    description:
      "Frustrated with lessons that don't apply to real life? Mila brings language to life with practical scenarios, from business communication to soap opera chats. See the direct applicability of your new skills, making learning more relevant and exciting. Ready to apply your language skills in the real world?",
    icon: <RealWorldIcon />,
    direction: 'ltr',
    miniIcon: <RealWorldMiniIcon />,
    color: 'emerald',
    buttonText: 'Learn Life Skills',
    animType: 'scale'
  },
  {
    title: 'Connect, Create, and Collaborate with the Mila Community',
    description:
      'Transform language learning into a shared journey. With Mila, you become part of a global community of language enthusiasts.',
    icon: <CommunityConnectIcon />,
    direction: 'rtl',
    miniIcon: <RealWorldMiniIcon />,
    color: 'blue',
    buttonText: 'Join the Community',
    animType: 'scaleY'
  }
]

const Home: FC = () => {
  const navigate = useNavigate()

  return (
    <div className="w-full overflow-x-hidden">
      <Helmet>
        <meta name="name" content="Home" />
        <meta
          name="description"
          content="Speak with Mila and immerse yourself in real-life conversations, get feedback and accelerate your journey to language mastery."
        />
      </Helmet>

      {/*  Mila Description */}
      <div className="w-full max-sm:p-5 sm:max-lg:px-10 2xl:pl-60 lg:pl-14 flex py-8 max-sm:mt-0 max-lg:flex-col-reverse mb-18 max-md:mb-4 max-lg:gap-0 xl:max-2xl:pl-32">
        <div className="mt-14 max-lg:mt-0">
          <div className="flex-1 flex flex-col">
            <h1 className="mt-4 text-slate-900 font-semibold text-6xl tracking-tight break-words max-sm:text-left text max-sm:text-4xl leading-[72px]">
              <div className="relative w-fit">
                <div className="flex justify-end absolute -right-[150px] -top-[100px] w-[215px] max-md:w-[100px] max-md:-right-[60px] max-md:-top-[80px]">
                  <AndCute />
                </div>
                <h1 className="w-fit">Your personal AI</h1>
              </div>
              <div className="flex gap-4 max-md:gap-2">
                <div className="slidingVertical">
                  <span>English</span>
                  <span>Español</span>
                  <span>Français</span>
                  <span>日本語</span>
                  <span>中文</span>
                  <span>Deutsch</span>
                </div>
                teacher.
              </div>
            </h1>
            <h2 className="text-slate-700 break-words text-2xl font-medium mt-6 max-w-[500px] max-sm:text-left max-sm:mt-4 max-sm:text-xl">
              Speak with Mila and immerse yourself in real-life conversations, get real-time feedback and accelerate your journey to language mastery.
            </h2>

            <div className="mt-6 flex max-md:justify-center">
              <Button
                text="Try for free"
                color="blue"
                size="xl"
                onClick={() => navigate(appLinks.home)}
              />
            </div>
          </div>
        </div>
        <div className="flex-1 flex justify-center max-lg:hidden">
          <div className="2xl:3xl:w-[750px] xl:2xl:w-[600px] max-sm:w-full duration-200">
            <Mascot width="100%" height="100%" />
          </div>
        </div>
        <div className="flex-1 flex justify-end max-lg:justify-center lg:hidden">
          <MoscotMobile />
        </div>
      </div>

      <div className="max-md:px-8 relative">
        <div className="w-[460px] h-[460px] bg-pink-200 absolute bottom-[70%] -z-10 rounded-full left-0 -translate-x-[30%] translate-y-[30%] max-sm:hidden" />
        <div className="w-[140px] h-[140px] bg-indigo-200 absolute bottom-[70%] -z-10 rounded-full right-[20%] translate-y-[100%] max-sm:hidden" />

        <p className="text-slate-800 font-medium text-2xl text-center">
          Crafted by a team of language researchers and enthusiasts from
        </p>
        <div className="w-full flex justify-center">
          <div className="mt-4 w-fit flex gap-6 max-md:flex-col items-center">
            <img src={Oxford} className="w-fit" />
            <img src={UCLA} className="w-fit" />
            <img src={Tsingua} className="w-fit" />
            <img src={Microsoft} className="w-fit" />
          </div>
        </div>
      </div>

      <div id="features" className="mt-24">
        <div className="relative md:hidden">
          <div className="w-[140px] h-[140px] bg-blue-200 absolute -z-10 rounded-full -translate-y-[30%] -right-[10%]" />
        </div>
        <h3 className="text-[52px] max-md:text-4xl font-semibold text-slate-950 text-center">
          Real Conversations with Mila
        </h3>
      </div>
      <div className="w-full max-sm:p-5 sm:max-lg:px-10 2xl:px-40 xl:2xl:px-10 lg:px-20 flex flex-col mt-8 py-8 max-sm:mt-0 relative">
        <div className="w-[140px] h-[140px] bg-yellow-200 absolute -z-10 rounded-full top-[50px] left-[10%] max-sm:hidden" />
        <div className="w-[200px] h-[200px] bg-orange-200 absolute -z-10 rounded-full top-[45%] left-[5%] max-sm:hidden" />
        <div className="w-[370px] h-[370px] bg-emerald-200 absolute -z-10 rounded-full top-[20%] right-0 max-sm:hidden translate-x-[30%]" />
        <div className="w-[320px] h-[320px] bg-blue-200 absolute -z-10 rounded-full bottom-0 right-0 max-sm:hidden translate-x-[20%] translate-y-[20%]" />

        <div className="w-[200px] h-[200px] bg-purple-200 absolute -z-10 rounded-full -translate-x-[30%] left-0 top-[5%] md:hidden" />
        <div className="w-[60px] h-[60px] bg-orange-200 absolute -z-10 rounded-full -translate-x-[50%] left-[40%] top-[13%] md:hidden" />
        <div className="w-[150px] h-[150px] bg-emerald-200 absolute -z-10 rounded-full translate-x-[40%] right-0 top-[20%] md:hidden" />
        <div className="w-[80px] h-[80px] bg-purple-200 absolute -z-10 rounded-full -translate-x-[60%] left-1/2 right-0 top-[27%] md:hidden" />
        <div className="w-[120px] h-[120px] bg-yellow-200 absolute -z-10 rounded-full -translate-x-[60%] left-0 right-0 top-[34%] md:hidden" />
        <div className="w-[70px] h-[70px] bg-emerald-200 absolute -z-10 rounded-full -translate-x-[60%] right-0 top-[38%] md:hidden" />
        <div className="w-[200px] h-[200px] bg-purple-200 absolute -z-10 rounded-full translate-x-[50%] right-0 top-[50%] md:hidden" />
        <div className="w-[130px] h-[130px] bg-yellow-200 absolute -z-10 rounded-full -translate-x-[50%] left-0 top-[55%] md:hidden" />
        <div className="w-[150px] h-[150px] bg-green-200 absolute -z-10 rounded-full translate-x-[30%] right-0 top-[60%] md:hidden" />
        <div className="w-[150px] h-[150px] bg-purple-200 absolute -z-10 rounded-full -translate-x-[30%] left-0 top-[65%] md:hidden" />
        <div className="w-[150px] h-[150px] bg-purple-200 absolute -z-10 rounded-full -translate-x-[30%] left-0 bottom-[5%] md:hidden" />
        <div className="w-[30px] h-[30px] bg-yellow-200 absolute -z-10 rounded-full translate-x-[30%] left-0 bottom-[0] md:hidden" />
        <div className="w-[180px] h-[180px] bg-green-200 absolute -z-10 rounded-full translate-x-[30%] right-0 bottom-[3%] md:hidden" />
        <div className="w-[130px] h-[130px] bg-yellow-200 absolute -z-10 rounded-full translate-x-[30%] left-[10%] bottom-[10%] md:hidden" />

        <ContentCardWithoutButton
          title="Real life conversation practice, minus the awkward silences."
          description="Mila takes away the pressure of speaking with a real person while building up your confidence in a new language, free of judgement."
          direction="rtl"
          icon={<RealConversation />}
          miniIcon={<RealConversationMiniIcon />}
        />
        <ContentCardWithoutButton
          title="Learn at your own pace, anytime, anywhere."
          description="Whether you’re commuting to work or have some time to spare, Mila is available to chat 24/7, so language practice fits into your everyday life."
          direction="ltr"
          icon={<AnywhereAnytimeIcon />}
          miniIcon={<AnywhereAnytimeMiniIcon />}
        />
        <ContentCardWithoutButton
          title="Spend less, learn more."
          description="Language tutors cost $35-$60 USD per hour on average. Mastering a language shouldn’t have to be expensive or time consuming. Learn with Mila at a fraction of the cost."
          direction="rtl"
          icon={<SpendLessLearnMore />}
          miniIcon={<SpendLessLearnMoreMiniIcon />}
        />
        <ContentCardWithoutButton
          title="Maintain momentum in your learning."
          description="Mila adapts to your learning style and gives you instant feedback on grammar and pronunciation, while building up your word bank and conversational practice where you need it most."
          direction="ltr"
          icon={<MaintainMomentum />}
          miniIcon={<MaintainMomentumMiniIcon />}
        />
      </div>

      <WithMila />

      <div className="relative">
        <div className="w-[380px] h-[380px] bg-purple-200 absolute top-0 -z-10 rounded-full left-0 -translate-x-[30%] -translate-y-[50%] max-sm:hidden" />
      </div>

      <div className="w-full max-sm:px-4 sm:max-lg:px-10 2xl:px-56 xl:px-40 lg:px-20 flex mt-12 py-8 max-sm:mt-0 relative">
        <h3 className="w-full text-center font-semibold text-orange-950 text-[52px] mt-3 max-md:text-4xl">
          Language Learning Revolutionized with AI
        </h3>
      </div>

      <div className="w-full max-sm:p-5 sm:max-lg:px-10 2xl:px-40 xl:2xl:px-10 lg:px-20 flex flex-col mt-8 max-sm:mt-0 mb-20 relative">
        {contentCards.map((card, index) => (
          <ContentCard {...card} key={index} />
        ))}
        <div className="w-[460px] h-[460px] bg-emerald-200 absolute bottom-[70%] -z-10 rounded-full right-0 translate-x-[60%] translate-y-[50%] max-sm:hidden" />
        <div className="w-[300px] h-[300px] bg-orange-200 absolute bottom-[45%] -z-10 rounded-full left-0 -translate-x-[60%] translate-y-[50%] max-sm:hidden" />
        <div className="w-[300px] h-[300px] bg-blue-200 absolute bottom-0 -z-10 rounded-full right-0 translate-x-[20%] translate-y-[90%] max-sm:hidden" />
      </div>

      <div className="flex bg-slate-500 sm:max-lg:px-10 xl:px-40 lg:px-20 py-24 max-md:py-4 gap-32 max-sm:flex-col max-sm:px-4 max-sm:gap-8 sm:max-lg:gap-16">
        <div className="w-[552px] min-w-[552px] h-[552px] max-sm:w-full max-sm:h-auto max-sm:min-w-[200px]">
          <img src={Team} width="100%" height="100%" className="rounded-2xl" />
        </div>
        <div className="flex flex-col">
          <div>
            <p className="font-medium text-orange-50 text-4xl max-sm:mt-4 max-sm:text-2xl leading-[44px]">
              "Join us on a revolutionary language learning journey that redefines communication and education. Together, we'll craft a platform inspired by our collective dreams,
              breaking boundaries and reshaping language learning."
            </p>
            <h3 className="mt-8 font-semibold text-orange-50 text-lg">Mila Team</h3>
            <h3 className="mt-1 text-orange-50">From Around the World</h3>
          </div>
          <Button text="Meet the team" color="purple" size="lg" className="mt-8" />
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Home
