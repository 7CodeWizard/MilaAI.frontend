import { FC } from 'react'
import { Helmet } from 'react-helmet'
import Pier from './../../assets/images/team/Pier.jpg'
import Melody from './../../assets/images/team/Melody.png'
import Abhay from './../../assets/images/team/Abhay.png'
import Ryan from './../../assets/images/team/Ryan.png'
import Ben from './../../assets/images/team/Ben.png'
import Jean from './../../assets/images/team/Jean.png'
import {
  CommunityIcon,
  EmpathyIcon,
  InnovationIcon,
  MiniLogo,
  QualityIcon
} from '../../components/Icons'
import Footer from './Footer'
import TeamProfile from './Profile'
import WithMila from './WithMila'

const About: FC = () => (
  <>
    <Helmet>
      <meta name="name" content="About" />
      <meta name="description" content="Empowering Language Learners Worldwide" />
    </Helmet>

    <div className="w-full max-sm:p-5 sm:max-lg:px-10 2xl:px-56 xl:px-40 lg:px-20 flex mt-16 py-8 max-sm:mt-0">
      <div className="w-full">
        <h1 className="text-orange-600 font-bold text-center max-sm:mt-16">About</h1>
        <h2 className="w-full text-center font-semibold text-orange-950 text-4xl mt-3">
          Empowering Language Learners Worldwide
        </h2>
        <p className="w-full text-center text-orange-900 text-xl mt-5 max-sm:mt-6 max-sm:text-lg">
          Discover the story behind our language learning app and the vision that drives us.
        </p>
      </div>
    </div>

    {/* Our Mission and Vision */}
    <div className="mt-48 max-sm:mt-24 w-full max-sm:px-4 sm:max-lg:px-10 2xl:px-36 xl:px-40 lg:px-20 relative">
      <div className="w-[620px] h-[520px] bg-pink-100 absolute bottom-0 -z-10 rounded-full left-0 -translate-x-[50%] translate-y-[60%]" />
      <div className="bg-orange-50 px-16 max-sm:px-4 py-20 rounded-2xl text-center">
        <h3 className="text-orange-600 font-bold text-sm">Our Mission and Vision</h3>
        <p className="mt-3 text-4xl max-sm:text-2xl font-medium text-gray-800 leading-[44px]">
          "Fueling language mastery through artificial intelligence, we're on a mission to empower learners globally with effortless, paced, and joyous language journeys. Let's shatter the barriers of global communication and culture, one personalized lesson at a time!"
        </p>
        <div className="flex mt-10 mb-6 justify-center">
          <MiniLogo />
        </div>
        <h3 className="font-bold text-orange-950">Team Mila</h3>
        <h3 className="text-sm text-gray-600 mt-2">London, UK</h3>
      </div>
    </div>

    {/* The team */}
    <div className="mt-36 max-sm:mt-12">
      <div className="w-full max-sm:px-4">
        <h3 className="text-orange-600 font-bold text-center">Meet the team</h3>
        <p className="w-full text-center font-semibold text-orange-950 text-4xl mt-3 max-sm:mt-3 max-sm:text-3xl">
          Language Lovers and AI Enthusiasts
        </p>
        <p className="mt-5 text-center text-xl sm:max-lg:px-10 2xl:px-80 xl:px-60 lg:px-20 leading-snug text-orange-950">
          Get to know the talented individuals behind our innovative language learning app.
          <br /> Our team is comprised of language lovers and AI enthusiasts who share a common
          passion for breaking barriers in language education.
        </p>
      </div>

      <div className="mt-24 flex flex-col xl:px-60 lg:px-40 md:px-10 relative max-sm:mt-12 overflow-x-clip">
        <div className="w-[500px] h-[500px] bg-emerald-100 absolute -bottom-10 -z-10 rounded-full right-0 translate-x-[60%]" />
        <div className="gap-32 grid grid-cols-3 max-md:grid-cols-1 max-md:gap-16">
          <TeamProfile
            imageUrl={Pier}
            linkedinUrl="https://www.linkedin.com/in/pierangelo-calanna-21267884"
            name="Pierangelo Calanna"
            position="Founder & CEO"
          />
          <TeamProfile
            imageUrl={Melody}
            linkedinUrl="https://www.linkedin.com/in/melody-anne-t-912707b4"
            name="Melody Truong"
            position="Co-Founder & CPO"
          />
          <TeamProfile
            imageUrl={Ryan}
            linkedinUrl="https://www.linkedin.com/in/ryanyokono"
            name="Ryan Yokono"
            position="UI Designer"
          />
          <TeamProfile
            imageUrl={Abhay}
            linkedinUrl="https://www.linkedin.com/in/abhay-gaur-69792b200"
            name="Abhay Gaur"
            position="Software Engineer"
          />
          <TeamProfile
            imageUrl={Ben}
            linkedinUrl="https://www.linkedin.com/in/benknight62"
            name="Ben Knight"
            position="Advisor"
          />
          <TeamProfile
            imageUrl={Jean}
            linkedinUrl="https://www.linkedin.com/in/jeanclaudejunqua"
            name="Jean-Claude Junqua"
            position="Advisor"
          />
        </div>
      </div>
    </div>

    {/* Our Commitment */}
    <div className="w-full max-sm:p-5 sm:max-lg:px-10 2xl:px-56 xl:px-40 lg:px-20 flex mt-60 py-8 max-sm:mt-20">
      <div className="w-full">
        <h3 className="text-orange-600 font-bold text-center">Our values</h3>
        <p className="w-full text-center font-semibold text-orange-950 text-4xl mt-3 max-sm:mt-3 max-sm:text-3xl">
          Building a Strong Foundation for Language Learning Excellence
        </p>
        <p className="w-full text-center text-orange-900 text-xl mt-5 max-sm:mt-4 max-sm:text-lg">
          At our core, we believe in the power of collaboration, innovation, and a learner-centric approach.
        </p>
      </div>
    </div>

    {/* The AI Technology Explained */}
    <div className="w-full max-sm:p-5 sm:max-lg:px-10 2xl:px-56 xl:px-40 lg:px-20 flex flex-col my-20 py-8 max-sm:mt-16">
      <div className="w-full gap-16 grid grid-cols-3 max-md:grid-cols-1">
        <div className="max-w-[450px]">
          <EmpathyIcon />
          <h3 className="mt-6 text-xl font-bold text-orange-950">Empathy</h3>
          <p className="mt-4 text-gray-600">
            We understand the challenges of learning a new language and strive to create a
            supportive and inclusive environment where learners feel understood and inspired.
          </p>
        </div>
        <div className="max-w-[450px]">
          <InnovationIcon />
          <h3 className="mt-6 text-xl font-bold text-orange-950">Innovation</h3>
          <p className="mt-4 text-gray-600">
            We embrace cutting-edge technologies and methodologies to push the boundaries of
            language education, constantly seeking new and effective ways to enhance the learning
            experience.
          </p>
        </div>
        <div className="max-w-[450px]">
          <QualityIcon />
          <h3 className="mt-6 text-xl font-bold text-orange-950">Quality</h3>
          <p className="mt-4 text-gray-600">
            We are committed to delivering the highest quality content, leveraging our expertise and
            research to ensure that every learner receives a valuable and impactful language
            learning journey.
          </p>
        </div>
      </div>

      <div className="mt-16 w-full gap-16 flex justify-center max-md:flex-col">
        <div className="max-w-[450px]">
          <CommunityIcon />
          <h3 className="mt-6 text-xl font-bold text-orange-950">Community</h3>
          <p className="mt-4 text-gray-600">
            We foster a vibrant and engaging community where learners can connect, share their
            experiences, and support each other in their language learning endeavors. Together, we create a network of language enthusiasts who inspire and motivate one another.
          </p>
        </div>
        <div className="max-w-[450px]">
          <InnovationIcon />
          <h3 className="mt-6 text-xl font-bold text-orange-950">Collaboration</h3>
          <p className="mt-4 text-gray-600">
            We foster collaboration and teamwork, bringing together diverse perspectives and
            expertise to create a dynamic and enriching learning community.
          </p>
        </div>
      </div>
    </div>

    <WithMila />
    <Footer />
  </>
)

export default About
