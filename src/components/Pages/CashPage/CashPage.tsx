"use client";
import { DatePicker } from "@/components/Others/DatePicker";
import CustomNewButton from "@/components/Reusable/CustomNewButton";
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
import { MoreVertical, Pencil, Trash } from "lucide-react";
import { useState } from "react";
import NewCash from "./NewCash";
import CustomDropDownMenuItem from "@/components/Reusable/CustomDropDownMenuItem";
import NewCashModal from "@/components/Dashboard/Modals/NewCashModal";

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

const CashPage = () => {
  const [search, setSearch] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const filtered = data.filter((row) =>
    row.customer.toLowerCase().includes(search.toLowerCase())
  );

  // const totalPages = Math.ceil(filtered.length / rowsPerPage);

  const paginatedData = filtered.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <div className="bg-white p-3 rounded-md shadow border border-gray-200 overflow-hidden">
      <div>
        <div className=" lg:hidden  flex items-center gap-3">
          <h1 className="text-green-500 px-3 py-1 rounded   border border-green-300 font-medium w-full">
            মোট জমা দেবেঃ 0000 টাকা
          </h1>{" "}
          <h1 className="text-orange-500 px-3 py-1 rounded   border border-orange-300 font-medium w-full">
            মোট জমা দেবেঃ 0000 টাকা
          </h1>
        </div>

        <div className="flex items-center gap-3 justify-between pt-3 lg:pt-0">
          <button
            onClick={() => setIsModalOpen(true)}
            className="block lg:hidden"
          >
            <CustomNewButton title="" />
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:block hidden"
          >
            <CustomNewButton title="নতুন হিসাব" />
          </button>
          <div className="flex items-center gap-3 w-full lg:w-auto">
            <div className="hidden lg:block">
              <span className="text-green-500 px-3 py-1 rounded   border border-green-300 font-medium ">
                মোট জমা দেবেঃ 0000 টাকা
              </span>{" "}
              <span className="text-orange-500 px-3 py-1 rounded   border border-orange-300 font-medium ">
                মোট জমা দেবেঃ 0000 টাকা
              </span>
            </div>
            <CustomSearchInput search={search} setSearch={setSearch} />{" "}
            <div className="w-full lg:w-auto">
              <DatePicker />
            </div>
          </div>
        </div>
      </div>
      <div className="py-2">{isOpen && <NewCash />}</div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border-t">
          <thead>
            <tr className="bg-[#039A63] text-white text-center">
              <TableHead th={"#"} />
              <TableHead th={"ক্যাশের বিবরণ"} />
              <TableHead th={"ক্যাশ ইন"} />
              <TableHead th={"ক্যাশ আউট"} />
              <TableHead th={"বাটন"} />
            </tr>
          </thead>
          <tbody className="text-center">
            {paginatedData.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                <TableData td={row.id} />
                <TableData td={row.customer} />
                <TableData td={row.address} />
                <TableData td={row.category} />

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
      <TableFooter
        currentPage={currentPage}
        filtered={filtered}
        rowsPerPage={rowsPerPage}
        setCurrentPage={setCurrentPage}
        setRowsPerPage={setRowsPerPage}
        title={""}
      />

      {isModalOpen && (
        <NewCashModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default CashPage;
