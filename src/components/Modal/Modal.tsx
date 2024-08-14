import React, { FC, Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import classNames from 'classnames'
import './index.css'

export interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children?: React.ReactElement | React.ReactElement[] | string
  size?: string
}

const Modal: FC<ModalProps> = ({ isOpen, onClose, children, size = 'w-fit' }) => (
  <>
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-[1000]" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0">
          <div className="fixed inset-0 bg-gray-100/50 backdrop-blur-sm transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-[1000] overflow-y-auto py-10">
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
              <Dialog.Panel
                className={classNames(
                  'relative transform rounded-2xl bg-white dark:bg-slate-700 text-left transition-all custom-modal',
                  size
                )}>
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  </>
)

Modal.defaultProps = {
  children: <></>
}

export default Modal
