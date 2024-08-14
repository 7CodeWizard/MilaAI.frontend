/* eslint-disable jsx-a11y/anchor-has-content */
import cn from 'classnames'
import React, { FC } from 'react'

type ClickHandler = () => void

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value?: string
  size?: 'sm' | 'md' | 'full'
  color?: 'white' | 'pink' | 'indigo'
  isLink?: boolean
  to?: string
  clickHandler?: ClickHandler
  extraClass?: string
  type?: 'button' | 'submit'
  icon?: JSX.Element
}

const Button: FC<ButtonProps> = ({
  value,
  size,
  color,
  to,
  clickHandler,
  isLink,
  extraClass,
  type = 'button',
  icon,
  className,
  ...props
}) => {
  const effectClass = cn(
    color === 'white' ? 'bg-white' : '',
    color === 'pink' ? 'bg-pink-300 hover:bg-pink-200 active:bg-pink-300' : '',
    color === 'indigo' ? 'bg-indigo hover:bg-indigo-700 active:bg-indigo text-white' : ''
  )

  const sizeClass = cn(
    size === 'sm' ? 'py-2.5 rounded-2xl' : '',
    size === 'md' ? 'px-12 py-6 rounded-2xl' : '',
    size === 'full' ? 'w-full py-4 rounded-2xl' : ''
  )

  return isLink === true ? (
    <a className={cn(effectClass, sizeClass, extraClass)} href={to} onClick={clickHandler}>
      {value}
      {icon && icon}
    </a>
  ) : (
    <button
      className={cn(effectClass, sizeClass, extraClass, className)}
      onClick={clickHandler}
      type={type}
      {...props}>
      {value}
      {icon && icon}
    </button>
  )
}

Button.defaultProps = {
  value: '',
  size: 'sm',
  color: 'indigo',
  isLink: false,
  clickHandler: () => { },
  extraClass: '',
  type: 'button'
}
export default Button
