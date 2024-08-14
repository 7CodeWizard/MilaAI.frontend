import { FC } from 'react'
import Badge from '../../elements/Badge'
import { useSettingStore } from '../../state/settingStore'

const Activities: FC = () => {
  const [themeColor] = useSettingStore((state) => [state.themeColor])

  return (
    <>
      <div className="text-gray-600 border-b border-gray-300 border-dashed pb-2 w-full">
        Activities
      </div>
      <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
        <div className="flex justify-between">
          <h3 className="text-sm">Lessons completed</h3>
          <Badge value={3} color={themeColor} />
        </div>
        <div className="flex justify-between">
          <h3 className="text-sm">Learnt words</h3>
          <Badge value={150} color={themeColor} />
        </div>
        <div className="flex justify-between">
          <h3 className="text-sm">Overall rating</h3>
          <Badge value={150} color={themeColor} />
        </div>
        <div className="flex justify-between">
          <h3 className="text-sm">Hours of listening</h3>
          <Badge value={130} color={themeColor} />
        </div>
        <div className="flex justify-between">
          <h3 className="text-sm">Tried sentences</h3>
          <Badge value={120} color={themeColor} />
        </div>
      </div>
    </>
  )
}

export default Activities
