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
          "w-full h-10 px-4 dark:bg-gray-900",
          "border border-gray-300 dark:border-gray-700 rounded-md",
          "drop-shadow-sm focus:drop-shadow-md focus:border-primary"
        )}
        {...rest}
      />
      <label className="text-danger text-sm">{error}</label>
    </div>
  )
}

export default TextInput