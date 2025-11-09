"use client";

import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ChevronDown,
  Eye,
  MoreVertical,
  Pencil,
  Trash,
  Trash2,
} from "lucide-react";
import CustomNewButton from "@/components/Reusable/CustomNewButton";
import { DatePicker } from "@/components/Others/DatePicker";
import CustomReportButton from "@/components/Reusable/CustomReportButton";
import NewPaymentModal from "@/components/Dashboard/Modals/NewPaymentModal";
import NewLoadSection from "./NewLoadSection";
import CustomSelect2 from "@/components/Reusable/CustomSelect2";
import TableData from "@/components/Reusable/TableData";
import TableHead from "@/components/Reusable/TableHead";
import CustomDropDownMenuItem from "@/components/Reusable/CustomDropDownMenuItem";

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

const LoadPage = () => {
  const [search, setSearch] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(30);
  const [currentPage, setCurrentPage] = useState(1);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState("");
  const filtered = data.filter((row) =>
    row.creditor.toLowerCase().includes(search.toLowerCase())
  );

  const totalCredit = filtered.reduce((sum, r) => sum + r.credit, 0);

  return (
    <div className="bg-white p-2 rounded-md border border-gray-200 shadow-sm">
      <div className="flex justify-between items-center pt-2 lg:pt-0 gap-5">
        <div className="flex items-center gap-2 w-auto lg:w-full">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="hidden lg:block"
          >
            <CustomNewButton title="নতুন লোড" />
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="lg:hidden block"
          >
            <CustomNewButton title="নতুন লোড" />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <DatePicker />
          <CustomSelect2
            options={["1 নম্বর রাউন্ড", "2 নম্বর রাউন্ড", "3 নম্বর রাউন্ড"]}
            placeholder="1 নম্বর রাউন্ড"
            onChange={(value) => setSelected(value)}
            defaultValue="1 নম্বর রাউন্ড"
          />
          <button>
            <CustomReportButton />
          </button>
        </div>
      </div>
      {/* NEW PAYMENT ADD LARGE DEVICE */}
      <div className="py-2">{isOpen && <NewLoadSection />}</div>
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full   text-center border-t">
          <thead className="bg-[#039A63] text-white">
            <tr>
              <TableHead th={"তারিখ"} />
              <TableHead th={"রাউন্ড"} cls="hidden lg:table-cell" />
              <TableHead th={"লোডের বিবরণ"} />
              <TableHead th={"পরিমাণ"} />
              <TableHead th="বাটন" />
            </tr>
          </thead>
          <tbody>
            {filtered.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50">
                <TableData td={row.id} />
                <TableData td={row.creditor} cls="hidden lg:table-cell" />
                <TableData td={row.description} />
                <TableData td={row.quantity} />

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
                        <CustomDropDownMenuItem Icon={Trash} title="ডিলেট" />
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center p-3   text-gray-600 bg-gray-50 border-t">
        <span>
          মোট লোড {filtered.length} টি{" "}
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
                {rowsPerPage} লোড/ পেজ <ChevronDown className="h-4 w-4" />
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
                  {num} লো / পেজ
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

export default LoadPage;
