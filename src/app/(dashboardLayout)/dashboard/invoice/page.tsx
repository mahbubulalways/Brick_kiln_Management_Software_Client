"use client";
import ChalanDetailsModal from "@/components/Dashboard/Modals/ChalanDetailsModal";
import NewChalanModal from "@/components/Dashboard/Modals/NewChalanModal";
import NewDeliveryModal from "@/components/Dashboard/Modals/NewDeliveryModal";
import SellingModal from "@/components/Dashboard/Modals/SellingModal";
import UpdateChalanModal from "@/components/Dashboard/Modals/UpdateChalanModal";
import ChalanPrintModal from "@/components/Dashboard/PrintModal/ChalanPrint/ChalanPrintModal";
import PrintThermalInvoice from "@/components/Dashboard/PrintModal/PrintThermalInvoice";
import { DatePicker } from "@/components/Others/DatePicker";
import CustomDropDownMenuItem from "@/components/Reusable/CustomDropDownMenuItem";
import CustomLoader from "@/components/Reusable/CustomLoader";
import CustomNewButton from "@/components/Reusable/CustomNewButton";
import CustomReportButton from "@/components/Reusable/CustomReportButton";
import CustomSearchInput from "@/components/Reusable/CustomSearchInput";
import TableData from "@/components/Reusable/TableData";
import TableFooter from "@/components/Reusable/TableFooter";
import TableHead from "@/components/Reusable/TableHead";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  useDeleteInvoiceMutation,
  useGetAllInvoicesQuery,
} from "@/redux/features/invoice.features";
import { IChallanForDataShow, IChallanItem } from "@/types/types";
import manageInvoiceDateFiltering from "@/utils/manageInvoiceDateFiltering";
import {
  MoreVertical,
  Printer,
  Truck,
  Notebook,
  User,
  Trash,
} from "lucide-react";
import { useMemo, useState } from "react";
import { BsPencilSquare } from "react-icons/bs";
import Swal from "sweetalert2";

const SalesTable = () => {
  const [search, setSearch] = useState("");
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [openReportModal, setOpenReportModal] = useState<boolean>(false);
  const [isDeliveryModalOpen, setIsDeliveryModalOpen] =
    useState<boolean>(false);
  const [openPrintModal, setOpenPrintModal] = useState<boolean>(false);
  const [openUpdateModal, setOpenUpdateModal] = useState<boolean>(false);
  const [openThermalModal, setOpenThermalModal] = useState<boolean>(false);
  const [invoiceId, setInvoiceId] = useState<number>();
  const [openChalanDetailsModal, setOpenChalanDetailsModal] =
    useState<boolean>(false);

  // FETCH ALL INVOICES
  const { isLoading: fetchInvoiceLoading, data: invoices } =
    useGetAllInvoicesQuery(undefined);

  //  CALL DELETE INVOICE HOOK
  const [deleteInvoice] = useDeleteInvoiceMutation();

  // FILTERING DATE
  const filteredInvoices = useMemo(() => {
    const totalInvoices = invoices?.data || [];
    const dateFiltered = manageInvoiceDateFiltering<IChallanForDataShow>(
      totalInvoices,
      { start: date! }
    );

    return dateFiltered;
  }, [invoices?.data, date]);

  // INVOICE RELATED FILTER
  const filtered = filteredInvoices.filter((row: IChallanForDataShow) =>
    row?.customer?.name?.toLowerCase()?.includes(search?.toLowerCase())
  );

  const paginatedData = filtered.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  //  DELETE INVOICE PART
  const handleDeleteInvoice = async (invoiceId: number) => {
    Swal.fire({
      title: "আপনি কি নিশ্চিত?",
      text: "একবার মুছে ফেলা হলে এটি আর ফিরিয়ে আনা যাবে না।",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "হ্যাঁ, মুছে ফেলুন!",
      cancelButtonText: "বাতিল করুন",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const result = await deleteInvoice(invoiceId).unwrap();
          if (result?.success) {
            Swal.fire({
              title: "মুছে ফেলা হয়েছে!",
              text: "আপনার চালান সফলভাবে মুছে ফেলা হয়েছে।",
              icon: "success",
              confirmButtonText: "ঠিক আছে",
            });
          }
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
          Swal.fire({
            title: "মুছে ফেলা হয়েছে!",
            text:
              error?.data?.message ||
              "দুঃখিত! সার্ভারে ত্রুটি ঘটেছে। কিছুক্ষণ পর চেষ্টা করুন।",
            icon: "error",
            confirmButtonText: "ঠিক আছে",
          });
        }
      }
    });
  };

  return (
    <div className="bg-white rounded-md shadow border border-gray-200 overflow-hidden">
      <div className="flex justify-between items-center p-3 border-b bg-gray-50 gap-5">
        <div className="flex items-center gap-2 ">
          <button onClick={() => setIsOpen(true)}>
            <CustomNewButton title="নতুন চালান" />
          </button>
          <div className="flex-1">
            <CustomSearchInput search={search} setSearch={setSearch} />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <DatePicker date={date} setDate={setDate} />
          <button
            onClick={() => setOpenReportModal(true)}
            className="cursor-pointer"
          >
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
                                <DropdownMenuItem
                                  onClick={() => {
                                    setOpenUpdateModal(true);
                                    setInvoiceId(row?.id);
                                  }}
                                >
                                  <CustomDropDownMenuItem
                                    Icon={BsPencilSquare}
                                    title="আপডেট করুন"
                                  />
                                </DropdownMenuItem>

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
                                <DropdownMenuItem
                                  onClick={() => handleDeleteInvoice(row?.id)}
                                >
                                  <CustomDropDownMenuItem
                                    Icon={Trash}
                                    title="ডিলিট করুন"
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
                          <DropdownMenuItem
                            onClick={() => {
                              setOpenUpdateModal(true);
                              setInvoiceId(row?.id);
                            }}
                          >
                            <CustomDropDownMenuItem
                              Icon={BsPencilSquare}
                              title="আপডেট করুন"
                            />
                          </DropdownMenuItem>

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
                            <CustomDropDownMenuItem
                              Icon={User}
                              title="প্রোফাইলে যান"
                            />
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDeleteInvoice(row?.id)}
                          >
                            <CustomDropDownMenuItem
                              Icon={Trash}
                              title="ডিলিট করুন"
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

      {isOpen && (
        <NewChalanModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
      )}
      {openReportModal && (
        <SellingModal
          isOpen={openReportModal}
          onClose={() => setOpenReportModal(false)}
          startDate={date ? date.toISOString() : ""}
        />
      )}
      {openUpdateModal && (
        <UpdateChalanModal
          isOpen={openUpdateModal}
          onClose={() => setOpenUpdateModal(false)}
          invoiceId={invoiceId!}
          setInvoiceId={setInvoiceId!}
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

export default SalesTable;
