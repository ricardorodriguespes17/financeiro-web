import { CreditType } from "../../@types/CreditType"
import DataTable from "../ui/DataTable"
import makeCreditTableColumns from "./CreditTableColumns"
import TableFooter from "./TableFooter"
import TableHeader from "./TableHeader"

const CreditTable = () => {
  const columns = makeCreditTableColumns()
  const credits: CreditType[] = [
    { id: "1", name: "Nubank", color: "purple", transferences: [], expireDay: 8, userId: "1", limit: 3000 }
  ]

  const handleOpen = () => {

  }

  return (
    <div>
      <TableHeader
        title="Cartões de crédito"
        onOpen={handleOpen}
      />

      <div className="flex flex-col flex-1">
        <DataTable<CreditType>
          data={credits}
          columns={columns}
        />

        <TableFooter total={0} />
      </div>
    </div>
  )
}

export default CreditTable