/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { Section } from '../../services/interface'
import api from '../../services/restApi'
import './index.css'
import SectionSkeletons from './SectionSkeletons'
import SectionItem from './SectionItem'
import SectionsButtons from '../../components/Button/SectionsButtons'

const Sections = () => {
  const [sections, setSections] = useState<Section[]>([]);
  const [isSectionLoading, setSectionLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setSectionLoading(true)

      try {
        const responseSections = await api.users.sectionsMila()
        setSections(responseSections.sections)
        setSectionLoading(false)
      } catch (err) { }
    }

    fetchData()
  }, [])

  return (
    <>
      <div className="px-4 lg:py-14 flex justify-center max-lg:pt-4 max-lg:pb-20">
        <div className="bg-white dark:bg-mila-gray-25 rounded-xl p-2 w-[1000px] max-sm:w-full">
          <SectionsButtons />
          <div className="mt-2 grid grid-cols-2 gap-4 lg:gap-8">
            {isSectionLoading ? (
              <SectionSkeletons />
            ) : (
              sections?.map((section: Section, index: number) => (
                <SectionItem key={index} section={section} section_index={index + 1} />
              ))
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Sections
