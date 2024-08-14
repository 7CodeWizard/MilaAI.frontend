import { FC } from 'react'

const SectionSkeleton: FC = () => {
  return (
    <div className="border border-blue-300 shadow rounded-md px-4 py-8 my-1 w-full mx-auto">
      <div className="animate-pulse flex space-x-4">
        <div className="rounded-full bg-slate-200 h-12 w-12"></div>
        <div className="flex-1 space-y-4 py-1">
          <div className="h-4 bg-slate-200 rounded"></div>
          <div className="space-y-6">
            <div className="grid grid-cols-3 gap-4">
              <div className="h-4 bg-slate-200 rounded col-span-2"></div>
              <div className="h-4 bg-slate-200 rounded col-span-1"></div>
            </div>
            <div className="h-4 bg-slate-200 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

const SectionSkeletons: FC = () => {
  const skeletons = []

  for (let i = 0; i < 20; ++i) skeletons.push(<SectionSkeleton key={i} />)

  return <>{skeletons}</>
}

export default SectionSkeletons
