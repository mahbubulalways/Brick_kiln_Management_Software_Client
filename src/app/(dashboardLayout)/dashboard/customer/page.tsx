import CustomerPage from "@/components/Pages/CustomerPage/CustomerPage";
import { TQuerySearch } from "@/interface/query";
import { modifyQuery } from "@/utils/modifyQuery";

const Page = async ({ searchParams }: TQuerySearch) => {
  const query = await searchParams
  const {currentLimit,currentPage,currentSearch}= modifyQuery(query)
  return (
    <div>
      <CustomerPage limit={currentLimit} page={currentPage} search={currentSearch}/>
    </div>
  );
};

export default Page;
