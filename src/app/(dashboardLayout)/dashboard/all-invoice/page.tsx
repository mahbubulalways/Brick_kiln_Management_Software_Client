"use client";

import SellingModal from "@/components/Dashboard/Modals/SellingModal";
import CustomDropDownMenuItem from "@/components/Reusable/CustomDropDownMenuItem";
import CustomReportButton from "@/components/Reusable/CustomReportButton";
import CustomSearchInput from "@/components/Reusable/CustomSearchInput";
import DateRangePicker from "@/components/Reusable/DateRangePicker";
import TableData from "@/components/Reusable/TableData";
import TableHead from "@/components/Reusable/TableHead";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ChevronDown,
  MoreVertical,
  Eye,
  Pencil,
  Trash2,
  Printer,
  Truck,
  Notebook,
  User,
} from "lucide-react";
import { useState } from "react";

interface SaleRow {
  id: number;
  customer: string;
  address: string;
  category: string;
  quantity: number;
  rate: number;
  price: number;
  total: number;
  discount: number;
  fare: number;
  grandTotal: number;
  cash: number;
  due: number;
}

const data: SaleRow[] = [
  {
    id: 3,
    customer: "আজিজার",
    address: "ঘুন্চি বাজার",
    category: "পিকেট",
    quantity: 2000,
    rate: 11.5,
    price: 23000,
    total: 23000,
    discount: 0,
    fare: 0,
    grandTotal: 23000,
    cash: 23000,
    due: 0,
  },
  {
    id: 4,
    customer: "শফিউল",
    address: "সানিয়াঝান",
    category: "১ নং",
    quantity: 4000,
    rate: 12.5,
    price: 50000,
    total: 50000,
    discount: 0,
    fare: 0,
    grandTotal: 50000,
    cash: 0,
    due: 50000,
  },
  {
    id: 5,
    customer: "নিসান",
    address: "দইখাওয়া",
    category: "১ নং",
    quantity: 3000,
    rate: 12.5,
    price: 37500,
    total: 37500,
    discount: 0,
    fare: 0,
    grandTotal: 37500,
    cash: 37500,
    due: 0,
  },
];

const AllInvoice = () => {
  const [search, setSearch] = useState("");
  const rowsPerPageOptions = [2, 20, 50, 100];
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);
  const [openReportModal, setOpenReportModal] = useState<boolean>(false);
  const filtered = data.filter((row) =>
    row.customer.toLowerCase().includes(search.toLowerCase())
  );

  const paginatedData = filtered.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="bg-white rounded-md shadow border border-gray-200 overflow-hidden">
      {/* Header search & controls */}
      <div className="flex justify-between items-center p-3  bg-gray-50">
        <CustomSearchInput search={search} setSearch={setSearch} />
        <div className="flex items-center gap-4">
          <DateRangePicker />
          <button onClick={() => setOpenReportModal(true)}>
            {" "}
            <CustomReportButton />
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border-t">
          <thead>
            <tr className="bg-[#039A63] text-white text-center">
              <TableHead th="#" cls="hidden lg:table-cell" />
              <TableHead th="কাস্টমার" />
              <TableHead th="ঠিকানা" cls="hidden lg:table-cell" />
              <TableHead th="শ্রেণি" />
              <TableHead th="পরিমাণ" />
              <TableHead th="রেট" cls="hidden lg:table-cell" />
              <TableHead th="মূল্য" cls="hidden lg:table-cell" />
              <TableHead th="মোট মূল্য" cls="hidden lg:table-cell" />
              <TableHead th="ছাড়" cls="hidden lg:table-cell" />
              <TableHead th="ভাড়া" cls="hidden lg:table-cell" />
              <TableHead th="সর্বমোট" />
              <TableHead th="নগদ" cls="hidden lg:table-cell" />
              <TableHead th="বাকি" cls="hidden lg:table-cell" />
              <TableHead th="বাটন" />
            </tr>
          </thead>
          <tbody className="text-center">
            {paginatedData.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                <TableData td={row.id} cls="hidden lg:table-cell" />
                <TableData td={row.customer} />
                <TableData td={row.address} cls="hidden lg:table-cell" />
                <TableData td={row.category} />
                <TableData td={row.quantity.toLocaleString()} />
                <TableData td={`৳ ${row.rate}`} cls="hidden lg:table-cell" />
                <TableData td={`৳ ${row.rate}`} cls="hidden lg:table-cell" />
                <TableData td={`৳ ${row.rate}`} cls="hidden lg:table-cell" />
                <TableData td={`৳ ${row.rate}`} cls="hidden lg:table-cell" />
                <TableData td={`৳ ${row.rate}`} cls="hidden lg:table-cell" />
                <TableData td={`৳ ${row.rate}`} />
                <TableData td={`৳ ${row.rate}`} cls="hidden lg:table-cell" />
                <TableData td={`৳ ${row.rate}`} cls="hidden lg:table-cell" />

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
                      // onClick={() => setOpenUpdateModal(true)}
                      ></DropdownMenuItem>
                      <DropdownMenuItem>
                        <CustomDropDownMenuItem
                          Icon={Printer}
                          title="প্রিন্ট চালান "
                        />
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <CustomDropDownMenuItem
                          Icon={Truck}
                          title="ডেলিভারি দিন"
                        />
                      </DropdownMenuItem>
                      <DropdownMenuItem>
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
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center p-3   text-gray-600 bg-gray-50 border-t">
        <span>মোট চালান {filtered.length} টি</span>
        <div className="flex items-center space-x-3">
          <span className="border px-2 py-1 rounded bg-green-50 border-green-200">
            {currentPage}
          </span>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="inline-flex items-center gap-1 rounded border border-gray-300 bg-white px-3 py-1   font-medium text-gray-700 hover:bg-gray-50 transition">
                {rowsPerPage} চালান / পেজ <ChevronDown className="h-4 w-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-44 rounded-md border bg-white shadow-md"
            >
              {rowsPerPageOptions.map((num) => (
                <DropdownMenuItem
                  key={num}
                  onSelect={() => {
                    setRowsPerPage(num);
                    setCurrentPage(1);
                  }}
                  className="cursor-pointer px-4 py-2   text-gray-700 hover:bg-gray-100"
                >
                  {num} চালান / পেজ
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      {openReportModal && (
        <SellingModal
          isOpen={openReportModal}
          onClose={() => setOpenReportModal(false)}
        />
      )}
    </div>
  );
};

export default AllInvoice;
