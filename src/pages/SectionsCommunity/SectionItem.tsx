import { FC } from 'react'
import { useNavigate } from 'react-router'
import dayjs from 'dayjs'
import { StudyMode, Section } from '../../services/interface'
import { useChatStore, useSectionsStore } from '../../state'
import { appLinks } from '../../utils/constant'
import { Heart, PlayCircled } from '../../components/Icons'
import { classNames } from '../../utils'
import { avatarBackgroundColors, avatarImages } from '../../constants/avatar'

interface SectionItemInterface {
  section: Section
  section_index: number
  onLike?: () => void
}

const SectionItem: FC<SectionItemInterface> = ({ section }) => {
  const [setCurrentSection] = useSectionsStore((state) => [state.setCurrentSection])
  const [setStudyMode] = useChatStore((state) => [state.setStudyMode])
  const navigate = useNavigate()

  const onSectionClick = async (difficulty: StudyMode) => {
    setCurrentSection(section)
    setStudyMode(difficulty)

    navigate(`${appLinks.section}/${section.id}`)
  }

  return (
    <div
      className="flex flex-col border-gray-200 w-full shadow-sm rounded-lg p-4 cursor-pointer"
      onClick={(e) => {
        onSectionClick(StudyMode.START)
        e.stopPropagation()
      }}
    >
      <div className="flex flex-col md:flex-row gap-4 py-2 w-full">
        <div>
          <div
            className={classNames(
              'max-w-[50px] max-h-[50px] rounded-full',
              avatarBackgroundColors[section.background_id || 0].bgColor
            )}>
            <img src={avatarImages[section.icon_id || 0]} />
          </div>
        </div>

        <div className="flex flex-col gap-1.5 flex-1">
          <div className="flex justify-between w-full">
            <h3 className="text-blue-800 dark:text-white font-semibold">
              {!section.title ? 'Noname' : section.title}
            </h3>
          </div>
          <div className="flex gap-2 text-sm max-md:flex-col">
            <div className="text-blue-950 dark:text-white">
              <span className="font-semibold">by</span> -{' '}
              <span className="font-medium">{section.creator}</span>
            </div>
            <div className="text-blue-950 dark:text-white">
              <span className="font-semibold">Created</span> -{' '}
              <span className="font-medium">
                {dayjs(new Date(section.creation_date)).format('MMM D, YYYY')}
              </span>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex gap-1 items-center">
              <span className="text-blue-800 dark:text-mila-gray-100">
                <PlayCircled />
              </span>
              <h3 className="text-blue-800 dark:text-white text-xs font-semibold">
                {section.times_played}
              </h3>
            </div>
            <div className="flex gap-1 items-center">
              <span className="text-blue-800 dark:text-mila-gray-100">
                <Heart />
              </span>
              <h3 className="text-blue-800 dark:text-white text-xs font-semibold">
                {section.likes}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SectionItem
