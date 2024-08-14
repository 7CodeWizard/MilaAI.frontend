import { FC } from 'react'
import {
  ClusterPatternIcon,
  ClusterPatternMiniIcon,
  ConversationInsightIcon,
  ConversationInsightMiniIcon,
  CustomizedExperienceIcon,
  CustomizedExperienceMiniIcon,
  PersonalizedLearningIcon,
  PersonalizedLearningMiniIcon,
  ValuesPersonalizationIcon,
  ValuesPersonalizationMiniIcon
} from '../../components/Icons'
import TextContentCard, { TextContentCardProps } from './TextContentCard'
import Footer from './Footer'
import { variantsType } from '../../utils/motion'
import WithMila from './WithMila'

interface ContentCardPropsWithAnim extends TextContentCardProps {
  animType: keyof variantsType
}

const contentCards: ContentCardPropsWithAnim[] = [
  {
    title: 'Personalized Learning',
    description:
      "Mila uses smart technology to create a custom learning plan for each user. It watches how you learn and adjusts your lessons based on what you know and how you're progressing. It covers everything from new words and grammar to reading, listening, speaking, and writing in the language. This way, everyone gets a unique learning experience that matches their own needs and goals.",
    icon: <PersonalizedLearningIcon />,
    direction: 'ltr',
    miniIcon: <PersonalizedLearningMiniIcon />,
    color: 'purple',
    animType: 'scaleY'
  },
  {
    title: 'Conversations and Insights',
    description:
      "In our app, you chat with Mila that teaches you the language. It gives you explanations, examples, and activities, and it corrects you when you're wrong. It pays attention to the words you use and the topics you talk about to help you learn better.",
    icon: <ConversationInsightIcon />,
    direction: 'rtl',
    miniIcon: <ConversationInsightMiniIcon />,
    color: 'pink',
    animType: 'fadeIn'
  },
  {
    title: 'Values and Personalization',
    description:
      "Mila gets to know what you're good at and what you need to work on in the language you're learning. It adjusts your lessons to help you learn faster and better. By always changing and guiding you, it makes sure you're getting the best lessons to help you succeed in your language journey.",
    icon: <ValuesPersonalizationIcon />,
    direction: 'ltr',
    miniIcon: <ValuesPersonalizationMiniIcon />,
    color: 'green',
    animType: 'scaleY'
  },
  {
    title: 'Cluster and Pattern Analysis',
    description:
      "Mila finds users who learn in similar ways and groups them together. This helps it see patterns and trends, and provide the right support and lessons for each group's needs.",
    icon: <ClusterPatternIcon />,
    direction: 'rtl',
    miniIcon: <ClusterPatternMiniIcon />,
    color: 'blue',
    animType: 'fadeIn'
  },
  {
    title: 'Customized Learning Experience',
    description:
      'Mila listens to how you talk, understands how well you know the language, and uses this info to make a learning plan just for you. It finds other users who learn like you, to give you lessons and help that work best for your style. With Mila, you can learn at your own speed and work on what you need the most. It makes learning a new language fun, effective, and tailored just for you.',
    icon: <CustomizedExperienceIcon />,
    direction: 'ltr',
    miniIcon: <CustomizedExperienceMiniIcon />,
    color: 'orange',
    animType: 'scaleY'
  }
]

const HowItWorks: FC = () => (
  <>
    <div className="w-full max-sm:p-5 sm:max-lg:px-10 2xl:px-60 xl:px-40 lg:px-20 flex mt-20 py-8 max-sm:mt-0">
      <div className="w-full">
        <h1 className="text-orange-600 font-bold text-center max-sm:mt-16">How Mila Works</h1>
        <h2 className="w-full text-center font-semibold text-orange-950 text-4xl mt-3">
          The AI Technology, Simplified
        </h2>
        <p className="w-full text-center text-orange-900 text-xl mt-5 max-sm:mt-6 max-sm:text-lg">
          Unlock the potential of artificial intelligence and experience a groundbreaking approach to language learning.
        </p>
      </div>
    </div>

    {/* The AI Technology Explained */}
    <div className="w-full max-sm:p-5 sm:max-lg:px-10 2xl:px-60 xl:px-40 lg:px-20 flex flex-col py-8 max-sm:mt-0 mb-10 relative overflow-x-clip">
      <div className="w-[460px] h-[460px] bg-pink-200 absolute top-[25%] -z-10 rounded-full left-0 -translate-x-[60%] max-sm:hidden" />
      <div className="w-[460px] h-[460px] bg-emerald-200 absolute bottom-0 -z-10 rounded-full right-0 translate-x-[50%] translate-y-[30%] max-sm:hidden" />
      {contentCards.map((card, index) => (
        <TextContentCard {...card} key={index} />
      ))}
    </div>

    <WithMila />
    <Footer />
  </>
)

export default HowItWorks
