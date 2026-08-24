"use client"
import ButtonGroup from "./ButtonGroup";
import CalculationsCard from "./CalculationsCard";
import Chalan from "./Chalan";
import Payment from "./Payment";
import Production from "./Production";
import Load from "./Load";
import Unload from "./Unload";
import { useDashboardReportQuery } from "@/redux/features/report,features";
import { TDashboardReport } from "@/interface/dashboard";
import CustomLoader from "@/components/Reusable/CustomLoader";

const DashboardPage = () => {
  const { isError, isLoading, data } = useDashboardReportQuery(undefined)
  const reports = data?.data as TDashboardReport
  const totalSell = reports?.challan?.summary?.totalSaleWithRent
  const cashSell = reports?.challan?.summary?.cash
  const dueSell = reports?.challan?.summary?.due
  const payment = reports?.payment?.total
  const due = reports?.due
  const cash = reports?.cash
  // ARRAY
  const challanItems = reports?.challan?.items
  return (
    <div className="pb-4">
      <ButtonGroup />
      {
        isLoading ? <CustomLoader cls="h-[80vh]" /> : <>
         <CalculationsCard
          cashSell={cashSell}
          dueSell={dueSell}
          totalSell={totalSell}
          payment={payment}
          due={due}
          cash={cash}
        />

          <div className="grid grid-cols-1 lg:grid-cols-10 gap-2 pt-5 ">
            <div className="lg:col-span-3">
              <Chalan
                summary={reports?.challan?.summary}
                items={challanItems}
              />
            </div>
            <div className="lg:col-span-3">
              <Payment
                payments={reports?.payment?.payments}
              />
            </div>
            <div className="lg:col-span-2">
              <Production />
            </div>
            <div className="lg:col-span-2">
              <Load />
              <Unload />
            </div>
          </div></>
      }

    </div>
  );
};

export default DashboardPage;
