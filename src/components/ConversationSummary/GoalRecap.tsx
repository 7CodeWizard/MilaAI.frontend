import { FC } from 'react'
import { CircleCheck, GoalTick } from '../Icons'

const GoalRecap: FC = () => (
  <div className="px-2 py-6">
    <div className="flex flex-col items-center">
      <GoalTick />
      <h3 className="mt-4 text-blue-900 text-lg font-medium">Goals Recap</h3>
      <h3 className="mt-2 text-blue-900 text-sm font-medium">You met all your chat goals!</h3>
    </div>
    <div className="flex flex-col mt-14">
      <div className="flex gap-2 items-center text-sm text-[#1E3A8A]">
        <CircleCheck />
        <div className="font-medium">
          <h3 className="text-blue-900 text-lg">🍽️ Table or Booth?</h3>
          <h3 className="text-blue-900">Answer John whether you want a table or booth.</h3>
        </div>
      </div>
      <div className="flex gap-2 items-center mt-5 text-sm text-[#1E3A8A]">
        <CircleCheck />
        <div className="font-medium">
          <h3 className="text-blue-900 text-lg">🍷 Anything to Start?</h3>
          <h3 className="text-blue-900">Ask John for a drink.</h3>
        </div>
      </div>
      <div className="flex gap-2 items-center mt-5 text-sm text-[#1E3A8A]">
        <CircleCheck />
        <div className="font-medium">
          <h3 className="text-blue-900 text-lg">🥪 Extras with That?</h3>
          <h3 className="text-blue-900">Order a meal from John.</h3>
        </div>
      </div>
    </div>
    <h3 className="text-center mt-20 text-xl text-blue-900 italic">Nice!</h3>
  </div>
)

export default GoalRecap
