"use client";

import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, MoreVertical, Pencil, Trash } from "lucide-react";
import CustomNewButton from "@/components/Reusable/CustomNewButton";
import CustomSearchInput from "@/components/Reusable/CustomSearchInput";
import { DatePicker } from "@/components/Others/DatePicker";
import CustomReportButton from "@/components/Reusable/CustomReportButton";
import NewPaymentSection from "./NewPaymentSection";
import NewPaymentModal from "@/components/Dashboard/Modals/NewPaymentModal";
import TableHead from "@/components/Reusable/TableHead";
import TableData from "@/components/Reusable/TableData";
import CustomDropDownMenuItem from "@/components/Reusable/CustomDropDownMenuItem";
import { GrDocument } from "react-icons/gr";

interface PaymentRow {
  id: number;
  creditor: string;
  description: string;
  quantity: number;
  totalBill: number;
  debit: number;
  credit: number;
  balance: number;
}

const data: PaymentRow[] = [
  {
    id: 29,
    creditor: "harun",
    description: "bank",
    quantity: 0,
    totalBill: 0,
    debit: 0,
    credit: 5000,
    balance: -5000,
  },
  {
    id: 30,
    creditor: "sona",
    description: "wood",
    quantity: 50,
    totalBill: 5000,
    debit: 0,
    credit: 0,
    balance: 5000,
  },
  {
    id: 31,
    creditor: "saiful",
    description: "nn",
    quantity: 0,
    totalBill: 0,
    debit: 5000,
    credit: 5000,
    balance: 0,
  },
  {
    id: 32,
    creditor: "sona",
    description: "wood",
    quantity: 0,
    totalBill: 0,
    debit: 0,
    credit: 5000,
    balance: 0,
  },
  {
    id: 33,
    creditor: "harun",
    description: "mia",
    quantity: 0,
    totalBill: 0,
    debit: 5000,
    credit: 5000,
    balance: 0,
  },
  {
    id: 34,
    creditor: "harun",
    description: "mia",
    quantity: 0,
    totalBill: 0,
    debit: 1200,
    credit: 1200,
    balance: 0,
  },
];

const PaymentPage = () => {
  const [search, setSearch] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(30);
  const [currentPage, setCurrentPage] = useState(1);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const filtered = data.filter((row) =>
    row.creditor.toLowerCase().includes(search.toLowerCase())
  );

  const totalCredit = filtered.reduce((sum, r) => sum + r.credit, 0);
  const toggleRow = (id: number) => {
    setExpandedRow((prev) => (prev === id ? null : id));
  };
  return (
    <div className="bg-white p-2 rounded-md border border-gray-200 shadow-sm">
      <span className="bg-green-100 text-center text-green-800 px-3 py-1 rounded   border border-green-300 font-medium lg:hidden block">
        মোট পেমেন্ট: {totalCredit.toLocaleString()} টাকা
      </span>
      <div className="flex justify-between items-center pt-2 lg:pt-0 gap-5">
        <div className="flex items-center gap-2 w-auto lg:w-full">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="hidden lg:block"
          >
            <CustomNewButton title="নতুন পেমেন্ট" />
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="lg:hidden block"
          >
            <CustomNewButton title="নতুন পেমেন্ট" />
          </button>
          <span className="bg-green-100 text-green-800 px-3 py-1 rounded   border border-green-300 font-medium hidden lg:block">
            মোট পেমেন্ট: {totalCredit.toLocaleString()} টাকা
          </span>
        </div>

        <div className="flex items-center gap-2 w-full">
          <CustomSearchInput search={search} setSearch={setSearch} />
          <DatePicker />
          <button>
            <CustomReportButton />
          </button>
        </div>
      </div>
      {/* NEW PAYMENT ADD LARGE DEVICE */}
      <div className="py-2">{isOpen && <NewPaymentSection />}</div>
      {/* Table */}
      <div className="overflow-x-auto">
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
              <TableHead th="বাটন" />
            </tr>
          </thead>
          <tbody>
            {filtered.map((row) => (
              <React.Fragment key={row.id}>
                <tr
                  className="hover:bg-gray-50"
                  onClick={() => toggleRow(row.id)}
                >
                  <TableData td={row.id} cls="hidden lg:table-cell" />
                  <TableData td={row.creditor} cls="hidden lg:table-cell" />
                  <TableData td={row.description} />
                  <TableData td={row.quantity} />
                  <TableData
                    td={`৳ ${row.totalBill.toLocaleString()}`}
                    cls="hidden lg:table-cell"
                  />
                  <TableData
                    td={
                      row.debit > 0 ? `৳ ${row.debit.toLocaleString()}` : "৳ 0"
                    }
                    cls="border p-2 text-red-500 hidden lg:table-cell"
                  />
                  <TableData
                    cls="border p-2 text-green-600 hidden lg:table-cell"
                    td={`৳ ${row.credit.toLocaleString()}`}
                  />
                  <TableData
                    cls="border p-2 text-green-600"
                    td={`৳ ${row.credit.toLocaleString()}`}
                  />
                  <TableData
                    cls={`border hidden lg:table-cell p-2 ${
                      row.balance < 0
                        ? "text-red-500"
                        : row.balance > 0
                        ? "text-green-600"
                        : "text-gray-600 "
                    }`}
                    td={`৳ ${row.balance.toLocaleString()}`}
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
                        <DropdownMenuItem>
                          <CustomDropDownMenuItem Icon={Pencil} title="আপডেট" />
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <CustomDropDownMenuItem
                            Icon={GrDocument}
                            title="খতিয়ান"
                          />
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <CustomDropDownMenuItem Icon={Trash} title="ডিলেট" />
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
                {expandedRow === row.id && (
                  <tr className="lg:hidden">
                    <td
                      colSpan={100}
                      className="border bg-gray-50 text-left p-3 "
                    >
                      <div className="grid grid-cols-2 ">
                        <div className="grid grid-cols-2 gap-1 text-sm text-gray-500">
                          <p className="font-semibold">নং</p>
                          <p> {row.id}</p>
                          <p className="font-semibold">খতিয়ান </p>
                          <p>{row.creditor}</p>
                          <p className="font-semibold">পে.ধরন </p>
                          <p> {row.description}</p>
                          <p className="font-semibold">তারিখ</p>
                          <p> {row.description}</p>
                          <p className="font-semibold">সময়</p>
                          <p>{row.description}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-1 text-sm ">
                          <p className="font-semibold">পরিমাণ</p>
                          <p> {row.id}</p>
                          <p className="font-semibold text-green-600">
                            মোট বিল
                          </p>
                          <p className="text-green-600">{row.creditor}</p>
                          <p className="font-semibold text-orange-600">কর্তন</p>
                          <p className="text-orange-600">{row.description}</p>
                          <p className="font-semibold text-gray-500">পেমেন্ট</p>
                          <p className="text-gray-500">{row.description}</p>
                          <p className="font-semibold text-gray-500">
                            বেশি পেমেন্ট
                          </p>
                          <p className="text-gray-500">{row.description}</p>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center p-3   text-gray-600 bg-gray-50 border-t">
        <span className="flex items-center">
          মোট পেমেন্ট {filtered.length} টি
          <span className="hidden lg:block">
            {" "}
            | মোট পেমেন্ট{" "}
            <span className="text-green-700 font-medium">
              {totalCredit.toLocaleString()} টাকা
            </span>
          </span>
        </span>

        <div className="flex items-center space-x-3">
          <span className="border px-2 py-1 rounded bg-green-50 border-green-200">
            {currentPage}
          </span>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="inline-flex items-center gap-1 rounded border border-gray-300 bg-white px-3 py-1   font-medium text-gray-700 hover:bg-gray-50 transition">
                {rowsPerPage} পেমেন্ট / পেজ <ChevronDown className="h-4 w-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-44 rounded-md border bg-white shadow-md"
            >
              {[10, 20, 30, 50, 100].map((num) => (
                <DropdownMenuItem
                  key={num}
                  onSelect={() => {
                    setRowsPerPage(num);
                    setCurrentPage(1);
                  }}
                  className="cursor-pointer px-4 py-2   text-gray-700 hover:bg-gray-100"
                >
                  {num} পেমেন্ট / পেজ
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      {isModalOpen && (
        <NewPaymentModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default PaymentPage;
