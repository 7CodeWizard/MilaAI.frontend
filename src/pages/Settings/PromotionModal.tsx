import { FC, useState } from 'react'
import { Modal, ModalProps } from '../../components/Modal'
import { Close, LimitedTimeOnly, Promotion, Spinner } from '../../components/Icons'
import api from '../../services/restApi'
import { PLANS } from '../../constants'

const PromotionModal: FC<ModalProps> = ({ isOpen, onClose }) => {
  const [isSubscribing, setSubscribing] = useState(false)

  const onSubscribe = () => {
    setSubscribing(true)

    api.stripe
      .createSubscriptionLink({
        price_id: PLANS[0].id
      })
      .then(({ payment_link }) => {
        location.href = payment_link
        setSubscribing(false)
      })
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => { }}
      size="w-[800px] bg-[#F1F5F9] dark:bg-[#1E293B] max-lg:w-[600px] max-md:w-full max-md:mx-4">
      <div className="flex justify-end pr-2 pt-2">
        <button className="text-indigo-900 dark:text-indigo-100 outline-none" onClick={onClose}>
          <Close />
        </button>
      </div>
      <div className="px-20 py-8 w-full flex flex-col items-center max-md:px-4 select-none touch-auto relative z-[10]">
        <div className="flex items-center gap-4 max-md:flex-col">
          <div className="flex flex-col items-center">
            <h3 className="text-base font-medium text-indigo-900 dark:text-indigo-100">
              LIMITED TIME OFFER
            </h3>
            <h3 className="text-indigo-900 font-extrabold text-[39px] dark:text-indigo-100">
              SAVE 50%
            </h3>
            <h3 className="text-base font-medium text-indigo-900 dark:text-indigo-100">
              On Mila Premium
            </h3>
          </div>
          <Promotion />
        </div>
        <div className="mt-2">
          <h3 className="text-indigo-900 text-lg font-bold italic text-center dark:text-indigo-100">
            FOR FIRST 100 STUDENTS ONLY
            <br /> DON’T MISS OUT!
          </h3>
        </div>
        <div className="mt-2 w-[500px] max-md:w-full">
          <div className="-mb-[18px] -z-[1] relative">
            <LimitedTimeOnly />
          </div>
          <div className="border-[3px] border-indigo-300 bg-indigo-900 dark:bg-indigo-100 rounded-2xl overflow-hidden">
            <div className="bg-indigo-300 px-3 py-2 text-indigo-900 dark:text-indigo-100 text-xs font-medium rounded-br-2xl w-fit">
              Limited Time Only!
            </div>
            <div className="px-4 py-2">
              <div className="flex justify-between">
                <h3 className="text-indigo-100 dark:text-indigo-900 text-lg font-semibold">
                  Annual Plan (50% off)
                </h3>
                <div className="flex gap-2">
                  <h3 className="text-indigo-100 dark:text-indigo-900 text-lg line-through">
                    £120
                  </h3>
                  <h3 className="text-indigo-100 dark:text-indigo-900 text-lg italic font-semibold">
                    £60
                  </h3>
                </div>
              </div>
              <div className="flex justify-between mt-2">
                <h3 className="text-indigo-100 dark:text-indigo-900 text-sm">Billed once a year</h3>
                <h3 className="text-indigo-100 dark:text-indigo-900 text-sm">(£5/month)</h3>
              </div>
              <div className="mt-2 text-xs text-indigo-100 dark:text-indigo-900">
                <h3 className="font-bold">Benefits:</h3>
                Unlimited AI Conversations
                <br />
                Instant Translations & Definitions in Context
                <br />
                Interactive Pronunciation Practice
                <br />
                AI Tutor Grammar
              </div>
            </div>
          </div>

          <div className="mt-2 px-4 py-2 bg-indigo-100 dark:bg-indigo-900 rounded-lg">
            <div className="flex justify-between text-lg text-indigo-300 font-semibold">
              <h3>Semi-Annual Plan</h3>
              <h3>£75</h3>
            </div>
            <div className="flex justify-between text-sm text-indigo-300">
              <h3>Billed every 6 months</h3>
              <h3>(£12.50/month)</h3>
            </div>
          </div>

          <div className="mt-2 px-4 py-2 bg-indigo-100 dark:bg-indigo-900 rounded-lg">
            <div className="flex justify-between text-lg text-indigo-300 font-semibold">
              <h3>Monthly Plan</h3>
              <h3>£15</h3>
            </div>
            <div className="flex justify-between text-sm text-indigo-300">
              <h3>Billed every month</h3>
              <h3>(£15/month)</h3>
            </div>
          </div>

          <div className="mt-4">
            <button
              className="rounded-full bg-indigo-900 text-indigo-200 py-2.5 w-full dark:bg-indigo-100 dark:text-indigo-600 outline-none flex justify-center items-center gap-2"
              onClick={onSubscribe}>
              {isSubscribing && <Spinner />}
              Subscribe and save 50%
            </button>
            <button
              className="mt-2 rounded-full text-indigo-900 dark:text-indigo-100 hover:text-indigo-500 active:text-indigo-400 py-2.5 w-full font-medium outline-none"
              onClick={onClose}>
              Continue without Saving
            </button>
          </div>
          <h3 className="mt-8 text-xs text-indigo-900 dark:text-indigo-100 text-center">
            Subscriptions can be cancelled anytime.
          </h3>
        </div>
      </div>
    </Modal>
  )
}

export default PromotionModal
