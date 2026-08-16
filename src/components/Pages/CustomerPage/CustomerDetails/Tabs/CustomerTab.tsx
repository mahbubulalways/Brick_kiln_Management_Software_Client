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
import {  TDeliveryWithCustomer } from "@/interface/delivery";

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

            <div className="flex flex-wrap items-center gap-2 rounded-lg border border-[#DCE5ED] bg-[#F8FAFC] p-2">

                <CustomDatePickerState
                    value={startDate}
                    onChange={setStartDate}
                    placeholder="শুরুর তারিখ"
                    height="9"
                />

                <span className="text-gray-400">
                    -
                </span>

                <CustomDatePickerState
                    value={endDate}
                    onChange={setEndDate}
                    placeholder="শেষের তারিখ"
                    height="9"
                />

                <button
                    type="button"

                    onClick={handlePrint}
                    className="flex h-9 items-center gap-2 rounded-md bg-[#079B67] px-4 text-sm font-medium text-white hover:bg-[#05875B]"
                >
                    <Printer size={17} />

                    {printButtonText[activeTab]}
                </button>
            </div>

            {/* ================= Tabs ================= */}

            <div className="mt-3 flex items-center gap-2">

                {/* All Challan */}

                <button
                    type="button"
                    onClick={() =>
                        handleTabChange("all")
                    }
                    className={`flex cursor-pointer items-center gap-2 rounded-md px-4 py-1.5 text-sm font-medium transition ${activeTab === "all"
                        ? "bg-[#079B67] text-white"
                        : "bg-[#F0F4F8] text-gray-600 hover:bg-gray-200"
                        }`}
                >
                    <FileText size={16} />

                    সব চালান
                </button>

                {/* Delivery Pending */}

                <button
                    type="button"
                    onClick={() =>
                        handleTabChange(
                            "deliveryInfo"
                        )
                    }
                    className={`flex cursor-pointer items-center gap-2 rounded-md px-4 py-1.5 text-sm font-medium transition ${activeTab === "deliveryInfo"
                        ? "bg-[#079B67] text-white"
                        : "bg-[#F0F4F8] text-gray-600 hover:bg-gray-200"
                        }`}
                >
                    <Truck size={16} />

                    ডেলিভারি হিস্ট্রি
                </button>

                {/* Due Collection */}

                <button
                    type="button"
                    onClick={() =>
                        handleTabChange(
                            "dueCollection"
                        )
                    }
                    className={`flex cursor-pointer items-center gap-2 rounded-md px-4 py-1.5 text-sm font-medium transition ${activeTab === "dueCollection"
                        ? "bg-[#079B67] text-white"
                        : "bg-[#F0F4F8] text-gray-600 hover:bg-gray-200"
                        }`}
                >
                    <Banknote size={16} />

                    বাকি জমা
                </button>
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