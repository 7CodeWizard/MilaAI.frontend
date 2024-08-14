import { FC, useEffect, useState } from 'react'
import SectionSkeletons from '../Sections/SectionSkeletons'
import { Section } from '../../services/interface'
import api from '../../services/restApi'
import SectionItem from '../Sections/SectionItem'
import SectionsButtons from '../../components/Button/SectionsButtons'

const SectionsMine: FC = () => {
  const [sections, setSections] = useState<Section[]>([])
  const [isSectionLoading, setSectionLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setSectionLoading(true)

      try {
        const responseSections = await api.users.sectionsCustom()
        setSections(responseSections.sections)
        setSectionLoading(false)
      } catch (error) { }
    }

    fetchData()
  }, [])

  return (
    <div className="px-4 lg:py-14 flex justify-center max-lg:pt-4 max-lg:pb-20">
      <div className="bg-white dark:bg-mila-gray-25 rounded-xl p-2 w-[1000px] max-sm:w-full">
        <SectionsButtons />
        <div className="mt-2 flex flex-col gap-2">
          {isSectionLoading ? (
            <SectionSkeletons />
          ) : (
            <>
              {sections.length > 0 ?
                <div className="mt-2 grid grid-cols-2 gap-4 lg:gap-8">
                  {sections?.map((section: Section, index: number) => (
                    <SectionItem key={index} section={section} section_index={index + 1} type="Custom" />
                  ))}
                </div>
                :
                <p className='text-center'>You haven't created your own chat yet. <br /> Explore Mila's Chats, Community Chats, or Create Your Own!</p>
              }
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default SectionsMine
