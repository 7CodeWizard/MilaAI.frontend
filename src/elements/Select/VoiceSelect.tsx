import { FC, Fragment, useEffect, useState } from 'react'
import { Transition, Combobox } from '@headlessui/react'
import classNames from 'classnames'
import { BsChevronExpand, BsCheckLg } from 'react-icons/bs'
import { Microphone, Spinner } from '../../components/Icons'
import { useAudio } from '../../hooks/useAudio'

export interface IVoiceOption {
  value: number
  label: string
  url: string
}

export interface VoiceSelectProps {
  options: Array<IVoiceOption>
  value: IVoiceOption
  onChange: (value: IVoiceOption) => void
  isLoading?: boolean
  disabled?: boolean
}

const VoiceSelect: FC<VoiceSelectProps> = ({
  options,
  value,
  onChange,
  isLoading = false,
  disabled = false
}) => {
  const { playAudio } = useAudio()

  return (
    <Combobox value={value} onChange={onChange} disabled={disabled}>
      {({ open }) => (
        <>
          <div className="relative">
            <Combobox.Button className="relative h-full w-full cursor-default rounded-md border py-2 pl-3 pr-10 text-left focus:border-blue-500 focus:outline-none sm:text-sm">
              <span className="truncate text-left flex gap-3 items-center dark:text-white">
                {isLoading && <Spinner />}
                {value.label}
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 dark:text-white">
                <BsChevronExpand />
              </span>
            </Combobox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Combobox.Options className="py-1.5 absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white text-base shadow-lg ring-opacity-5 focus:outline-none sm:text-sm">
                {options.map((option) => (
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

                      <button
                        className="bg-emerald-500 active:bg-emerald-800 p-2 rounded-lg"
                        onClick={(e) => {
                          playAudio(option.url)
                          e.stopPropagation()
                        }}
                        type="button"
                      >
                        <Microphone />
                      </button>
                    </div>
                  </Combobox.Option>
                ))}
                {options.length === 0 && <div className="p-2">Nothing found.</div>}
              </Combobox.Options>
            </Transition>
          </div>
        </>
      )}
    </Combobox>
  )
}

export default VoiceSelect
