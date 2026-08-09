import AllDeliveryPage from "@/components/Pages/Delivery/AllDeliveries/AllDeliveryPage";
import { TQuerySearch } from "@/interface/query";
import { modifyQuery } from "@/utils/modifyQuery";

const AllDeliveries = async ({ searchParams }: TQuerySearch) => {
  const query = await searchParams
  const { currentLimit, currentPage, currentSearch } = modifyQuery(query)
  return (
    <div>
      <AllDeliveryPage 
      limit={currentLimit} 
      page={currentPage} 
      search={currentSearch} />
    </div>
  );
};

export default AllDeliveries;
