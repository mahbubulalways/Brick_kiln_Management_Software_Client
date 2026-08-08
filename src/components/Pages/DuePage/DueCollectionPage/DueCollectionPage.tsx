"use client";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, Pencil, Printer, Trash, User } from "lucide-react";
import CustomNewButton from "@/components/Reusable/CustomNewButton";
import { DatePicker } from "@/components/Others/DatePicker";
import TableHead from "@/components/Reusable/TableHead";
import NewDueCollectionModal from "@/components/Dashboard/Modals/NewDueCollectionModal";
import TableData from "@/components/Reusable/TableData";
import CustomDropDownMenuItem from "@/components/Reusable/CustomDropDownMenuItem";
import TableFooter from "@/components/Reusable/TableFooter";
import PrintDueCollectionModal from "@/components/Dashboard/Modals/PrintDueCollectionModal";
import UpdateDueCollection from "@/components/Dashboard/Modals/UpdateDueCollectionModal";
import ThermalDueCollectionPrintModal from "@/components/Dashboard/Modals/ThermalDueCollectionPrintModal";
import CustomButtonFixed from "@/components/Reusable/CustomButtonFixed";
import { BsPencilSquare } from "react-icons/bs";
import { useGetTodayPaidQuery } from "@/redux/features/dueCollection.features";
import moment from "moment";
import CustomLoader from "@/components/Reusable/CustomLoader";

export interface ICustomer {
  id: number;
  name: string;
  address: string;
  phoneNumber: string;
  totalPurchased: number;
  totalPaid: number;
  nextPaymentDate: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IDueRecord {
  id: number;
  customerId: number;
  customer: ICustomer;
  collect: number;
  due: number;
  newDue: number;
  nextDate: string;
  season: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

const DueCollectionPage = () => {
  const [rowsPerPage, setRowsPerPage] = useState(30);
  const [currentPage, setCurrentPage] = useState(1);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isOpenPrintModal, setOpenPrintModal] = useState<boolean>(false);
  const [isOpenThermalPrintModal, setOpenThermalPrintModal] =
    useState<boolean>(false);
  const [isOpenUpdateModal, setOpenUpdateModal] = useState<boolean>(false);
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [dueId, setDueId] = useState<number>();
  const isoDate = date ? date.toISOString() : "";
  const { data: dues, isLoading } = useGetTodayPaidQuery(isoDate, {
    refetchOnMountOrArgChange: true,
  });

  const totalCredit = dues?.data.reduce(
    (sum: number, r: IDueRecord) => sum + r?.collect,
    0,
  );

  const toggleRow = (id: number) => {
    setExpandedRow((prev) => (prev === id ? null : id));
  };
  return (
    <div className="bg-white p-2 rounded-md border border-gray-200 shadow-sm">
      <span className="bg-green-100 text-center text-green-800 px-3 py-1 rounded text-sm border border-green-300 font-medium lg:hidden block">
        মোট জমাঃ: {totalCredit?.toLocaleString()} টাকা
      </span>
      <div className="flex justify-between items-center pt-2 lg:pt-0 gap-5">
        <div className="flex items-center gap-2 w-auto lg:w-full">
          <button onClick={() => setIsOpen(true)}>
            <CustomNewButton title="নতুন বাকি জমা" />
          </button>
          <span className="bg-green-100 text-green-800 px-3 py-1 rounded text-sm border border-green-300 font-medium hidden lg:block">
            মোট জমাঃ: {totalCredit?.toLocaleString()} টাকা
          </span>
        </div>

        <div>
          <DatePicker setDate={setDate} date={date} />
        </div>
      </div>
      <div className="overflow-x-auto pt-3">
        <table className="min-w-full text-sm text-center border-t">
          <thead className="bg-[#039A63] text-white">
            <tr>
              <TableHead th="নং" cls="hidden lg:table-cell" />
              <TableHead th="নাম" />
              <TableHead th="ঠিকানা" />
              <TableHead th="বাকি ছিল" cls="hidden lg:table-cell" />
              <TableHead th="জমা" />
              <TableHead th="বাকি রইল" />
              <TableHead th="নতুন তারিখ" cls="hidden lg:table-cell" />
              <TableHead th="সিজন" cls="hidden lg:table-cell" />
              <TableHead th="বাটন" cls="hidden lg:table-cell" />
            </tr>
          </thead>

          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={9}>
                  <CustomLoader cls="h-[30vh]" />
                </td>
              </tr>
            ) : !dues?.data?.length ? (
              <tr>
                <td colSpan={9} className="py-8 text-gray-600">
                  {dues?.message}
                </td>
              </tr>
            ) : (
              dues?.data?.map((row: IDueRecord) => (
                <React.Fragment key={row?.id}>
                  <tr
                    className="hover:bg-gray-50 cursor-pointer"
                    onClick={() => toggleRow(row.id)}
                  >
                    <TableData td={row?.id} cls="hidden lg:table-cell" />
                    <TableData td={row.customer?.name} />
                    <TableData td={row.customer?.address} />
                    <TableData
                      td={row?.due}
                      cls="hidden lg:table-cell bg-yellow-100"
                    />
                    <TableData td={row?.collect} cls="bg-green-100" />
                    <TableData td={row?.newDue} cls=" bg-red-100" />
                    <TableData
                      td={
                        row?.nextDate
                          ? moment(row?.nextDate).format("DD-MM-YYYY")
                          : "পরিশোধিত"
                      }
                      cls="hidden lg:table-cell"
                    />
                    <TableData td={row?.season} cls="hidden lg:table-cell" />

                    <td className="border p-2 hidden lg:table-cell">
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
                              setDueId(row?.id);
                              setOpenUpdateModal(true);
                            }}
                          >
                            <CustomDropDownMenuItem
                              Icon={Pencil}
                              title="আপডেট জমা"
                            />
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => setOpenPrintModal(true)}
                          >
                            <CustomDropDownMenuItem
                              Icon={Printer}
                              title="প্রিন্ট করুন"
                            />
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <CustomDropDownMenuItem
                              Icon={User}
                              title="প্রোফাইল"
                            />
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <CustomDropDownMenuItem
                              Icon={Trash}
                              title="ডিলেট"
                            />
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>

                  {expandedRow === row?.id && (
                    <tr className="lg:hidden">
                      <td
                        colSpan={100}
                        className="border bg-gray-50 text-left p-3 "
                      >
                        <div className="grid grid-cols-2 ">
                          <div className="grid grid-cols-2 gap-1 text-sm text-gray-500">
                            <p className="font-semibold text-xs">কা.আইডি</p>
                            <p> {row?.customerId}</p>
                            <p className="font-semibold text-xs">নাম </p>
                            <p>{row?.customer?.name}</p>
                            <p className="font-semibold text-xs">ঠিকানা</p>
                            <p> {row?.customer?.address}</p>
                            <p className="font-semibold text-xs">ফোন</p>
                            <p> {row?.customer?.phoneNumber}</p>
                            <p className="font-semibold text-xs">জমা তারিখ</p>
                            <p>{moment(row?.createdAt).format("DD-MM-YYYY")}</p>
                          </div>

                          <div className="grid grid-cols-2 gap-1 text-sm ">
                            <p className="font-semibold text-xs">মোট বাকি</p>
                            <p> {row?.due}</p>
                            <p className="font-semibold text-xs text-green-600">
                              জমা{" "}
                            </p>
                            <p className="text-green-600">{row?.collect}</p>
                            <p className="font-semibold text-xs text-orange-600">
                              বাকি রইল
                            </p>
                            <p className="text-orange-600">{row?.newDue}</p>
                            <p className="font-semibold text-xs text-gray-500">
                              নতুন তারিখ
                            </p>
                            <p className="text-gray-500">
                              {moment(row?.nextDate).format("DD-MM-YYYY")}
                            </p>
                            <p className="font-semibold text-xs text-gray-500">
                              সিজন
                            </p>
                            <p className="text-gray-500">{row?.season}</p>
                          </div>
                        </div>

                        {/* Buttons */}
                        <div className="flex items-center justify-between pt-3">
                          <button onClick={() => setOpenUpdateModal(true)}>
                            <CustomButtonFixed
                              title="এডিট"
                              cls="bg-green-200 text-green-700 px-2"
                              Icon={BsPencilSquare}
                            />
                          </button>
                          <button
                            onClick={() => setOpenThermalPrintModal(true)}
                          >
                            <CustomButtonFixed
                              title="প্রিন্ট"
                              cls="bg-green-200 text-green-700 px-2"
                              Icon={Printer}
                            />
                          </button>
                          <button>
                            <CustomButtonFixed
                              title="প্রোফাইল"
                              cls="bg-orange-200 text-orange-700 px-2"
                              Icon={User}
                            />
                          </button>
                          <button>
                            <CustomButtonFixed
                              title=""
                              cls="bg-red-200 text-red-700 px-1"
                              Icon={Trash}
                            />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))
            )}
          </tbody>
        </table>
      </div>
      <TableFooter
        currentPage={currentPage}
        length={2}
        rowsPerPage={rowsPerPage}
        setCurrentPage={setCurrentPage}
        setRowsPerPage={setRowsPerPage}
        title={"জমা"}
      />

      {isOpen && (
        <NewDueCollectionModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        />
      )}
      {isOpenPrintModal && (
        <PrintDueCollectionModal
          isOpen={isOpenPrintModal}
          onClose={() => setOpenPrintModal(false)}
        />
      )}
      {isOpenUpdateModal && (
        <UpdateDueCollection
          isOpen={isOpenUpdateModal}
          onClose={() => setOpenUpdateModal(false)}
          id={dueId as number}
        />
      )}
      {isOpenThermalPrintModal && (
        <ThermalDueCollectionPrintModal
          isOpen={isOpenThermalPrintModal}
          onClose={() => setOpenThermalPrintModal(false)}
        />
      )}
    </div>
  );
};

export default DueCollectionPage;
