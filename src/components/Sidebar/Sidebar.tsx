import { useTranslation } from 'react-i18next'
import { useAuthStore } from '../../state'
import { LogoSidebarLight, LogoSidebarDark, levelColors, levelIcons } from '../Icons'
import { Conversations, Home, Settings, Support, Translate, WordBank } from '../../components/Icons'
import SidebarItem from './SidebarItem'
import ExperienceBar from '../../elements/ExperienceBar'
import { SidebarItem as SidebarItemProps } from '../../interfaces'
import { appLinks } from '../../utils/constant'
import { useSettingStore } from '../../state/settingStore'

const Sidebar = () => {
  const user = useAuthStore((state) => state.user)
  const colorMode = useSettingStore((state) => state.colorMode)
  const { t } = useTranslation()

  const topSidebarItems: SidebarItemProps[] = [
    {
      title: t('sidebar.home'),
      icon: <Home />,
      bgColor: 'bg-blue-50',
      link: appLinks.home,
      textColor: 'text-blue-600'
    },
    {
      title: t('sidebar.chat'),
      icon: <Conversations />,
      bgColor: 'bg-pink-50',
      textColor: 'text-pink-600',
      link: appLinks.sectionsMine,
    },
    {
      title: t('sidebar.wordbank'),
      icon: <WordBank />,
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-600',
      link: appLinks.wordbank
    },
    {
      title: t('sidebar.translator'),
      icon: <Translate />,
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600',
      link: appLinks.translator
    }
  ]

  const bottomSidebarItems: SidebarItemProps[] = [
    {
      title: t('sidebar.support'),
      icon: <Support />,
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-600',
      link: appLinks.support
    },
    {
      title: t('sidebar.settings'),
      icon: <Settings />,
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-600',
      link: appLinks.settings
    }
  ]

  return (
    <div className="bg-slate-50 dark:bg-mila-gray-25 dark:shadow-none fixed z-50 flex shadow-gray-300 transition-all duration-300 overflow-scroll scrollbar-hide px-2 py-2 top-2 left-2 bottom-2 flex-col w-[270px] rounded-2xl max-lg:hidden shadow-sm">
      <div className="p-1">
        {colorMode === 'light' ? <LogoSidebarLight /> : <LogoSidebarDark />}
      </div>
      <div className="flex flex-1 max-md:flex-row md:flex-col">
        <div className="md:flex-1 md:overflow-y-auto flex md:flex-col">
          {topSidebarItems.map((item, index) => (
            <SidebarItem
              key={index}
              link={item.link}
              icon={item.icon}
              title={item.title}
              textColor={item.textColor}
              bgColor={item.bgColor}
            />
          ))}
        </div>

        <div>
          <div className="bg-slate-50 dark:bg-mila-gray-50 p-2 shadow-sm rounded-xl max-md:hidden">
            <h3 className="text-xs font-semibold text-[#475569] dark:text-white">
              {t('current-rank')}
            </h3>
            <div className="mt-2 flex mb-2 items-center gap-2">
              <div className="w-[25px] h-[25px]">{levelIcons[user.level]}</div>
              <div className="flex-1 flex justify-between">
                <h3
                  className="text-xs font-semibold"
                  style={{
                    color: levelColors[Math.ceil(user.level / 10)]
                  }}>
                  {user.level_name ? user.level_name.split(': ')[0] : 'None'}
                </h3>
                <h3
                  className="text-xs font-medium"
                  style={{
                    color: levelColors[Math.ceil(user.level / 10)]
                  }}>
                  {user.level_name ? user.level_name.split(': ')[1] : 'None'}
                </h3>
              </div>
            </div>
            <ExperienceBar
              progress={(user.experience * 100) / (user.experience + user.next_level_exp_req)}
            />
            <h3 className="text-xs font-semibold text-[#0F172A] dark:text-white mb-1 mt-2">
              {user.experience}/{user.experience + user.next_level_exp_req || 0}
            </h3>
          </div>

          <div className="py-5 max-md:py-0 max-sm:flex">
            {bottomSidebarItems.map((item, index) => (
              <SidebarItem
                key={index}
                link={item.link}
                icon={item.icon}
                title={item.title}
                textColor={item.textColor}
                bgColor={item.bgColor}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
