"use client";
import ChalanDetailsModal from "@/components/Dashboard/Modals/ChalanDetailsModal";
import NewDeliveryModal from "@/components/Dashboard/Modals/NewDeliveryModal";
import SellingModal from "@/components/Dashboard/Modals/SellingModal";
import ChalanPrintModal from "@/components/Dashboard/PrintModal/ChalanPrint/ChalanPrintModal";
import PrintThermalInvoice from "@/components/Dashboard/PrintModal/PrintThermalInvoice";
import CustomDateRangePicker from "@/components/Reusable/CustomDateRangePicker";
import CustomDropDownMenuItem from "@/components/Reusable/CustomDropDownMenuItem";
import CustomLoader from "@/components/Reusable/CustomLoader";
import CustomReportButton from "@/components/Reusable/CustomReportButton";
import SearchBar from "@/components/Reusable/SearchBar";
import TableData from "@/components/Reusable/TableData";
import TableHead from "@/components/Reusable/TableHead";
import { TablePagination } from "@/components/Reusable/TablePagination";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TMetaConfig } from "@/interface/meta";
import { TQuery } from "@/interface/query";
import { useGetAllInvoicesQuery } from "@/redux/features/invoice.features";
import { IChallanForDataShow, IChallanItem } from "@/types/types";
import { MoreVertical, Printer, Truck, Notebook, User } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const AllInvoicePage = ({ limit, page, search }: TQuery) => {
    const [openReportModal, setOpenReportModal] = useState<boolean>(false);
    const [openPrintModal, setOpenPrintModal] = useState<boolean>(false);
    const [openThermalModal, setOpenThermalModal] = useState<boolean>(false);
    const [isDeliveryModalOpen, setIsDeliveryModalOpen] =
        useState<boolean>(false);
    const [searchItems, setSearchItem] = useState("");
    const [invoiceId, setInvoiceId] = useState<number>();
    const [openChalanDetailsModal, setOpenChalanDetailsModal] =
        useState<boolean>(false);
    const [dateRange, setDateRange] = useState("");

    const { isLoading: fetchInvoiceLoading, data } =
        useGetAllInvoicesQuery(
            { limit, page, search, date: dateRange }
            , { refetchOnMountOrArgChange: true });

    const invoices = data?.data?.data || []
    const meta = data?.data?.meta as TMetaConfig;
    return (
        <div className="bg-white rounded-md shadow border border-gray-200 ">
            {/* Header search & controls */}
            <div className="flex justify-between flex-col md:flex-row w-full gap-2 items-center p-3  bg-gray-50">
                <SearchBar value={searchItems} onChange={(e) => setSearchItem(e.target.value)}
                    onClear={() => setSearchItem("")} />
                <div className="flex items-center w-full md:w-max gap-4">
                    <CustomDateRangePicker value={dateRange} onChange={setDateRange} />
                    <CustomReportButton
                        onClick={() => setOpenReportModal(true)}
                    />
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full ">
                    <thead>
                        <tr className="bg-[#039A63] text-white text-center">
                            <TableHead th={"#"} />
                            <TableHead th={"কাস্টমার"} />
                            <TableHead th={"ঠিকানা"} cls="hidden lg:table-cell" />
                            <TableHead th={"শ্রেণি"} />
                            <TableHead th={"পরিমাণ"} />
                            <TableHead th={"রেট"} cls="hidden lg:table-cell" />
                            <TableHead th={"মূল্য"} cls="hidden lg:table-cell" />
                            <TableHead th={"মোট মূল্য"} cls="hidden lg:table-cell" />
                            <TableHead th={"ছাড়"} cls="hidden lg:table-cell" />
                            <TableHead th={"ভাড়া"} cls="hidden lg:table-cell" />
                            <TableHead th={"সর্বমোট"} />
                            <TableHead th={"নগদ"} cls="hidden lg:table-cell" />
                            <TableHead th={"বাকি"} cls="hidden lg:table-cell" />
                            <TableHead th={"বাটন"} />
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {fetchInvoiceLoading ? (
                            <tr>
                                <td colSpan={13}>
                                    <CustomLoader cls="h-[30vh]" />
                                </td>
                            </tr>
                        ) : !invoices?.length ? (
                            <tr>
                                <td colSpan={13} className="py-8 text-gray-600">
                                    কোনো ডাটা পাওয়া যায়নি
                                </td>
                            </tr>
                        ) : (
                            invoices?.map((row: IChallanForDataShow, idx: number) =>
                                row?.items?.length > 1 ? (
                                    row?.items?.map((item: IChallanItem, index: number) => (
                                        <tr
                                            key={`${row?.id}-${item?.id}`}
                                            className="hover:bg-gray-50 transition-colors"
                                        >
                                            {index === 0 && (
                                                <>
                                                    <TableData
                                                        td={index + 1}
                                                        rowSpan={row?.items?.length}
                                                    />
                                                    <TableData
                                                        td={row?.customer?.name}
                                                        rowSpan={row?.items?.length}
                                                    />
                                                    <TableData
                                                        td={row?.customer?.address}
                                                        cls="hidden lg:table-cell"
                                                        rowSpan={row?.items?.length}
                                                    />
                                                </>
                                            )}

                                            <TableData td={item?.class} />
                                            <TableData td={item?.quantity?.toLocaleString()} />
                                            <TableData td={item?.rate} cls="hidden lg:table-cell" />
                                            <TableData
                                                td={`৳ ${item?.price?.toLocaleString()}`}
                                                cls="hidden lg:table-cell"
                                            />

                                            {index === 0 && (
                                                <>
                                                    <TableData
                                                        td={`৳ ${row?.productPrice}`}
                                                        cls="text-green-600 hidden lg:table-cell"
                                                        rowSpan={row?.items?.length}
                                                    />
                                                    <TableData
                                                        td={`৳ ${row?.discount}`}
                                                        cls="text-orange-500 hidden lg:table-cell"
                                                        rowSpan={row?.items?.length}
                                                    />
                                                    <TableData
                                                        td={`৳ ${row?.carRent}`}
                                                        cls="text-blue-600 hidden lg:table-cell"
                                                        rowSpan={row?.items?.length}
                                                    />
                                                    <TableData
                                                        td={`৳ ${row?.totalPrice}`}
                                                        rowSpan={row?.items?.length}
                                                    />

                                                    <TableData
                                                        td={`৳ ${row?.cash}`}
                                                        cls="text-green-600 hidden lg:table-cell"
                                                        rowSpan={row?.items?.length}
                                                    />
                                                    <TableData
                                                        td={`৳ ${row?.due}`}
                                                        cls={`border p-2 ${row?.due > 0 ? "text-red-500" : "text-green-600"
                                                            } hidden lg:table-cell`}
                                                        rowSpan={row?.items?.length}
                                                    />
                                                    <td
                                                        className="border p-2"
                                                        rowSpan={row?.items?.length}
                                                    >
                                                        <DropdownMenu>
                                                            <DropdownMenuTrigger asChild>
                                                                <button className="p-1.5 rounded hover:bg-gray-100 transition">
                                                                    <MoreVertical className="w-4 h-4 text-gray-600 cursor-pointer" />
                                                                </button>
                                                            </DropdownMenuTrigger>
                                                            <DropdownMenuContent
                                                                align="end"
                                                                className="rounded-md border bg-white shadow-md"
                                                            >
                                                                {/* for lg desktop */}
                                                                <DropdownMenuItem
                                                                    className="hidden lg:block"
                                                                    onClick={() => {
                                                                        setOpenPrintModal(true);
                                                                        setInvoiceId(row?.id);
                                                                    }}
                                                                >
                                                                    <CustomDropDownMenuItem
                                                                        Icon={Printer}
                                                                        title="প্রিন্ট চালান"
                                                                    />
                                                                </DropdownMenuItem>

                                                                {/* for mobile */}
                                                                <DropdownMenuItem
                                                                    className="lg:hidden block"
                                                                    onClick={() => {
                                                                        setOpenThermalModal(true);
                                                                        setInvoiceId(row?.id);
                                                                    }}
                                                                >
                                                                    <CustomDropDownMenuItem
                                                                        Icon={Printer}
                                                                        title="প্রিন্ট চালান"
                                                                    />
                                                                </DropdownMenuItem>

                                                                <DropdownMenuItem
                                                                    onClick={() => {
                                                                        setIsDeliveryModalOpen(true);
                                                                        setInvoiceId(row?.id);
                                                                    }}
                                                                >
                                                                    <CustomDropDownMenuItem
                                                                        Icon={Truck}
                                                                        title="ডেলিভারি দিন"
                                                                    />
                                                                </DropdownMenuItem>
                                                                <DropdownMenuItem
                                                                    onClick={() => {
                                                                        setInvoiceId(row?.id);
                                                                        setOpenChalanDetailsModal(true);
                                                                    }}
                                                                >
                                                                    <CustomDropDownMenuItem
                                                                        Icon={Notebook}
                                                                        title="চালান বিস্তারিত"
                                                                    />
                                                                </DropdownMenuItem>
                                                                <DropdownMenuItem>
                                                                    <CustomDropDownMenuItem
                                                                        Icon={User}
                                                                        title="প্রোফাইলে যান"
                                                                    />
                                                                </DropdownMenuItem>
                                                            </DropdownMenuContent>
                                                        </DropdownMenu>
                                                    </td>
                                                </>
                                            )}
                                        </tr>
                                    ))
                                ) : (
                                    <tr
                                        key={row?.id}
                                        className="hover:bg-gray-50 transition-colors"
                                    >
                                        <TableData td={idx + 1} />
                                        <TableData td={row?.customer?.name} />
                                        <TableData
                                            td={row?.customer?.address}
                                            cls="hidden lg:table-cell"
                                        />
                                        <TableData td={row.items[0]?.class} />
                                        <TableData td={row.items[0]?.quantity.toLocaleString()} />
                                        <TableData
                                            td={row.items[0]?.rate}
                                            cls="hidden lg:table-cell"
                                        />
                                        <TableData
                                            td={`৳ ${row.items[0]?.price.toLocaleString()}`}
                                            cls="hidden lg:table-cell"
                                        />

                                        <TableData
                                            td={`৳ ${row?.productPrice}`}
                                            cls="text-green-600 hidden lg:table-cell"
                                        />
                                        <TableData
                                            td={`৳ ${row?.discount}`}
                                            cls="text-orange-500 hidden lg:table-cell"
                                        />
                                        <TableData
                                            td={`৳ ${row?.carRent}`}
                                            cls="text-blue-600 hidden lg:table-cell"
                                        />
                                        <TableData td={`৳ ${row.totalPrice}`} />

                                        <TableData
                                            td={`৳ ${row?.cash}`}
                                            cls="text-green-600 hidden lg:table-cell"
                                        />
                                        <TableData
                                            td={`৳ ${row?.due}`}
                                            cls={`border p-2 ${row.due > 0 ? "text-red-500" : "text-green-600"
                                                } hidden lg:table-cell`}
                                        />
                                        <td className="border p-2">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <button className="p-1.5 rounded hover:bg-gray-100 transition">
                                                        <MoreVertical className="w-4 h-4 text-gray-600 cursor-pointer" />
                                                    </button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent
                                                    align="end"
                                                    className="rounded-md border bg-white shadow-md"
                                                >
                                                    {/* for lg desktop */}
                                                    <DropdownMenuItem
                                                        className="hidden lg:block"
                                                        onClick={() => {
                                                            setOpenPrintModal(true);
                                                            setInvoiceId(row?.id);
                                                        }}
                                                    >
                                                        <CustomDropDownMenuItem
                                                            Icon={Printer}
                                                            title="প্রিন্ট চালান"
                                                        />
                                                    </DropdownMenuItem>

                                                    {/* for mobile */}
                                                    <DropdownMenuItem
                                                        className="lg:hidden block"
                                                        onClick={() => {
                                                            setOpenThermalModal(true);
                                                            setInvoiceId(row?.id);
                                                        }}
                                                    >
                                                        <CustomDropDownMenuItem
                                                            Icon={Printer}
                                                            title="প্রিন্ট চালান"
                                                        />
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        onClick={() => {
                                                            setIsDeliveryModalOpen(true);
                                                            setInvoiceId(row?.id);
                                                        }}
                                                    >
                                                        <CustomDropDownMenuItem
                                                            Icon={Truck}
                                                            title="ডেলিভারি দিন"
                                                        />
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        onClick={() => {
                                                            setOpenChalanDetailsModal(true);
                                                            setInvoiceId(row?.id);
                                                        }}
                                                    >
                                                        <CustomDropDownMenuItem
                                                            Icon={Notebook}
                                                            title="চালান বিস্তারিত"
                                                        />
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem>
                                                       <Link href={`/dashboard/customer/profile/${row?.customer?.id}`}> <CustomDropDownMenuItem
                                                            Icon={User}
                                                            title="প্রোফাইলে যান"
                                                        /></Link>
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </td>
                                    </tr>
                                )
                            )
                        )}
                    </tbody>
                </table>
                <TablePagination
                    page={meta?.page ?? 1}
                    totalPages={meta?.totalPages ?? 1}
                    dataLength={invoices?.length}
                    title="চালান"
                />
            </div>


            {openReportModal && (
                <SellingModal
                    isOpen={openReportModal}
                    onClose={() => setOpenReportModal(false)}
                    endDate={dateRange?.split("_")[0] ? dateRange?.split("_")[0] : ""}
                    startDate={
                        dateRange?.split("_")[1] ? dateRange?.split("_")[1] : ""
                    }
                />
            )}

            {openPrintModal && (
                <ChalanPrintModal
                    isOpen={openPrintModal}
                    onClose={() => setOpenPrintModal(false)}
                    invoiceId={invoiceId!}
                    setInvoiceId={setInvoiceId}
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
            {openThermalModal && (
                <PrintThermalInvoice
                    invoiceId={invoiceId!}
                    setInvoiceId={setInvoiceId}
                    isOpen={openThermalModal}
                    onClose={() => setOpenThermalModal(false)}
                />
            )}
            {isDeliveryModalOpen && (
                <NewDeliveryModal
                    isOpen={isDeliveryModalOpen}
                    onClose={() => setIsDeliveryModalOpen(false)}
                    invoiceId={invoiceId}
                />
            )}
        </div>
    );
};

export default AllInvoicePage;
