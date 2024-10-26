import { BiPlus } from "react-icons/bi"
import Button from "../ui/Button"
import { useState } from "react"
import useMonth from "../../store/monthStore"
import useBoard from "../../store/boardStore"
import useBoardActions from "../../hooks/useBoardActions"

const CreateBoardButton = () => {
  const { monthDate } = useMonth()
  const { currentBoard } = useBoard()
  const [createLoading, setCreateLoading] = useState(false)
  const { createBoard } = useBoardActions()

  const handleCreateBoard = async () => {
    setCreateLoading(true)

    await createBoard({ name: monthDate })

    setCreateLoading(false)
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
        loading={createLoading}
      >
        <BiPlus />
      </Button>
      <h3>Criar novo quadro</h3>
    </div>
  )
}

export default CreateBoardButton