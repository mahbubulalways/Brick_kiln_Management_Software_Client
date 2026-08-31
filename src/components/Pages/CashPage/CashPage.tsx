"use client";
import CustomNewButton from "@/components/Reusable/CustomNewButton";
import TableData from "@/components/Reusable/TableData";
import TableHead from "@/components/Reusable/TableHead";
import CustomDropDownMenuItem from "@/components/Reusable/CustomDropDownMenuItem";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, Pencil, Trash } from "lucide-react";
import { useRef, useState } from "react";
import NewCashModal from "@/components/Dashboard/Modals/NewCashModal";
import { useDeleteCashMutation, useGetAllCashQuery } from "@/redux/features/cash.features";
import { TCash } from "@/interface/cash";
import { TMetaConfig } from "@/interface/meta";
import { TablePagination } from "@/components/Reusable/TablePagination";
import CustomLoader from "@/components/Reusable/CustomLoader";
import { SERVER_ERROR_MESSAGE } from "@/constant";
import { TQuery } from "@/interface/query";
import SearchBar from "@/components/Reusable/SearchBar";
import { toBanglaNumber } from "@/utils/toBanglaNumber";
import CustomPrintButton from "@/components/Reusable/CustomPrintButton";
import CustomReportButton from "@/components/Reusable/CustomReportButton";
import { formatBanglaDate } from "@/utils/formatBanglaDate";
import CustomDatePickerState from "@/components/Reusable/CustomDatePickerState";
import UpdateCashModal from "@/components/Dashboard/Modals/EditModals/UpdateCashModal";
import Swal from "sweetalert2";
import CommonPrint, { TCommonPrintRef } from "@/components/Reusable/CommonPrint";
import CashPagePrint from "./CashPagePrint";
import { useGetVataInfoQuery } from "@/redux/features/vata.features";
import CashReportModal from "@/components/Dashboard/Modals/ReportModal/CashReportModal";
import { formatDateRange } from "@/utils/formatDateRange";

const CashPage = ({ limit, page, search }: TQuery) => {
  const [searchItem, setSearchItem] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const printRef = useRef<TCommonPrintRef>(null);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [openCashModal, setOpenCashModal] = useState(false);
  const [cashId, setCashId] = useState<number | undefined>(undefined);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const {
    data: cashResponse,
    isLoading,
    isError,
  } = useGetAllCashQuery({
    page,
    limit,
    search: search || undefined,
    date: formatDateRange(String(date)) ,
  });
  const [deleteCash, { isLoading: isDeleting }] =
    useDeleteCashMutation();
  const {
    data: vataInfo,
  } = useGetVataInfoQuery(undefined);


  const cashData = cashResponse?.data?.data as TCash[] || [];
  const meta = cashResponse?.data?.meta as TMetaConfig;

  // মোট INCOME
  const totalIncome = cashData
    .filter((item) => item.type === "INCOME")
    .reduce((total, item) => total + Number(item.amount), 0);

  // মোট EXPENSE
  const totalExpense = cashData
    .filter((item) => item.type === "EXPENSE")
    .reduce((total, item) => total + Number(item.amount), 0);


  // DELETE CASH

  const handleDeleteCash = async (id: number) => {
    const result = await Swal.fire({
      title: "আপনি কি নিশ্চিত?",
      text: "এই ক্যাশের হিসাবটি ডিলেট করা হবে!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "হ্যাঁ, ডিলেট করুন",
      cancelButtonText: "বাতিল",
      reverseButtons: true,
    });

    if (!result.isConfirmed) return;

    try {
      const response = await deleteCash(id).unwrap();

      await Swal.fire({
        title: "সফল!",
        text:
          response?.message ||
          "ক্যাশের হিসাব সফলভাবে ডিলেট হয়েছে",
        icon: "success",
        confirmButtonText: "ঠিক আছে",
      });
    } catch (error: any) {
      Swal.fire({
        title: "ব্যর্থ!",
        text:
          error?.data?.message ||
          "ক্যাশ ডিলেট করতে সমস্যা হয়েছে",
        icon: "error",
        confirmButtonText: "ঠিক আছে",
      });
    }
  };


  return (
    <div className="bg-white p-2 rounded-md border border-gray-200 shadow-sm">
      {/* Header */}

      <div className="hidden  md:block">
        <div className="flex items-center gap-3 justify-between pt-3 lg:pt-0">
          <CustomNewButton title="নতুন হিসাব" onClick={() => setIsModalOpen(true)} />
          <div className="flex items-center gap-3 w-full lg:w-auto">
            {/* Total */}
            <div className="hidden lg:flex items-center gap-2">
              <span className="text-green-500 px-3 text-[15px] text-nowrap py-1 rounded border border-green-300 font-medium">
                আজকের ক্যাশঃ {toBanglaNumber(totalIncome.toLocaleString())} টাকা
              </span>

              <span className="text-orange-500 px-3 text-[15px] text-nowrap py-1 rounded border border-orange-300 font-medium">
                ক্যাশ জেরঃ {toBanglaNumber(totalExpense.toLocaleString())} টাকা
              </span>
            </div>

            <SearchBar value={searchItem} onChange={(e) => setSearchItem(e.target.value)} />

            {/* Date */}
            <div className="w-full lg:w-auto">
              <CustomDatePickerState value={date} onChange={setDate} height="8" />
            </div>
            <CustomPrintButton
              onClick={() => printRef.current?.print()}
            />
            <CustomReportButton
              onClick={() => setOpenCashModal(true)}
            />
          </div>
        </div>
      </div>





      <div className=" md:hidden block">

        <div className="flex w-full items-center gap-3 ">
          <div className="min-w-0 flex-1">
            <CustomNewButton
              title="নতুন হিসাব"
              className="w-full"
              onClick={() => setIsModalOpen(true)}
            />
          </div>

          <div className="min-w-0 flex-1">
            <CustomPrintButton
              className="w-full"
              onClick={() => printRef.current?.print()}
            />
          </div>

          <div className="min-w-0 flex-1">
            <CustomReportButton className="w-full"
              onClick={() => setOpenCashModal(true)}
            />
          </div>
        </div>
        <div className="flex items-center gap-2 pt-3">
          <SearchBar value={searchItem} onChange={(e) => setSearchItem(e.target.value)} />

          {/* Date */}
          <div className="w-full lg:w-auto">
            <CustomDatePickerState value={date} onChange={setDate} height="8" />
          </div>
        </div>
      </div>



      <div className="overflow-x-auto mt-2">
        <table className="min-w-full border-t">
          <thead>
            <tr className="bg-[#039A63] text-white text-center">
              <TableHead th={"#"} />
              <TableHead th={"উৎস"} />
              <TableHead th={"ক্যাশের বিবরণ"} />
              <TableHead th={"ক্যাশ ইন"} />
              <TableHead th={"ক্যাশ আউট"} />
              <TableHead th={"সময়"} />
              <TableHead th={"বাটন"} />
            </tr>
          </thead>

          <tbody className="text-center">
            {
              isLoading ?
                <tr>
                  <td colSpan={7}>
                    <CustomLoader cls="h-[30vh]" />
                  </td>
                </tr> : isError ?
                  <tr>
                    <td colSpan={7} className="py-8 text-gray-600">
                      {SERVER_ERROR_MESSAGE}
                    </td>
                  </tr> : !cashData?.length ?
                    <tr>
                      <td colSpan={7} className="py-8 text-gray-600">
                        {cashResponse?.message}
                      </td>
                    </tr> :

                    cashData?.map((row, idx) => (
                      <tr
                        key={idx + 1}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <TableData td={idx + 1} />

                        <TableData td={row.source} />
                        <TableData td={row.description} />
                        <TableData td={row.type === "INCOME" ? toBanglaNumber(row.amount) : "-"} />
                        <TableData td={row.type === "EXPENSE" ? row.amount : "-"} />
                        <TableData td={formatBanglaDate({ date: row.createdAt })} />


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
                              <DropdownMenuItem onClick={() => {
                                setCashId(row?.id)
                                setOpenUpdateModal(true)
                              }}>
                                <CustomDropDownMenuItem
                                  Icon={Pencil}
                                  title="আপডেট"
                                />
                              </DropdownMenuItem>

                              <DropdownMenuItem onClick={() => handleDeleteCash(row?.id)}>
                                <CustomDropDownMenuItem
                                  Icon={Trash}
                                  title="ডিলেট"
                                />
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    ))
            }
          </tbody>
        </table>
        <TablePagination
          page={meta?.page ?? 1}
          totalPages={meta?.totalPages ?? 1}
          dataLength={cashData?.length}
          title="ক্যাশ"
        />
      </div>

      <CommonPrint
        ref={printRef}
        title="Daily_cash_report"
      >
        <CashPagePrint
          cashData={cashData}
          date={date}
          vataInfo={vataInfo?.data}
        />
      </CommonPrint>

      {/* New Cash Modal */}
      {isModalOpen && (
        <NewCashModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}

      {
        <UpdateCashModal id={cashId} setId={setCashId} isOpen={openUpdateModal} onClose={() => setOpenUpdateModal(false)} />
      }
      {
        openCashModal &&
        <CashReportModal
          isOpen={openCashModal}
          onClose={() => setOpenCashModal(false)}
          date={date?.toISOString()!}
        />
      }
    </div>
  );
};

export default CashPage;