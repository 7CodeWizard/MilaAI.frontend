import { useState } from 'react';
import { useNavigate } from 'react-router'
import { useTranslation } from 'react-i18next'
import { appLinks } from "../../utils/constant"
import { MilaConversation } from '../../components/Icons'
import CreateMyConversation from '../../pages/SectionsMine/Create';

const SectionsButtons = () => {
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation()

  const chatSections = [
    {
      title: t('sidebar.chat.mine'),
      link: appLinks.sectionsMine
    },
    {
      title: t('sidebar.chat.mila'),
      link: appLinks.sections
    },
    {
      title: t('sidebar.chat.community'),
      link: appLinks.sectionsCommunity
    },
    {
      title: t('sidebar.chat.lessons'), // Add this line for Lessons  
      link: appLinks.lessons
    }
  ]

  return (
    <>
      <div className="p-2 bg-white dark:bg-mila-gray-25 rounded-lg flex justify-between max-sm:flex-col">
        <div className='flex flex-row items-center justify-center gap-4'>
          <div className="min-w-[52px]">
            <MilaConversation />
          </div>
          <h1 className="text-blue-950 dark:text-white font-semibold text-2xl">{t('chats.mila.practise')}</h1>
        </div>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-6 py-8 font-medium text-sm lg:text-base">
        {chatSections.map((item, i) =>
          <div key={i} className="">
            <button
              className={`w-full py-6 rounded-2xl font-medium cursor-pointer hover:opacity-80 
                    ${location.pathname === item.link ? `bg-blue-600 text-white dark:bg-mila-gray-50` : 'border border-blue-600 text-blue-600 text-black'},
                    ${location.pathname === item.link ? 'shadow-xs' : ''}`
              }
              onClick={() => navigate(item.link)}
            >
              {item.title}
            </button>
          </div>
        )}
        <button className="rounded-2xl border border-fuchsia-500 text-fuchsia-600 py-6 text-sm lg:text-base hover:opacity-80" onClick={() => setCreateModalOpen(true)}>{t('chats.mine.create')} +</button>
      </div>

      <CreateMyConversation
        isOpen={isCreateModalOpen}
        onClose={() => {
          setCreateModalOpen(false)
        }}
      />
    </>
  )
}

export default SectionsButtons