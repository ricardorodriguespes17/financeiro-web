import { twMerge } from "tailwind-merge"
import Card from "../Card"
import Button from "./Button"
import { MdClose } from "react-icons/md"

type ModalProps = {
  title?: string
  subtitle?: string
  children?: React.ReactNode,
  isOpen?: boolean
  onClose?: () => void
}

const Modal = (props: ModalProps) => {
  const { children, isOpen = false, onClose, title, subtitle } = props

  const className = twMerge(
    "fixed top-0 left-0 w-screen h-screen bg-black/60 items-center justify-center",
    isOpen ? "flex" : "hidden"
  )

  const handleClose = () => {
    onClose?.()
  }

  return (
    <div className={className}>
      <Card className="w-[450px] max-w-[90%]">
        <header className="flex mb-4">
          <div className="flex flex-col flex-1">
            <h3>{title}</h3>
            <p className="text-gray-500 dark:text-gray-400">
              {subtitle}
              </p>
          </div>

          <Button
            size="fit"
            className="p-2 text-2xl h-fit"
            variant="plain"
            onClick={handleClose}
          >
            <MdClose />
          </Button>
        </header>

        {children}
      </Card>
    </div>
  )
}

export default Modal