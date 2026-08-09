import AdvanceInvoicePage from "@/components/Pages/Invoice/AdvanceInvoicePage/AdvanceInvoicePage";
import { TQuerySearch } from "@/interface/query";
import { modifyQuery } from "@/utils/modifyQuery";

const AdvanceInvoice = async({searchParams}:TQuerySearch) => {
  const query = await searchParams
  const {currentLimit,currentPage,currentSearch}=modifyQuery(query)
  return (
    <div>
      <AdvanceInvoicePage limit={currentLimit}  page={currentPage} search={currentSearch}/>
    </div>
  );
};

export default AdvanceInvoice;
