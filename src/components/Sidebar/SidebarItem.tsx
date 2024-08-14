import { FC, useState } from 'react'
import { useNavigate } from 'react-router'
import { useLocation } from 'react-router-dom'
import { classNames } from '../../utils'
import { useSettingStore } from '../../state/settingStore'
import { SidebarChildItem } from '../../interfaces'
import { ArrowDown, ArrowUp } from '../Icons'

interface SidebarItemProps {
  icon: JSX.Element
  title: string
  link: string
  textColor: string
  bgColor: string
}

const SidebarItem: FC<SidebarItemProps> = ({ icon, title, link, textColor, bgColor }) => {
  const [themeColor] = useSettingStore((state) => [state.themeColor])
  const location = useLocation()
  const [isShown, setShown] = useState(false)
  const navigate = useNavigate()

  const toggleShown = () => {
    setShown(!isShown)
  }

  const onClickItem = () => {
    navigate(link)
  }

  const onClickSubItem = (link: string) => {
    navigate(link)
  }

  return (
    <div className="flex w-full flex-col">
      <div
        className={classNames(
          'md:w-full max-md:w-fit flex gap-3 hover:cursor-pointer rounded-full sm:items-center sidebar-item px-3.5 py-2.5 max-sm:mx-1 sm:my-2 h-fit',
          location.pathname.indexOf(link) !== -1 ? `${bgColor} dark:bg-mila-gray-50` : '',
          location.pathname.indexOf(link) !== -1 ? 'shadow-xs' : '',
          textColor
        )}
        onClick={onClickItem}
      >
        <div className="max-sm:w-[24px] h-[24px]">{icon}</div>
        <h3 className="max-md:hidden font-semibold">{title}</h3>
      </div>
    </div>
  )
}

export default SidebarItem
