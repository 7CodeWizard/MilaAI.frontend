import { FC } from 'react'
import { useNavigate } from 'react-router'
import classNames from 'classnames'
import Button from '../../components/Button'
import { appLinks } from '../../utils/constant'

export interface ContentCardProps {
  title: string
  description: string
  icon: JSX.Element
  miniIcon: JSX.Element
  buttonText: string
  color:
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
  direction: 'ltr' | 'rtl'
}

const ContentCard: FC<ContentCardProps> = ({
  title,
  description,
  buttonText,
  icon,
  direction,
  miniIcon,
  color
}) => {
  const navigate = useNavigate()

  return (
    <div className="w-full sm:max-md:mt-24 md:mt-8 px-24 py-8 max-sm:px-0 max-sm:py-4 max-sm:mt-0 md:py-8 sm:max-lg:px-4">
      <div
        className={classNames(
          'flex gap-32 max-lg:flex-col-reverse max-sm:gap-4 sm:max-lg:gap-4',
          direction === 'rtl' ? 'flex-row-reverse' : ''
        )}>
        <div className="flex-1 flex flex-col">
          <div className="py-8 max-sm:py-2">{miniIcon}</div>
          <h3
            className={classNames(
              'font-semibold text-3xl max-sm:text-3xl break-words',
              color === 'pink' ? 'text-pink-950' : '',
              color === 'yellow' ? 'text-yellow-950' : '',
              color === 'blue' ? 'text-blue-950' : '',
              color === 'green' ? 'text-green-950' : '',
              color === 'emerald' ? 'text-emerald-950' : '',
              color === 'purple' ? 'text-purple-950' : '',
              color === 'orange' ? 'text-orange-950' : ''
            )}>
            {title}
          </h3>
          <p
            className={classNames(
              'text-lg mt-8 leading-relaxed max-sm:mt-6 break-words',
              color === 'pink' ? 'text-pink-900' : '',
              color === 'yellow' ? 'text-yellow-900' : '',
              color === 'blue' ? 'text-blue-900' : '',
              color === 'green' ? 'text-green-900' : '',
              color === 'emerald' ? 'text-emerald-900' : '',
              color === 'purple' ? 'text-purple-900' : '',
              color === 'orange' ? 'text-orange-900' : ''
            )}>
            {description}
          </p>
          <Button
            text={buttonText}
            color={color}
            size="lg"
            className="mt-8"
            onClick={() => {
              navigate(appLinks.home)
            }}
          />
        </div>
        <div className="flex items-center max-sm:justify-center lg:w-[500px] max-lg:w-full hover:animate-float duration-200">
          {icon}
        </div>
      </div>
    </div>
  )
}

export interface ContentCardWithoutButtonProps {
  title: string
  description: string
  icon: JSX.Element
  miniIcon: JSX.Element
  direction: 'ltr' | 'rtl'
}

export const ContentCardWithoutButton: FC<ContentCardWithoutButtonProps> = ({
  title,
  description,
  icon,
  direction,
  miniIcon
}) => {
  return (
    <div className="w-full px-24 max-sm:px-0 sm:max-lg:px-4">
      <div
        className={classNames(
          'flex gap-32 max-lg:flex-col-reverse max-sm:gap-4 sm:max-lg:gap-4',
          direction === 'rtl' ? 'flex-row-reverse' : ''
        )}>
        <div className="flex-1 flex flex-col justify-center">
          <div className="py-6 max-sm:py-2">{miniIcon}</div>
          <h3
            className={classNames(
              'text-slate-900 font-semibold text-3xl max-sm:text-3xl break-words'
            )}>
            {title}
          </h3>
          <p className={classNames('text-lg mt-2 leading-relaxed max-sm:mt-6 break-words')}>
            {description}
          </p>
        </div>
        <div className="flex items-center max-sm:justify-center lg:w-[500px] max-lg:w-full hover:animate-float duration-200">
          {icon}
        </div>
      </div>
    </div>
  )
}

export default ContentCard
