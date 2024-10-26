import { IoMdEye } from "react-icons/io"
import Button from "../ui/Button"
import { FaTrashAlt } from "react-icons/fa"
import useMonth from "../../store/monthStore"
import { TransferenceType } from "../../@types/TransferenceType"
import transferenceController from "../../controller/transferenceController"
import useTransferenceModal from "../../store/tranferenceModalStore"
import useNotificationStore from "../../store/notificationStore"
import useTransference from "../../store/transferenceStore"

type ActionColumnProps = {
  transference: TransferenceType
}

const ActionsColumnTransferences = ({ transference }: ActionColumnProps) => {
  const { monthDate } = useMonth()
  const { loadTransferences } = useTransference()
  const { setCurrentTransference } = useTransferenceModal()
  const { setNotification } = useNotificationStore()

  const openTransference = () => {
    setCurrentTransference(transference || { type: "expense" })
  }

  const deleteTransference = async () => {
    const notification = await transferenceController.deleteTransference(transference.id)

    if (notification.type === "success") {
      loadTransferences(monthDate)
    }

    setNotification(notification)
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
        onClick={deleteTransference}
      >
        <FaTrashAlt />
      </Button>
    </div>
  )
}

export default ActionsColumnTransferences