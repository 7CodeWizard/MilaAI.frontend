import { FC, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Gear } from '../../components/Icons'
import PersonalInfo from './PersonalInfo'
import { classNames } from '../../utils'
import Membership from './Membership'

const Settings: FC = () => {
  const { t } = useTranslation()
  const [params, setParams] = useSearchParams()
  const [activeTab, setActiveTab] = useState(params.get('tab') === '1' ? 1 : 0)

  const tabs = [t('settings.tab.personal-info'), t('settings.tab.subscription')]

  const onChangeTab = (tabIndex: number) => {
    setActiveTab(tabIndex)

    setParams((prevParams) => {
      prevParams.set('tab', tabIndex.toString())
      return prevParams
    })
  }

  return (
    <div className="px-10 pt-8 flex flex-col max-sm:px-6 max-lg:pb-24 lg:py-8">
      <div className="flex gap-4 items-center">
        <Gear />
        <h3 className="text-blue-800 dark:text-slate-300 text-2xl font-semibold">
          {t('settings.title')}
        </h3>
      </div>
      <div className="w-fit py-2 rounded-2xl my-2 flex">
        {tabs.map((tab, index) => (
          <div
            className={classNames(
              'text-sm font-semibold py-2 rounded-lg cursor-pointer',
              index === activeTab
                ? 'bg-blue-50 shadow-sm text-blue-700 dark:bg-blue-600 dark:text-slate-50'
                : 'text-slate-500',
              index === 0 && activeTab !== 0 ? 'pl-0 pr-3' : 'px-3'
            )}
            key={index}
            onClick={() => onChangeTab(index)}>
            {tab}
          </div>
        ))}
      </div>

      {activeTab === 0 && <PersonalInfo />}
      {activeTab === 1 && <Membership />}
    </div>
  )
}

export default Settings
