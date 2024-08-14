import { FC, Fragment } from 'react'
import { IoCloseOutline } from 'react-icons/io5'
import { Dialog, Transition } from '@headlessui/react'

import { Typography } from '../../elements/Typography'
import { ChatThreadProps } from '../../services/interface'

interface PronunciationModalProps {
  isOpen: boolean
  toggleModal: () => void
  thread: ChatThreadProps
}

const PronunciationModal: FC<PronunciationModalProps> = ({ isOpen, toggleModal, thread }) => (
  <Transition appear show={isOpen} as={Fragment}>
    <Dialog as="div" className="relative z-50" onClose={toggleModal}>
      <Transition.Child
        as={Fragment}
        enter="ease-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="fixed inset-0 bg-black bg-opacity-25" />
      </Transition.Child>

      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="w-full max-w-5xl transform overflow-hidden rounded-2xl bg-white p-8 text-left align-middle shadow-xl transition-all">
              <Dialog.Title
                as="h3"
                className="text-lg font-medium leading-6 text-gray-900 border-b border-gray-200 pb-4"
              >
                <Typography
                  value="Pronounication Correction"
                  color="black"
                  weight={6}
                  size="3xl"
                  tracking="tighter"
                />

                <div className="hover:cursor-pointer absolute top-6 right-6" onClick={toggleModal}>
                  <IoCloseOutline className="w-6 h-6 text-black" />
                </div>
              </Dialog.Title>

              <div className="relative flex flex-col gap-6">
                <div className="py-4 rounded-md">
                  <Typography
                    value={thread.pronunciation?.feedback_text}
                    color="black"
                    size="base"
                    tracking="tight"
                    weight={5}
                    font="Poppins"
                  />
                </div>

                <div className="flex justify-center">
                  <div className="w-[662px] px-4 py-8 border border-gray-200 rounded-md grid grid-cols-4 gap-4">
                    {['ACCURACY', 'FLUENCY', 'COMPLETENESS', 'PRON'].map((scoreTitle, index) => (
                      <Typography
                        key={index}
                        value={scoreTitle + 'SCORE'}
                        color="black"
                        weight={7}
                        opacity={0.7}
                        align="center"
                        tracking="tight"
                        size="sm"
                      />
                    ))}
                    {thread.pronunciation &&
                      JSON.parse(thread.pronunciation.feedback_json).NBest &&
                      [
                        JSON.parse(thread.pronunciation.feedback_json).NBest[0]
                          .PronunciationAssessment.AccuracyScore,
                        JSON.parse(thread.pronunciation.feedback_json).NBest[0]
                          .PronunciationAssessment.FluencyScore,
                        JSON.parse(thread.pronunciation.feedback_json).NBest[0]
                          .PronunciationAssessment.CompletenessScore,
                        JSON.parse(thread.pronunciation.feedback_json).NBest[0]
                          .PronunciationAssessment.PronScore
                      ].map((score, index) => (
                        <Typography
                          key={index}
                          value={score}
                          color="blue"
                          size="base"
                          tracking="tight"
                          weight={5}
                          align="center"
                          font="Poppins"
                        />
                      ))}
                  </div>
                </div>

                <div className="flex justify-center">
                  <div className="w-[350px] border border-gray-200 rounded-md grid grid-cols-2">
                    {['WORD', 'ACCURACY SCORE'].map((title, index) => (
                      <Typography
                        key={index}
                        value={title}
                        color="black"
                        opacity={0.7}
                        align="center"
                        tracking="tight"
                        weight={7}
                        size="sm"
                        extraClass="p-2 border-b border-gray-100"
                      />
                    ))}

                    {thread.pronunciation &&
                      JSON.parse(thread.pronunciation.feedback_json).NBest &&
                      JSON.parse(thread.pronunciation.feedback_json).NBest[0].Words.map(
                        (word: any, index: any) => (
                          <Typography
                            key={index}
                            value={word.Word}
                            color="black"
                            opacity={0.5}
                            align="center"
                            tracking="tight"
                            weight={5}
                            extraClass="p-2"
                          />
                        )
                      )}

                    {thread.pronunciation &&
                      JSON.parse(thread.pronunciation.feedback_json).NBest &&
                      JSON.parse(thread.pronunciation.feedback_json).NBest[0].Words.map(
                        (word: any, index: any) => (
                          <Typography
                            key={index}
                            value={word.PronunciationAssessment.AccuracyScore}
                            color="black"
                            opacity={0.5}
                            align="center"
                            tracking="tight"
                            weight={5}
                            extraClass="p-2"
                          />
                        )
                      )}
                  </div>
                </div>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </div>
    </Dialog>
  </Transition>
)

export default PronunciationModal
