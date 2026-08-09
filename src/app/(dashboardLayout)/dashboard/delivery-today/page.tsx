import TodayHaveToDelivery from "@/components/Pages/Delivery/TodayHaveToDelivery/TodayHaveToDelivery";
import { TQuerySearch } from "@/interface/query";
import { modifyQuery } from "@/utils/modifyQuery";

const page = async({searchParams}:TQuerySearch) => {
  const query = await searchParams
  const {currentLimit,currentPage,currentSearch}=modifyQuery(query)
  return (
    <div>
      <TodayHaveToDelivery limit={currentLimit} page={currentPage} search={currentSearch}/>
    </div>
  );
};

export default page;
