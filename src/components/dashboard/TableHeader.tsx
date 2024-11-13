import { BiPlus } from "react-icons/bi"
import Button from "../ui/Button"
import ButtonChangeMode from "./ButtonChangeMode"

type TableHeaderProps = {
  title: string
  onOpen: () => void
  hasChangeMode?: boolean
}

const TableHeader = ({ title, hasChangeMode, onOpen }: TableHeaderProps) => {
  const titleClassName = "flex items-center gap-2"

  return (
    <div className="flex items-center justify-between">
      <div className={titleClassName}>
        <h2>{title}</h2>
        <Button
          size="fit"
          variant="plain"
          className="text-3xl aspect-square rounded-full"
          onClick={onOpen}
        >
          <BiPlus />
        </Button>
      </div>
      {hasChangeMode && (
        <ButtonChangeMode />
      )}
    </div>
  )
}

export default TableHeader