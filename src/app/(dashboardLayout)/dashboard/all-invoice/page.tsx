import AllInvoicePage from "@/components/Pages/Invoice/AllInvoicePage/AllInvoicePage"
import { TQuerySearch } from "@/interface/query";
import { modifyQuery } from "@/utils/modifyQuery";

const Page = async ({ searchParams }: TQuerySearch) => {
  const query = await searchParams
  const { currentLimit, currentPage, currentSearch } = modifyQuery(query);
  return (
    <AllInvoicePage limit={currentLimit} page={currentPage} search={currentSearch}/>
  )
}

export default Page