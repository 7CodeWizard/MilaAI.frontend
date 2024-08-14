import { FC, useEffect, useRef, useMemo } from 'react'
import './index.css'
import { classNames } from '../../utils'

interface RangeProps {
  min: number
  max: number
  value: number
  step: number
  tooltip?: (value: number) => string
  onChange: (value: number) => void
  color?: 'blue' | 'orange' | 'pink'
}

const colors = {
  blue: '#2563eb',
  pink: '#ec4899',
  orange: '#fb923c'
}

const Range: FC<RangeProps> = ({ min, max, value, step, tooltip, onChange, color = 'orange' }) => {
  const ref = useRef<HTMLInputElement>(null)
  const labelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const progress = ((value - min) * 100.0) / (max - min)
    ref.current.style.background = `linear-gradient(to right, ${colors[color]} ${progress}%, #E5E7EB ${progress}%)`
    labelRef.current.style.left = `calc(${progress}% + (${8 - progress * 0.2}px - ${
      labelRef?.current?.clientWidth / 2
    }px))`
  }, [value])

  return (
    <div className="w-full relative">
      {tooltip && (
        <div
          className={classNames('absolute px-3 py-1 text-xs font-semibold whitespace-nowrap')}
          style={{
            top: 'calc(100% + 5px)'
          }}
          ref={labelRef}
        >
          {tooltip(value)}
        </div>
      )}
      <input
        type="range"
        className={classNames('mila-range w-full', color)}
        step={step}
        min={min}
        max={max}
        value={value}
        onChange={(e) => {
          onChange(~~e.currentTarget.value)
        }}
        ref={ref}
      />
    </div>
  )
}

export default Range
