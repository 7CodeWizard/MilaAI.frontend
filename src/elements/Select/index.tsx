import { FC, Fragment, useEffect, useState } from 'react'
import { Transition, Combobox } from '@headlessui/react'
import classNames from 'classnames'
import { BsChevronExpand, BsCheckLg } from 'react-icons/bs'
import { Spinner } from '../../components/Icons'

export interface IOption {
  value: string | number
  label: string
}

export interface SelectProps {
  options: Array<IOption>
  value: IOption
  onChange: (value: IOption) => void
  className?: string
  isLoading?: boolean
  selectClass?: string
  isSearchable?: boolean
  disabled?: boolean
  position?: 'top' | 'bottom'
}

const Select: FC<SelectProps> = ({
  options,
  value,
  onChange,
  className,
  isLoading,
  selectClass,
  isSearchable = false,
  disabled = false,
  position = 'bottom'
}) => {
  const [query, setQuery] = useState('')
  const [filtered, setFiltered] = useState(options)

  useEffect(() => {
    setFiltered(
      options.filter((option) => option.label.toLowerCase().indexOf(query.toLowerCase()) !== -1)
    )
  }, [query, options])

  return (
    <Combobox value={value} onChange={onChange} disabled={disabled}>
      {({ open }) => (
        <>
          <div className={classNames('relative', className || '')}>
            {isSearchable ? (
              <div>
                <Combobox.Input
                  className={classNames(
                    'relative h-full w-full cursor-text rounded-md border border-slate-200 py-2 pl-3 pr-10 text-left shadow-sm focus:border-blue-500 focus:outline-none sm:text-sm',
                    disabled ? 'text-slate-400 cursor-not-allowed' : 'bg-white'
                  )}
                  onChange={(e) => {
                    setQuery(e.target.value)
                  }}
                  displayValue={() => value.label}
                />
                <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                  <span className="truncate text-left flex gap-3 items-center dark:text-white">
                    {isLoading && <Spinner />}
                    {value.label}
                  </span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 dark:text-white">
                    <BsChevronExpand />
                  </span>
                </Combobox.Button>
              </div>
            ) : (
              <Combobox.Button
                className={classNames(
                  selectClass ||
                    'relative h-full w-full cursor-default rounded-md border py-2 pl-3 pr-10 text-left shadow-sm focus:border-blue-500 focus:outline-none sm:text-sm'
                )}
              >
                <span className="truncate text-left flex gap-3 items-center dark:text-white">
                  {isLoading && <Spinner />}
                  {value.label}
                </span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 dark:text-white">
                  <BsChevronExpand />
                </span>
              </Combobox.Button>
            )}

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Combobox.Options
                className={classNames(
                  'py-1.5 absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white text-base shadow-lg ring-opacity-5 focus:outline-none sm:text-sm',
                  position === 'bottom' ? 'mt-1' : 'bottom-[calc(100%+4px)]'
                )}
              >
                {filtered.map((option) => (
                  <Combobox.Option
                    key={option.value}
                    className={({ active }) =>
                      classNames(
                        active ? 'bg-blue-200' : 'text-gray-900',
                        'relative cursor-pointer select-none py-2 px-3'
                      )
                    }
                    value={option}
                  >
                    <div className="flex justify-between w-full items-center">
                      <span
                        className={classNames(
                          value.value === option.value ? 'text-neutral-900' : 'text-neutral-600',
                          'break-all flex-1'
                        )}
                      >
                        {option.label}
                      </span>

                      {value.value === option.value && (
                        <span className="flex items-center">
                          <BsCheckLg />
                        </span>
                      )}
                    </div>
                  </Combobox.Option>
                ))}
                {filtered.length === 0 && <div className="p-2">Nothing found.</div>}
              </Combobox.Options>
            </Transition>
          </div>
        </>
      )}
    </Combobox>
  )
}

Select.defaultProps = {
  className: '',
  isLoading: false
}

export default Select
