"use client";

import { useGetSingleCustomerInvoiceQuery } from "@/redux/features/customer.features";
import TableData from "@/components/Reusable/TableData";
import TableHead from "@/components/Reusable/TableHead";
import CustomLoader from "@/components/Reusable/CustomLoader";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
    MoreVertical,
    Notebook,
    Printer,
    Truck,
} from "lucide-react";

import CustomDropDownMenuItem from "@/components/Reusable/CustomDropDownMenuItem";
import { TQuery } from "@/interface/query";
import { TablePagination } from "@/components/Reusable/TablePagination";
import { TMetaConfig } from "@/interface/meta";
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { formatBanglaDate } from "@/utils/formatBanglaDate";
import ChalanPrintModal from "@/components/Dashboard/PrintModal/ChalanPrint/ChalanPrintModal";
import NewDeliveryModal from "@/components/Dashboard/Modals/NewDeliveryModal";
import ChalanDetailsModal from "@/components/Dashboard/Modals/ChalanDetailsModal";

interface AllChallanProps {
    customerId: number;
    startDate: string;
    endDate: string;
    query: TQuery
    setInvoiceInfo: Dispatch<SetStateAction<any>>
}

const AllChallan = ({
    customerId,
    startDate,
    endDate,
    query,
    setInvoiceInfo
}: AllChallanProps) => {
    const [openPrintModal, setOpenPrintModal] = useState<boolean>(false);
    const [isDeliveryModalOpen, setIsDeliveryModalOpen] =
        useState<boolean>(false);
    const [invoiceId, setInvoiceId] = useState<number>();
    const [openChalanDetailsModal, setOpenChalanDetailsModal] =
        useState<boolean>(false);
    const {
        data,
        isLoading,
        isFetching,
    } = useGetSingleCustomerInvoiceQuery(
        {
            customerId,
            startDate,
            endDate,
            query
        },
        {
            refetchOnMountOrArgChange: true,
        }
    );

    const invoices = useMemo(() => data?.data?.data ?? [], [data?.data?.data]);
    const meta = data?.data?.meta as TMetaConfig;

    useEffect(() => {
        setInvoiceInfo(invoices);
    }, [invoices]);
    return (
        <div>
            <div className="overflow-x-auto">
                <table className="min-w-full">

                    {/* ================= Header ================= */}
                    <thead>
                        <tr className="bg-[#039A63] text-center text-white">

                            <TableHead th="#" />

                            <TableHead th="তারিখ" />
                            <TableHead th="শ্রেণি" />

                            <TableHead th="পরিমাণ" />

                            <TableHead
                                th="রেট"
                                cls="hidden lg:table-cell"
                            />

                            <TableHead
                                th="মূল্য"
                                cls="hidden lg:table-cell"
                            />

                            <TableHead
                                th="মোট মূল্য"
                                cls="hidden lg:table-cell"
                            />

                            <TableHead
                                th="ছাড়"
                                cls="hidden lg:table-cell"
                            />

                            <TableHead
                                th="ভাড়া"
                                cls="hidden lg:table-cell"
                            />

                            <TableHead th="সর্বমোট" />

                            <TableHead
                                th="নগদ"
                                cls="hidden lg:table-cell"
                            />

                            <TableHead
                                th="বাকি"
                                cls="hidden lg:table-cell"
                            />

                            <TableHead th="বাটন" />

                        </tr>
                    </thead>

                    {/* ================= Body ================= */}
                    <tbody className="text-center">

                        {isLoading || isFetching ? (

                            <tr>
                                <td
                                    colSpan={12}
                                    className="py-10"
                                >
                                    <CustomLoader cls="h-[20vh]" />
                                </td>
                            </tr>

                        ) : !invoices.length ? (

                            <tr>
                                <td
                                    colSpan={12}
                                    className="py-8 text-gray-500"
                                >
                                    কোনো চালান পাওয়া যায়নি
                                </td>
                            </tr>

                        ) : (

                            invoices.map((row: any, index: number) => {

                                const items = row?.items ?? [];

                                return items.map(
                                    (item: any, itemIndex: number) => (

                                        <tr
                                            key={`${row.id}-${item.id}`}
                                            className="transition-colors hover:bg-gray-50"
                                        >

                                            {/* ================= Serial ================= */}
                                            {itemIndex === 0 && (
                                                <TableData
                                                    td={row.id}
                                                    rowSpan={items.length}
                                                />
                                            )}
                                            <TableData
                                                td={formatBanglaDate({ date: item.createdAt })}
                                            />
                                            {/* ================= Class ================= */}
                                            <TableData
                                                td={item.class}
                                            />

                                            {/* ================= Quantity ================= */}
                                            <TableData
                                                td={item.quantity?.toLocaleString()}
                                            />

                                            {/* ================= Rate ================= */}
                                            <TableData
                                                td={item.rate}
                                                cls="hidden lg:table-cell"
                                            />

                                            {/* ================= Item Price ================= */}
                                            <TableData
                                                td={`৳ ${item.price?.toLocaleString()}`}
                                                cls="hidden lg:table-cell"
                                            />

                                            {/* ================= Challan Info ================= */}
                                            {itemIndex === 0 && (
                                                <>

                                                    {/* Product Price */}
                                                    <TableData
                                                        td={`৳ ${row.productPrice?.toLocaleString()}`}
                                                        cls="hidden lg:table-cell text-green-600"
                                                        rowSpan={items.length}
                                                    />

                                                    {/* Discount */}
                                                    <TableData
                                                        td={`৳ ${row.discount?.toLocaleString()}`}
                                                        cls="hidden lg:table-cell text-orange-500"
                                                        rowSpan={items.length}
                                                    />

                                                    {/* Car Rent */}
                                                    <TableData
                                                        td={`৳ ${row.carRent?.toLocaleString()}`}
                                                        cls="hidden lg:table-cell text-blue-600"
                                                        rowSpan={items.length}
                                                    />

                                                    {/* Total Price */}
                                                    <TableData
                                                        td={`৳ ${row.totalPrice?.toLocaleString()}`}
                                                        rowSpan={items.length}
                                                    />

                                                    {/* Cash */}
                                                    <TableData
                                                        td={`৳ ${row.cash?.toLocaleString()}`}
                                                        cls="hidden lg:table-cell text-green-600"
                                                        rowSpan={items.length}
                                                    />

                                                    {/* Due */}
                                                    <TableData
                                                        td={`৳ ${row.due?.toLocaleString()}`}
                                                        cls={`hidden lg:table-cell ${row.due > 0
                                                            ? "text-red-500"
                                                            : "text-green-600"
                                                            }`}
                                                        rowSpan={items.length}
                                                    />

                                                    {/* ================= Actions ================= */}
                                                    <td
                                                        className="border p-2"
                                                        rowSpan={items.length}
                                                    >
                                                        <DropdownMenu>

                                                            <DropdownMenuTrigger asChild>
                                                                <button className="cursor-pointer rounded p-1.5 hover:bg-gray-100">
                                                                    <MoreVertical
                                                                        size={17}
                                                                        className="text-gray-600"
                                                                    />
                                                                </button>
                                                            </DropdownMenuTrigger>

                                                            <DropdownMenuContent
                                                                align="end"
                                                                className="rounded-md border bg-white shadow-md"
                                                            >



                                                                {/* Print */}
                                                                <DropdownMenuItem
                                                                    onClick={() => {
                                                                        setOpenPrintModal(true);
                                                                        setInvoiceId(row.id);
                                                                    }}
                                                                >
                                                                    <CustomDropDownMenuItem
                                                                        Icon={Printer}
                                                                        title="প্রিন্ট চালান"
                                                                    />
                                                                </DropdownMenuItem>

                                                                {/* Delivery */}
                                                                <DropdownMenuItem
                                                                    onClick={() => {
                                                                        setIsDeliveryModalOpen(true);
                                                                        setInvoiceId(row.id);
                                                                    }}
                                                                >
                                                                    <CustomDropDownMenuItem
                                                                        Icon={Truck}
                                                                        title="ডেলিভারি দিন"
                                                                    />
                                                                </DropdownMenuItem>

                                                                {/* Details */}
                                                                <DropdownMenuItem
                                                                    onClick={() => {
                                                                        setInvoiceId(row.id);
                                                                        setOpenChalanDetailsModal(true);
                                                                    }}
                                                                >
                                                                    <CustomDropDownMenuItem
                                                                        Icon={Notebook}
                                                                        title="চালান বিস্তারিত"
                                                                    />
                                                                </DropdownMenuItem>
                                                            </DropdownMenuContent>

                                                        </DropdownMenu>
                                                    </td>

                                                </>
                                            )}

                                        </tr>
                                    )
                                );
                            })
                        )}

                    </tbody>
                </table>
            </div>
            <TablePagination
                page={meta?.page ?? 1}
                totalPages={meta?.totalPages ?? 1}
                dataLength={invoices?.length}
                title="চালান"
            />
            {openPrintModal && (
                <ChalanPrintModal
                    isOpen={openPrintModal}
                    onClose={() => setOpenPrintModal(false)}
                    invoiceId={invoiceId!}
                    setInvoiceId={setInvoiceId}
                />
            )}

            {isDeliveryModalOpen && (
                <NewDeliveryModal
                    isOpen={isDeliveryModalOpen}
                    onClose={() => setIsDeliveryModalOpen(false)}
                    invoiceId={invoiceId}
                />
            )}

            {openChalanDetailsModal && (
                <ChalanDetailsModal
                    invoiceId={invoiceId!}
                    setInvoiceId={setInvoiceId}
                    isOpen={openChalanDetailsModal}
                    onClose={() => setOpenChalanDetailsModal(false)}
                />
            )}
        </div>
    );
};

export default AllChallan;