import { ButtonHTMLAttributes } from "react"
import { Link } from "react-router-dom"
import { twMerge } from "tailwind-merge"
import Spinner from "./Spinner"

type ButtonProps = {
  variant?: "solid" | "plain" | "outlined" | "mono",
  size?: "fit" | "normal" | "full",
  href?: string,
  loading?: boolean
} & ButtonHTMLAttributes<HTMLButtonElement>

const Button = (props: ButtonProps) => {
  const {
    variant = "solid",
    size = "full",
    href,
    className,
    children,
    loading,
    disabled,
    ...rest
  } = props

  const variants = {
    solid: "bg-primary dark:bg-primary-700 text-white drop-shadow-md hover:bg-primary-700",
    plain: "bg-transparent text-primary dark:text-primary-400 hover:font-bold hover:bg-primary-100 dark:hover:bg-primary-100/10",
    outlined: "bg-transparent text-primary border border-primary hover:bg-primary-200",
    mono: "bg-primary-200 text-primary-700 drop-shadow-sm hover:bg-primary-300"
  }

  const sizes = {
    fit: "w-fit",
    normal: "w-32",
    full: "w-full min-w-32"
  }

  const mergedClassNames = twMerge(
    "w-full h-12 rounded-md flex gap-2 justify-center items-center no-underline",
    "transition-all *:cursor-pointer",
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
      disabled={disabled || loading}
      {...rest}
    >
      {loading ? <Spinner /> : children}
    </button>
  )
}

export default Button