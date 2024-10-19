import { Link, LinkProps } from "react-router-dom"
import { twMerge } from "tailwind-merge"

type LinkCompoentProps = {
  variant?: "solid" | "plain" | "outlined" | "mono"
  className?: string
} & LinkProps & React.RefAttributes<HTMLAnchorElement>

const LinkComponent = ({ variant = "solid", className, ...rest }: LinkCompoentProps) => {
  const variants = {
    solid: "bg-primary text-white drop-shadow-md hover:bg-primary-700",
    plain: "bg-transparent text-primary hover:font-bold hover:bg-primary-100 hover:text-primary",
    outlined: "bg-transparent text-primary border border-primary hover:bg-primary-200 hover:text-primary",
    mono: "bg-primary-200 text-primary-700 drop-shadow-sm hover:bg-primary-300"
  }

  return (
    <Link
      className={twMerge(
        "w-full h-12 rounded-md flex justify-center items-center no-underline",
        "transition-all hover:text-white",
        variants[variant],
        className
      )}
      {...rest}
    />
  )
}

export default LinkComponent