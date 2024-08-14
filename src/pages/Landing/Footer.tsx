import { FC } from 'react'
import { animateScroll as scroll } from 'react-scroll'
import LinkButton, { LinkButtonProps } from '../../components/LandingPage/LinkButton'
import { appLinks, socialLinks } from '../../utils/constant'
import { BackToTop, Logo } from '../../components/Icons'
import { FaLinkedin, FaInstagram, FaDiscord } from "react-icons/fa/index";
import Input from '../../elements/Input'
import Button from '../../components/Button'
import { Link } from 'react-router-dom'

export const footerLinks: LinkButtonProps[] = [
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

const Footer: FC = () => {
  return (
    <div className="w-full relative">
      <div className="w-[340px] h-[340px] bg-pink-200 absolute -z-10 rounded-full top-0 left-0 -translate-x-[20%] -translate-y-[50%] max-sm:hidden" />
      <div className="w-[140px] h-[140px] bg-yellow-200 absolute -z-10 rounded-full top-[40%] left-[10%] -translate-x-[20%] -translate-y-[50%] max-sm:hidden" />

      <div className="px-36 max-md:px-10 md:max-lg:px-16 mt-6">
        <div className="bg-slate-50 px-48 max-md:px-10 py-16 rounded-2xl flex flex-col items-center">
          <h3 className="text-4xl text-center font-semibold text-slate-900 max-md:text-3xl">
            Still thinking about it?
          </h3>
          <h3 className="mt-5 text-slate-600 text-xl max-md:text-lg text-center">
            Sign up for our newsletter and get updates about Mila’s progress.
          </h3>
          <div className="mt-8 flex gap-4 max-md:flex-col">
            <div className="flex flex-col gap-1.5">
              <Input placeholder="Enter your email" />
              <h3 className="text-xs text-slate-600">
                We care about your data in our <Link to={appLinks.privacyPolicy} className="underline underline-offset-2 hover:opacity-80">privacy policy</Link>.
              </h3>
            </div>
            <Button text="Subscribe" color="blue" className="max-md:w-full" />
          </div>
        </div>
      </div>
      <div className="pt-12 px-36 flex flex-col md:flex-row items-start md:items-center gap-4 max-sm:px-4">
        <h3 className="text-lg font-medium text-slate-700 max-sm:text-left">Share with</h3>
        <div className="flex gap-2">
          <button
            className="bg-[#FFEDD5] text-[#C2410C] p-2 rounded-full hover:opacity-80"
            onClick={() => {
              window.open(socialLinks.instagram, '_blank', '')
            }}>
            <FaInstagram size={20} />
          </button>
          <button
            className="bg-[#FFEDD5] text-[#C2410C] p-2 rounded-full hover:opacity-80"
            onClick={() => {
              window.open(socialLinks.linkedin, '_blank', '')
            }}>
            <FaLinkedin size={20} />
          </button>
          <button
            className="bg-[#FFEDD5] text-[#C2410C] p-2 rounded-full hover:opacity-80"
            onClick={() => {
              window.open(socialLinks.discord, '_blank', '')
            }}>
            <FaDiscord size={20} />
          </button>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row items-start justify-start px-4 md:px-10 lg:px-36 pt-10">
        <div className='pb-6'>
          <button>
            <Logo />
          </button>
          <p className="text-slate-500 pt-4">
            48 Chandos Place <br />
            London <br />
            WC2N 4HS <br />
          </p>
        </div>
        <div className="w-full grid grid-cols-2 justify-between lg:flex lg:flex-row lg:justify-evenly gap-4 pb-6 lg:pt-2">
          {footerLinks.map((link, index) => (
            <div key={index}>
              <LinkButton {...link} />
            </div>
          ))}
        </div>
      </div>
      <div className="px-4 md:px-10 lg:px-36 pb-10 flex flex-row justify-between items-center">
        <p className="text-sm text-gray-400">&copy; {new Date().getFullYear()} Mila AI</p>
        <button
          className="text-gray-400 flex gap-4"
          onClick={() => scroll.scrollToTop({ delay: 200 })}>
          <BackToTop />
        </button>
      </div>
    </div>
  )
}

export default Footer
