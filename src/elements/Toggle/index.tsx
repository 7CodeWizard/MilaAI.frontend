import { Switch } from '@headlessui/react'
import { FC } from 'react'
import { classNames } from '../../utils'

export interface ToggleProps {
  color: 'blue' | 'orange' | 'pink'
  checked: boolean
  onChange?: (checked: boolean) => void
}

const Toggle: FC<ToggleProps> = ({ color, checked, onChange }) => (
  <Switch
    checked={checked}
    onChange={onChange}
    className={classNames(
      'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none',
      checked
        ? classNames(
            color === 'blue' ? 'bg-blue-600' : '',
            color === 'orange' ? 'bg-orange-600' : '',
            color === 'pink' ? 'bg-pink-600' : ''
          )
        : 'bg-gray-200'
    )}
  >
    <span
      aria-hidden="true"
      className={`${
        checked ? 'translate-x-5' : 'translate-x-0'
      } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
    />
  </Switch>
)

export default Toggle
