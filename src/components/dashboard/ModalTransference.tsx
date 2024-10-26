import useTransferenceActions from "../../hooks/useTransferenceActions"
import TransferenceForm from "../forms/TransferenceForm"
import Modal from "../ui/Modal"

const ModalTransference = () => {
  const { 
    getCurrentTransference, 
    setCurrentTransference,
   } = useTransferenceActions()
  const currentTransference = getCurrentTransference()

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