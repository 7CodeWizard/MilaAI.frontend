import { Toast, toast, useToasterStore } from 'react-hot-toast'
import { FREE_TRIAL } from '../utils/constant'
import { classNames } from '../utils'
import { useAuthStore } from '../state'
import { FC, useState } from 'react'
import { PLANS } from '../constants'
import Button from '../components/Button'
import api from '../services/restApi'

interface MembershipItemProps {
  bestDeal: boolean
  icon: JSX.Element
  priceId: string
  title: string
  price: string
  priceDescription: string
  active: boolean
  paymentLink: string
  onClick: () => void
}

const MembershipItem: FC<MembershipItemProps> = ({
  bestDeal,
  icon,
  title,
  price,
  priceDescription,
  active,
  onClick
}) => {
  return (
    <div
      className={classNames(
        'rounded-xl p-4 flex gap-4 items-center cursor-pointer',
        active
          ? 'shadow-[0_0_0_4px_#D1FAE5] border border-[#93C5FD]'
          : 'border border-slate-300 bg-slate-50 dark:bg-blue-600 dark:text-white dark:border-blue-600'
      )}
      onClick={onClick}>
      {icon}
      <div className="flex flex-col text-sm flex-1">
        <div className="flex items-center justify-between">
          <h3 className="text-slate-700 dark:text-white font-semibold">{title}</h3>
          {bestDeal && (
            <div className="bg-green-50 border border-green-200 shadow-sm rounded-2xl px-3 py-1">
              <h3 className="text-green-900 font-medium text-xs">Best Deal</h3>
            </div>
          )}
        </div>
        <div className="flex gap-1">
          <h3 className="text-slate-600 font-bold dark:text-white mt-2">{price}, </h3>
          <h3 className="text-slate-600 dark:text-white mt-2">{priceDescription}</h3>
        </div>
      </div>
    </div>
  )
}

interface MembershipToastProps extends Toast {
  dailyLimitReached?: boolean
}

const MembershipToast: FC<MembershipToastProps> = ({ id, visible, dailyLimitReached = false }) => {
  const [activeId, setActiveId] = useState('')
  const [isSubscribing, setSubscribing] = useState(false)

  const onSubscribe = () => {
    setSubscribing(true)

    api.stripe
      .createSubscriptionLink({
        price_id: activeId
      })
      .then(({ payment_link }) => {
        location.href = payment_link
        setSubscribing(false)
      })
  }

  return (
    <div
      className={classNames(
        visible ? 'animate-enter' : 'animate-leave',
        'max-w-md w-full bg-white dark:bg-mila-gray-100 shadow-lg rounded-lg pointer-events-auto flex flex-col ring-1 ring-black ring-opacity-5 p-4'
      )}>
      <div className="flex flex-col gap-1">
        <h3 className="text-lg text-slate-900 dark:text-white font-semibold">
          {dailyLimitReached
            ? 'You have reached the daily limit'
            : 'Unlock Premium Features for Ultimate Learning'}
        </h3>
        <div className="text-sm text-slate-600 font-medium dark:text-white">
          <h3>
            When you choose Premium, you’re not just upgrading your experience - you’re supporting a
            group of passionate creators committed to bringing you the best language learning
            experience.
          </h3>
          <h3 className="mt-3 text-slate-700">✨ Unlimited access to chats</h3>
          <h3 className="mt-1 text-slate-700">✨ Get in-context translations</h3>
          <h3 className="mt-1 text-slate-700">✨ Highlighted Pronunciation Scores</h3>
          <h3 className="mt-1 text-slate-700 mb-3">✨ AI Teacher review</h3>
          <h3>
            With every Premium subscription, we reinvest in developing Mila AI, making it better for
            you every day. Thank you for believing in us and our product! 🚀
          </h3>
        </div>
      </div>

      <div className="flex flex-col gap-2 py-4">
        {PLANS.map((plan) => (
          <MembershipItem
            bestDeal={plan.bestDeal}
            icon={plan.icon}
            key={plan.id}
            priceId={plan.id}
            title={plan.title}
            price={plan.price}
            priceDescription={plan.priceDescription}
            paymentLink={plan.paymentLink}
            active={plan.id === activeId}
            onClick={() => {
              setActiveId(plan.id)
            }}
          />
        ))}
      </div>

      <div className="flex gap-3 text-sm font-semibold">
        <Button
          text="Cancel"
          size="md"
          color="white"
          className="flex-1"
          onClick={() => toast.remove(id)}
        />
        <Button
          text="Unlock Premium!"
          size="md"
          color="blue"
          className="flex-1"
          disabled={!activeId || isSubscribing}
          onClick={onSubscribe}
          isLoading={isSubscribing}
        />
      </div>
    </div>
  )
}

export const useMembership = () => {
  const [user] = useAuthStore((state) => [state.user])
  const { toasts } = useToasterStore()

  const isFreeUser = () => {
    return user && user.stripe_price_id === null
  }

  const isCancelScheduled = () => {
    return user && user.is_cancel_scheduled
  }

  const isFreeTrial = () => {
    return user && user.stripe_price_id === FREE_TRIAL
  }

  const showMembershipError = (dailyLimitReached?: boolean) => {
    if (toasts.length >= 1) return

    toast.custom((t) => <MembershipToast {...t} dailyLimitReached={dailyLimitReached} />, {
      duration: 10000
    })
  }

  return {
    showMembershipError,
    isFreeUser,
    isCancelScheduled,
    isFreeTrial
  }
}

export default useMembership
