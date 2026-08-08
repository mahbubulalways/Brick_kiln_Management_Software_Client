"use client";

import { useRef, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Eye, MoreVertical, Pencil, Trash2 } from "lucide-react";
import CustomNewButton from "@/components/Reusable/CustomNewButton";
import CustomSearchInput from "@/components/Reusable/CustomSearchInput";
import { DatePicker } from "@/components/Others/DatePicker";
import { useReactToPrint } from "react-to-print";

import NewPaymentModal from "@/components/Dashboard/Modals/NewPaymentModal";
import TableHead from "@/components/Reusable/TableHead";
import CustomButtonFixed from "@/components/Reusable/CustomButtonFixed";
import TableData from "@/components/Reusable/TableData";
import { useGetTodayHaveDueQuery } from "@/redux/features/dueCollection.features";
import { IChallanForDataShow, ICustomer } from "@/types/types";
import CustomLoader from "@/components/Reusable/CustomLoader";
import TableFooter from "@/components/Reusable/TableFooter";

type PaymentRow = {
  challans: IChallanForDataShow[];
} & ICustomer;

const TodayWillPayPage = () => {
  const [search, setSearch] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(30);
  const [currentPage, setCurrentPage] = useState(1);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const isoDate = date ? date.toISOString() : "";

  const { data: dues, isLoading } = useGetTodayHaveDueQuery(isoDate, {
    refetchOnMountOrArgChange: true,
  });

  const filtered = dues?.data?.filter((row: PaymentRow) =>
    row.name.toLowerCase().includes(search.toLowerCase()),
  );

  const totalCredit = filtered?.reduce(
    (sum: number, r: PaymentRow) => sum + (r?.totalPurchased - r?.totalPaid),
    0,
  );

  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });
  console.log(filtered);
  return (
    <div className="bg-white p-2 rounded-md border border-gray-200 shadow-sm">
      <div className="flex justify-between items-center pt-2 lg:pt-0 gap-5">
        <div className="flex items-center gap-2 w-auto lg:w-full">
          <span className=" text-orange-500 px-3 py-1 rounded   border border-orange-300 font-medium hidden lg:block">
            মোট জমা দেবেঃ {totalCredit} টাকা
          </span>
        </div>

        <div className="flex items-center lg:justify-end gap-2 w-full">
          <CustomSearchInput search={search} setSearch={setSearch} />
          <DatePicker setDate={setDate} date={date} />
          <button onClick={reactToPrintFn}>
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
              <TableHead th={"ফোন নম্বর	"} />
              <TableHead th={"নোট"} />
              <TableHead th={"সিজন"} />
              <TableHead th={"বাটন"} />
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={9}>
                  <CustomLoader cls="h-[30vh]" />
                </td>
              </tr>
            ) : !filtered?.length ? (
              <tr>
                <td colSpan={9} className="py-8 text-gray-600">
                  {dues?.message}
                </td>
              </tr>
            ) : (
              filtered?.map((row: PaymentRow) => (
                <tr key={row.id} className="hover:bg-gray-50">
                  <TableData td={row?.id} />
                  <TableData td={row?.name} />
                  <TableData td={row?.address} />
                  <TableData
                    td={row?.challans?.reduce((accChallan, challan) => {
                      const itemsSum =
                        challan.items?.reduce(
                          (accItem, curr) =>
                            accItem +
                            ((curr.quantity ?? 0) - (curr.delivered ?? 0)),
                          0,
                        ) ?? 0;
                      return accChallan + itemsSum;
                    }, 0)}
                  />

                  <TableData td={row?.totalPurchased - row?.totalPaid} />
                  <TableData td={row?.phoneNumber} />
                  <TableData td={row?.challans?.[0]?.note ?? "-"} />

                  <TableData td={"2425"} />

                  <td className="border p-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="p-1.5 rounded hover:bg-gray-100 transition">
                          <MoreVertical className="w-4 h-4 text-gray-600 cursor-pointer" />
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
        title={"বাকি"}
      />
      {/* Footer */}

      {isOpen && (
        <NewPaymentModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
      )}
    </div>
  );
};

export default TodayWillPayPage;
