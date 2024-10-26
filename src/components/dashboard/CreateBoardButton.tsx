import { BiPlus } from "react-icons/bi"
import Button from "../ui/Button"
import { useState } from "react"
import useMonth from "../../store/monthStore"
import boardController from "../../controller/boardController"
import useBoard from "../../store/boardStore"

const CreateBoardButton = () => {
  const { monthDate } = useMonth()
  const { loadBoard, boardId } = useBoard()
  const [createLoading, setCreateLoading] = useState(false)

  const handleCreateBoard = async () => {
    setCreateLoading(true)

    await boardController.createBoard({ name: monthDate })
    await loadBoard(monthDate)
    
    setCreateLoading(false)
  }

  if (boardId) {
    return <></>
  }

  return (
    <div className="flex flex-col gap-2 w-full items-center grow justify-center">
      <Button
        size="fit"
        className="aspect-square text-2xl"
        onClick={handleCreateBoard}
        loading={createLoading}
      >
        <BiPlus />
      </Button>
      <h3>Criar novo quadro</h3>
    </div>
  )
}

export default CreateBoardButton