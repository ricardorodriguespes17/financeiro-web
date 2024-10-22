import { CgSpinner } from "react-icons/cg"

const Spinner = () => {
  return (
    <div className="aspect-square text-[200%] rounded-full">
      <CgSpinner className="animate-spin" />
    </div>
  )
}

export default Spinner