import { FC, JSX, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import dayjs from 'dayjs'
import { PLANS } from '../../constants'
import { classNames } from '../../utils'
import Button from '../../components/Button'
import { useAuthStore } from '../../state'
import {
  PremiumFeatureIcon1,
  PremiumFeatureIcon2,
  PremiumFeatureIcon3,
  PremiumFeatureIcon4,
  Spinner
} from '../../components/Icons'
import api from '../../services/restApi'
import useMembership from '../../hooks/useMembership'
import Mila from '../../assets/images/mila/premium-mila.png'
import PremiumCancelMila from '../../assets/images/mila/premium-cancel-mila.png'
import FeatureCard from '../../components/FeatureCard'
import { FREE_TRIAL } from '../../utils/constant'
import PromotionModal from './PromotionModal'

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
  const { t } = useTranslation()

  return (
    <div
      className={classNames(
        'rounded-xl p-4 flex gap-4 cursor-pointer',
        active
          ? 'shadow-[0_0_0_4px_#D1FAE5] dark:shadow-[0_0_0_4px_#020617]'
          : 'bg-slate-50 dark:bg-mila-gray-100 dark:text-white dark:border-blue-600'
      )}
      onClick={onClick}>
      {icon}
      <div className="flex flex-col text-sm flex-1">
        <div className="flex items-center justify-between">
          <h3 className="text-slate-700 text-lg dark:text-white font-semibold">{title}</h3>
          <div className="flex items-center gap-2">
            {bestDeal && (
              <div className="bg-green-50 border border-green-200 shadow-sm rounded-2xl px-3 py-1">
                <h3 className="text-green-900 font-medium text-sm">
                  {t('subscription.best-deal')}
                </h3>
              </div>
            )}
            <h3 className="text-slate-600 text-sm dark:text-white">{price}</h3>
          </div>
        </div>
        <div className="flex gap-1">
          <h3 className="text-slate-600 dark:text-white mt-2">{priceDescription}</h3>
        </div>
      </div>
    </div>
  )
}

const Membership: FC = () => {
  const { t } = useTranslation()
  const [user, setUser] = useAuthStore((state) => [state.user, state.setUser])
  const [activeId, setActiveId] = useState(user.stripe_price_id)
  const [isSubscribing, setSubscribing] = useState(false)
  const [isReactivating, setReactivating] = useState(false)
  const [isCancelling, setCancelling] = useState(false)
  const { isFreeUser, isCancelScheduled, isFreeTrial } = useMembership()
  const [currentPlan, setCurrentPlan] = useState(PLANS[0])
  const expireDate = dayjs(new Date(user.plan_expired_on)).format('MMM D, YYYY')
  const [isPromoOpened, setPromoOpened] = useState(false)

  const onCancelSubscription = () => {
    setCancelling(true)
    api.stripe
      .cancelSubscription()
      .then(() => {
        setCancelling(false)
        setUser({
          ...user,
          is_cancel_scheduled: true
        })
      })
      .catch(() => {
        setCancelling(false)
      })
    return
  }

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

  const onReactivateSubscription = () => {
    setReactivating(true)
    api.stripe.reactivateSubscription().then(() => {
      setUser({
        ...user,
        is_cancel_scheduled: false
      })
      setReactivating(false)
    })
  }

  useEffect(() => {
    setCurrentPlan(PLANS.find((plan) => plan.id === user.stripe_price_id))
  }, [user.stripe_price_id])

  useEffect(() => {
    if (user.stripe_price_id === null || user.stripe_price_id === FREE_TRIAL) setPromoOpened(true)
  }, [user])

  return (
    <>
      <PromotionModal isOpen={isPromoOpened} onClose={() => setPromoOpened(!isPromoOpened)} />

      <div className="flex md:items-center p-4 gap-4 max-md:flex-col bg-slate-50 dark:bg-mila-gray-25 shadow-[0_1px_2px_0_rgba(2,6,23,0.30)] rounded-2xl">
        <div className="min-w-[131px]">
          <img src={isCancelScheduled() ? PremiumCancelMila : Mila} />
        </div>
        <div>
          <h3 className="text-blue-950 dark:text-white font-semibold text-2xl">
            {currentPlan
              ? 'Mila Premium'
              : isFreeTrial()
                ? 'Mila Premium(Free Trial)'
                : 'Mila Starter'}
          </h3>
          <h3 className="mt-2 text-xl font-medium text-slate-800 dark:text-slate-100">
            {isFreeUser()
              ? t('subscription.say-goodbye-to-limited-ai')
              : isFreeTrial()
                ? t('subscription.subscription-will-expire-on', { date: expireDate })
                : isCancelScheduled()
                  ? t('subscription.subscription-will-expire-on', { date: expireDate })
                  : t('subscription.thanks-for-support')}
          </h3>
        </div>
      </div>

      <h3 className="my-6 px-4 text-2xl font-semibold text-blue-950 dark:text-white">
        {t('subscription.premium-benefits')}
      </h3>
      <div className="grid grid-cols-2 max-md:grid-cols-1 gap-2">
        <FeatureCard
          icon={<PremiumFeatureIcon1 />}
          title={t('subscription.unlimited-ai-conversations')}
          description={t('subscription.unlimited-ai-conversations.description')}
        />
        <FeatureCard
          icon={<PremiumFeatureIcon2 />}
          title={t('subscription.interactive-pronunciation-practice')}
          description={t('subscription.interactive-pronunciation-practice.description')}
        />
        <FeatureCard
          icon={<PremiumFeatureIcon3 />}
          title={t('subscription.contextual-language-support')}
          description={t('subscription.contextual-language-support.description')}
        />
        <FeatureCard
          icon={<PremiumFeatureIcon4 />}
          title={t('subscription.ai-tutor-grammar-review')}
          description={t('subscription.ai-tutor-grammar-review.description')}
        />
      </div>

      {(isFreeUser() || isFreeTrial()) && (
        <>
          <h3 className="my-6 px-4 text-2xl font-semibold text-blue-950 dark:text-white">
            {t('subscription.find-best-subscription-plan')}
          </h3>
          <div className="flex flex-col gap-3">
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
                onClick={() => setActiveId(plan.id)}
              />
            ))}
          </div>
        </>
      )}

      {(isFreeUser() || isFreeTrial()) && (
        <div className="mt-4 w-full">
          <Button
            text={t('subscription.unlock-premium')}
            width="fit-parent"
            color="blue"
            disabled={!activeId || isSubscribing || activeId === FREE_TRIAL}
            onClick={onSubscribe}
            isLoading={isSubscribing}
          />
        </div>
      )}

      <h3 className="my-6 px-4 text-2xl font-semibold text-blue-950 dark:text-white">
        {t('subscription.manage-subscription')}
      </h3>

      <div className="flex items-center gap-6">
        <div className="min-w-[150px]">
          <div className="bg-green-50 text-green-700 dark:bg-mila-gray-25 dark:text-white dark:border-none text-sm font-medium border border-green-200 rounded-2xl px-3 py-1 w-fit h-fit whitespace-nowrap">
            {t('subscription.current-plan')}
          </div>
        </div>
        <h3 className="text-slate-800 font-semibold dark:text-white">
          {currentPlan
            ? currentPlan.title
            : isFreeTrial()
              ? 'Mila Premium(Free Trial)'
              : 'Mila Starter'}
        </h3>
      </div>
      <div className="flex gap-6">
        <div className="min-w-[150px]" />

        {!isFreeUser() && !isCancelScheduled() && !isFreeTrial() && (
          <button
            className="text-blue-700 hover:text-blue-500 active:text-blue-700 disabled:text-blue-100 flex gap-1 font-semibold"
            disabled={isCancelling}
            onClick={() => onCancelSubscription()}>
            {isCancelling && <Spinner />}
            {t('subscription.cancel-subscription')}
          </button>
        )}
        {isCancelScheduled() && (
          <button
            className="text-blue-700 hover:text-blue-500 active:text-blue-700 disabled:text-blue-100 flex gap-1 font-semibold"
            disabled={isReactivating}
            onClick={() => onReactivateSubscription()}>
            {isReactivating && <Spinner />}
            {t('subscription.reactivate-subscription')}
          </button>
        )}
      </div>

      {!isFreeUser() && (
        <div className="flex items-center gap-6 mt-4">
          <div className="min-w-[150px]">
            <div className="bg-green-50 text-green-700 dark:bg-mila-gray-25 dark:text-white dark:border-none text-sm font-medium border border-green-200 rounded-2xl px-3 py-1 w-fit h-fit whitespace-nowrap">
              {t('subscription.next-payment')}
            </div>
          </div>
          <div className="text-slate-800 text-sm dark:text-white">
            {!isFreeTrial() &&
              (isCancelScheduled()
                ? t('subscription.will-expire-on', { date: expireDate })
                : t('subscription.will-charged-on', {
                  date: expireDate,
                  price: currentPlan && currentPlan.priceValue * currentPlan.duration
                }))}
            {isFreeTrial() && t('subscription.trial-expire-on', { date: expireDate })}
          </div>
        </div>
      )}
    </>
  )
}

export default Membership
