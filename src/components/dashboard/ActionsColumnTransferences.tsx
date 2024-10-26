import { IoMdEye } from "react-icons/io"
import Button from "../ui/Button"
import { FaTrashAlt } from "react-icons/fa"
import { TransferenceType } from "../../@types/TransferenceType"
import useTransferenceActions from "../../hooks/useTransferenceActions"

type ActionColumnProps = {
  transference: TransferenceType
}

const ActionsColumnTransferences = ({ transference }: ActionColumnProps) => {
  const { setCurrentTransference } = useTransferenceActions()
  const {deleteTransference} = useTransferenceActions()

  const openTransference = () => {
    setCurrentTransference(transference || { type: "expense" })
  }

  const handleDelete = async () => {
    await deleteTransference(transference.id)
  }

  return (
    <div className="flex items-center gap-5 md:gap-8">
      <Button
        size="fit"
        className="h-fit text-2xl rounded-full hover:text-warning"
        variant="plain"
        onClick={openTransference}
      >
        <IoMdEye />
      </Button>
      <Button
        size="fit"
        className="h-fit text-xl rounded-full hover:text-danger"
        variant="plain"
        onClick={handleDelete}
      >
        <FaTrashAlt />
      </Button>
    </div>
  )
}

export default ActionsColumnTransferences