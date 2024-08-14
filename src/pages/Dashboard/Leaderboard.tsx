import { FC, useEffect, useState } from 'react'
import { classNames } from '../../utils'
import { avatarBackgroundColors, avatarImages, levelNames } from '../../constants'
import { BronzeMedal, GoldMedal, SilverMedal, levelIcons } from '../../components/Icons'
import Select, { IOption } from '../../elements/Select'
import api from '../../services/restApi'
import { LeaderboardUser } from '../../interfaces'
import { useAuthStore } from '../../state'
import Skeleton from '../../elements/Skeleton'
import { useTranslation } from 'react-i18next'

interface RankItemProps {
  rank: number
  experience: number
  name: string
  background: number
  avatar: number
  active?: boolean
  level: number
  level_name: string
}

const RankItem: FC<RankItemProps> = ({
  rank,
  name,
  experience,
  avatar,
  background,
  active,
  level,
  level_name
}) => {
  const { t } = useTranslation()

  return (
    <div
      className={classNames(
        'mt-2 shadow-sm rounded-2xl px-4',
        active ? 'bg-yellow-50 dark:bg-mila-gray-50 sticky left-0 top-2 bottom-0 right-0 z-[5]' : ''
      )}>
      <div className="flex w-full items-center">
        <div className="w-[30px] py-2 flex justify-center">
          {rank === 1 && <GoldMedal />}
          {rank === 2 && <SilverMedal />}
          {rank === 3 && <BronzeMedal />}
          {rank > 3 && (
            <h3 className="text-slate-600 dark:text-white text-lg font-semibold">{rank}</h3>
          )}
        </div>
        <div className="flex-1 py-2 text-slate-600 flex items-center gap-4 pl-4 max-sm:flex-col">
          <div
            className={classNames(
              'min-w-[50px] min-h-[50px] max-w-[50px] max-h-[50px] w-[50px] h-[50px] rounded-full',
              avatarBackgroundColors[background].bgColor
            )}>
            <img src={avatarImages[avatar]} />
          </div>
          <h3 className="font-medium break-all dark:text-white">{active ? t('you') : name}</h3>
        </div>
        <div className="w-[130px] py-2 text-slate-600 flex justify-center items-center gap-2 max-md:flex-col max-md:w-[70px]">
          <div className="min-w-[20px] min-h-[20px] w-[20px] h-[20px]">
            {levelIcons[Math.ceil(level / 10)]}
          </div>
          <h3 className="text-sm font-medium text-slate-600 dark:text-white">
            {level_name.split(':')[0]}
          </h3>
        </div>
        <div className="py-2 text-slate-600 text-right w-[40px] dark:text-white">{experience}</div>
      </div>
    </div>
  )
}

const RankItemSkeleton: FC = () => (
  <div className={classNames('mt-2 shadow-sm rounded-2xl px-4')}>
    <div className="flex w-full items-center">
      <div className="w-[30px] py-2 flex justify-center">
        <div className="w-[15px] h-[18px] my-2">
          <Skeleton variant="rectangular" width="full" height="full" isLoading />
        </div>
      </div>
      <div className="flex-1 py-2 text-slate-600 flex items-center gap-4 pl-4">
        <div className="w-[50px] h-[50px]">
          <Skeleton variant="avatar" width="full" height="full" isLoading />
        </div>
        <div className="w-[50px] h-[18px] my-2">
          <Skeleton variant="rectangular" width="full" height="full" isLoading />
        </div>
      </div>
      <div className="w-[130px] py-2 text-slate-600 flex justify-center items-center gap-1 max-md:flex-col max-md:w-[80px]">
        <div className="min-w-[20px] min-h-[20px] max-w-[20px] max-h-[20px] w-[20px] h-[20px]">
          <Skeleton variant="circular" width="full" height="full" isLoading />
        </div>
        <div className="w-[40px] h-[18px] md:my-2">
          <Skeleton variant="rectangular" width="full" height="full" isLoading />
        </div>
      </div>
      <div className="py-2 text-slate-600 w-[40px] flex justify-end">
        <div className="w-[30px] h-[18px] my-2">
          <Skeleton variant="rectangular" width="full" height="full" isLoading />
        </div>
      </div>
    </div>
  </div>
)

const RankItemSkeletons: FC = () =>
  Array(5)
    .fill(0)
    .map((_, index) => <RankItemSkeleton key={index} />)

const Leaderboard: FC = () => {
  const [active, setActive] = useState(0)
  const { t } = useTranslation()

  const tabs = [t('everyone'), ...levelNames.slice(1)]
  const tabOptions: IOption[] = tabs.map((tab, index) => ({
    label: tab,
    value: index
  }))

  const [activeTab, setActiveTab] = useState<IOption>(tabOptions[0])
  const [users, setUsers] = useState<LeaderboardUser[]>([])
  const [filteredUsers, setFilteredUsers] = useState<LeaderboardUser[]>([])
  const [user_id] = useAuthStore((state) => [state.user.id])
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    api.dashboard.leaderboard().then((res) => {
      setUsers(res.all_users)
      setFilteredUsers(res.all_users)
      setLoading(false)
    })
  }, [])

  const getFilteredTabs = (index: number) => {
    if (index === 0) setFilteredUsers(users)
    else setFilteredUsers(users.filter((user) => Math.ceil(user.level / 10) === index))
  }

  useEffect(() => {
    getFilteredTabs(active)
  }, [active])

  useEffect(() => {
    getFilteredTabs(activeTab.value as number)
  }, [activeTab])

  return (
    <div className="rounded-3xl shadow-sm p-2">
      <div className="w-full mb-4 md:flex max-md:hidden">
        {tabs.map((tab, index) => (
          <div
            className={classNames(
              'flex-1 pb-2 text-center text-sm font-semibold cursor-pointer',
              active === index ? 'border-b-2 border-blue-700 text-blue-700' : 'text-slate-500'
            )}
            key={index}
            onClick={() => {
              if (isLoading) return
              setActive(index)
            }}>
            {tab}
          </div>
        ))}
      </div>
      <div className="w-full mb-4 md:hidden max-md:flex">
        <Select
          options={tabOptions}
          value={activeTab}
          onChange={(val) => {
            setActiveTab(val)
          }}
          className="w-full"
          disabled={isLoading}
        />
      </div>
      <div className="shadow-sm rounded-2xl px-5">
        <div className="flex w-full">
          <div className="w-[30px] py-2"></div>
          <div className="flex-1 py-2 text-slate-600 font-medium pl-4 max-sm:text-center">
            {t('learner')}
          </div>
          <div className="w-[130px] py-2 text-slate-600 font-medium text-center max-md:w-[70px]">
            {t('rank')}
          </div>
          <div className="py-2 text-slate-600 font-medium w-[40px] text-right">XP</div>
        </div>
      </div>
      <div className="h-[350px] overflow-y-scroll scrollbar-hide px-1 pb-1">
        {isLoading ? (
          <RankItemSkeletons />
        ) : (
          filteredUsers.map((user, index) => (
            <RankItem
              key={index}
              rank={index + 1}
              experience={user.experience}
              name={user.username}
              avatar={user.icon_id}
              level={user.level}
              background={user.background_id}
              level_name={user.level_name}
              active={user_id === user.user_id}
            />
          ))
        )}
      </div>
    </div>
  )
}

export default Leaderboard
