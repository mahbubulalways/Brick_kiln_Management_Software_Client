"use client";

import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Eye, Pencil, Trash2 } from "lucide-react";
import CustomNewButton from "@/components/Reusable/CustomNewButton";
import CustomSearchInput from "@/components/Reusable/CustomSearchInput";
import { DatePicker } from "@/components/Others/DatePicker";
import CustomReportButton from "@/components/Reusable/CustomReportButton";
import NewPaymentModal from "@/components/Dashboard/Modals/NewPaymentModal";
import NewPaymentSection from "../../PaymentPage/NewPaymentSection";
import TableHead from "@/components/Reusable/TableHead";
import NewDeliveryModal from "@/components/Dashboard/Modals/NewDeliveryModal";

const TodaysDeliveryPage = () => {
  const [rowsPerPage, setRowsPerPage] = useState(30);
  const [currentPage, setCurrentPage] = useState(1);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="bg-white p-2 rounded-md border border-gray-200 shadow-sm">
      <div className="flex justify-between items-center pt-2 lg:pt-0 gap-5">
        <button onClick={() => setIsOpen(!isOpen)}>
          <CustomNewButton title="নতুন ডেলিভারি" />
        </button>

        <div className="flex items-center gap-2 ">
          <DatePicker />
          <button>
            <CustomReportButton />
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto pt-3">
        <table className="min-w-full   text-center border-t">
          <thead className="bg-[#039A63] text-white">
            <tr>
              <TableHead th={"#"} />
              <TableHead th={"চালান নং"} />
              <TableHead th={"ঠিকানা"} />
              <TableHead th={"শ্রেণি"} />
              <TableHead th={"ক্রয়"} />
              <TableHead th={"ডে.বাকি"} />
              <TableHead th={"ড্রাইভার"} />
              <TableHead th={"মোট ডেলিভারি"} />
              <TableHead th={"তারিখ ও সময়"} />
              <TableHead th={"বাটন"} />
            </tr>
          </thead>
          {/* <tbody>
            {filtered.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50">
                <td className="border p-2">{row.id}</td>
                <td className="border p-2">{row.creditor}</td>
                <td className="border p-2">{row.description}</td>
                <td className="border p-2">{row.quantity}</td>
                <td className="border p-2">
                  ৳ {row.totalBill.toLocaleString()}
                </td>
                <td className="border p-2 text-red-500">
                  {row.debit > 0 ? `৳ ${row.debit.toLocaleString()}` : "৳ 0"}
                </td>
                <td className="border p-2 text-green-600">
                  ৳ {row.credit.toLocaleString()}
                </td>
                <td className="border p-2 text-green-600">
                  ৳ {row.credit.toLocaleString()}
                </td>
                <td
                  className={`border p-2 ${
                    row.balance < 0
                      ? "text-red-500"
                      : row.balance > 0
                      ? "text-green-600"
                      : "text-gray-600"
                  }`}
                >
                  ৳ {row.balance.toLocaleString()}
                </td>
                <td className="border p-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="text-gray-600 hover:text-green-700">
                        <Eye className="w-4 h-4" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className="w-36 rounded-md border bg-white shadow-md"
                    >
                      <DropdownMenuLabel className="px-3 py-1 text-gray-500 text-xs">
                        Actions
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="flex items-center gap-2 px-3 py-2   cursor-pointer hover:bg-gray-100">
                        <Eye className="w-4 h-4 text-green-600" /> বিস্তারিত
                      </DropdownMenuItem>
                      <DropdownMenuItem className="flex items-center gap-2 px-3 py-2   cursor-pointer hover:bg-gray-100">
                        <Pencil className="w-4 h-4 text-blue-600" /> সম্পাদনা
                      </DropdownMenuItem>
                      <DropdownMenuItem className="flex items-center gap-2 px-3 py-2   cursor-pointer hover:bg-gray-100 text-red-600">
                        <Trash2 className="w-4 h-4" /> মুছুন
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody> */}
        </table>
      </div>

      {/* Footer */}
      {/* <div className="flex justify-between items-center p-3   text-gray-600 bg-gray-50 border-t">
        <span>
          মোট পেমেন্ট {filtered.length} টি | মোট পেমেন্ট{" "}
          <span className="text-green-700 font-medium">
            {totalCredit.toLocaleString()} টাকা
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
      </div> */}
      {isOpen && (
        <NewDeliveryModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
      )}
    </div>
  );
};

export default TodaysDeliveryPage;
