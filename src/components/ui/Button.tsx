import { ButtonHTMLAttributes } from "react"
import { twMerge } from "tailwind-merge"

type ButtonProps = {
  variant?: "solid" | "plain" | "outlined" | "mono"
} & ButtonHTMLAttributes<HTMLButtonElement>

const Button = ({ variant = "solid", ...rest }: ButtonProps) => {

  const variants = {
    solid: "bg-primary text-white drop-shadow-md hover:bg-primary-700",
    plain: "bg-transparent text-primary hover:font-bold hover:bg-primary-100",
    outlined: "bg-transparent text-primary border border-primary hover:bg-primary-200",
    mono: "bg-primary-200 text-primary-700 drop-shadow-sm hover:bg-primary-300"
  }

  return (
    <button
      className={twMerge(
        "w-full h-10 rounded-md",
        "transition-all",
        variants[variant]
      )}
      {...rest}
    />
  )
}

export default Button