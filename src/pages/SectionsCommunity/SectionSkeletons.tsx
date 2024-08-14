import { FC } from 'react'
import { CircleProgressSkeleton } from '../../components/CircleProgress'
import Skeleton from '../../elements/Skeleton'

const SectionSkeleton: FC = () => {
  return (
    <div className="flex flex-col border-gray-200 w-full shadow-sm rounded-lg p-2 cursor-pointer">
      <div className="flex gap-2 w-full">
        <div>
          <div className="max-w-[50px] max-h-[50px] rounded-full">
            <Skeleton variant="avatar" />
          </div>
        </div>

        <div className="flex flex-col gap-1.5 flex-1">
          <div className="flex justify-between w-full">
            <div className="w-[200px] h-[18px] my-2">
              <Skeleton variant="rectangular" width="full" height="full" isLoading />
            </div>
          </div>
          <div className="flex gap-2 text-sm max-md:flex-col">
            <div className="w-[100px] h-[12px] my-1">
              <Skeleton variant="rectangular" width="full" height="full" isLoading />
            </div>
            <div className="w-[120px] h-[12px] my-1">
              <Skeleton variant="rectangular" width="full" height="full" isLoading />
            </div>
          </div>
          <div className="w-[120px] h-[12px] my-1">
            <Skeleton variant="rectangular" width="full" height="full" isLoading />
          </div>
        </div>
      </div>
    </div>
  )
}

const SectionSkeletons: FC = () => {
  const skeletons = []

  for (let i = 0; i < 5; ++i) skeletons.push(<SectionSkeleton key={i} />)

  return <>{skeletons}</>
}

export default SectionSkeletons
