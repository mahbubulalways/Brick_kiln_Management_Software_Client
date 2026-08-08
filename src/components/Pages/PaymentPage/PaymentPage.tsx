"use client";

import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, Pencil, Trash } from "lucide-react";
import CustomNewButton from "@/components/Reusable/CustomNewButton";
import CustomReportButton from "@/components/Reusable/CustomReportButton";
import NewPaymentModal from "@/components/Dashboard/Modals/NewPaymentModal";
import TableHead from "@/components/Reusable/TableHead";
import TableData from "@/components/Reusable/TableData";
import CustomDropDownMenuItem from "@/components/Reusable/CustomDropDownMenuItem";
import { GrDocument } from "react-icons/gr";
import CustomDatePickerState from "@/components/Reusable/CustomDatePickerState";
import { TQuery } from "@/interface/query";
import { useGetPaymentQuery } from "@/redux/features/payment.features";
import { TPaymentResponse } from "@/interface/payment";
import { NO_DATA_FOUND_MESSAGE } from "@/constant";
import CustomStatus from "@/components/Reusable/CustomStatus";
import moment from "moment";
import { TablePagination } from "@/components/Reusable/TablePagination";
import { TMetaConfig } from "@/interface/meta";
import { IoDocumentTextOutline } from "react-icons/io5";
import Link from "next/link";
import SearchBar from "@/components/Reusable/SearchBar";
import CustomPrintButton from "@/components/Reusable/CustomPrintButton";
import PaymentReportModal from "@/components/Dashboard/Modals/PaymentReportModal";

const PaymentPage = ({ limit, page, search }: TQuery) => {
  const [searchItems, setSearchItem] = useState("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isReportModalOpen, setReportModalOpen] = useState<boolean>(false);
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const [date, setDate] = useState<Date | undefined>();

  const { data, isError, isLoading, error } = useGetPaymentQuery(
    {
      limit,
      page,
      search,
      date: date?.toISOString() ?? undefined,
    },
    {
      refetchOnMountOrArgChange: true,
    },
  );
  console.log(error);
  const payments = data?.data?.data as TPaymentResponse[];
  const meta = data?.data?.meta as TMetaConfig;
  if (isLoading) {
    return <CustomStatus type="loading" />;
  }
  if (isError) {
    return <CustomStatus type="error" />;
  }
  const totalCredit = payments?.reduce(
    (sum, r: TPaymentResponse) => sum + r.payment,
    0,
  );
  const toggleRow = (id: number) => {
    setExpandedRow((prev) => (prev === id ? null : id));
  };
  return (
    <div className="bg-white p-2 rounded-md border border-gray-200 shadow-sm">
      <span className="bg-green-100 text-center text-green-800 px-3 py-1 rounded   border border-green-300 font-medium lg:hidden block">
        মোট পেমেন্ট: {totalCredit} টাকা
      </span>
      <div className="flex justify-between items-center pt-2 lg:pt-0 gap-2 lg:gap-5">
        <div className="flex items-center gap-2 w-auto lg:w-full">
          <button onClick={() => setIsModalOpen(true)}>
            <CustomNewButton title="নতুন পেমেন্ট" />
          </button>
          <span className="bg-green-100 text-green-800 px-3 py-1 rounded   border border-green-300 font-medium hidden lg:block">
            মোট পেমেন্ট: {totalCredit} টাকা
          </span>
        </div>

        <div className="flex w-full items-center justify-end gap-2">
          <CustomDatePickerState
            onChange={setDate}
            value={date}
            placeholder="তারিখ"
            height="8"
          />
          <SearchBar
            value={searchItems}
            onChange={(e) => setSearchItem(e.target.value)}
            onClear={() => setSearchItem("")}
          />
          <CustomPrintButton />
          <CustomReportButton onClick={() => setReportModalOpen(true)} />
        </div>
      </div>

      <div className="overflow-x-auto pt-2">
        <table className="min-w-full   text-center border-t">
          <thead className="bg-[#039A63] text-white">
            <tr>
              <TableHead th="#" cls="hidden lg:table-cell" />
              <TableHead th="খতিয়ান" cls="hidden lg:table-cell" />
              <TableHead th="পেমেন্টের বিবরণ" />
              <TableHead th="পরিমাণ" />
              <TableHead th="মোট বিল" cls="hidden lg:table-cell" />
              <TableHead th="অগ্রিম" cls="hidden lg:table-cell" />
              <TableHead th="কর্তন" cls="hidden lg:table-cell" />
              <TableHead th="পেমেন্ট" />
              <TableHead th="কম/বেশি" cls="hidden lg:table-cell" />
              <TableHead th="ডক" cls="hidden lg:table-cell" />
              <TableHead th="বাটন" />
            </tr>
          </thead>
          <tbody>
            {payments?.length ? (
              <>
                {payments?.map((row, index) => (
                  <React.Fragment key={row.id}>
                    <tr
                      className="hover:bg-gray-50"
                      onClick={() => toggleRow(row.id)}
                    >
                      <TableData td={index + 1} cls="hidden lg:table-cell" />
                      <TableData
                        td={row?.ledger?.name}
                        cls="hidden lg:table-cell"
                      />
                      <TableData
                        td={row?.paymentDetails as string}
                        cls="hidden lg:table-cell"
                      />
                      <TableData
                        td={
                          (row?.paymentDetails?.substring(0, 20) +
                            "...") as string
                        }
                        cls="lg:hidden table-cell"
                      />
                      <TableData td={row?.quantity} />
                      <TableData
                        td={`৳ ${row?.totalBill}`}
                        cls="hidden lg:table-cell"
                      />
                      <TableData
                        td={
                          row?.paymentType === "অগ্রিম পেমেন্ট"
                            ? `৳ ${row?.payment}`
                            : "৳ 0"
                        }
                        cls="border p-2 text-red-500 hidden lg:table-cell"
                      />
                      <TableData
                        cls="border p-2 text-green-600 hidden lg:table-cell"
                        td={`৳ ${row?.cutting}`}
                      />
                      <TableData
                        cls="border p-2 text-green-600"
                        td={`৳ ${row?.payment}`}
                      />
                      <TableData
                        cls={`border hidden lg:table-cell p-2 ${
                          row?.paymentDifference < 0
                            ? "text-red-500"
                            : row?.paymentDifference > 0
                              ? "text-green-600"
                              : "text-gray-600 "
                        }`}
                        td={`৳ ${row?.paymentDifference}`}
                      />

                      <td
                        className={`border hidden lg:table-cell p-1 lg:p-2 text-center whitespace-nowrap text-sm lg:text-[15px] text-green-600`}
                      >
                        <Link
                          href={`http://localhost:5000/uploads/${row?.document}`}
                          target="_blank"
                        >
                          <IoDocumentTextOutline size={18} />
                        </Link>
                      </td>
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
                            <DropdownMenuItem>
                              <CustomDropDownMenuItem
                                Icon={Pencil}
                                title="আপডেট"
                              />
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <CustomDropDownMenuItem
                                Icon={GrDocument}
                                title="খতিয়ান"
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
                              <p className="font-semibold">নং</p>
                              <p> {row?.id}</p>
                              <p className="font-semibold">খতিয়ান </p>
                              <p>{row?.ledger.name}</p>
                              <p className="font-semibold">পে.ধরন </p>
                              <p> {row?.paymentType}</p>
                              <p className="font-semibold">তারিখ</p>
                              <p> {moment(row?.createdAt).format("l")}</p>
                              <p className="font-semibold">সময়</p>
                              <p>{row?.paymentDetails}</p>
                            </div>

                            <div className="grid grid-cols-2 gap-1 text-sm ">
                              <p className="font-semibold">পরিমাণ</p>
                              <p> {row?.quantity}</p>
                              <p className="font-semibold text-green-600">
                                মোট বিল
                              </p>
                              <p className="text-green-600">{row?.totalBill}</p>
                              <p className="font-semibold text-orange-600">
                                কর্তন
                              </p>
                              <p className="text-orange-600">{row?.cutting}</p>
                              <p className="font-semibold text-gray-500">
                                পেমেন্ট
                              </p>
                              <p className="text-gray-500">{row?.payment}</p>
                              <p className="font-semibold text-gray-500">
                                বেশি পেমেন্ট
                              </p>
                              <p className="text-gray-500">
                                {row?.paymentDifference}
                              </p>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </>
            ) : (
              <tr>
                <td className="text-center py-5" colSpan={9}>
                  {NO_DATA_FOUND_MESSAGE}
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <TablePagination
          page={meta?.page ?? 1}
          totalPages={meta?.totalPages ?? 1}
          dataLength={payments?.length}
          title="চালান"
        />
      </div>

      {isModalOpen && (
        <NewPaymentModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
      {isReportModalOpen && (
        <PaymentReportModal
          isOpen={isReportModalOpen}
          onClose={() => setReportModalOpen(false)}
        />
      )}
    </div>
  );
};

export default PaymentPage;
