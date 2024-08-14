import { FC, forwardRef, JSX, PropsWithoutRef } from 'react'
import { classNames } from '../../utils'

export interface TextareaProps extends PropsWithoutRef<JSX.IntrinsicElements['textarea']> {
  className?: string
  label?: string
  helperText?: string
  errorMessage?: string
}

const Textarea: FC<TextareaProps> = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, helperText, errorMessage, ...props }, ref) => (
    <div className="w-full flex-col">
      {label && (
        <h3 className="text-sm font-medium mb-1.5 pl-1 text-[#334155] dark:text-slate-700">
          {label}
        </h3>
      )}
      <textarea
        className={classNames(
          'border border-[#CBD5E1] rounded-lg px-3 py-2 outline-none w-full dark:bg-transparent dark:border-slate-300 dark:text-slate-700',
          className
        )}
        {...props}
        ref={ref}
      />
      {errorMessage && <h3 className="text-sm text-red-500 pl-1">{errorMessage}</h3>}
      {helperText && <h3 className="text-sm mt-1 pl-1 text-[#475569]">{helperText}</h3>}
    </div>
  )
)

export default Textarea
