import { InputHTMLAttributes, useState } from "react"
import { twMerge } from "tailwind-merge"
import Button from "./Button"
import { IoMdEye, IoMdEyeOff } from "react-icons/io"

type TextInputProps = {
  label?: string
  error?: string
} & InputHTMLAttributes<HTMLInputElement>

const TextInput = ({ label, error, type, ...rest }: TextInputProps) => {
  const [showPassword, setShowPassword] = useState(false)

  const toggleShowPassword = () => {
    setShowPassword(password => !password)
  }

  const inputClass = twMerge(
    "w-full h-10 px-4 dark:bg-gray-900 bg-white outline-none",
    "border border-gray-300 dark:border-gray-700 rounded-md",
    "drop-shadow-sm focus:drop-shadow-md focus:border-primary"
  )

  return (
    <div className="w-full flex flex-col gap-1 ">
      <label>{label}</label>
      <div className="relative">
        <input
          className={inputClass}
          type={type === "password"
            ? showPassword ? "text" : "password"
            : type
          }
          {...rest}
        />

        {type === "password" && (
          <Button
            size="fit"
            type="button"
            variant="plain"
            className="absolute h-10 w-10 text-xl bottom-0 right-0 hover:bg-transparent"
            onClick={toggleShowPassword}
          >
            {showPassword ? <IoMdEyeOff /> : <IoMdEye />}
          </Button>
        )}
      </div>
      <label className="text-danger text-sm">
        {error}
      </label>
    </div>
  )
}

export default TextInput