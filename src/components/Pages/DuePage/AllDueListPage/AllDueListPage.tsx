"use client";

import { useRef, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Eye, MessageSquare, Pencil, User, Wallet2Icon } from "lucide-react";
import CustomSearchInput from "@/components/Reusable/CustomSearchInput";
import { useReactToPrint } from "react-to-print";
import NewPaymentModal from "@/components/Dashboard/Modals/NewPaymentModal";
import TableHead from "@/components/Reusable/TableHead";
import CustomButtonFixed from "@/components/Reusable/CustomButtonFixed";
import DateRangePicker from "@/components/Reusable/DateRangePicker";
import TableData from "@/components/Reusable/TableData";
import CustomDropDownMenuItem from "@/components/Reusable/CustomDropDownMenuItem";
import { useGetAllDueListQuery } from "@/redux/features/dueCollection.features";
import { IChallanForDataShow, ICustomer } from "@/types/types";
import moment from "moment";
import CustomLoader from "@/components/Reusable/CustomLoader";
import TableFooter from "@/components/Reusable/TableFooter";

type PaymentRow = {
  challans: IChallanForDataShow[];
} & ICustomer;

const AllDueListPage = () => {
  const [search, setSearch] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(30);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterRange, setFilterRange] = useState<{
    startDate: Date | undefined;
    endDate: Date | undefined;
  }>({
    startDate: undefined,
    endDate: undefined,
  });

  const handleDateRangeChange = (range: {
    startDate: Date | undefined;
    endDate: Date | undefined;
  }) => {
    setFilterRange(range);
  };
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const info = {
    startDate: filterRange.startDate ? filterRange.startDate.toISOString() : "",
    endDate: filterRange.endDate ? filterRange.endDate.toISOString() : "",
  };

  const { data: dues, isLoading } = useGetAllDueListQuery(info, {
    // skip: !filterRange.startDate || !filterRange.endDate, // optional safety
    refetchOnMountOrArgChange: true,
  });
  console.log(dues);
  const filtered = dues?.data?.filter((row: PaymentRow) =>
    row?.name?.toLowerCase()?.includes(search?.toLowerCase()),
  );

  const totalCredit = filtered?.reduce(
    (sum: number, r: PaymentRow) => sum + (r?.totalPurchased - r?.totalPaid),
    0,
  );

  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });

  return (
    <div className="bg-white p-2 rounded-md border border-gray-200 shadow-sm">
      <div className="flex justify-between items-center w-full pt-2 lg:pt-0 gap-5">
        <div className="flex items-center gap-2 w-auto ">
          <button>
            <CustomButtonFixed title="বর্তমান সিজন" />
          </button>
          <span className=" text-orange-500 px-3 py-1 rounded   border border-orange-300 font-medium hidden lg:block ">
            মোট বাকিঃ {totalCredit?.toLocaleString()} টাকা
          </span>
        </div>

        <div className="flex items-center gap-2">
          <CustomSearchInput search={search} setSearch={setSearch} />
          <div className="shrink-0 ">
            <DateRangePicker onChange={handleDateRangeChange} />
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
            {isLoading ? (
              <tr>
                <td colSpan={9}>
                  <CustomLoader cls="h-[30vh]" />
                </td>
              </tr>
            ) : !dues?.data?.length ? (
              <tr>
                <td colSpan={9} className="py-8 text-gray-600">
                  {dues?.message}
                </td>
              </tr>
            ) : (
              <>
                {filtered?.map((row: PaymentRow) => (
                  <tr key={row?.id} className="hover:bg-gray-50">
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
                      cls="text-orange-500"
                    />
                    <TableData td={row?.totalPurchased - row?.totalPaid} />
                    <TableData
                      td={moment(row?.nextPaymentDate).format("DD-MM-YYYY")}
                    />

                    <TableData td={row?.phoneNumber} />
                    <TableData td={row?.challans?.[0]?.note ?? "-"} />
                    <TableData td={"2020"} />

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
                            <CustomDropDownMenuItem
                              Icon={User}
                              title="প্রোফাইল"
                            />
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </>
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
      {isOpen && (
        <NewPaymentModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
      )}
    </div>
  );
};

export default AllDueListPage;
