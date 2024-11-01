import useTransferenceActions from "../../hooks/useTransferenceActions"
import TransferenceForm from "../forms/TransferenceForm"
import Modal from "../ui/Modal"

const ModalTransference = () => {
  const { 
    currentTransference, 
    setCurrentTransference,
   } = useTransferenceActions()

  const onSubmit = () => {
    onClose()
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