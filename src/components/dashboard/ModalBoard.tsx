import BoardForm from "../forms/BoardForm"
import Modal from "../ui/Modal"

const ModalBoard = () => {
  const onClose = () => {
    
  }

  return (
    <Modal
      isOpen
      onClose={onClose}
      title="Novo quadro"
      subtitle="Crie um novo quadro para esse mês"
    >
      <BoardForm
        onClose={onClose}
      />
    </Modal>
  )
}

export default ModalBoard