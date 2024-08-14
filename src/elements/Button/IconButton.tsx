import { FC, ReactNode } from 'react'
import cn from 'classnames'
import { Spinner } from '../../components/Icons'

interface IconButtonInterface extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode
  color?: string
  bgColor?: string
  opacity?: number
  clickHandler?: any
  size?: string
  type?: 'button' | 'submit'
  loading?: boolean
  shadow?: boolean
}

const IconButton: FC<IconButtonInterface> = ({
  icon = <></>,
  color = 'blue',
  bgColor = 'white',
  opacity = 1,
  clickHandler = () => { },
  size = 'sm',
  type = 'button',
  loading = false,
  shadow = false,
  className,
  ...props
}) => {
  const effectClass = cn(
    bgColor === 'white' ? 'bg-white hover:bg-gray-100 active:bg-white' : '',
    bgColor === 'blue'
      ? 'bg-blue-100 hover:bg-blue-200 active:bg-blue-100 disabled:bg-blue-200'
      : '',
    bgColor === 'orange'
      ? 'bg-orange-100 hover:bg-orange-200 active:bg-orange-100 disabled:bg-orange-200'
      : '',
    bgColor === 'pink'
      ? 'bg-pink-100 hover:bg-pink-200 active:bg-pink-100 disabled:bg-pink-200'
      : '',
    bgColor === 'purple' ? 'bg-purple hover:bg-purple-800 active:bg-purple-500' : '',
    bgColor === 'indigo' ? 'bg-indigo-400 hover:bg-indigo-800 active:bg-indigo-500' : '',
    'hover:cursor-pointer',
    color === 'white' ? 'text-white' : '',
    color === 'black' ? 'text-black' : '',
    shadow ? 'shadow-lg' : ''
  )

  const sizeClass = cn(
    size === 'sm' ? 'w-12 h-12 rounded-xl' : '',
    size === 'ring' ? 'p-6 rounded-full' : ''
  )

  return (
    <button
      className={cn('flex items-center justify-center', effectClass, sizeClass, className)}
      style={{ opacity }}
      onClick={clickHandler}
      type={type}
      {...props}>
      {loading ? <Spinner /> : <div>{icon}</div>}
    </button>
  )
}

export default IconButton
