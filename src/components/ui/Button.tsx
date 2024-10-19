import { ButtonHTMLAttributes } from "react"
import { Link } from "react-router-dom"
import { twMerge } from "tailwind-merge"

type ButtonProps = {
  variant?: "solid" | "plain" | "outlined" | "mono",
  size?: "fit" | "normal" | "full",
  href?: string
} & ButtonHTMLAttributes<HTMLButtonElement>

const Button = (props: ButtonProps) => {
  const { 
    variant = "solid", 
    size = "full", 
    href, 
    className,
    children,
    ...rest 
  } = props

  const variants = {
    solid: "bg-primary text-white drop-shadow-md hover:bg-primary-700",
    plain: "bg-transparent text-primary hover:font-bold hover:bg-primary-100",
    outlined: "bg-transparent text-primary border border-primary hover:bg-primary-200",
    mono: "bg-primary-200 text-primary-700 drop-shadow-sm hover:bg-primary-300"
  }

  const sizes = {
    fit: "w-fit",
    normal: "w-32",
    full: "w-full min-w-32"
  }

  const mergedClassNames = twMerge(
    "w-full h-12 rounded-md flex justify-center items-center no-underline",
    "transition-all",
    sizes[size],
    variants[variant],
    className
  )

  if (href) {
    return (
      <Link
        to={href}
        className={mergedClassNames}
      >
        {children}
      </Link>
    )
  }

  return (
    <button
      className={mergedClassNames}
      {...rest}
    >
      {children}
    </button>
  )
}

export default Button