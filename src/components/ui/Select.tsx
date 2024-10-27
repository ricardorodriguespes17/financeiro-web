import { SelectHTMLAttributes } from "react"
import { twMerge } from "tailwind-merge"

type SelectProps = {
  label?: string
  error?: string
  options: OptionProps[]
} & SelectHTMLAttributes<HTMLSelectElement>

type OptionProps = {
  label: string
  value: string
}

const Select = ({ label, error, options, ...rest }: SelectProps) => {
  const className = twMerge(
    "w-full h-10 px-4 dark:bg-gray-900 outline-none",
    "border border-gray-300 dark:border-gray-700 rounded-md focus:border-primary",
    "drop-shadow-sm focus:drop-shadow-md"
  )

  return (
    <div className="w-full flex flex-col gap-1">
      <label>{label}</label>
      <select
        className={className}
        {...rest}
      >
        {options.map(item => (
          <option key={item.value} value={item.value}>
            {item.label}
            </option>
        ))}
      </select>
      <label className="text-danger text-sm">{error}</label>
    </div>
  )
}

export default Select