import { FC } from 'react'
import { Popover } from '@headlessui/react'
import { classNames } from '../../utils'
import { useSettingStore } from '../../state/settingStore'

interface PopoverButtonProps {
  title: string
  description: string
  onClick: () => void
}

const PopoverButton: FC<PopoverButtonProps> = ({ title, description, onClick }) => {
  const themeColor = useSettingStore((state) => state.themeColor)

  return (
    <Popover.Button
      className={classNames(
        'bg-blue-50 rounded-2xl',
        themeColor === 'blue' ? 'bg-blue-50 hover:bg-blue-100 active:bg-blue-200' : '',
        themeColor === 'orange' ? 'bg-orange-50 hover:bg-orange-100 active:bg-orange-200' : '',
        themeColor === 'pink' ? 'bg-pink-50 hover:bg-pink-100 active:bg-pink-200' : ''
      )}
      onClick={onClick}
    >
      <div className="text-left px-4 py-2">
        <h3
          className={classNames(
            'font-semibold',
            themeColor === 'blue' ? 'text-blue-950' : '',
            themeColor === 'orange' ? 'text-orange-950' : '',
            themeColor === 'pink' ? 'text-pink-950' : ''
          )}
        >
          {title}
        </h3>
        <h3
          className={classNames(
            'text-sm font-medium mt-1',
            themeColor === 'blue' ? 'text-blue-950' : '',
            themeColor === 'orange' ? 'text-orange-950' : '',
            themeColor === 'pink' ? 'text-pink-950' : ''
          )}
        >
          {description}
        </h3>
      </div>
    </Popover.Button>
  )
}

export default PopoverButton
