import UpdateStockBookPage from "@/components/Pages/StockBookPage/UpdateStockBookPage/UpdateStockBookPage";
import { TQuerySearch } from "@/interface/query";
import { modifyQuery } from "@/utils/modifyQuery";
export default async function page({ searchParams }: TQuerySearch) {
  const query = await searchParams
  const { currentLimit, currentPage } = modifyQuery(query)
  return (
    <div>
      <UpdateStockBookPage
        limit={currentLimit}
        page={currentPage}
      />
    </div>
  )
}
