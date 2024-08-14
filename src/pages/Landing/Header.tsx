import { FC, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import classNames from 'classnames'
import { MdClose } from 'react-icons/md'
import { FiAlignJustify } from 'react-icons/fi'
import { Logo } from '../../components/Icons'
import Button from '../../components/Button'
import LinkButton, { LinkButtonProps } from '../../components/LandingPage/LinkButton'
import { appLinks } from '../../utils/constant'
import NavbarLinkButton from '../../components/LandingPage/NavbarLinkButton'

const links: LinkButtonProps[] = [
  {
    link: appLinks.about,
    text: 'About'
  },
  {
    link: appLinks.features,
    text: 'Features'
  },
  {
    link: appLinks.howitworks,
    text: 'How It Works'
  }
]

const mobileLinks: LinkButtonProps[] = [
  {
    link: appLinks.about,
    text: 'About'
  },
  {
    link: appLinks.features,
    text: 'Features'
  },
  {
    link: appLinks.howitworks,
    text: 'How It Works'
  },
  {
    link: appLinks.faq,
    text: 'FAQ'
  },
  {
    link: appLinks.contact,
    text: 'Contact'
  }
]

const Header: FC = () => {
  const [isNavbarOpen, setNavbarOpen] = useState(false)
  const [isScrolled, setScrolled] = useState(false)
  const navigate = useNavigate()

  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  const onGetStarted = () => {
    navigate(appLinks.home)
  }

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY >= 100)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="w-full flex overflow-x-clip justify-between max-sm:bg-orange-100 relative">
      <div className="max-sm:hidden bg-blue-200 w-[500px] h-[500px] absolute -translate-x-[40%] -translate-y-[60%] -z-10 rounded-full" />
      <div className="max-sm:hidden bg-purple-200 w-[420px] h-[420px] absolute translate-x-[30%] -translate-y-[50%] -z-10 rounded-full right-0" />
      <div
        className={classNames(
          'flex w-full fixed top-0 z-[999]',
          isScrolled ? 'bg-white shadow-sm' : ''
        )}>
        <div className="relative w-[300px] sm:px-14 py-4 max-sm:px-4 max-sm:py-3 flex sm:justify-center">
          <button>
            <Logo />
          </button>
        </div>

        <div className="flex flex-1 justify-left gap-10 px-12 sm:max-xl:gap-6 max-lg:invisible w-0">
          {links.map((link, index) => (
            <LinkButton {...link} key={index} />
          ))}
        </div>

        <div className="relative w-[250px] flex justify-center py-4 max-lg:justify-end max-sm:py-3">
          <div className="max-lg:hidden">
            <Button text="Start Learning" color="blue" size="lg" onClick={onGetStarted} />
          </div>

          <div className="lg:hidden px-4">
            <button
              className="p-3 rounded-lg text-gray-800 text-2xl"
              onClick={() => {
                setNavbarOpen(true)
              }}>
              <FiAlignJustify />
            </button>
            <div
              className={classNames(
                'bg-white flex flex-col fixed left-0 top-0 right-0 z-[1001] overflow-hidden transition-all',
                isNavbarOpen ? 'h-full' : 'h-0 py-0'
              )}>
              <div className="py-5 flex px-4 relative items-center">
                <button>
                  <Logo />
                </button>
                <button
                  className="text-gray-500 hover:text-gray-200 active:text-gray-100 absolute right-6 outline-none"
                  onClick={() => {
                    setNavbarOpen(false)
                  }}>
                  <MdClose />
                </button>
              </div>
              <div className="px-5 leading-10 bg-white py-6 flex-1">
                {mobileLinks.map((link, index) => (
                  <NavbarLinkButton
                    {...link}
                    key={index}
                    onClick={() => {
                      setNavbarOpen(false)
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
