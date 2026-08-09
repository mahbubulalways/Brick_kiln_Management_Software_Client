import PaymentPage from "@/components/Pages/PaymentPage/PaymentPage";
import { TQuerySearch } from "@/interface/query";
import { modifyQuery } from "@/utils/modifyQuery";

const Payment = async ({ searchParams }: TQuerySearch) => {
  const query = await searchParams;
  const { currentLimit, currentPage, currentSearch } = modifyQuery(query);
  return (
      <PaymentPage
        limit={currentLimit}
        search={currentSearch}
        page={currentPage}
      />
  );
};

export default Payment;
