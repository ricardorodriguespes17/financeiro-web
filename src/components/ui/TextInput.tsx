import { InputHTMLAttributes } from "react"
import { twMerge } from "tailwind-merge"

type TextInputProps = {
  label?: string
  error?: string
} & InputHTMLAttributes<HTMLInputElement>

const TextInput = ({ label, error, ...rest }: TextInputProps) => {
  return (
    <div className="w-full flex flex-col gap-1">
      <label>{label}</label>
      <input
        className={twMerge(
          "w-full h-10 px-4",
          "border border-gray-300 rounded-md focus:border-primary",
          "drop-shadow-sm focus:drop-shadow-md"
        )}
        {...rest}
      />
      <label className="text-danger text-sm">{error}</label>
    </div>
  )
}

export default TextInput