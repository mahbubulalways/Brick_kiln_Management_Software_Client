import TodayWillPayPage from "@/components/Pages/DuePage/TodayWillPayPage/TodayWillPayPage";
import { TQuerySearch } from "@/interface/query";
import { modifyQuery } from "@/utils/modifyQuery";

const TodayWillPay = async ({ searchParams }: TQuerySearch) => {
  const query = await searchParams
  const { currentLimit, currentPage, currentSearch } = modifyQuery(query)

  return (
    <div>
      <TodayWillPayPage  limit={currentLimit} page={currentPage} search={currentSearch}/>
    </div>
  );
};

export default TodayWillPay;
