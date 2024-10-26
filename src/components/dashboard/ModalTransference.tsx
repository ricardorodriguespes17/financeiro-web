import useBoard from "../../store/boardStore"
import useTransferenceModal from "../../store/tranferenceModalStore"
import TransferenceForm from "../forms/TransferenceForm"
import Modal from "../ui/Modal"

const ModalTransference = () => {
  const { loadBoards } = useBoard()
  const { currentTransference, setCurrentTransference } = useTransferenceModal()

  const onSubmit = () => {
    onClose()
    loadBoards()
  }

  const onClose = () => {
    setCurrentTransference(null)
  }

  return (
    <Modal
      isOpen={currentTransference !== null}
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
        onSubmit={onSubmit}
        onClose={onClose}
      />
    </Modal>
  )
}

export default ModalTransference