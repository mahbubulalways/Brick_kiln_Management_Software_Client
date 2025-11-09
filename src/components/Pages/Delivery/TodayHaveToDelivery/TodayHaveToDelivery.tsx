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
import { Eye, Pencil, Trash2 } from "lucide-react";
import CustomSearchInput from "@/components/Reusable/CustomSearchInput";
import { DatePicker } from "@/components/Others/DatePicker";
import CustomReportButton from "@/components/Reusable/CustomReportButton";
import TableHead from "@/components/Reusable/TableHead";
import NewDeliveryModal from "@/components/Dashboard/Modals/NewDeliveryModal";
import TableFooter from "@/components/Reusable/TableFooter";
import TableData from "@/components/Reusable/TableData";

const TodaysHaveToDelivery = () => {
  const [rowsPerPage, setRowsPerPage] = useState(30);
  const [currentPage, setCurrentPage] = useState(1);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");

  // 🔹 Dummy Data
  const deliveries = [
    {
      id: "DLV-1001",
      customer: "রহিম উদ্দিন",
      address: "ঢাকা, মিরপুর",
      category: "হোলসেল",
      purchase: 25000,
      delivery: 20000,
      dailyDue: 5000,
      totalDue: 7000,
    },
    {
      id: "DLV-1002",
      customer: "করিম আহমেদ",
      address: "চট্টগ্রাম, আগ্রাবাদ",
      category: "রিটেইল",
      purchase: 12000,
      delivery: 10000,
      dailyDue: 2000,
      totalDue: 3000,
    },
    {
      id: "DLV-1003",
      customer: "মোঃ হোসেন",
      address: "রাজশাহী, বোয়ালিয়া",
      category: "হোলসেল",
      purchase: 18000,
      delivery: 15000,
      dailyDue: 3000,
      totalDue: 3500,
    },
  ];

  // 🔍 Filter data
  const filtered = deliveries.filter((item) =>
    item.customer.toLowerCase().includes(search.toLowerCase())
  );

  const paginatedData = filtered.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <div className="bg-white p-2 rounded-md border border-gray-200 shadow-sm">
      {/* Top Controls */}
      <div className="flex justify-between items-center pt-2 lg:pt-0 gap-5">
        <CustomSearchInput search={search} setSearch={setSearch} />
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
              <TableHead th={"চালান নং"} />
              <TableHead th={"কাস্টমার"} />
              <TableHead th={"ঠিকানা"} />
              <TableHead th={"শ্রেণি"} />
              <TableHead th={"ক্রয়"} />
              <TableHead th={"ডেলিভারি"} />
              <TableHead th={"ডে.বাকি"} />
              <TableHead th={"মোট বাকি"} />
              <TableHead th={"বাটন"} />
            </tr>
          </thead>

          <tbody>
            {paginatedData.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50">
                <TableData td={row.id} />
                <TableData td={row.customer} />
                <TableData td={row.address} />
                <TableData td={row.category} />
                <TableData
                  td={`৳ ${row.purchase.toLocaleString()}`}
                  cls=" text-gray-700"
                />
                <TableData
                  td={`৳ ${row.delivery.toLocaleString()}`}
                  cls=" text-green-700"
                />
                <TableData
                  td={`৳ ${row.dailyDue.toLocaleString()}`}
                  cls=" text-orange-600"
                />
                <TableData
                  td={`৳ ${row.totalDue.toLocaleString()}`}
                  cls=" text-red-600"
                />

                {/* Actions */}
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
          </tbody>
        </table>
        <TableFooter
          currentPage={currentPage}
          filtered={filtered}
          rowsPerPage={rowsPerPage}
          setCurrentPage={setCurrentPage}
          setRowsPerPage={setRowsPerPage}
          title=""
        />
      </div>

      {isOpen && (
        <NewDeliveryModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
      )}
    </div>
  );
};

export default TodaysHaveToDelivery;
