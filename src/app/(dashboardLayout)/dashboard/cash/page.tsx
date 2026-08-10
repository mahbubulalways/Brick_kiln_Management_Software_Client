import CashPage from "@/components/Pages/CashPage/CashPage";
import { TQuerySearch } from "@/interface/query";
import { modifyQuery } from "@/utils/modifyQuery";

const Cash = async ({ searchParams }: TQuerySearch) => {
  const query = await searchParams
  const { currentLimit, currentPage, currentSearch } = modifyQuery(query)
  return (
    <div>
      <CashPage />
    </div>
  );
};

export default Cash;
