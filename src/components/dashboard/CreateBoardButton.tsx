import { BiPlus } from "react-icons/bi"
import Button from "../ui/Button"
import useMonth from "../../store/monthStore"
import useBoardActions from "../../hooks/useBoardActions"

const CreateBoardButton = () => {
  const { monthDate } = useMonth()
  const { createBoard, getCurrentBoard, isLoading } = useBoardActions()

  const currentBoard = getCurrentBoard()

  const handleCreateBoard = async () => {
    await createBoard({ name: monthDate })
  }

  if (currentBoard) {
    return <></>
  }

  return (
    <div className="flex flex-col gap-2 w-full items-center grow justify-center">
      <Button
        size="fit"
        className="aspect-square text-2xl"
        onClick={handleCreateBoard}
        loading={isLoading}
      >
        <BiPlus />
      </Button>
      <h3>Criar novo quadro</h3>
    </div>
  )
}

export default CreateBoardButton