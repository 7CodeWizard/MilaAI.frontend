import { FC } from 'react'
import { useNavigate } from 'react-router'
import { animateScroll as scroll } from 'react-scroll'
import { MdArrowBack } from 'react-icons/md'
import Header from './Header'
import { footerLinks } from './Footer'
import LinkButton from '../../components/LandingPage/LinkButton'
import { BackToTop, Logo, Mila404 } from '../../components/Icons'
import Button from '../../components/Button'
import { appLinks } from '../../utils/constant'

const Page404: FC = () => {
  const navigate = useNavigate()

  const onGoBack = () => {
    navigate(-1)
  }

  const onGoHome = () => {
    navigate(appLinks.features)
  }

  return (
    <>
      <Header />

      <div className="w-full max-sm:p-5 sm:max-lg:px-10 2xl:px-56 xl:px-40 lg:px-20 flex mt-16 py-60 max-sm:mt-0 max-sm:flex-col-reverse overflow-x-clip">
        <div className="flex-1">
          <h3 className="text-orange-600 font-bold text-left max-sm:mt-0">404 Error</h3>
          <h3 className="w-full font-semibold text-orange-950 text-6xl mt-3">Page not found</h3>
          <h3 className="w-full text-orange-900 text-xl mt-6 max-sm:mt-6 max-sm:text-lg">
            Sorry, the page you are looking for doesn't exist. <br /> Here are some helpful links:
          </h3>
          <div className="mt-12 flex gap-3 max-sm:flex-col sm:w-[400px]">
            <Button
              text="Go back"
              color="gray"
              width="fit-parent"
              outline
              icon={<MdArrowBack />}
              onClick={onGoBack}
            />
            <Button text="Take me home" color="orange" width="fit-parent" onClick={onGoHome} />
          </div>
        </div>
        <div className="flex-1 flex justify-center max-sm:mt-16">
          <Mila404 />
        </div>
      </div>

      <div className="flex max-lg:hidden">
        <div className="relative w-[300px] px-14 py-10 flex justify-center">
          <button>
            <Logo />
          </button>
        </div>
        <div className="flex flex-1 justify-center gap-16 px-8 sm:max-xl:gap-6 py-20">
          {footerLinks.map((link, index) => (
            <div key={index}>
              <LinkButton {...link} />
            </div>
          ))}
        </div>
        <div className="flex items-center pr-14 gap-20">
          <h3 className="text-gray-400">&copy;2023 Mila AI</h3>
          <button
            className="text-gray-400 flex gap-4"
            onClick={() => scroll.scrollToTop({ delay: 200 })}
          >
            <BackToTop />
          </button>
        </div>
      </div>

      <div className="lg:hidden">
        <div className="relative w-[300px] py-10 flex px-4">
          <button>
            <Logo />
          </button>
        </div>
        <div className="px-4 gap-4 grid grid-cols-2">
          {footerLinks.map((link, index) => (
            <div key={index}>
              <LinkButton {...link} />
            </div>
          ))}
        </div>
        <div className="flex items-center gap-20 px-4 mt-12 pb-10">
          <h3 className="text-gray-400">&copy;2023 Mila AI</h3>
        </div>
      </div>
    </>
  )
}

export default Page404
