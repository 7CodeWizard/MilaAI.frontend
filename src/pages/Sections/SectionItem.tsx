import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { StudyMode, Section } from '../../services/interface'
import { useChatStore, useSectionsStore } from '../../state'
import { useNavigate } from 'react-router'
import { appLinks } from '../../utils/constant'
import { ConversationLogo } from '../../components/Icons'

interface SectionItemInterface {
  section: Section
  section_index: number
  type?: 'Mila' | 'Custom'
}

const SectionItem: FC<SectionItemInterface> = ({ section }) => {
  const { t } = useTranslation()
  const [setCurrentSection] = useSectionsStore((state) => [state.setCurrentSection])
  const [setStudyMode] = useChatStore((state) => [state.setStudyMode])
  const navigate = useNavigate()

  const onSectionClick = async (difficulty: StudyMode) => {
    setCurrentSection(section)
    setStudyMode(difficulty)

    navigate(`${appLinks.section}/${section.id}`)
  }


  return (
    <div className="flex flex-col items-center justify-center border-gray-200 py-3 w-full shadow-sm rounded-lg px-6 cursor-pointer">
      <div className="w-full py-4 mx-auto flex flex flex-col items-center justify-center gap-2"
        onClick={(e) => {
          e.stopPropagation()
          onSectionClick(StudyMode.START)
        }}
      >
        <div className="min-w-[60px] opacity-40">
          <ConversationLogo />
        </div>
        <h2 className="text-base lg:text-lg font-semibold text-slate-700 text-center dark:text-white">
          {section.title}
        </h2>
        {section.goal_user && <p className="text-center">{section.goal_user}</p>}
        <button
          className={`hidden md:block w-fit px-6 py-3 border bg-blue-600 text-white rounded-lg shadow-sm text-base font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
          onClick={(e) => {
            e.stopPropagation()
            onSectionClick(StudyMode.START)
          }}>
          {t('Start')}
        </button>
      </div>
    </div>
  )
}

export default SectionItem
