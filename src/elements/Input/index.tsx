import { FC, forwardRef, JSX, PropsWithoutRef } from 'react'
import { classNames } from '../../utils'

export interface InputProps extends PropsWithoutRef<JSX.IntrinsicElements['input']> {
  className?: string
  label?: string
  helperText?: string
  errorMessage?: string
}

const Input: FC<InputProps> = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, helperText, errorMessage, ...props }, ref) => (
    <div className="w-full flex-col">
      {label && (
        <h3 className="text-sm font-medium mb-1.5 pl-1 text-[#334155] dark:text-white">{label}</h3>
      )}
      <input
        className={classNames(
          'border border-[#CBD5E1] rounded-lg px-3 py-2 outline-none w-full dark:bg-transparent dark:border-slate-300 dark:text-white',
          className
        )}
        {...props}
        ref={ref}
      />
      {errorMessage && <h3 className="text-sm text-red-500 pl-1">{errorMessage}</h3>}
      {!errorMessage && helperText && (
        <h3 className="text-sm mt-1 pl-1 text-[#475569] dark:text-white">{helperText}</h3>
      )}
    </div>
  )
)

export default Input
