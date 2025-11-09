"use client";

import NewChalanModal from "@/components/Dashboard/Modals/NewChalanModal";
import SellingModal from "@/components/Dashboard/Modals/SellingModal";
import CustomDropDownMenuItem from "@/components/Reusable/CustomDropDownMenuItem";
import CustomReportButton from "@/components/Reusable/CustomReportButton";
import CustomSearchInput from "@/components/Reusable/CustomSearchInput";
import TableData from "@/components/Reusable/TableData";
import TableFooter from "@/components/Reusable/TableFooter";
import TableHead from "@/components/Reusable/TableHead";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, Printer, Truck, Notebook, User } from "lucide-react";
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

const AdvanceInvoicePage = () => {
  const [search, setSearch] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [openReportModal, setOpenReportModal] = useState<boolean>(false);
  const filtered = data.filter((row) =>
    row.customer.toLowerCase().includes(search.toLowerCase())
  );

  const paginatedData = filtered.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <div className="bg-white rounded-md shadow border border-gray-200 overflow-hidden">
      <div className="flex justify-between items-center p-3 border-b bg-gray-50 gap-5">
        <div className="flex-1">
          <CustomSearchInput search={search} setSearch={setSearch} />
        </div>
        <button onClick={() => setOpenReportModal(true)}>
          <CustomReportButton />
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border-t">
          <thead>
            <tr className="bg-[#039A63] text-white text-center">
              <TableHead th={"#"} cls="hidden lg:table-cell" />
              <TableHead th={"কাস্টমার"} />
              <TableHead th={"ঠিকানা"} cls="hidden lg:table-cell" />
              <TableHead th={"শ্রেণি"} />
              <TableHead th={"পরিমাণ"} />
              <TableHead th={"রেট"} cls="hidden lg:table-cell" />
              <TableHead th={"মূল্য"} cls="hidden lg:table-cell" />
              <TableHead th={"মোট"} cls="hidden lg:table-cell" />
              <TableHead th={"ছাড়"} cls="hidden lg:table-cell" />
              <TableHead th={"ভাড়া"} cls="hidden lg:table-cell" />
              <TableHead th={"সর্বমোট"} />
              <TableHead th={"নগদ"} cls="hidden lg:table-cell" />
              <TableHead th={"বাকি"} cls="hidden lg:table-cell" />
              <TableHead th={"অ্যাকশন"} />
            </tr>
          </thead>
          <tbody className="text-center">
            {paginatedData.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                <TableData td={row.id} cls=" hidden lg:table-cell" />
                <TableData td={row.customer} />
                <TableData td={row.address} cls=" hidden lg:table-cell" />
                <TableData td={row.category} />
                <TableData td={row.quantity.toLocaleString()} />
                <TableData td={row.rate} cls="hidden lg:table-cell" />
                <TableData
                  td={`৳ ${row.price.toLocaleString()}`}
                  cls="hidden lg:table-cell"
                />
                <TableData
                  td={`৳ ${row.total.toLocaleString()}`}
                  cls="text-green-600 font-medium hidden lg:table-cell"
                />
                <TableData
                  td={`৳ ${row.discount}`}
                  cls="text-orange-500 hidden lg:table-cell"
                />
                <TableData
                  td={`৳ ${row.fare}`}
                  cls="text-blue-600 hidden lg:table-cell"
                />
                <TableData
                  td={`৳ ${row.grandTotal.toLocaleString()}`}
                  cls="text-green-600 font-medium"
                />
                <TableData
                  td={`৳ ${row.cash.toLocaleString()}`}
                  cls="text-green-600 font-medium hidden lg:table-cell"
                />
                <TableData
                  td={`৳ ${row.due.toLocaleString()}`}
                  cls={`border hidden lg:table-cell p-2 ${
                    row.due > 0 ? "text-red-500 font-medium" : "text-green-600"
                  }`}
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
      <TableFooter
        currentPage={currentPage}
        filtered={filtered}
        rowsPerPage={rowsPerPage}
        setCurrentPage={setCurrentPage}
        setRowsPerPage={setRowsPerPage}
        title={"চালান"}
      />

      {isOpen && (
        <NewChalanModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
      )}
      {openReportModal && (
        <SellingModal
          isOpen={openReportModal}
          onClose={() => setOpenReportModal(false)}
        />
      )}
    </div>
  );
};

export default AdvanceInvoicePage;
