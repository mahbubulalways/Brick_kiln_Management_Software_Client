"use client";

import { useState } from "react";
import { useGetAllCustomerQuery } from "@/redux/features/customer.features";
import { toBanglaNumber } from "@/utils/toBanglaNumber";
import { TCustomer } from "@/interface/customer";
import CustomLoader from "@/components/Reusable/CustomLoader";
import CustomStatus from "@/components/Reusable/CustomStatus";
import SearchBar from "@/components/Reusable/SearchBar";
import { TQuery } from "@/interface/query";
import { TMetaConfig } from "@/interface/meta";
import { TablePagination } from "@/components/Reusable/TablePagination";
import { useRouter } from "next/navigation";
import UpdateCustomerModal from "@/components/Dashboard/Modals/EditModals/UpdateCustomerModal";
import UpdateDuePayDateModal from "@/components/Dashboard/Modals/EditModals/UpdateDuePayDateModal";

const formatDate = (date: string | null) => {
    if (!date) return "-";

    const d = new Date(date);

    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();

    return `${toBanglaNumber(day)}-${toBanglaNumber(
        month
    )}-${toBanglaNumber(year)}`;
};

const formatAmount = (amount: number) => {
    return toBanglaNumber(amount.toLocaleString("en-IN"));
};

const CustomerPage = ({ limit, page, search }: TQuery) => {
    const [searchItems, setSearchItem] = useState("");
    const [openUpdateCustomer, setOpenUpdateCustomer] = useState<boolean>(false);
    const [openUpdateDateModal, setOpenUpdateDateModal] = useState<boolean>(false);
    const [customerId, setCustomerId] = useState<number | undefined>(undefined)
    const router = useRouter()
    const {
        data: response,
        isError,
        isFetching,
        isLoading,
    } = useGetAllCustomerQuery({ limit, search, page });

    const customers: TCustomer[] = response?.data?.data ?? [];
    const meta = response?.data?.meta as TMetaConfig;


    if (isLoading) {
        return (
            <CustomLoader cls="h-[30vh]" />
        );
    }

    if (isError) {
        return (
            <CustomStatus type="error" />
        );
    }

    return (
        <div className="w-full min-h-screen bg-[#F4F7FA] p-4">
            <div className="w-full overflow-hidden rounded-md border border-gray-200 bg-white shadow-sm">
                {/* ================= Header ================= */}
                <div className="flex flex-col gap-3 border-b border-gray-200 p-4 md:flex-row md:items-center md:justify-between">
                    {/* Customer Count */}
                    <div className="flex w-fit items-center gap-2 rounded-lg border border-[#079B67] bg-white px-5 py-1.5">
                        <span className="text-[15px] font-medium text-[#079B67]">
                            কাস্টমারঃ
                        </span>

                        <span className="text-[17px] font-semibold text-[#079B67]">
                            {toBanglaNumber(customers?.length)} জন
                        </span>
                    </div>

                    <SearchBar
                        value={searchItems}
                        onChange={(e) => setSearchItem(e.target.value)}
                        onClear={() => setSearchItem("")}
                    />
                </div>

                {/* ================= Table ================= */}
                <div className="w-full overflow-x-auto">
                    <table className="w-full min-w-[1250px] border-collapse">
                        <thead>
                            <tr className="bg-[#079B67] text-white">
                                <th className="w-[120px] px-4 py-4 text-left text-sm font-semibold">
                                    আইডি
                                </th>

                                <th className="min-w-[260px] px-4 py-4 text-left text-sm font-semibold">
                                    নাম, ঠিকানা, ফোন নম্বর
                                </th>

                                <th className="min-w-[260px] px-4 py-4 text-left text-sm font-semibold">
                                    ডেলিভারি
                                </th>

                                <th className="min-w-[240px] px-4 py-4 text-left text-sm font-semibold">
                                    টাকা
                                </th>

                                <th className="min-w-[280px] px-4 py-4 text-left text-sm font-semibold">
                                    বাকি পরিশোধের তারিখ
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {customers?.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={5}
                                        className="py-16 text-center text-gray-500"
                                    >
                                        কোনো কাস্টমার পাওয়া যায়নি
                                    </td>
                                </tr>
                            ) : (
                                customers?.map((customer) => (
                                    <tr

                                        key={customer.id}
                                        className="border-b cursor-pointer border-gray-200 transition-colors hover:bg-gray-50"
                                    >
                                        {/* ================= ID ================= */}
                                        <td onClick={() => router.push(`/dashboard/customer/profile/${customer.id}`)}

                                            className="p-3 align-top">
                                            <div className="flex min-h-27 flex-col items-center justify-center rounded-lg bg-[#FCE4DE]">
                                                <span className="text-[30px] font-medium leading-none text-[#FF4B12]">
                                                    {toBanglaNumber(customer.id)}
                                                </span>

                                                <span className="mt-2 text-sm font-medium text-[#FF7448]">
                                                    কাস্টমার
                                                </span>
                                            </div>
                                        </td>

                                        {/* ================= Customer Info ================= */}
                                        <td
                                            onClick={() => router.push(`/dashboard/customer/profile/${customer.id}`)}
                                            className="p-4 align-top">
                                            <div className="space-y-2">
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
                                                    valueClassName="font-semibold text-[#334155]"
                                                />
                                            </div>
                                        </td>

                                        {/* ================= Delivery ================= */}
                                        <td
                                            onClick={() => router.push(`/dashboard/customer/profile/${customer.id}`)}
                                            className="p-4 align-top">
                                            <div className="space-y-2">
                                                <InfoRow
                                                    label="মোট ইট ক্রয়"
                                                    value={formatAmount(
                                                        customer.totalPurchasedQuantity
                                                    )}
                                                />

                                                <InfoRow
                                                    label="ডেলিভারি"
                                                    value={formatAmount(
                                                        customer.totalDeliveredQuantity
                                                    )}
                                                />

                                                <InfoRow
                                                    label="ডেলিভারি বাকি"
                                                    value={formatAmount(
                                                        customer.totalRemainingQuantity
                                                    )}
                                                    labelClassName="text-[#FF6B00]"
                                                    valueClassName="font-semibold text-[#FF6B00]"
                                                />
                                            </div>
                                        </td>

                                        {/* ================= Money ================= */}
                                        <td
                                            onClick={() => router.push(`/dashboard/customer/profile/${customer.id}`)}
                                            className="p-4 align-top">
                                            <div className="space-y-2">
                                                <InfoRow
                                                    label="মোট মূল্য"
                                                    value={formatAmount(customer.totalAmount)}
                                                />

                                                <InfoRow
                                                    label="পরিশোধ"
                                                    value={formatAmount(customer.totalPaid)}
                                                />

                                                <InfoRow
                                                    label="টাকা বাকি"
                                                    value={formatAmount(customer.totalDue)}
                                                    labelClassName="text-[#FF4B12]"
                                                    valueClassName="font-semibold text-[#FF4B12]"
                                                />
                                            </div>
                                        </td>

                                        {/* ================= Payment Date ================= */}
                                        <td className="p-4 align-top">
                                            <div className="space-y-2">
                                                <InfoRow
                                                    label="পরিশোধের তারিখ"
                                                    value={formatDate(customer.nextPaymentDate)}
                                                />

                                                <InfoRow
                                                    label="নোট"
                                                    value={customer.note || "-"}
                                                />

                                                <div className="flex flex-wrap gap-2 pt-1">
                                                    <button
                                                        onClick={() => {
                                                            setOpenUpdateCustomer(true),
                                                                setCustomerId(customer.id)
                                                        }}
                                                        type="button"
                                                        className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-[#079B67] hover:text-[#079B67]"
                                                    >
                                                        আপডেট কাস্টমার
                                                    </button>

                                                    <button
                                                        onClick={() => {
                                                            setOpenUpdateDateModal(true),
                                                                setCustomerId(customer.id)
                                                        }}
                                                        type="button"
                                                        className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-[#079B67] hover:text-[#079B67]"
                                                    >
                                                        আপডেট তারিখ
                                                    </button>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                    <TablePagination
                        page={meta?.page ?? 1}
                        totalPages={meta?.totalPages ?? 1}
                        dataLength={customers?.length}
                        title="পেমেন্ট"
                    />
                </div>
            </div>
            {
                openUpdateCustomer
                && <UpdateCustomerModal id={customerId!}
                    isOpen={openUpdateCustomer}
                    onClose={() => setOpenUpdateCustomer(false)}
                    setId={setCustomerId}
                />
            }

            {
                openUpdateDateModal &&
                <UpdateDuePayDateModal
                    setId={setCustomerId}
                    id={customerId!}
                    isOpen={openUpdateDateModal}
                    onClose={() => setOpenUpdateDateModal(false)}
                />
            }
        </div>
    );
};

/* =========================================================
   Reusable Info Row
========================================================= */

interface InfoRowProps {
    label: string;
    value: string | number;
    labelClassName?: string;
    valueClassName?: string;
}

const InfoRow = ({
    label,
    value,
    labelClassName = "",
    valueClassName = "",
}: InfoRowProps) => {
    return (
        <div className="flex items-center gap-3">
            <span
                className={`inline-flex min-w-[95px] items-center rounded-lg bg-[#F0F4F8] px-3 py-1.5 text-sm text-gray-700 ${labelClassName}`}
            >
                {label}
            </span>

            <span
                className={`text-[15px] text-gray-800 ${valueClassName}`}
            >
                {value}
            </span>
        </div>
    );
};

export default CustomerPage;