"use client";

import { TCustomer } from "@/interface/customer";
import { useGetSingleCustomerInfoQuery } from "@/redux/features/customer.features";
import { Printer } from "lucide-react";
import { formatBanglaDate } from "@/utils/formatBanglaDate";
import { toBanglaNumber } from "@/utils/toBanglaNumber";
import CustomerTabs from "./Tabs/CustomerTab";
import { TQuery } from "@/interface/query";
import CustomLoader from "@/components/Reusable/CustomLoader";
import CustomStatus from "@/components/Reusable/CustomStatus";

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
    <div className="flex w-full items-start gap-2">
      <span
        className={`
          min-w-[100px] shrink-0 rounded-md
          bg-[#F0F4F8]
          px-2 py-1
          text-[13px] sm:text-[14px]
          ${orange ? "text-[#FF5A00]" : "text-gray-700"}
        `}
      >
        {label}
      </span>

      <span
        className={`
          min-w-0 flex-1 break-words
          px-1 py-1
          text-[14px] sm:text-[15px]
          ${orange ? "text-[#FF5A00]" : "text-gray-700"}
        `}
      >
        {value}
      </span>
    </div>
  );
};

const CustomerDetailsPage = ({
  id,
  query,
}: {
  id: string;
  query: TQuery;
}) => {
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
    return <CustomLoader cls="h-[70vh]" />;
  }

  if (isError || !customer) {
    return <CustomStatus type="error" />;
  }

  return (
    <div className="w-full bg-white p-2 sm:p-3 md:p-4">
      <div className="rounded-xl bg-white p-2 sm:p-3">

        {/* =========================
            TOP INFORMATION
        ========================= */}
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-5">

          {/* =========================
              CUSTOMER ID
          ========================= */}
          <div
            className="
              flex min-h-[130px]
              flex-col items-center justify-center
              rounded-xl
              bg-[#FCE4DE]
              p-4
              md:min-h-full
              lg:col-span-1
            "
          >
            <div className="text-[28px] font-medium text-[#FF4B12] sm:text-[32px]">
              {customer.id}
            </div>

            <button
              type="button"
              className="
                mt-2
                flex h-8 items-center gap-1.5
                rounded-md
                bg-[#F45A0A]
                px-3
                text-[13px] text-white
                transition-colors
                hover:bg-[#E34E04]
              "
            >
              <Printer size={15} />
              প্রিন্ট
            </button>
          </div>

          {/* =========================
              CUSTOMER INFO
          ========================= */}
          <div
            className="
              flex flex-col justify-center gap-2
              rounded-xl
              border border-gray-100
              bg-gray-50/50
              p-3
              md:p-4
            "
          >
            <h3 className="mb-1 text-sm font-semibold text-gray-800 md:hidden">
              গ্রাহকের তথ্য
            </h3>

            <InfoRow
              label="নাম"
              value={customer.name}
            />

            <InfoRow
              label="ঠিকানা"
              value={customer.address}
            />

            <InfoRow
              label="ফোন নম্বর"
              value={toBanglaNumber(customer.phoneNumber)}
            />
          </div>

          {/* =========================
              DELIVERY
          ========================= */}
          <div
            className="
              flex flex-col justify-center gap-2
              rounded-xl
              border border-gray-100
              bg-gray-50/50
              p-3
              md:p-4
            "
          >
            <h3 className="mb-1 text-sm font-semibold text-gray-800 md:hidden">
              ইট ও ডেলিভারি
            </h3>

            <InfoRow
              label="মোট ইট ক্রয়"
              value={toBanglaNumber(
                customer.totalPurchasedQuantity
              )}
            />

            <InfoRow
              label="ডেলিভারি"
              value={toBanglaNumber(
                customer.totalDeliveredQuantity
              )}
            />

            <InfoRow
              label="ডেলিভারি বাকি"
              value={toBanglaNumber(
                customer.totalRemainingQuantity
              )}
              orange
            />
          </div>

          {/* =========================
              MONEY
          ========================= */}
          <div
            className="
              flex flex-col justify-center gap-2
              rounded-xl
              border border-gray-100
              bg-gray-50/50
              p-3
              md:p-4
            "
          >
            <h3 className="mb-1 text-sm font-semibold text-gray-800 md:hidden">
              আর্থিক তথ্য
            </h3>

            <InfoRow
              label="মোট মূল্য"
              value={toBanglaNumber(
                customer.totalAmount
              )}
            />

            <InfoRow
              label="পরিশোধ"
              value={toBanglaNumber(
                customer.totalPaid
              )}
            />

            <InfoRow
              label="টাকা বাকি"
              value={toBanglaNumber(
                customer.totalDue
              )}
              orange
            />
          </div>

          {/* =========================
              OTHER INFO
          ========================= */}
          <div
            className="
              flex flex-col justify-center gap-2
              rounded-xl
              border border-gray-100
              bg-gray-50/50
              p-3
              md:p-4
            "
          >
            <h3 className="mb-1 text-sm font-semibold text-gray-800 md:hidden">
              অন্যান্য তথ্য
            </h3>

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

        {/* =========================
            FETCHING INDICATOR
        ========================= */}
        {isFetching && !isLoading && (
          <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-gray-100">
            <div className="h-full w-1/3 animate-pulse bg-[#079B67]" />
          </div>
        )}
      </div>

      {/* =========================
          TABS
      ========================= */}
      <div className="mt-2 sm:mt-3">
        <CustomerTabs
          id={Number(customer.id)}
          customer={customer}
          query={query}
        />
      </div>
    </div>
  );
};

export default CustomerDetailsPage;