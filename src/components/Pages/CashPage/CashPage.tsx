"use client";

import { DatePicker } from "@/components/Others/DatePicker";
import CustomNewButton from "@/components/Reusable/CustomNewButton";
import CustomSearchInput from "@/components/Reusable/CustomSearchInput";
import TableData from "@/components/Reusable/TableData";
import TableFooter from "@/components/Reusable/TableFooter";
import TableHead from "@/components/Reusable/TableHead";
import CustomDropDownMenuItem from "@/components/Reusable/CustomDropDownMenuItem";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, Pencil, Trash } from "lucide-react";
import { useState } from "react";
import NewCashModal from "@/components/Dashboard/Modals/NewCashModal";
import { useGetAllCashQuery } from "@/redux/features/cash.features";
import { TCash } from "@/interface/cash";
import { TMetaConfig } from "@/interface/meta";
import { TablePagination } from "@/components/Reusable/TablePagination";
import CustomLoader from "@/components/Reusable/CustomLoader";
import moment from "moment";
import { SERVER_ERROR_MESSAGE } from "@/constant";
import { TQuery } from "@/interface/query";
import SearchBar from "@/components/Reusable/SearchBar";

const CashPage = ({ limit, page, search }: TQuery) => {
  const [searchItem, setSearchItem] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(new Date());

  const {
    data: cashResponse,
    isLoading,
    isFetching,
    isError,
  } = useGetAllCashQuery({
    page,
    limit,
    search: search || undefined,
    // date: date ? date.toISOString().split("T")[0] : undefined,
  });

  const cashData = cashResponse?.data?.data as TCash[] || [];
  const meta = cashResponse?.data?.meta as TMetaConfig;

  // মোট INCOME
  const totalIncome = cashData
    .filter((item) => item.type === "INCOME")
    .reduce((total, item) => total + Number(item.amount), 0);

  // মোট EXPENSE
  const totalExpense = cashData
    .filter((item) => item.type === "EXPENSE")
    .reduce((total, item) => total + Number(item.amount), 0);

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center gap-3 justify-between pt-3 lg:pt-0">
        <button onClick={() => setIsModalOpen(true)}>
          <CustomNewButton title="নতুন হিসাব" />
        </button>

        <div className="flex items-center gap-3 w-full lg:w-auto">
          {/* Total */}
          <div className="hidden lg:flex items-center gap-2">
            <span className="text-green-500 px-3 py-1 rounded border border-green-300 font-medium">
              মোট জমাঃ {totalIncome.toLocaleString()} টাকা
            </span>

            <span className="text-orange-500 px-3 py-1 rounded border border-orange-300 font-medium">
              মোট খরচঃ {totalExpense.toLocaleString()} টাকা
            </span>
          </div>

          <SearchBar value={searchItem} onChange={(e) => setSearchItem(e.target.value)} />

          {/* Date */}
          <div className="w-full lg:w-auto">
            <DatePicker
              setDate={(value) => {
                setDate(value);
              }}
              date={date}
            />
          </div>
        </div>
      </div>
      <div className="overflow-x-auto mt-2">
        <table className="min-w-full border-t">
          <thead>
            <tr className="bg-[#039A63] text-white text-center">
              <TableHead th={"#"} />
              <TableHead th={"উৎস"} />
              <TableHead th={"ক্যাশের বিবরণ"} />
              <TableHead th={"ক্যাশ ইন"} />
              <TableHead th={"ক্যাশ আউট"} />
              <TableHead th={"সময়"} />
              <TableHead th={"বাটন"} />
            </tr>
          </thead>

          <tbody className="text-center">
            {
              isLoading ?
                <tr>
                  <td colSpan={7}>
                    <CustomLoader cls="h-[30vh]" />
                  </td>
                </tr> : isError ?
                  <tr>
                    <td colSpan={7} className="py-8 text-gray-600">
                      {SERVER_ERROR_MESSAGE}
                    </td>
                  </tr> : !cashData?.length ?
                    <tr>
                      <td colSpan={7} className="py-8 text-gray-600">
                        {cashResponse?.message}
                      </td>
                    </tr> :

                    cashData?.map((row) => (
                      <tr
                        key={row.id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <TableData td={row.id} />

                        <TableData td={row.source} />
                        <TableData td={row.description} />
                        <TableData td={row.type === "INCOME" ? row.amount : "-"} />
                        <TableData td={row.type === "EXPENSE" ? row.amount : "-"} />
                        <TableData td={moment(row.createdAt).format("DD-MM-YYYY")} />


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
                                  Icon={Trash}
                                  title="ডিলেট"
                                />
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    ))
            }
          </tbody>
        </table>
        <TablePagination
          page={meta?.page ?? 1}
          totalPages={meta?.totalPages ?? 1}
          dataLength={cashData?.length}
          title="চালান"
        />
      </div>

      {/* New Cash Modal */}
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