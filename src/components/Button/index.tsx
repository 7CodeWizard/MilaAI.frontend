import { FC } from 'react'
import classNames from 'classnames'
import { Spinner } from '../Icons'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?:
  | 'white'
  | 'slate'
  | 'gray'
  | 'zinc'
  | 'neutral'
  | 'red'
  | 'orange'
  | 'amber'
  | 'yellow'
  | 'lime'
  | 'green'
  | 'emerald'
  | 'teal'
  | 'cyan'
  | 'sky'
  | 'blue'
  | 'indigo'
  | 'violet'
  | 'purple'
  | 'pink'
  | 'rose'
  | 'lightblue'
  | 'border-only'
  text: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  width?: 'fit-parent' | 'fit-content'
  isLoading?: boolean
  outline?: boolean
  icon?: JSX.Element | null
  iconPosition?: 'start' | 'end'
}

const Button: FC<ButtonProps> = ({
  color = 'red',
  text,
  size = 'lg',
  width = 'fit-content',
  className,
  isLoading = false,
  outline = false,
  icon,
  iconPosition = 'start',
  ...props
}) => {
  let colorClass = classNames(
    color === 'white'
      ? 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 hover:text-slate-800 active:bg-slate-100 active:text-slate-700 disabled:bg-slate-50 disabled:bg-slate-50'
      : '',
    color === 'blue'
      ? 'bg-blue-600 border border-blue-600 text-white hover:bg-blue-500 hover:border-blue-500 active:border-blue-600 hover:text-white active:bg-blue-600 active:text-white disabled:bg-blue-300 disabled:border-blue-300'
      : '',
    color === 'red'
      ? 'bg-red-500 border border-red-500 text-white hover:bg-red-600 hover:text-white active:bg-red-500 active:text-white disabled:bg-red-300 disabled:border-red-300'
      : '',
    color === 'orange'
      ? 'bg-orange-400 border border-orange-400 text-white hover:bg-orange-500 hover:text-white active:bg-orange-400 active:text-white disabled:bg-orange-300 disabled:border-orange-300'
      : '',
    color === 'purple'
      ? 'bg-purple-600 border border-purple-600 text-white hover:bg-purple-700 hover:text-white active:bg-purple-600 active:text-white disabled:bg-purple-300 disabled:border-purple-300'
      : '',
    color === 'pink'
      ? 'bg-fuchsia-500 border border-pink-600 text-white hover:bg-fuchsia-400 hover:text-white active:bg-fuchsia-600 active:text-white disabled:bg-fuchsia-300 disabled:border-pink-300'
      : '',
    color === 'green'
      ? 'bg-green-500 border border-green-500 text-white hover:bg-green-600 hover:text-white active:bg-green-500 active:text-white disabled:bg-green-300 disabled:border-green-300'
      : '',
    color === 'emerald'
      ? 'bg-emerald-500 border border-emerald-300 text-white hover:bg-emerald-400 hover:text-white active:bg-emerald-300 active:text-white disabled:bg-emerald-300 disabled:border-emerald-300'
      : '',
    color === 'yellow'
      ? 'bg-yellow-300 border border-yellow-300 text-yellow-900 hover:bg-yellow-400 hover:text-white active:bg-yellow-300 active:text-white disabled:bg-yellow-300 disabled:border-yellow-300'
      : '',
    color === 'lightblue'
      ? 'bg-blue-300 border border-blue-400 text-white hover:bg-blue-300 hover:text-white active:bg-blue-400 active:text-white disabled:bg-blue-300 disabled:border-blue-300'
      : '',
    color === 'border-only' ? '' : ''
  )

  if (outline) {
    colorClass = classNames(
      color === 'blue'
        ? 'border border-blue-500 text-blue-500 hover:bg-blue-600 hover:text-white active:bg-blue-500 active:text-white disabled:bg-blue-300 disabled:border-blue-300'
        : '',
      color === 'gray'
        ? 'font-medium border border-gray-300 text-gray-700 hover:bg-gray-50 active:bg-white disabled:bg-gray-300 disabled:border-gray-300'
        : '',
      color === 'red'
        ? 'border text-red-500 border-red-500 text-white hover:bg-red-600 hover:text-white active:bg-red-500 active:text-white disabled:bg-red-300 disabled:border-red-300'
        : '',
      color === 'orange'
        ? 'border text-orange-400 border-orange-400 text-white hover:bg-orange-500 hover:text-white active:bg-orange-400 active:text-white disabled:bg-orange-300 disabled:border-orange-300'
        : '',
      color === 'purple'
        ? 'border text-purple-600 border-purple-600 text-white hover:bg-purple-700 hover:text-white active:bg-purple-500 active:text-white disabled:bg-purple-300 disabled:border-purple-300'
        : '',
      color === 'pink'
        ? 'border text-pink-500 border-pink-500 text-white hover:bg-pink-600 hover:text-white active:bg-pink-500 active:text-white disabled:bg-pink-300 disabled:border-pink-300'
        : '',
      color === 'green'
        ? 'border text-green-500 border-green-500 text-white hover:bg-green-600 hover:text-white active:bg-green-500 active:text-white disabled:bg-green-300 disabled:border-green-300'
        : '',
      color === 'emerald'
        ? 'border text-emerald-300 border-emerald-300 text-white hover:bg-emerald-400 hover:text-white active:bg-emerald-300 active:text-white disabled:bg-emerald-300 disabled:border-emerald-300'
        : '',
      color === 'yellow'
        ? 'border text-yellow-300 border-yellow-300 text-yellow-900 hover:bg-yellow-400 hover:text-white active:bg-yellow-300 active:text-white disabled:bg-yellow-300 disabled:border-yellow-300'
        : '',
      color === 'lightblue'
        ? 'border text-blue-300 border-blue-400 text-white hover:bg-blue-300 hover:text-white active:bg-blue-400 active:text-white disabled:bg-blue-300 disabled:border-blue-300'
        : '',
      'bg-white'
    )
  }

  const sizeClass = classNames(
    size === 'xs' ? 'px-2 py-1 rounded-sm text-xs' : '',
    size === 'sm' ? 'px-2 py-1 rounded-xl text-sm' : '',
    size === 'md' ? 'px-2.5 py-1.5 rounded-xl text-sm' : '',
    size === 'lg' ? 'px-5 py-2.5 rounded-xl' : '',
    size === 'xl' ? 'px-6 py-4 rounded-xl' : ''
  )

  const borderRadius = ''
  const widthClass = width === 'fit-content' ? 'w-fit' : 'w-full'
  const iconElem = (
    <span className={text ? (iconPosition === 'start' ? 'mr-1' : 'ml-1') : ''}>
      {isLoading ? <Spinner /> : icon}
    </span>
  )

  return (
    <button
      {...props}
      className={classNames(
        'py-4 flex items-center font-semibold outline-none',
        'dark:bg-mila-gray-25 dark:active:bg-slate-500 dark:border-mila-gray-100',
        colorClass,
        sizeClass,
        borderRadius,
        'h-fit flex justify-center',
        widthClass,
        className
      )}>
      {iconPosition === 'start' && icon && iconElem}
      {isLoading && !icon && (
        <div className="mr-2">
          <Spinner />
        </div>
      )}
      {text}
      {iconPosition === 'end' && icon && iconElem}
    </button>
  )
}

export default Button
