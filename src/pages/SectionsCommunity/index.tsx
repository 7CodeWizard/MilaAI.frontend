import { FC, useEffect, useState } from 'react'
import axios from 'axios'
import { useDebounce } from 'use-debounce'
import InfiniteScroll from 'react-infinite-scroll-component'

import { Search } from '../../components/Icons'
import { Section } from '../../services/interface'
import api from '../../services/restApi'
import SectionSkeletons from './SectionSkeletons'
import SectionItem from './SectionItem'
import { classNames } from '../../utils'
import { ChatFilterType } from '../../interfaces'
import SectionsButtons from '../../components/Button/SectionsButtons'

const searchOptions = [
  {
    label: 'new',
    value: 'newest'
  },
  {
    label: 'most liked',
    value: 'most_liked'
  }
]

let isEnd = false

const SectionsCommunity: FC = () => {
  const [sections, setSections] = useState<Section[]>([])
  const [searchIndex, setSearchIndex] = useState(0)
  const [query, setQuery] = useState('')
  const [debouncedQuery] = useDebounce(query, 1000)

  const fetchData = async (init: boolean) => {
    if (isEnd) return

    if (init) {
      axios.defaults.headers['Continuation-Token'] = null
      setSections([])
    }

    try {
      const responseSections = await api.users.sectionsCommunity({
        filter_type: searchOptions[searchIndex].value as ChatFilterType,
        search: debouncedQuery
      })
      if (init) {
        setSections([...responseSections.sections])
      } else {
        setSections([...sections, ...responseSections.sections])
      }
      axios.defaults.headers['Continuation-Token'] = responseSections.new_continuation_token
      isEnd = !responseSections.new_continuation_token
    } catch (error) { }
  }

  const onLike = (id: string) => {
    api.chat.like(id).then((res) => {
      setSections(
        sections.map((section) =>
          section.id === id
            ? {
              ...section,
              likes: res.total_likes
            }
            : section
        )
      )
    })
  }

  useEffect(() => {
    isEnd = false
    fetchData(true)
  }, [searchIndex, debouncedQuery])

  return (
    <div className="px-4 lg:py-14 flex justify-center max-lg:pt-4 max-lg:pb-20">
      <div className="bg-white dark:bg-mila-gray-25 rounded-xl p-2 w-[1000px] max-sm:w-full">
        <SectionsButtons />
        <div className="mt-4 flex gap-2 max-md:flex-col">
          <div className="flex gap-1">
            {searchOptions.map((option, index) => (
              <button
                key={index}
                className={classNames(
                  'uppercase w-[90px] text-xs font-semibold rounded-2xl border-2 min-h-[36px]',
                  index === searchIndex
                    ? 'text-white bg-orange-500 border-orange-500'
                    : 'border-orange-800 text-orange-800 bg-orange-50'
                )}
                onClick={() => {
                  setSearchIndex(index)
                }}>
                {option.label}
              </button>
            ))}
          </div>
          <div className="w-full border border-[#D0D5DD] px-4 py-2 rounded-full flex flex-1">
            <input
              className="text-sm outline-none w-full text-slate-500 dark:bg-transparent"
              placeholder="Search..."
              onChange={(e) => {
                setQuery(e.currentTarget.value)
              }}
              value={query}
            />
            <Search />
          </div>
        </div>

        <InfiniteScroll
          dataLength={sections.length}
          next={() => {
            fetchData(false)
          }}
          hasMore={!isEnd}
          loader={
            <div className="px-1 flex flex-col gap-2 py-1">
              <SectionSkeletons />
            </div>
          }>
          <div className="mt-2 grid grid-cols-2 gap-4 lg:gap-8 py-4">
            {sections?.map((section: Section, index: number) => (
              <SectionItem
                key={index}
                section={section}
                section_index={index + 1}
                onLike={() => {
                  onLike(section.id)
                }}
              />
            ))}
          </div>
        </InfiniteScroll>
      </div>
    </div>
  )
}

export default SectionsCommunity
