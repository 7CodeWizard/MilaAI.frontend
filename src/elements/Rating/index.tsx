import { FC } from 'react'
import { RatingStar } from '../../components/Icons'
import { classNames } from '../../utils'

interface RatingProps {
  value: number
  onChange: (rating: number) => void
}

const Rating: FC<RatingProps> = ({ value, onChange }) => (
  <div className="flex gap-2.5">
    {Array(5)
      .fill('')
      .map((_, index) => (
        <button
          key={index}
          className={classNames(
            index + 1 <= value
              ? 'text-blue-700 dark:text-slate-400'
              : 'text-slate-300 dark:text-mila-gray-100',
            ''
          )}
          onClick={() => {
            onChange(index + 1)
          }}>
          <RatingStar />
        </button>
      ))}
  </div>
)

export default Rating
