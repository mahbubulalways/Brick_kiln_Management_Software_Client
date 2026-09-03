import { Suspense } from "react";
import StockBookPage from "@/components/Pages/StockBookPage/StockBookPage";
import CustomLoader from "@/components/Reusable/CustomLoader";

const Page = () => {
  return (
    <Suspense
      fallback={
        <CustomLoader cls="h-[30vh]" />
      }
    >
      <StockBookPage />
    </Suspense>
  );
};

export default Page;