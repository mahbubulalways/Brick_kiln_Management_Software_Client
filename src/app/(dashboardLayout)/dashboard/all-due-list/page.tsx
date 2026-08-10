import AllDueListPage from "@/components/Pages/DuePage/AllDueListPage/AllDueListPage";
import { TQuerySearch } from "@/interface/query";
import { modifyQuery } from "@/utils/modifyQuery";

const AllDueList = async ({ searchParams }: TQuerySearch) => {
  const query = await searchParams
  const { currentLimit, currentPage, currentSearch } = modifyQuery(query)
  return (
    <div>
      <AllDueListPage  limit={currentLimit} page={currentPage} search={currentSearch} />
    </div>
  );
};

export default AllDueList;
