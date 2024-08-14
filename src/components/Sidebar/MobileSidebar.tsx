import { FC, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import MobileSidebarItem from './MobileSidebarItem'
import { SidebarItem } from '../../interfaces'
import {
  MobileChats,
  MobileHome,
  MobileMore,
  MobileSectionSettings,
  MobileSectionSupport,
  MobilePractice,
  MobileTranslator,
  MobileWordbank
} from '../../components/Icons'
import { appLinks } from '../../utils/constant'
import { useGlobalStore } from '../../state'
import { useChat } from '../../hooks/useChat'

const MobileSidebar: FC = () => {
  const [isMobile, isIPad] = useGlobalStore((state) => [state.isMobile, state.isIPad])
  const [activeButtonIndex, setActiveButtonIndex] = useState<number | null>(null)
  const [opened, setOpened] = useState(false)
  const navigate = useNavigate()

  const { isChatPage } = useChat()

  const mobileSidebarItems: SidebarItem[] = [
    {
      title: 'Home',
      icon: <MobileHome />,
      bgColor: 'bg-green',
      link: appLinks.home,
      textColor: 'text-green'
    },
    {
      title: 'Chats',
      icon: <MobileChats />,
      bgColor: 'bg-green',
      link: appLinks.sectionsMine,
      textColor: 'text-green',
      align: 'left'
    },
    {
      title: 'Practice',
      icon: <MobilePractice />,
      bgColor: 'bg-green',
      link: appLinks.wordbank,
      textColor: 'text-green',
      children: [
        {
          title: 'Translator',
          link: appLinks.translator,
          icon: <MobileTranslator />
        },
        {
          title: 'Word Bank',
          link: appLinks.wordbank,
          icon: <MobileWordbank />
        }
      ],
      align: 'right'
    },
    {
      title: 'More',
      icon: <MobileMore />,
      bgColor: 'bg-green',
      link: appLinks.home,
      textColor: 'text-green',
      children: [
        {
          title: 'Support',
          link: appLinks.support,
          icon: <MobileSectionSupport />
        },
        {
          title: 'Settings',
          link: appLinks.settings,
          icon: <MobileSectionSettings />
        }
      ]
    }
  ]

  const handleClick = (index: number) => {
    setActiveButtonIndex(index);
    navigate(mobileSidebarItems[index].link)
    if (mobileSidebarItems[index].children) {
      setOpened(!opened)
      return
    }
  };

  useEffect(() => {
    if (activeButtonIndex !== 3) setOpened(false)
  }, [activeButtonIndex])

  return (isMobile || isIPad) && isChatPage() ? (
    <></>
  ) : (
    <div className="shadow-[0_0_2px_0px_rgba(205,205,205,1)] fixed left-0 right-0 bottom-0 z-50 flex justify-between bg-slate-50 p-2 rounded-tl-2xl rounded-tr-2xl lg:hidden dark:bg-mila-gray-25 dark:shadow-none">
      {mobileSidebarItems.map((item, index) => (
        <MobileSidebarItem
          key={index}
          {...item}
          isActive={index === activeButtonIndex}
          onClick={() => handleClick(index)}
          opened={opened}
        />
      ))}
    </div>
  )
}

export default MobileSidebar
