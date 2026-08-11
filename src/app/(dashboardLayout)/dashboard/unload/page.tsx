import UnloadPage from "@/components/Pages/UnloadPage/UnloadPage";
import { TQuerySearch } from "@/interface/query";
import { modifyQuery } from "@/utils/modifyQuery";


const Unload = async({searchParams}:TQuerySearch) => {
  const query = await searchParams
  const {currentLimit,currentPage}=modifyQuery(query)
  return (
    <div>
      <UnloadPage limit={currentLimit} page={currentPage}/>
    </div>
  );
};

export default Unload;
