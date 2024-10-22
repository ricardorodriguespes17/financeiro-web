import { IoMdEye } from "react-icons/io"
import Button from "../ui/Button"
import { FaTrashAlt } from "react-icons/fa"

type ActionColumnProps = {
  handleOpen: () => void
  handleDelete: () => void
}

const ActionsColumnTransferences = ({ handleOpen, handleDelete }: ActionColumnProps) => {
  return (
    <div className="flex items-center gap-8">
      <Button
        size="fit"
        className="h-fit text-2xl rounded-full hover:text-warning"
        variant="plain"
        onClick={handleOpen}
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