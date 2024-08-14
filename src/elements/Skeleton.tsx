import React, { FC } from 'react'
import { classNames } from '../utils'

type SizeProps = 'fit' | 'full'

export interface SkeletonProps {
  variant?: 'rectangular' | 'text' | 'circular' | 'image' | 'chart' | 'avatar'
  lines?: number
  children?: React.ReactElement | React.ReactElement[]
  width?: SizeProps
  height?: SizeProps
  isLoading?: boolean
}

interface BaseProps {
  children?: React.ReactElement | React.ReactElement[]
  width?: SizeProps
  height?: SizeProps
  isLoading?: boolean
}

interface TextProps extends BaseProps {
  lines: number
}

const getWHClass = (width: SizeProps, height: SizeProps) =>
  classNames(
    width === 'fit' ? 'w-fit' : '',
    width === 'full' ? 'w-full' : '',
    height === 'fit' ? 'h-fit' : '',
    height === 'full' ? 'h-full' : ''
  )

const Text: FC<TextProps> = ({ lines, width }) => {
  const texts = []
  for (let i = 0; i < lines; ++i) {
    texts.push(
      <div
        className={classNames(
          'h-2 bg-slate-400 rounded-full dark:bg-slate-300',
          lines === 1 ? '' : 'mb-3'
        )}
        key={i}
      />
    )
  }

  return (
    <div role="status" className="animate-pulse" style={{ width }}>
      {texts}
    </div>
  )
}

const ImageSkeleton: FC<BaseProps> = ({ children, isLoading, width, height }) =>
  isLoading ? (
    <div
      role="status"
      className={classNames('animate-pulse dark:border-slate-700', getWHClass(width!, height!))}
    >
      <div className="h-full bg-slate-400 rounded dark:bg-slate-300 relative">
        <div className="absolute flex items-center justify-center left-0 right-0 top-0 bottom-0">
          <svg
            className="w-12 h-12 text-slate-500 dark:text-slate-700"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 640 512"
          >
            <path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" />
          </svg>
        </div>
        <div className="invisible">{children}</div>
      </div>
    </div>
  ) : (
    <>{children}</>
  )

const Rectangle: FC<BaseProps> = ({ children, isLoading, width, height }) =>
  isLoading ? (
    <div
      role="button"
      className={classNames('animate-pulse dark:border-slate-700', getWHClass(width!, height!))}
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
      }}
    >
      <div
        className={classNames(
          'flex items-center justify-center bg-slate-100 rounded dark:bg-mila-gray-50 w-full h-full'
        )}
      >
        <div className="invisible w-full h-full">{children}</div>
      </div>
    </div>
  ) : (
    <>{children}</>
  )

const Circular: FC<BaseProps> = ({ children, isLoading, width, height }) =>
  isLoading ? (
    <div
      role="status"
      className={classNames('animate-pulse dark:border-slate-700', getWHClass(width!, height!))}
    >
      <div
        className={classNames(
          'flex items-center justify-center bg-slate-100 rounded-full dark:bg-slate-300 w-full h-full'
        )}
      >
        <div className="invisible w-full h-full">{children}</div>
      </div>
    </div>
  ) : (
    <>{children}</>
  )

const Chart: FC<BaseProps> = ({ width, height }) => (
  <div
    role="button"
    className={classNames(
      'max-w-sm p-4 border border-slate-300 rounded shadow animate-pulse md:p-6 dark:border-slate-700',
      getWHClass(width!, height!)
    )}
    onClick={(e) => {
      e.preventDefault()
      e.stopPropagation()
    }}
  >
    <div className="h-2.5 bg-slate-100 rounded-full dark:bg-slate-300 w-32 mb-2.5" />
    <div className="w-48 h-2 mb-10 bg-slate-100 rounded-full dark:bg-slate-300" />
    <div className="flex items-baseline mt-4 space-x-6">
      <div className="w-full bg-slate-100 rounded-t-lg h-72 dark:bg-slate-300" />
      <div className="w-full h-56 bg-slate-100 rounded-t-lg dark:bg-slate-300" />
      <div className="w-full bg-slate-100 rounded-t-lg h-72 dark:bg-slate-300" />
      <div className="w-full h-64 bg-slate-100 rounded-t-lg dark:bg-slate-300" />
      <div className="w-full bg-slate-100 rounded-t-lg h-80 dark:bg-slate-300" />
      <div className="w-full bg-slate-100 rounded-t-lg h-72 dark:bg-slate-300" />
      <div className="w-full bg-slate-100 rounded-t-lg h-80 dark:bg-slate-300" />
    </div>
    <span className="sr-only">Loading...</span>
  </div>
)

const Avatar: FC = () => (
  <div className="w-full h-full">
    <svg
      className="text-slate-100 w-full h-full dark:text-slate-300"
      aria-hidden="true"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
        clipRule="evenodd"
      />
    </svg>
  </div>
)

const Skeleton: FC<SkeletonProps> = ({ variant, lines, children, ...props }) => {
  if (variant === 'text') return <Text lines={lines || 1} {...props} />
  if (variant === 'image') return <ImageSkeleton {...props}>{children}</ImageSkeleton>
  if (variant === 'rectangular') {
    return <Rectangle {...props}>{children}</Rectangle>
  }
  if (variant === 'avatar') return <Avatar />
  if (variant === 'chart') return <Chart {...props} />
  if (variant === 'circular') return <Circular {...props}>{children}</Circular>
  return <></>
}

Skeleton.defaultProps = {
  variant: 'text',
  lines: 1
}

export default Skeleton
