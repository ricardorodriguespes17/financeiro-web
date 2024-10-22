import useTransferenceModal from "../../store/tranferenceModalStore"
import TransferenceForm from "../forms/TransferenceForm"
import Modal from "../ui/Modal"

const ModalTransference = () => {
  const { currentTransference, isShowing, toggleShowing } = useTransferenceModal()

  const onClose = () => {
    toggleShowing()
  }

  return (
    <Modal
      isOpen={isShowing}
      onClose={onClose}
      title="Dados da transferência"
      subtitle="Visualize ou edite os dados"
    >
      <TransferenceForm
        transference={currentTransference}
        onClose={onClose}
      />
    </Modal>
  )
}

export default ModalTransference