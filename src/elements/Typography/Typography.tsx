import cn from 'classnames'
import React, { FC, ReactNode } from 'react'

export interface TypographyProps {
  size?: 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '7xl' | '8xl'
  color?:
    | 'black'
    | 'white'
    | 'gray'
    | 'blue'
    | 'indigo'
    | 'red'
    | 'green'
    | 'pink'
    | 'yellow'
    | string
  opacity?: number
  font?: 'DM' | 'Poppins'
  weight?: number
  align?: 'left' | 'center' | 'right'
  tracking?: 'tight' | 'tighter' | 'none' | 'wide'
  value: string | ReactNode
  extraClass?: string
}

const Typography: FC<TypographyProps> = ({
  size,
  color,
  opacity = 1,
  font = 'DM',
  weight = 4,
  align,
  tracking,
  value,
  extraClass
}) => {
  const sizeClass = cn(
    size === 'sm' ? 'text-sm' : '',
    size === 'base' ? 'text-base' : '',
    size === 'lg' ? 'text-lg max-sm:text-base' : '',
    size === 'xl' ? 'text-xl max-sm:text-lg' : '',
    size === '2xl' ? 'text-2xl max-sm:text-lg' : '',
    size === '3xl' ? 'text-3xl max-sm:text-xl' : '',
    size === '4xl' ? 'text-4xl max-sm:text-2xl' : '',
    size === '7xl' ? 'text-7xl max-sm:text-4xl' : '',
    size === '8xl' ? 'text-8xl max-sm:text-5xl' : ''
  )

  const colorClass = cn(
    color === 'black' ? 'text-black' : '',
    color === 'white' ? 'text-white' : '',
    color === 'gray' ? 'text-gray-400' : '',
    color === 'blue' ? 'text-blue-900' : '',
    color === 'pink' ? 'text-pink-300' : '',
    color === 'green' ? 'text-green-600' : '',
    color === 'indigo' ? 'text-indigo' : '',
    color === 'yellow' ? 'text-yellow-200' : ''
  )

  const weightTable = [
    '',
    'font-thin',
    'font-extralight',
    'font-light',
    'font-normal',
    'font-medium',
    'font-semibold',
    'font-bold',
    'font-extrabold',
    'font-black'
  ]

  const trackingClass = cn(
    tracking === 'tight' ? 'tracking-tight' : '',
    tracking === 'tighter' ? 'tracking-tighter' : '',
    tracking === 'wide' ? 'tracking-wide' : ''
  )

  return (
    <p
      style={{
        opacity
      }}
      className={cn(
        sizeClass,
        colorClass,
        trackingClass,
        weightTable[weight],
        align === 'center' ? 'text-center' : '',
        extraClass
      )}
    >
      {value}
    </p>
  )
}

Typography.defaultProps = {
  size: 'base',
  color: 'black',
  opacity: 1,
  font: 'DM',
  weight: 4,
  align: 'left',
  tracking: 'none',
  value: '',
  extraClass: ''
}

export default Typography
