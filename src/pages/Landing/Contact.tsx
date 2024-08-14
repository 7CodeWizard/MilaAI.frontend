import { FC } from 'react'
import 'react-multi-carousel/lib/styles.css'
import { MilaSupport } from '../../components/Icons'
import Footer from './Footer'
import Button from '../../components/Button'
import WithMila from './WithMila'
import { appLinks } from '../../utils/constant'
import { Link } from 'react-router-dom'

const Contact: FC = () => (
  <>
    <div className="w-full max-sm:p-5 sm:max-lg:px-10 2xl:px-56 xl:px-40 lg:px-20 flex mt-16 py-8 max-sm:mt-0">
      <div className="w-full">
        <h1 className="text-orange-600 font-bold text-center max-sm:mt-16">Contact</h1>
        <h2 className="w-full text-center font-semibold text-orange-950 text-4xl mt-3">
          Reach Out for Support and Assistance
        </h2>
        <p className="w-full text-center text-orange-900 text-xl mt-5 max-sm:mt-6 max-sm:text-lg">
          We're here to assist you on your language learning journey. If you have any questions,
          feedback, or need support, our dedicated team is ready to help.
        </p>
      </div>
    </div>

    <div className="w-full max-sm:p-5 sm:max-lg:px-10 2xl:px-56 xl:px-40 lg:px-20 flex mt-40 py-8 max-sm:mt-0 flex-row-reverse mb-32 max-sm:flex-col overflow-x-clip relative">
      <div className="w-[460px] h-[460px] bg-pink-200 absolute top-[40%] -z-10 rounded-full left-0 -translate-x-[65%] max-sm:hidden" />
      <div className="w-[500px] h-[500px] max-sm:w-full">
        <MilaSupport />
      </div>
      <div className="flex-1 pr-32 max-lg:pr-0 sm:max-lg:mt-10 max-sm:mt-0">
        <h3 className="text-gray-900 text-4xl font-semibold">Contact us</h3>
        <p className="mt-5 text-xl text-gray-500">
          Our friendly team would love to hear from you.
        </p>

        <div className="flex mt-12 gap-10 max-sm:flex-col">
          <div className="flex flex-col flex-1">
            <h3 className="font-medium text-gray-700">First name</h3>
            <input
              className="mt-2 rounded-md px-4 py-2 bg-white text-base shadow-sm outline-none border border-gray-100"
              placeholder="First name"
            />
          </div>
          <div className="flex flex-col flex-1">
            <p className="font-medium text-gray-700">Last name</p>
            <input
              className="mt-2 rounded-md px-4 py-2 bg-white text-base shadow-sm outline-none border border-gray-100"
              placeholder="Last name"
            />
          </div>
        </div>
        <div className="flex flex-col flex-1 mt-6">
          <p className="font-medium text-gray-700">Email</p>
          <input
            className="mt-2 rounded-md px-4 py-2 bg-white text-base shadow-sm outline-none border border-gray-100"
            placeholder="you@company.com"
          />
        </div>
        <div className="flex flex-col flex-1 mt-6">
          <p className="font-medium text-gray-700">Phone number</p>
          <input
            className="mt-2 rounded-md px-4 py-2 bg-white text-base shadow-sm outline-none border border-gray-100"
            placeholder="+1 (555) 000-0000"
          />
        </div>
        <div className="flex flex-col flex-1 mt-6">
          <p className="font-medium text-gray-700">Message</p>
          <textarea className="mt-2 rounded-md px-4 py-2 bg-white text-base shadow-sm outline-none border border-gray-100"></textarea>
        </div>
        <div className="flex gap-2 mt-6">
          <input type="checkbox" />
          <p>You agree to our friendly <Link to={appLinks.privacyPolicy} className="underline underline-offset-2 hover:opacity-80">privacy policy</Link>.</p>
        </div>
        <div className="w-full mt-8">
          <Button text="Send message" width="fit-parent" size="lg" color="orange" />
        </div>
      </div>
    </div>

    <WithMila />
    <Footer />
  </>
)

export default Contact
