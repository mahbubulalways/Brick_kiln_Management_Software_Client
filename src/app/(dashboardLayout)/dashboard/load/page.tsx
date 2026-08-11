import LoadPage from "@/components/Pages/LoadPage/LoadPage";
import { TQuerySearch } from "@/interface/query";
import { modifyQuery } from "@/utils/modifyQuery";

const Load = async ({ searchParams }: TQuerySearch) => {
  const query = await searchParams
  const { currentLimit, currentPage, currentSearch } = modifyQuery(query)
  return (
    <div>
      <LoadPage limit={currentLimit} page={currentPage} search={currentSearch}/>
    </div>
  );
};

export default Load;
