import { FC, JSX } from 'react'

interface FeatureCardProps {
  icon: JSX.Element
  title: string
  description: string
}

const FeatureCard: FC<FeatureCardProps> = ({ icon, title, description }) => (
  <div className="bg-slate-50 dark:bg-mila-gray-25 shadow-[0_1px_2px_0_rgba(2,6,23,0.30)] flex gap-2 rounded-2xl p-6">
    <div className="min-w-[40px] min-h-[40px]">{icon}</div>
    <div className="flex flex-col gap-2">
      <h3 className="text-lg font-semibold dark:text-white">{title}</h3>
      <h3 className="text-sm font-medium dark:text-white">{description}</h3>
    </div>
  </div>
)

export default FeatureCard
