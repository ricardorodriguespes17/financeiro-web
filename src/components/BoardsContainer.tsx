import { useEffect } from "react"
import useBoardActions from "../hooks/useBoardActions"
import { getMonthLabel } from "../utils/getCurrentDate"
import Button from "./ui/Button"
import { twMerge } from "tailwind-merge"
import { BoardType } from "../@types/BoardType"
import useMonth from "../store/monthStore"
import { useNavigate } from "react-router-dom"
import Skeleton from "./Skeleton"

const BoardsContainer = () => {
  const navigate = useNavigate()
  const {
    loadBoards,
    getAllBoards,
    setCurrentBoard,
    deleteBoard,
    getIsLoading
  } = useBoardActions()
  const { setMonthDate } = useMonth()
  const boards = getAllBoards()
  const isLoading = getIsLoading()

  useEffect(() => {
    loadBoards()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleOpenBoard = (board: BoardType) => {
    setMonthDate(board.name)
    setCurrentBoard()
    navigate("/dashboard")
  }

  const handleDelete = (boardId: string) => {
    deleteBoard(boardId)
  }

  const boardClassName = "w-full sm:w-[300px] max-w-full rounded-md"

  if (isLoading) {
    return (
      <div className="flex flex-wrap gap-4">
        <Skeleton className={twMerge("h-40", boardClassName)} />
        <Skeleton className={twMerge("h-40", boardClassName)} />
        <Skeleton className={twMerge("h-40", boardClassName)} />
        <Skeleton className={twMerge("h-40", boardClassName)} />
        <Skeleton className={twMerge("h-40", boardClassName)} />
      </div>
    )
  }

  return (
    <div className="flex flex-wrap gap-4">
      {boards.map(item => {
        return (
          <div
            key={item.id}
            className={twMerge(
              "bg-white flex flex-col gap-2 p-4",
              boardClassName
            )}
          >
            <h3>{getMonthLabel(item.name)}</h3>

            <label>10 transferências</label>

            <hr className="border-separate border-primary/30" />

            <div className="flex w-full justify-center gap-2 *:px-4 *:flex-1">
              <Button
                variant="solid"
                size="fit"
                onClick={() => handleOpenBoard(item)}
              >
                Abrir
              </Button>
              <Button
                variant="solid"
                size="fit"
                className="hover:bg-danger"
                onClick={() => handleDelete(item.id)}
              >
                Excluir
              </Button>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default BoardsContainer