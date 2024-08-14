import { FC } from 'react'
import { LinkedinIcon } from '../../components/Icons'

interface ProfileProps {
  imageUrl: string
  name: string
  position: string
  linkedinUrl: string
}

const TeamProfile: FC<ProfileProps> = ({ imageUrl, name, position, linkedinUrl }) => (
  <div className="flex flex-col items-center">
    <div className="w-[96px] h-[96px] rounded-full overflow-hidden">
      <img src={imageUrl} />
    </div>
    <h3 className="text-lg text-gray-700 font-bold mt-6 text-center">{name}</h3>
    <h3 className="text-orange-700 mt-1 text-center">{position}</h3>
    <button
      className="text-black hover:text-gray-400 active:text-black"
      onClick={() => {
        window.open(linkedinUrl, '_blank', '')
      }}>
      <LinkedinIcon />
    </button>
  </div>
)

export default TeamProfile
