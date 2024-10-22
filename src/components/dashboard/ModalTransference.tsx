import useTransferenceModal from "../../store/tranferenceModalStore"
import TransferenceForm from "../forms/TransferenceForm"
import Modal from "../ui/Modal"

const ModalTransference = () => {
  const { currentTransference, isOpen, setIsOpen } = useTransferenceModal()

  const onClose = () => {
    setIsOpen(false)
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        currentTransference ? "Dados da transferência" : "Nova transferência"
      }
      subtitle={
        currentTransference ? "Visualize ou edite os dados" : "Preencha os dados"
      }
    >
      <TransferenceForm
        transference={currentTransference}
        onClose={onClose}
      />
    </Modal>
  )
}

export default ModalTransference