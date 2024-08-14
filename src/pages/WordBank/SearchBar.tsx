import { FC, useState } from 'react'
import { Search } from '../../components/Icons'
import { classNames } from '../../utils'

const options = ['All', 'Learning', 'Mastered', 'Saved']

const SearchBar: FC = () => {
  const [active, setActive] = useState(0)

  return (
    <div className="my-2 flex gap-2 max-md:flex-col">
      <div className="rounded-lg bg-slate-50 dark:bg-mila-gray-100 flex gap-1 p-1 overflow-x-auto border border-slate-200 dark:border-none">
        {options.map((option, index) => (
          <button
            className={classNames(
              'rounded-lg px-3 py-2 text-sm font-semibold',
              active === index
                ? 'shadow-sm bg-white dark:bg-mila-gray-25 dark:text-white active:bg-slate-200 dark:active:bg-black border-blue-600 text-slate-700'
                : 'dark:active:bg-black active:bg-slate-100 text-slate-500'
            )}
            onClick={() => {
              setActive(index)
            }}
            key={index}
          >
            {option}
          </button>
        ))}
      </div>
      <div className="flex-1 flex items-center">
        <div className="border border-[#D0D5DD] dark:border-mila-gray-100 px-4 py-2 rounded-full flex">
          <input
            className="text-sm outline-none w-full text-slate-500 bg-transparent"
            placeholder="Search..."
          />
          <Search />
        </div>
      </div>
    </div>
  )
}

export default SearchBar
