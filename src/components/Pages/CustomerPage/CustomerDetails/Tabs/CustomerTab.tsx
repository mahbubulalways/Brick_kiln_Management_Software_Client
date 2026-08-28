"use client";

import { useRef, useState } from "react";
import {
    Banknote,
    FileText,
    Truck,
    Printer,
} from "lucide-react";
import {
    usePathname,
    useRouter,
    useSearchParams,
} from "next/navigation";

import AllChallan from "./AllChallan";
import DueCollection from "./DueCollection";
import CustomDatePickerState from "@/components/Reusable/CustomDatePickerState";
import { TQuery } from "@/interface/query";
import DeliveryHistory from "./DeliveryHistory";
import CustomerChalanPrint from "./CustomerChalanPrint";
import { IChallanForDataShow } from "@/types/types";
import CommonPrint, { TCommonPrintRef } from "@/components/Reusable/CommonPrint";
import { TCustomer } from "@/interface/customer";
import DueCollectionPrint from "./DueCollectionPrint";
import { TDueData } from "@/interface/due";
import DeliveryHistoryPrint from "./DeliveryHistoryPrint";
import { TDeliveryWithCustomer } from "@/interface/delivery";

type CustomerTab =
    | "all"
    | "deliveryInfo"
    | "dueCollection";

const CustomerTabs = ({
    id,
    query, customer
}: {
    id: number;
    query: TQuery;
    customer: TCustomer
}) => {

    const [invoiceInfo, setInvoiceInfo] = useState<undefined | IChallanForDataShow[]>(undefined)
    const [dueInfo, setDueInfo] = useState<undefined | TDueData[]>(undefined)
    const [deliveryInfo, setDeliveryInfo] = useState<undefined | TDeliveryWithCustomer[]>(undefined)

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const invoicePrintRef = useRef<TCommonPrintRef>(null);
    const duePrintRef = useRef<TCommonPrintRef>(null);
    const deliveryPrintRef = useRef<TCommonPrintRef>(null);
    const [activeTab, setActiveTab] =
        useState<CustomerTab>("all");

    const [startDate, setStartDate] =
        useState<Date | undefined>();

    const [endDate, setEndDate] =
        useState<Date | undefined>();

    // ================= Date String =================

    const startDateString = startDate
        ? startDate.toISOString()
        : undefined;

    const endDateString = endDate
        ? endDate.toISOString()
        : undefined;

    // ================= Print Text =================

    const printButtonText = {
        all: "চালান প্রিন্ট",
        deliveryInfo: "ডেলিভারি প্রিন্ট",
        dueCollection: "বাকি জমা প্রিন্ট",
    };

    // ================= Tab Change =================

    const handleTabChange = (tab: CustomerTab) => {
        setActiveTab(tab);

        // Reset date
        setStartDate(undefined);
        setEndDate(undefined);

        // Existing search params copy
        const params = new URLSearchParams(
            searchParams.toString()
        );

        // Remove date & pagination
        params.delete("limit");
        params.delete("page");

        // Update URL
        const queryString = params.toString();

        router.replace(
            queryString
                ? `${pathname}?${queryString}`
                : pathname
        );
    };

    // ================= Print =================

    const handlePrint = () => {
        if (activeTab === "all") {
            invoicePrintRef.current?.print()
        }

        if (activeTab === "deliveryInfo") {
            deliveryPrintRef.current?.print()
            console.log(deliveryInfo);
        }

        if (activeTab === "dueCollection") {
            duePrintRef.current?.print()
        }
    };

    return (
        <div className="mt-3 w-full rounded-xl border border-[#DCE5ED] bg-white p-3">

            {/* ================= Filter ================= */}
            {/* ================= Filters ================= */}
            <div className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-3 shadow-sm sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-wrap items-center gap-2">
                    <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 p-1">
                        <CustomDatePickerState
                            value={startDate}
                            onChange={setStartDate}
                            placeholder="শুরুর তারিখ"
                            height="9"
                        />

                        <span className="px-1 text-sm font-medium text-slate-400">
                            —
                        </span>

                        <CustomDatePickerState
                            value={endDate}
                            onChange={setEndDate}
                            placeholder="শেষের তারিখ"
                            height="9"
                        />
                    </div>

                    <button
                        type="button"
                        onClick={handlePrint}
                        className="flex h-9 items-center gap-2 rounded-lg bg-[#079B67] px-4 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#05875B] hover:shadow-md active:scale-[0.98]"
                    >
                        <Printer size={16} strokeWidth={2.2} />

                        <span>
                            {printButtonText[activeTab]}
                        </span>
                    </button>
                </div>
            </div>

            {/* ================= Tabs ================= */}
            <div className="mt-4 flex w-full overflow-x-auto rounded-xl border border-slate-200 bg-white p-1.5 shadow-sm">
                <div className="flex min-w-max items-center gap-1">
                    {/* All Challan */}
                    <button
                        type="button"
                        onClick={() => handleTabChange("all")}
                        className={`flex h-9 cursor-pointer items-center gap-2 rounded-lg px-3 text-[13px] font-semibold transition-all duration-200 md:px-4 md:text-sm ${activeTab === "all"
                                ? "bg-[#079B67] text-white shadow-sm"
                                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                            }`}
                    >
                        <FileText
                            size={16}
                            strokeWidth={2}
                        />

                        <span>
                            সব চালান
                        </span>
                    </button>

                    {/* Delivery History */}
                    <button
                        type="button"
                        onClick={() =>
                            handleTabChange("deliveryInfo")
                        }
                        className={`flex h-9 cursor-pointer items-center gap-2 rounded-lg px-3 text-[13px] font-semibold transition-all duration-200 md:px-4 md:text-sm ${activeTab === "deliveryInfo"
                                ? "bg-[#079B67] text-white shadow-sm"
                                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                            }`}
                    >
                        <Truck
                            size={16}
                            strokeWidth={2}
                        />

                        <span>
                            ডেলিভারি হিস্ট্রি
                        </span>
                    </button>

                    {/* Due Collection */}
                    <button
                        type="button"
                        onClick={() =>
                            handleTabChange("dueCollection")
                        }
                        className={`flex h-9 cursor-pointer items-center gap-2 rounded-lg px-3 text-[13px] font-semibold transition-all duration-200 md:px-4 md:text-sm ${activeTab === "dueCollection"
                                ? "bg-[#079B67] text-white shadow-sm"
                                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                            }`}
                    >
                        <Banknote
                            size={16}
                            strokeWidth={2}
                        />

                        <span>
                            বাকি জমা
                        </span>
                    </button>
                </div>
            </div>

            {/* ================= Tab Content ================= */}

            <div className="mt-3">

                {/* All Challan */}

                {activeTab === "all" && (
                    <AllChallan
                        customerId={id}
                        startDate={
                            startDateString as string
                        }
                        endDate={
                            endDateString as string
                        }
                        query={query}
                        setInvoiceInfo={setInvoiceInfo}
                    />
                )}

                {/* Delivery Pending */}

                {activeTab === "deliveryInfo" && (
                    <DeliveryHistory
                        customerId={id}
                        startDate={
                            startDateString as string
                        }
                        endDate={
                            endDateString as string
                        }
                        query={query}
                        setDeliveryInfo={setDeliveryInfo}
                    />
                )}

                {/* Due Collection */}

                {activeTab === "dueCollection" && (
                    <DueCollection
                        customerId={id}
                        startDate={
                            startDateString as string
                        }
                        endDate={
                            endDateString as string
                        }
                        query={query}
                        setDueInfo={setDueInfo}
                    />
                )}

            </div>
            <CommonPrint
                ref={invoicePrintRef}
                title="customer_invoice"
            >
                <CustomerChalanPrint invoiceInfo={invoiceInfo} customerInfo={customer} />
            </CommonPrint>
            <CommonPrint
                ref={duePrintRef}
                title="customer_due"
            >
                <DueCollectionPrint dueInfo={dueInfo} customerInfo={customer} />
            </CommonPrint>
            <CommonPrint
                ref={deliveryPrintRef}
                title="customer_due"
            >
                <DeliveryHistoryPrint deliveryInfo={deliveryInfo} customerInfo={customer} />
            </CommonPrint>

        </div>
    );
};

export default CustomerTabs;