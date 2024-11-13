import { twMerge } from "tailwind-merge"
import formatCurrency from "../../utils/formatCurrency"

type TableFooterProps = {
  total: number
  subTotal?: number
}

const TableFooter = ({ total, subTotal = total}: TableFooterProps) => {
  return (
    <div className={twMerge(
      "flex items-center w-full gap-8 rounded-md text-xl px-3 py-2 font-bold",
      "bg-white dark:bg-gray-900 text-primary-800 dark:text-primary"
    )}>
      <label>Total: {formatCurrency(total)}</label>
      {total !== subTotal && (
        <label>Subtotal: {formatCurrency(subTotal)}</label>
      )}
    </div>
  )
}

export default TableFooter