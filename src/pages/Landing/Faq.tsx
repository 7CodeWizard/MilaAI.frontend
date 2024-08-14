import { FC } from 'react'
import 'react-multi-carousel/lib/styles.css'

import Button from '../../components/Button'
import Footer from './Footer'
import WithMila from './WithMila'

const FAQ: FC = () => {
  return (
    <>
      <div className="w-full max-sm:p-5 sm:max-lg:px-10 2xl:px-56 xl:px-40 lg:px-20 flex mt-16 py-8 max-sm:mt-0">
        <div className="w-full">
          <h1 className="text-orange-600 font-bold text-center max-sm:mt-16">FAQ</h1>
          <h2 className="w-full text-center font-semibold text-orange-950 text-4xl mt-3">
            Find Answers to Your Queries
          </h2>
          <p className="w-full text-center text-orange-900 text-xl mt-5 max-sm:mt-6 max-sm:text-lg">
            Discover answers to commonly asked questions about Mila. We have compiled a list of
            frequently asked questions to provide you with clear and comprehensive information.
          </p>
        </div>
      </div>

      <div className="w-full grid grid-cols-3 gap-20 mt-48 max-sm:grid-cols-1 px-52 max-sm:px-4 max-sm:gap-10 sm:max-lg:grid-cols-2">
        <div>
          <h3 className="text-gray-900 font-medium text-xl">Is the app suitable for beginners?</h3>
          <p className="mt-2 text-gray-500">
            Absolutely! Our app is designed to cater to learners of all levels, including beginners. Our personalized learning approach and interactive features make it easy to start your language learning journey from scratch.
          </p>
        </div>
        <div>
          <h3 className="text-gray-900 font-medium text-xl">
            How does the AI provide feedback on my pronunciation?
          </h3>
          <p className="mt-2 text-gray-500">
            Our AI analyzes your pronunciation using advanced algorithms and compares it to native speaker models. It provides instant feedback on your pronunciation accuracy, intonation, and rhythm, helping you refine your speaking skills.
          </p>
        </div>
        <div>
          <h3 className="text-gray-900 font-medium text-xl">
            Can I track my progress and see how I'm improving?
          </h3>
          <p className="mt-2 text-gray-500">
            Yes, you can! Our app includes a comprehensive progress tracking feature that allows you to monitor your language learning achievements, view your performance statistics, and identify areas for improvement.
          </p>
        </div>
        <div>
          <h3 className="text-gray-900 font-medium text-xl">
            Can I access the app on multiple devices?
          </h3>
          <p className="mt-2 text-gray-500">
            Absolutely! Our app is accessible across various devices, including smartphones,
            tablets, and computers. You can seamlessly switch between devices and continue your
            language learning progress.
          </p>
        </div>
        <div>
          <h3 className="text-gray-900 font-medium text-xl">
            What languages are currently supported by the app?
          </h3>
          <p className="mt-2 text-gray-500">
            We currently support a wide range of languages, including but not limited to English (UK and US), Spanish (MX and ES), French, German, Mandarin Chinese, Japanese, and more on the way. Check our app for the complete list of supported languages.
          </p>
        </div>
        <div>
          <h3 className="text-gray-900 font-medium text-xl">
            How can I get in touch with the customer support team?
          </h3>
          <p className="mt-2 text-gray-500">
            If you have any questions or need assistance, you can reach us via email at
            support@milaai.com. We strive to provide timely and helpful responses to all inquiries.
          </p>
        </div>
      </div>

      <div className="pt-16 pb-32 max-sm:pb-16 px-52 max-sm:px-4 relative">
        <div className="w-[460px] h-[460px] bg-pink-200 absolute -top-[60%] -z-10 rounded-full left-0 -translate-x-[65%] max-sm:hidden" />
        <div className="w-full p-8 rounded-2xl bg-gray-50 flex justify-between max-sm:flex-col">
          <div>
            <h3 className="text-gray-900 text-xl font-semibold">Still have questions?</h3>
            <p className="mt-2 text-lg text-gray-600">
              Can’t find the answer you’re looking for? Please chat to our friendly team.
            </p>
          </div>
          <div className="max-sm:mt-5">
            <Button text="Get in touch" color="orange" size="lg" />
          </div>
        </div>
      </div>

      <WithMila />
      <Footer />
    </>
  )
}

export default FAQ
