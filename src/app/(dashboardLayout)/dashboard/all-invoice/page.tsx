"use client";

import ChalanDetailsModal from "@/components/Dashboard/Modals/ChalanDetailsModal";
import SellingModal from "@/components/Dashboard/Modals/SellingModal";
import ChalanPrintModal from "@/components/Dashboard/PrintModal/ChalanPrint/ChalanPrintModal";
import PrintThermalInvoice from "@/components/Dashboard/PrintModal/PrintThermalInvoice";
import CustomDropDownMenuItem from "@/components/Reusable/CustomDropDownMenuItem";
import CustomLoader from "@/components/Reusable/CustomLoader";
import CustomReportButton from "@/components/Reusable/CustomReportButton";
import CustomSearchInput from "@/components/Reusable/CustomSearchInput";
import DateRangePicker from "@/components/Reusable/DateRangePicker";
import TableData from "@/components/Reusable/TableData";
import TableFooter from "@/components/Reusable/TableFooter";
import TableHead from "@/components/Reusable/TableHead";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useGetAllInvoicesQuery } from "@/redux/features/invoice.features";
import { IChallanForDataShow, IChallanItem } from "@/types/types";
import manageInvoiceDateFiltering from "@/utils/manageInvoiceDateFiltering";
import { MoreVertical, Printer, Truck, Notebook, User } from "lucide-react";
import { useMemo, useState } from "react";

const AllInvoice = () => {
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [openReportModal, setOpenReportModal] = useState<boolean>(false);
  const [openPrintModal, setOpenPrintModal] = useState<boolean>(false);
  const [openThermalModal, setOpenThermalModal] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [invoiceId, setInvoiceId] = useState<number>();
  const [openChalanDetailsModal, setOpenChalanDetailsModal] =
    useState<boolean>(false);
  const { isLoading: fetchInvoiceLoading, data: invoices } =
    useGetAllInvoicesQuery(undefined);

  const [dateRange, setDateRange] = useState<{
    startDate?: Date;
    endDate?: Date;
  }>({});

  const filteredInvoices = useMemo(() => {
    const totalInvoices = invoices?.data || [];
    const dateFiltered = manageInvoiceDateFiltering<IChallanForDataShow>(
      totalInvoices,
      { start: dateRange.startDate!, end: dateRange?.endDate }
    );

    return dateFiltered;
  }, [invoices?.data, dateRange]);

  const filtered = filteredInvoices.filter((row: IChallanForDataShow) =>
    row?.customer?.name?.toLowerCase()?.includes(search?.toLowerCase())
  );

  // const totalPages = Math.ceil(filtered.length / rowsPerPage);

  const paginatedData = filtered.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  //  DATE RANGE PICK FUNC

  const handleDateChange = (range: { startDate?: Date; endDate?: Date }) => {
    setDateRange(range);
  };
  return (
    <div className="bg-white rounded-md shadow border border-gray-200 overflow-hidden">
      {/* Header search & controls */}
      <div className="flex justify-between items-center p-3  bg-gray-50">
        <CustomSearchInput search={search} setSearch={setSearch} />
        <div className="flex items-center gap-4">
          <DateRangePicker onChange={handleDateChange} />
          <button onClick={() => setOpenReportModal(true)}>
            <CustomReportButton />
          </button>
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
            ) : !paginatedData?.length ? (
              <tr>
                <td colSpan={13} className="py-8 text-gray-600">
                  কোনো ডাটা পাওয়া যায়নি
                </td>
              </tr>
            ) : (
              paginatedData?.map((row: IChallanForDataShow, idx: number) =>
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
                            cls={`border p-2 ${
                              row?.due > 0 ? "text-red-500" : "text-green-600"
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

                                <DropdownMenuItem>
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
                      cls={`border p-2 ${
                        row.due > 0 ? "text-red-500" : "text-green-600"
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
                          <DropdownMenuItem>
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
                            <CustomDropDownMenuItem
                              Icon={User}
                              title="প্রোফাইলে যান"
                            />
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
      </div>

      {/* Footer */}
      <TableFooter
        currentPage={currentPage}
        length={filtered?.length}
        rowsPerPage={rowsPerPage}
        setCurrentPage={setCurrentPage}
        setRowsPerPage={setRowsPerPage}
        title={"চালান"}
      />
      {openReportModal && (
        <SellingModal
          isOpen={openReportModal}
          onClose={() => setOpenReportModal(false)}
          endDate={dateRange?.endDate ? dateRange?.endDate?.toISOString() : ""}
          startDate={
            dateRange?.startDate ? dateRange?.startDate?.toISOString() : ""
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
    </div>
  );
};

export default AllInvoice;
