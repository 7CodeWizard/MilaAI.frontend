import classNames from 'classnames'
import { FC } from 'react'
import { useLocation, useNavigate } from 'react-router'

export interface NavbarLinkButtonProps {
  text: string
  link: string
  onClick?: () => void
}

const NavbarLinkButton: FC<NavbarLinkButtonProps> = ({ text, link, onClick }) => {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <button
      className={classNames(
        'text-xl text-gray-500 w-full hover:text-gray-200 active:text-white leading-snug mb-6',
        'max-sm:text-black max-sm:font-semibold max-sm:text-base max-sm:text-left',
        location.pathname === link ? '' : ''
      )}
      onClick={() => {
        navigate(link, { preventScrollReset: true })
        if (onClick) onClick()
      }}
    >
      {text}
    </button>
  )
}

export default NavbarLinkButton
