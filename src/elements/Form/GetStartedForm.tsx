import { Typography } from '../Typography'
import { Button } from '../Button'
import { MailBox } from '../Icon'
import cn from 'classnames'

const GetStarted = ({ extraClass = '' }) => {
  return (
    <div
      className={cn(
        'bg-white shadow-md shadow-gray-100 flex justify-between py-1.5 items-center pl-7 pr-2 rounded-lg',
        extraClass
      )}
    >
      <div className="flex gap-2 items-center">
        {MailBox}
        <Typography color="gray" size="base" value="Email address" weight={4} font="Poppins" />
      </div>

      <Button
        color="indigo"
        size="md"
        icon={
          <Typography color="white" size="base" value="Get started" weight={5} font="Poppins" />
        }
      />
    </div>
  )
}

export default GetStarted
