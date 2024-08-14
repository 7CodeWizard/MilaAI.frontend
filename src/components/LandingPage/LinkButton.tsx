import classNames from 'classnames'
import { FC } from 'react'
import { useLocation, useNavigate } from 'react-router'

export interface LinkButtonProps {
  text: string
  link: string
}

const LinkButton: FC<LinkButtonProps> = ({ text, link }) => {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <button
      className={classNames(
        'text-[#475467] font-semibold underline-offset-8 hover:text-gray-500',
        location.pathname === link ? 'text-black font-bold' : ''
      )}
      onClick={() => {
        navigate(link)
      }}
    >
      {text}
    </button>
  )
}

export default LinkButton
