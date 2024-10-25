import { FaCalendarAlt, FaListAlt } from "react-icons/fa"
import Button from "../ui/Button"
import useBoardMode from "../../store/boardModeStore"

const ButtonChangeMode = () => {
  const { mode, toggleMode } = useBoardMode()

  return (
    <div className="flex items-center gap-2">
      <Button
        size="fit"
        className="px-4 text-xl"
        variant={mode === "table" ? "solid" : "plain"}
        title="Mudar para o modo tabela"
        onClick={toggleMode}
      >
        <FaListAlt />
      </Button>

      <Button
        size="fit"
        className="px-4 text-xl"
        variant={mode === "calendar" ? "solid" : "plain"}
        title="Mudar para o modo calendário"
        onClick={toggleMode}
      >
        <FaCalendarAlt />
      </Button>
    </div>
  )
}

export default ButtonChangeMode