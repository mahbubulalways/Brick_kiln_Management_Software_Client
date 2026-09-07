"use client";

import { useRef, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  MoreVertical,
  Pencil,
  Trash,
} from "lucide-react";

import CustomNewButton from "@/components/Reusable/CustomNewButton";
import { DatePicker } from "@/components/Others/DatePicker";
import CustomReportButton from "@/components/Reusable/CustomReportButton";
import CustomSelect2 from "@/components/Reusable/CustomSelect2";
import TableData from "@/components/Reusable/TableData";
import TableHead from "@/components/Reusable/TableHead";
import CustomDropDownMenuItem from "@/components/Reusable/CustomDropDownMenuItem";
import NewLoadModal from "@/components/Dashboard/Modals/NewLoadModal";

import { useDeleteLoadInfoMutation, useGetAllLoadInfoQuery } from "@/redux/features/load.features";
import { TLoadResponse } from "@/interface/load";
import CustomLoader from "@/components/Reusable/CustomLoader";
import { SERVER_ERROR_MESSAGE } from "@/constant";
import { TMetaConfig } from "@/interface/meta";
import { TablePagination } from "@/components/Reusable/TablePagination";
import { TQuery } from "@/interface/query";
import CustomDatePickerState from "@/components/Reusable/CustomDatePickerState";
import SearchBar from "@/components/Reusable/SearchBar";
import CustomPrintButton from "@/components/Reusable/CustomPrintButton";
import { useGetAllRoundQuery } from "@/redux/features/round.features";
import CommonPrint, { TCommonPrintRef } from "@/components/Reusable/CommonPrint";
import LoadPagePrint from "./LoadPagePrint";
import { toBanglaNumber } from "@/utils/toBanglaNumber";
import UpdateLoadModal from "@/components/Dashboard/Modals/EditModals/UpdateLoadModal";
import Swal from "sweetalert2";
import { useGetVataInfoQuery } from "@/redux/features/vata.features";
import { formatDateRange } from "@/utils/formatDateRange";
import { getMovementTypeBangla } from "@/utils/getLoadTypeBangla";

const LoadPage = ({ limit, page }: TQuery) => {
  const [date, setDate] = useState<Date | undefined>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState("");
  const [openUpdateModal, setUpdateOpenModal] = useState<boolean>(false);
  const [loadId, setLoadId] = useState<string | undefined>(undefined)
  const printRef = useRef<TCommonPrintRef>(null);
  const {
    isError,
    data,
    isLoading,
  } = useGetAllLoadInfoQuery(
    { date: formatDateRange(String(date)), search: selected, limit, page },
    { refetchOnMountOrArgChange: true }
  );

  const {
    data: vataInfo,
  } = useGetVataInfoQuery(undefined);

  const [deleteLoadInfo, { isLoading: deleteLoading }] =
    useDeleteLoadInfoMutation();
  const loads: TLoadResponse[] = data?.data?.data ?? [];
  const meta = data?.data?.meta as TMetaConfig;
  const { data: rounds, isError: roundError, isLoading: roundLoading } = useGetAllRoundQuery(undefined);
  const format = rounds?.data?.map((rd: { name: string }) => ({ label: rd.name, value: rd.name }))


  //  DELETE LOAD
  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "আপনি কি নিশ্চিত?",
      text: "এই লোডের তথ্য ডিলেট করলে এটি আর ফিরে পাওয়া যাবে না!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#039A63",
      cancelButtonColor: "#d33",
      confirmButtonText: "হ্যাঁ, ডিলেট করুন",
      cancelButtonText: "বাতিল",
    });

    if (!result.isConfirmed) return;

    try {
      await deleteLoadInfo(id).unwrap();

      await Swal.fire({
        title: "ডিলেট হয়েছে!",
        text: "লোডের তথ্য সফলভাবে ডিলেট করা হয়েছে।",
        icon: "success",
        confirmButtonColor: "#039A63",
        confirmButtonText: "ঠিক আছে",
      });
    } catch (error: any) {
      await Swal.fire({
        title: "ব্যর্থ!",
        text:
          error?.data?.message ||
          "লোডের তথ্য ডিলেট করা সম্ভব হয়নি।",
        icon: "error",
        confirmButtonColor: "#d33",
        confirmButtonText: "ঠিক আছে",
      });
    }
  };


  return (
    <div className="bg-white p-2 rounded-md border border-gray-200 shadow-sm">
      {/* Header */}
      <div className="hidden md:block">
        <div className="flex justify-between items-center pt-2 lg:pt-0 gap-5">
          <CustomNewButton title="নতুন লোড" onClick={() => setIsModalOpen(true)} />
          <div className="flex items-center justify-end gap-2">
            <CustomDatePickerState
              onChange={setDate}
              value={date}
              placeholder="তারিখ"
              height="8"
            />
            <CustomSelect2
              options={format || []}
              placeholder="1 নম্বর রাউন্ড"
              onChange={(value) => setSelected(value)}
              isError={roundError}
              isLoading={roundLoading}

            />
            <CustomPrintButton onClick={() => printRef.current?.print()} />
            <CustomReportButton />
          </div>
        </div>
      </div>


      <div className="block md:hidden">
        <div className="flex justify-between items-center pt-2 lg:pt-0 gap-2">
          <CustomNewButton title="নতুন লোড" className="w-full" onClick={() => setIsModalOpen(true)} />
          <CustomPrintButton onClick={() => printRef.current?.print()} />
          <CustomReportButton className="w-full" />

        </div>
        <div className="flex items-center gap-2 w-full pt-3">
          <div className="flex-1 min-w-0">
            <CustomDatePickerState
              onChange={setDate}
              value={date}
              placeholder="তারিখ"
              height="8"
            />
          </div>

          <div className="flex-1 min-w-0">
            <CustomSelect2
              options={format || []}
              placeholder="1 নম্বর রাউন্ড"
              onChange={(value) => setSelected(value)}
              isError={roundError}
              isLoading={roundLoading}
            />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto mt-4">
        <table className="min-w-full text-center border-t">
          <thead className="bg-[#039A63] text-white">
            <tr>
              <TableHead th="তারিখ" />
              <TableHead
                th="রাউন্ড"
                cls="hidden lg:table-cell"
              />
              <TableHead th="লোডের বিবরণ" />
              <TableHead th="পরিমাণ" />
              <TableHead th="বাটন" />
            </tr>
          </thead>

          <tbody>
            {
              isLoading ? <tr>
                <td colSpan={5}>
                  <CustomLoader cls="h-[30vh]" />
                </td>
              </tr> : isError ? <tr>
                <td colSpan={5} className="py-8">{SERVER_ERROR_MESSAGE}</td>
              </tr> : !loads?.length ? <tr>
                <td colSpan={5} className="py-8 text-gray-600">
                  {data?.message}
                </td>
              </tr>
                : loads?.map((row) => (
                  <tr
                    key={row.id}
                    className="hover:bg-gray-50"
                  >

                    <TableData
                      td={new Date(row.date).toLocaleDateString("bn-BD")}
                    />


                    <TableData
                      td={toBanglaNumber(row.round?.name)}
                      cls="hidden lg:table-cell"
                    />


                    <TableData td={`${getMovementTypeBangla(row.loadType)} ${row?.classType ? `( ${row?.classType} )` : ""}`} />

                    <TableData td={toBanglaNumber(row.quantity)} />

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
                              setLoadId(row?.id)
                              setUpdateOpenModal(true)
                            }}
                          >
                            <CustomDropDownMenuItem
                              Icon={Pencil}
                              title="আপডেট"
                            />
                          </DropdownMenuItem>

                          <DropdownMenuItem
                            onClick={() => handleDelete(row.id)}
                            disabled={deleteLoading}
                          >
                            <CustomDropDownMenuItem
                              Icon={Trash}
                              title="ডিলেট"
                            />
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
        <TablePagination
          page={meta?.page ?? 1}
          totalPages={meta?.totalPages ?? 1}
          dataLength={loads?.length}
          title="লোড"
        />
      </div>
      <CommonPrint
        ref={printRef}
        title="load_report"
      >
        <LoadPagePrint
          loadData={loads}
          date={date}
          vataInfo={vataInfo?.data}
        />
      </CommonPrint>


      {isModalOpen && (
        <NewLoadModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}

      {openUpdateModal &&
        <UpdateLoadModal
          id={loadId}
          setId={setLoadId}
          isOpen={openUpdateModal}
          onClose={() => setUpdateOpenModal(false)}
        />
      }
    </div>
  );
};

export default LoadPage;