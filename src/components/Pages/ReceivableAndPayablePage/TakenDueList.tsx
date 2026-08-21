"use client";

import { IReceivablePayable } from "@/interface/due_mate";
import { UserRoundPlus } from "lucide-react";
import Link from "next/link";

const TakenDueList = ({
  dues,
}: {
  dues: IReceivablePayable[];
}) => {
  const totalCount = dues.length;

  const totalAmount = dues.reduce(
    (sum, item) => sum + Number(item.amount),
    0
  );

  const totalCurrentAmount = dues.reduce(
    (sum, item) => sum + Number(item.currentAmount),
    0
  );

  return (
    <div className="w-full">
      {/* =========================
          HEADER
      ========================= */}
      <div className="mb-2 flex items-center justify-between gap-2">
        <h2 className="whitespace-nowrap text-[14px] font-medium text-[#FF3D00] sm:text-[18px]">
          টাকা নেওয়ার লিস্ট
          <span className="ml-1 text-[11px] text-gray-500 sm:ml-2 sm:text-sm">
            ({totalCount})
          </span>
        </h2>

        <div className="flex items-center gap-2 text-[11px] font-medium sm:gap-6 sm:text-[15px]">
          <p className="whitespace-nowrap text-[#FF3D00]">
            মোট নেওয়া:{" "}
            <span className="font-semibold">
              ৳ {totalAmount.toLocaleString("bn-BD")}
            </span>
          </p>

          <p className="whitespace-nowrap text-red-500">
            মোট বাকি:{" "}
            <span className="font-semibold">
              ৳ {totalCurrentAmount.toLocaleString("bn-BD")}
            </span>
          </p>
        </div>
      </div>

      {/* =========================
          TABLE
      ========================= */}
      <div className="w-full overflow-x-auto">
        <div className="min-w-[700px] overflow-hidden rounded-md border border-gray-200">
          {/* Table Head */}
          <div className="grid grid-cols-[1fr_180px_180px] bg-[#039A63] text-[14px] font-semibold text-white sm:text-[15px]">
            <div className="whitespace-nowrap px-4 py-3">
              নাম, ঠিকানা
            </div>

            <div className="whitespace-nowrap border-l border-white/20 px-4 py-3 text-right">
              টাকা নিয়েছি
            </div>

            <div className="whitespace-nowrap border-l border-white/20 px-4 py-3 text-right">
              বর্তমান বাকি
            </div>
          </div>

          {/* Table Body */}
          {dues.length > 0 ? (
            dues.map((item) => (
              <Link
                href={`loan/profile/${item.id}`}
                key={item.id}
                className="block"
              >
                <div className="grid min-h-[82px] grid-cols-[1fr_180px_180px] items-center border-t border-gray-200 transition hover:bg-gray-50">
                  {/* Name + Address */}
                  <div className="flex min-w-0 items-center gap-3 px-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-slate-100">
                      <UserRoundPlus className="h-6 w-6 text-black" />
                    </div>

                    <div className="min-w-0">
                      <h3 className="overflow-hidden text-ellipsis whitespace-nowrap text-[15px] font-medium text-gray-900 sm:text-[16px]">
                        {item.name}
                      </h3>

                      <p className="mt-1 overflow-hidden text-ellipsis whitespace-nowrap text-[12px] text-gray-500 sm:text-[13px]">
                        {item.address || "ঠিকানা নেই"}
                      </p>

                      {item.phone && (
                        <p className="mt-0.5 whitespace-nowrap text-[11px] text-gray-400 sm:text-[12px]">
                          {item.phone}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Total Amount */}
                  <div className="whitespace-nowrap border-l border-gray-200 px-4 text-right text-[15px] font-medium text-gray-900 sm:text-[16px]">
                    ৳{" "}
                    {Number(item.amount).toLocaleString("bn-BD")}
                  </div>

                  {/* Current Amount */}
                  <div className="whitespace-nowrap border-l border-gray-200 px-4 text-right text-[15px] font-semibold text-red-500 sm:text-[16px]">
                    ৳{" "}
                    {Number(item.currentAmount).toLocaleString(
                      "bn-BD"
                    )}
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="py-10 text-center text-sm text-gray-500">
              কোনো তথ্য পাওয়া যায়নি
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TakenDueList;