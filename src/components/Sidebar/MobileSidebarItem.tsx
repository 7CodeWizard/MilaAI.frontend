import { FC, JSX } from 'react'
import { useNavigate } from 'react-router'
import { SidebarChildItem } from '../../interfaces'
import { classNames } from '../../utils'

interface SidebarItemProps {
  icon: JSX.Element
  title: string
  link: string
  children?: SidebarChildItem[]
  isActive: boolean
  onClick: () => void
  opened: boolean
}

const MobileSidebarItem: FC<SidebarItemProps> = ({ icon, link, title, children, isActive, onClick, opened }) => {
  const navigate = useNavigate()

  return (
    <>
      {opened && children && (
        <div className="absolute bottom-full w-full flex justify-center">
          <div className="w-full px-2 py-6 bg-white dark:bg-mila-gray-50 flex gap-2 overflow-x-auto scrollbar-hide w-fit">
            {children.map((child, index) => (
              <button
                key={index}
                className="w-full px-2 py-1 flex flex-col items-center gap-1 cursor-pointer hover:opacity-80"
                onClick={() => { navigate(child.link) }}
              >
                {child.icon}
                <p className="text-sm text-blue-900 dark:text-white font-semibold">{child.title}</p>
              </button>
            ))}
          </div>
        </div>
      )}
      <button
        className={classNames(
          'rounded-lg flex flex-col py-1 w-[52px] h-[52px] gap-1 items-center active:shadow-sm',
          isActive ? 'bg-blue-500 shadow-sm text-white' : 'text-blue-900 dark:text-white'
        )}
        onClick={onClick}
      >
        <div className={isActive ? 'text-blue-50 dark:text-white' : 'text-blue-600 dark:text-white'}>
          {icon}
        </div>
        <h3 className="font-semibold text-[11px]">{title}</h3>
      </button>
    </>
  )
}

export default MobileSidebarItem
