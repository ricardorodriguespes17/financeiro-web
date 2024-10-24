import { FaCalendarAlt, FaListAlt } from "react-icons/fa"
import Button from "../ui/Button"

type ButtonChangeModeProps = {
  mode: "calendar" | "table",
  toggleMode: () => void
}

const ButtonChangeMode = (props: ButtonChangeModeProps) => {
  return (
    <Button
      size="fit"
      className="p-4 text-xl"
      variant="plain"
      title={props.mode === "calendar"
        ? "Mudar para o modo tabela"
        : "Mudar para o modo calendário"
      }
      onClick={props.toggleMode}
    >
      {props.mode === "calendar" ? <FaListAlt /> : <FaCalendarAlt />}
    </Button>
  )
}

export default ButtonChangeMode