"use client";

import { TCustomer } from "@/interface/customer";
import { useGetSingleCustomerInfoQuery } from "@/redux/features/customer.features";
import { Printer } from "lucide-react";
import { formatBanglaDate } from "@/utils/formatBanglaDate";
import { toBanglaNumber } from "@/utils/toBanglaNumber";
import CustomerTabs from "./Tabs/CustomerTab";
import { TQuery } from "@/interface/query";



const InfoRow = ({
  label,
  value,
  orange = false,
}: {
  label: string;
  value: string | number;
  orange?: boolean;
}) => {
  return (
    <div className="flex items-center gap-2">
      <span
        className={`min-w-[105px] rounded-md bg-[#F0F4F8] px-2 py-1 text-[14px] ${orange ? "text-[#FF5A00]" : "text-gray-700"
          }`}
      >
        {label}
      </span>

      <span
        className={`text-[15px] ${orange ? "text-[#FF5A00]" : "text-gray-700"
          }`}
      >
        {value}
      </span>
    </div>
  );
};

const CustomerDetailsPage = ({ id, query }: { id: string, query: TQuery }) => {
  const {
    data,
    isError,
    isLoading,
    isFetching,
  } = useGetSingleCustomerInfoQuery(id, {
    refetchOnMountOrArgChange: true,
  });

  const customer = data?.data as TCustomer | undefined;

  if (isLoading) {
    return (
      <div className="p-4">
        <div className="h-32 animate-pulse rounded-xl bg-white" />
      </div>
    );
  }

  if (isError || !customer) {
    return (
      <div className="p-4">
        <div className="rounded-xl bg-red-50 p-5 text-center text-red-500">
          কাস্টমারের তথ্য পাওয়া যায়নি।
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-white p-4">
      <div className="rounded-xl  bg-white p-3">

        <div className="grid grid-cols-1 gap-3 lg:grid-cols-5">

          {/* ID */}
          <div className="flex  flex-col items-center justify-center rounded-lg bg-[#FCE4DE]">
            <div className="text-[32px] text-[#FF4B12]">
              {customer.id}
            </div>

            <button
              type="button"
              className=" flex h-7 items-center gap-1.5 rounded-md bg-[#F45A0A] px-3 text-[13px] text-white hover:bg-[#E34E04]"
            >
              <Printer size={15} />
              প্রিন্ট
            </button>
          </div>

          {/* Customer */}
          <div className="flex flex-col justify-center gap-2">
            <InfoRow label="নাম" value={customer.name} />

            <InfoRow label="ঠিকানা" value={customer.address} />

            <InfoRow
              label="ফোন নম্বর"
              value={toBanglaNumber(customer.phoneNumber)}
            />
          </div>

          {/* Delivery */}
          <div className="flex flex-col justify-center gap-2">
            <InfoRow
              label="মোট ইট ক্রয়"
              value={toBanglaNumber(customer.totalPurchasedQuantity)}
            />

            <InfoRow
              label="ডেলিভারি"
              value={toBanglaNumber(customer.totalDeliveredQuantity)}
            />

            <InfoRow
              label="ডেলিভারি বাকি"
              value={toBanglaNumber(customer.totalRemainingQuantity)}
              orange
            />
          </div>

          {/* Money */}
          <div className="flex flex-col justify-center gap-2">
            <InfoRow
              label="মোট মূল্য"
              value={toBanglaNumber(customer.totalAmount)}
            />

            <InfoRow
              label="পরিশোধ"
              value={toBanglaNumber(customer.totalPaid)}
            />

            <InfoRow
              label="টাকা বাকি"
              value={toBanglaNumber(customer.totalDue)}
              orange
            />
          </div>

          {/* Other Info */}
          <div className="flex flex-col justify-center gap-2">
            <InfoRow
              label="পরিশোধের তারিখ"
              value={formatBanglaDate({
                date: customer.nextPaymentDate,
                showTime: false,
              })}
            />

            <InfoRow
              label="নোট"
              value={customer.note || "-"}
            />

            <InfoRow
              label="সিজন"
              value="২৫-২৬"
            />
          </div>
        </div>

        {isFetching && !isLoading && (
          <div className="mt-2 h-1 w-full overflow-hidden bg-gray-100">
            <div className="h-full w-1/3 animate-pulse bg-[#079B67]" />
          </div>
        )}
      </div>

      <CustomerTabs id={Number(customer?.id)} customer={customer} query={query}/>
    </div>
  );
};

export default CustomerDetailsPage;