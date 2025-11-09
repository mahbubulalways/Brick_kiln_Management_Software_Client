"use client";

import { useRef, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ChevronDown,
  Eye,
  MessageSquare,
  Pencil,
  User,
  Wallet2Icon,
} from "lucide-react";
import CustomSearchInput from "@/components/Reusable/CustomSearchInput";
import { useReactToPrint } from "react-to-print";
import NewPaymentModal from "@/components/Dashboard/Modals/NewPaymentModal";
import TableHead from "@/components/Reusable/TableHead";
import CustomButtonFixed from "@/components/Reusable/CustomButtonFixed";
import DateRangePicker from "@/components/Reusable/DateRangePicker";
import TableData from "@/components/Reusable/TableData";
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

const AllDueListPage = () => {
  const [search, setSearch] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(30);
  const [currentPage, setCurrentPage] = useState(1);
  const [dateRange, setDateRange] = useState<{
    startDate?: Date;
    endDate?: Date;
  }>({});
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const filtered = data.filter((row) =>
    row.creditor.toLowerCase().includes(search.toLowerCase())
  );

  const totalCredit = filtered.reduce((sum, r) => sum + r.credit, 0);

  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });

  console.log(dateRange);
  return (
    <div className="bg-white p-2 rounded-md border border-gray-200 shadow-sm">
      <div className="flex justify-between items-center w-full pt-2 lg:pt-0 gap-5">
        <div className="flex items-center gap-2 w-auto ">
          <button>
            <CustomButtonFixed title="বর্তমান সিজন" />
          </button>
          <span className=" text-orange-500 px-3 py-1 rounded   border border-orange-300 font-medium hidden lg:block ">
            মোট বাকিঃ {totalCredit.toLocaleString()} টাকা
          </span>
        </div>

        <div className="flex items-center gap-2">
          <CustomSearchInput search={search} setSearch={setSearch} />
          <div className="shrink-0 ">
            <DateRangePicker onChange={(date) => setDateRange(date)} />
          </div>
          <button className="w-full" onClick={reactToPrintFn}>
            <CustomButtonFixed title="প্রিন্ট করুন" />
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto pt-5" ref={contentRef}>
        <table className="min-w-full   text-center border-t">
          <thead className="bg-[#039A63] text-white">
            <tr>
              <TableHead th={"কা.আইডি"} />
              <TableHead th={"নাম"} />
              <TableHead th={"ঠিকানা"} />
              <TableHead th={"ডেলিভারি বাকি"} />
              <TableHead th={"টাকা বাকি"} />
              <TableHead th={"পরিশোধের তারিখ"} />
              <TableHead th={"ফোন নম্বর	"} />
              <TableHead th={"নোট"} />
              <TableHead th={"সিজন"} />
              <TableHead th={"বাটন"} />
            </tr>
          </thead>
          <tbody>
            {filtered.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50">
                <TableData td={row.id} />
                <TableData td={row.creditor} />
                <TableData td={row.quantity} />
                <TableData td={row.quantity} cls="text-orange-500" />
                <TableData td={row.quantity} cls="bg-red-50 text-orange-800" />
                <TableData td={row.quantity} />
                <TableData td={`৳ ${row.totalBill.toLocaleString()}`} />
                <TableData
                  td={`${
                    row.debit > 0 ? `৳ ${row.debit.toLocaleString()}` : "৳ 0"
                  }`}
                />
                <TableData td={`৳ ${row.totalBill.toLocaleString()}`} />

                <td className="border p-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="text-gray-600 cursor-pointer hover:text-green-700">
                        <Eye className="w-4 h-4" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className=" rounded-md border bg-white shadow-md"
                    >
                      <DropdownMenuItem>
                        <CustomDropDownMenuItem
                          Icon={Pencil}
                          title="তারিখ আপডেট করুন"
                        />
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <CustomDropDownMenuItem
                          Icon={Wallet2Icon}
                          title="জমা করুন"
                        />
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <CustomDropDownMenuItem
                          Icon={MessageSquare}
                          title="মেসেজ করুন"
                        />
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <CustomDropDownMenuItem Icon={User} title="প্রোফাইল" />
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
          মোট বাকি {filtered.length} টি | মোট বাকি{" "}
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
                {rowsPerPage} বাকি / পেজ <ChevronDown className="h-4 w-4" />
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
                  {num} বাকি / পেজ
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      {isOpen && (
        <NewPaymentModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
      )}
    </div>
  );
};

export default AllDueListPage;
