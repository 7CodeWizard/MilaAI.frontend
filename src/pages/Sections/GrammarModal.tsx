import { FC } from 'react'
import { Modal } from '../../components/Modal'

interface GrammarModalProps {
  isOpen: boolean
  toggleModal: () => void
  correctedText: string
}

const GrammarModal: FC<GrammarModalProps> = ({ isOpen, toggleModal, correctedText }) => (
  <Modal isOpen={isOpen} onClose={toggleModal}>
    <div className="px-24 py-10 text-center w-[700px]">
      <h3 className="text-2xl font-bold">Corrected Text</h3>
      <h4 className="mt-6">{correctedText}</h4>
    </div>
  </Modal>
)

export default GrammarModal
