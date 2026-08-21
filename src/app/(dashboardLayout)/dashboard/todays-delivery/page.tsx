import TodaysDeliveryPage from "@/components/Pages/Delivery/TodaysDelivery/TodaysDelivery";
import { TQuerySearch } from "@/interface/query";
import { modifyQuery } from "@/utils/modifyQuery";

const TodaysDelivery = async ({ searchParams }: TQuerySearch) => {
  const query = await searchParams
  const { currentLimit, currentPage } = modifyQuery(query)
  return (
    <div>
      <TodaysDeliveryPage limit={currentLimit} page={currentPage} />
    </div>
  );
};

export default TodaysDelivery;
