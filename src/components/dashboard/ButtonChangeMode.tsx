import { FaCalendarAlt, FaListAlt } from "react-icons/fa"
import Button from "../ui/Button"
import useBoardMode from "../../store/boardModeStore"

const ButtonChangeMode = () => {
  const { mode, toggleMode } = useBoardMode()

  return (
    <Button
      size="fit"
      className="p-4 text-xl"
      variant="plain"
      title={mode === "calendar"
        ? "Mudar para o modo tabela"
        : "Mudar para o modo calendário"
      }
      onClick={toggleMode}
    >
      {mode === "calendar" ? <FaListAlt /> : <FaCalendarAlt />}
    </Button>
  )
}

export default ButtonChangeMode