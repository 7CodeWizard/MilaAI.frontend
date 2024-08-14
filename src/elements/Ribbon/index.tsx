import { FC } from 'react'
import './index.css'
import { classNames } from '../../utils'

interface RibbonProps {
  text: string
  color: 'blue' | 'orange' | 'pink'
}

const Ribbon: FC<RibbonProps> = ({ text, color }) => (
  <div className={classNames('ribbon', color)}>{text}</div>
)

export default Ribbon
