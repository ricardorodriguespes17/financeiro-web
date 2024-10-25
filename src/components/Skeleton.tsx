import { twMerge } from "tailwind-merge"

type SkeletonProps = {
  children?: React.ReactNode
  className?: string
}

const Skeleton = ({ className, ...rest }: SkeletonProps) => {
  const skeletonClassName = twMerge(
    "animate-pulse rounded-md bg-gray-300 dark:bg-gray-700",
    className,
  )

  return (
    <div
      className={skeletonClassName}
      {...rest}
    />
  )
}

export default Skeleton