"use client";

import { useState } from "react";
import CustomReportModal from "@/components/Reusable/CustomReportModal";
import { useGetPaymentReportQuery } from "@/redux/features/payment.features";

type TCustomModal = {
  isOpen: boolean;
  onClose: () => void;
};

const toBanglaNumber = (value: string | number) => {
  const banglaDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return String(value).replace(/\d/g, (digit) => banglaDigits[Number(digit)]);
};
const [todayDate, setTodayDate] = useState(new Date());
const {} = useGetPaymentReportQuery(todayDate, {
  refetchOnMountOrArgChange: true,
});
const formatDate = (date: Date) => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${toBanglaNumber(day)}-${toBanglaNumber(month)}-${toBanglaNumber(
    year,
  )}`;
};

const PaymentReportModal = ({ isOpen, onClose }: TCustomModal) => {
  const [activeTab, setActiveTab] = useState<"date" | "all">("date");

  const paymentData = [
    {
      ledger: "অন্যান্য",
      quantity: "৯৮,৫৮০",
      totalBill: "৳ ৮৭,০৯,৫৪৪",
      advance: "৳ ০",
      cutting: "৳ ৫,৫৯০",
      payment: "৳ ৮১,৪৯,৩৫৪",
      due: "৳ ০",
    },
    {
      ledger: "শেল",
      quantity: "৩৬,৩৬৪",
      totalBill: "৳ ৪১,৯১,৯৬২",
      advance: "৳ ০",
      cutting: "৳ ৪,৮৩৯",
      payment: "৳ ৪১,৯০,৮২৯",
      due: "৳ ০",
    },
    {
      ledger: "কয়লা",
      quantity: "৪",
      totalBill: "৳ ১,০২,২২২",
      advance: "৳ ০",
      cutting: "৳ ০",
      payment: "৳ ১,০৪,২২২",
      due: "৳ ২,০০০ (বেশি)",
    },
    {
      ledger: "কিন পরিষ্কার",
      quantity: "৫,০০০",
      totalBill: "৳ ৬০,০০০",
      advance: "৳ ০",
      cutting: "৳ ৯,৭৯৯",
      payment: "৳ ২৮,২১০",
      due: "৳ ০",
    },
    {
      ledger: "বালু",
      quantity: "১,৫৫০",
      totalBill: "৳ ২৬,০২২",
      advance: "৳ ৬,০০০",
      cutting: "৳ ৬,০০৫",
      payment: "৳ ১০,০১৭",
      due: "৳ ৪,০০০ (কম)",
    },
    {
      ledger: "মেশি",
      quantity: "০",
      totalBill: "৳ ৫০০",
      advance: "৳ ০",
      cutting: "৳ ০",
      payment: "৳ ৫০০",
      due: "৳ ০",
    },
  ];

  return (
    <CustomReportModal
      isOpen={isOpen}
      onClose={onClose}
      title="গ্রুপ অনুযায়ি পেমেন্ট রিপোর্ট"
      width="xxl"
    >
      <div className="w-full">
        {/* Tabs */}
        <div className="mb-3 grid grid-cols-2 gap-2">
          {/* Date Tab */}
          <button
            type="button"
            onClick={() => setActiveTab("date")}
            className={`
              h-9 rounded-md border px-3
              text-sm font-medium transition
              ${
                activeTab === "date"
                  ? "border-[#039A63] bg-[#039A63] text-white"
                  : "border-[#039A63] bg-white text-[#039A63] hover:bg-[#039A63] hover:text-white"
              }
            `}
          >
            {formatDate(new Date()) + "এর রিপোর্ট"}
          </button>

          {/* All Payment Tab */}
          <button
            type="button"
            onClick={() => setActiveTab("all")}
            className={`
              h-9 rounded-md border px-3
              text-sm font-medium transition
              ${
                activeTab === "all"
                  ? "border-[#039A63] bg-[#039A63] text-white"
                  : "border-[#039A63] bg-white text-[#039A63] hover:bg-[#039A63] hover:text-white"
              }
            `}
          >
            সব পেমেন্ট রিপোর্ট
          </button>
        </div>

        {/* Report Content */}
        {activeTab === "date" && (
          <div className="overflow-x-auto">
            <div className="overflow-hidden border border-gray-200">
              <table className="w-full min-w-[750px] border-collapse">
                <thead>
                  <tr className="bg-[#11966D] text-white">
                    <th className="border-r border-[#0d8b65] px-3 py-3 text-left font-semibold">
                      খতিয়ান
                    </th>

                    <th className="border-r border-[#0d8b65] px-3 py-3 text-left font-semibold">
                      পরিমাণ
                    </th>

                    <th className="border-r border-[#0d8b65] px-3 py-3 text-left font-semibold">
                      মোট বিল
                    </th>

                    <th className="border-r border-[#0d8b65] px-3 py-3 text-left font-semibold">
                      অগ্রিম
                    </th>

                    <th className="border-r border-[#0d8b65] px-3 py-3 text-left font-semibold">
                      কর্তন
                    </th>

                    <th className="border-r border-[#0d8b65] px-3 py-3 text-left font-semibold">
                      পেমেন্ট
                    </th>

                    <th className="px-3 py-3 text-left font-semibold">
                      কম/বেশি
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {paymentData.map((item, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-200 last:border-b-0"
                    >
                      <td className="px-3 py-3 text-[#039A63]">
                        {item.ledger}
                      </td>

                      <td className="px-3 py-3 text-gray-800">
                        {item.quantity}
                      </td>

                      <td className="px-3 py-3 text-gray-800">
                        {item.totalBill}
                      </td>

                      <td className="px-3 py-3 text-orange-500">
                        {item.advance}
                      </td>

                      <td className="px-3 py-3 text-orange-500">
                        {item.cutting}
                      </td>

                      <td className="px-3 py-3 font-medium text-[#039A63]">
                        {item.payment}
                      </td>

                      <td
                        className={`px-3 py-3 ${
                          item.due.includes("বেশি")
                            ? "text-[#039A63]"
                            : item.due.includes("কম")
                              ? "text-orange-500"
                              : "text-gray-700"
                        }`}
                      >
                        {item.due}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Summary */}
            <div className="mt-4 overflow-hidden border border-gray-100 bg-gray-50">
              <div className="grid grid-cols-2 border-b border-gray-100 px-4 py-2.5">
                <span className="text-gray-700">মোট বিল</span>

                <span className="text-gray-800">৳ ৬৫,৬৫,২২০</span>
              </div>

              <div className="grid grid-cols-2 border-b border-gray-100 px-4 py-2.5">
                <span className="text-orange-500">অগ্রিম</span>

                <span className="text-orange-500">৳ ৬,০০০</span>
              </div>

              <div className="grid grid-cols-2 border-b border-gray-100 px-4 py-2.5">
                <span className="text-orange-500">কর্তন</span>

                <span className="text-orange-500">৳ ২২,৫৫১</span>
              </div>

              <div className="grid grid-cols-2 border-b border-gray-100 px-4 py-2.5">
                <span className="text-orange-500">পেমেন্ট করা</span>

                <span className="text-orange-500">৳ ৬,০০০</span>
              </div>

              <div className="grid grid-cols-2 px-4 py-2.5">
                <span className="font-medium text-[#039A63]">
                  মোট পেমেন্ট দেওয়া
                </span>

                <span className="font-medium text-[#039A63]">৳ ৬৫,৬৫,৯০৯</span>
              </div>
            </div>
          </div>
        )}

        {/* All Payment Report */}
        {activeTab === "all" && (
          <div className="flex min-h-[250px] items-center justify-center rounded-md border border-dashed border-gray-300 bg-gray-50">
            <p className="text-sm text-gray-500">
              সব পেমেন্ট রিপোর্ট এখানে দেখানো হবে
            </p>
          </div>
        )}
      </div>
    </CustomReportModal>
  );
};

export default PaymentReportModal;
