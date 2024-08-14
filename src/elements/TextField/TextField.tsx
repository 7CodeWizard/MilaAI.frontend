import classNames from 'classnames'
import { FC, ReactNode, useState } from 'react'
import { BiShow, BiHide } from 'react-icons/bi'

type RegisterHandler = (name: string) => object
export interface TextFieldProps {
  placeholder?: string
  Icon?: ReactNode
  type?: string
  name?: string
  fullWidth?: boolean
  register?: RegisterHandler
  disabled?: boolean
  shadow?: boolean
}

const TextField: FC<TextFieldProps> = ({
  placeholder,
  Icon,
  type,
  name = '',
  fullWidth = false,
  disabled = false,
  shadow = false,
  register = (name: string): any => {}
}) => {
  const [show, setShow] = useState(false)

  return (
    <div className="flex items-center relative">
      <input
        type={type === 'password' ? (show ? 'text' : 'password') : type}
        placeholder={placeholder}
        className={classNames(
          'border border-slate-200 rounded-2xl text-base h-12 font-medium outline-none',
          fullWidth ? 'w-full' : 'w-96',
          Icon ? 'pl-12' : 'p-4',
          shadow ? 'shadow-md' : ''
        )}
        style={{ fontFamily: "'Poppins', sans-serif" }}
        {...register(name)}
        disabled={disabled}
      />
      {Icon && <div className="absolute w-12 h-12 flex justify-center items-center">{Icon}</div>}
      {type === 'password' ? (
        <div className="absolute right-3 flex justify-center items-center">
          <div className="hover:cursor-pointer" onClick={() => setShow((state) => !state)}>
            {show ? <BiHide className="w-6 h-6" /> : <BiShow className="w-6 h-6" />}
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  )
}

TextField.defaultProps = {
  placeholder: 'Input here',
  type: 'text'
}

export default TextField
