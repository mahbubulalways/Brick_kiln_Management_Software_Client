import DueCollectionPage from "@/components/Pages/DuePage/DueCollectionPage/DueCollectionPage";
import { TQuerySearch } from "@/interface/query";
import { modifyQuery } from "@/utils/modifyQuery";

const DueCollection = async ({ searchParams }: TQuerySearch) => {
  const query = await searchParams
  const { currentLimit, currentPage, } = modifyQuery(query)
  return (
    <div>
      <DueCollectionPage limit={currentLimit} page={currentPage} />
    </div>
  );
};

export default DueCollection;
