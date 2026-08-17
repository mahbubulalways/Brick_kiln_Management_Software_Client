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
            {/* Header */}
            <div className="mb-2 flex items-center justify-between">
                <h2 className="text-[18px] font-medium text-[#FF3D00]">
                    টাকা নেওয়ার লিস্ট
                    <span className="ml-2 text-sm text-gray-500">
                        ({totalCount})
                    </span>
                </h2>

                <div className="flex items-center gap-6 text-[15px] font-medium">
                    <p className="text-[#FF3D00]">
                        মোট নেওয়া:{" "}
                        <span className="font-semibold">
                            ৳ {totalAmount.toLocaleString("bn-BD")}
                        </span>
                    </p>

                    <p className="text-red-500">
                        মোট বাকি:{" "}
                        <span className="font-semibold">
                            ৳{" "}
                            {totalCurrentAmount.toLocaleString(
                                "bn-BD"
                            )}
                        </span>
                    </p>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-hidden rounded-md border border-gray-200">
                {/* Table Head */}
                <div className="grid grid-cols-[1fr_180px_180px] bg-[#039A63] text-[15px] font-semibold text-white">
                    <div className="px-4 py-3">
                        নাম, ঠিকানা
                    </div>

                    <div className="border-l border-white/20 px-4 py-3 text-right">
                        টাকা নিয়েছি
                    </div>

                    <div className="border-l border-white/20 px-4 py-3 text-right">
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
                                <div className="flex items-center gap-3 px-4">
                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-slate-100">
                                        <UserRoundPlus className="h-6 w-6 text-black" />
                                    </div>

                                    <div>
                                        <h3 className="text-[16px] font-medium text-gray-900">
                                            {item.name}
                                        </h3>

                                        <p className="mt-1 text-[13px] text-gray-500">
                                            {item.address ||
                                                "ঠিকানা নেই"}
                                        </p>

                                        {item.phone && (
                                            <p className="mt-0.5 text-[12px] text-gray-400">
                                                {item.phone}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Total Amount */}
                                <div className="border-l border-gray-200 px-4 text-right text-[16px] font-medium text-gray-900">
                                    ৳{" "}
                                    {Number(
                                        item.amount
                                    ).toLocaleString("bn-BD")}
                                </div>

                                {/* Current Amount */}
                                <div className="border-l border-gray-200 px-4 text-right text-[16px] font-semibold text-red-500">
                                    ৳{" "}
                                    {Number(
                                        item.currentAmount
                                    ).toLocaleString("bn-BD")}
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
    );
};

export default TakenDueList;