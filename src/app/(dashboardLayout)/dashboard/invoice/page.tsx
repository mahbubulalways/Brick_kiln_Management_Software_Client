import TodaysInVoicePage from "@/components/Pages/Invoice/TodaysInvoice/TodaysInvoice"
import { TQuerySearch } from "@/interface/query"
import { modifyQuery } from "@/utils/modifyQuery";

const Page =async({searchParams}:TQuerySearch)=>{
    const query = await searchParams
      const { currentLimit, currentPage, currentSearch } = modifyQuery(query);
    return (
        <TodaysInVoicePage limit={currentLimit} page={currentPage} search={currentSearch}/>
    )
}

export default Page