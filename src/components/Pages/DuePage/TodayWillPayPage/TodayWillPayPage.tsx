"use client";

import { useRef, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Eye, MessageSquare, MoreVertical, Pencil, Trash2, User, Wallet2Icon } from "lucide-react";
import { useReactToPrint } from "react-to-print";

import NewPaymentModal from "@/components/Dashboard/Modals/NewPaymentModal";
import TableHead from "@/components/Reusable/TableHead";
import CustomButtonFixed from "@/components/Reusable/CustomButtonFixed";
import TableData from "@/components/Reusable/TableData";
import { useGetTodayHaveDueQuery } from "@/redux/features/dueCollection.features";
import { IChallanForDataShow, ICustomer } from "@/types/types";
import CustomLoader from "@/components/Reusable/CustomLoader";
import TableFooter from "@/components/Reusable/TableFooter";
import { TQuery } from "@/interface/query";
import SearchBar from "@/components/Reusable/SearchBar";
import CustomDatePickerState from "@/components/Reusable/CustomDatePickerState";
import { TMetaConfig } from "@/interface/meta";
import { TablePagination } from "@/components/Reusable/TablePagination";
import CustomDropDownMenuItem from "@/components/Reusable/CustomDropDownMenuItem";
import UpdateDueCollectionDateModal from "@/components/Dashboard/Modals/EditModals/UpdateDueCollectionDateModal";
import NewDueCollectionModalId from "@/components/Dashboard/Modals/NewDueCollectionModalId";

type PaymentRow = {
  challans: IChallanForDataShow[];
} & ICustomer;

const TodayWillPayPage = ({ limit, page, search }: TQuery) => {
  const [searchItem, setSearchItem] = useState("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [customerId, setCustomerId] = useState<string | undefined>(undefined)
  const [openDueModal, setOpenDueModal] = useState<boolean>(false);
  const [openDueCollectionModal, setOpenDueCollectionModal] = useState<boolean>(false);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const isoDate = date ? date.toISOString() : "";

  const { data, isLoading, isError, } = useGetTodayHaveDueQuery({ date: isoDate, limit, page, search }, {
    refetchOnMountOrArgChange: true,
  });

  const dues = data?.data?.data as PaymentRow[]
  const meta = data?.data?.meta as TMetaConfig;
  const totalCredit = dues?.reduce(
    (sum: number, r: PaymentRow) => sum + (r?.totalPurchased - r?.totalPaid),
    0,
  );

  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });

  return (
    <div className="bg-white p-2 rounded-md border border-gray-200 shadow-sm">
      <div className="flex justify-between items-center pt-2 lg:pt-0 gap-5">
        <div className="flex items-center gap-2 w-auto lg:w-full">
          <span className=" text-orange-500 px-3 py-1 rounded   border border-orange-300 font-medium hidden lg:block">
            মোট জমা দেবেঃ {totalCredit} টাকা
          </span>
        </div>

        <div className="flex items-center lg:justify-end gap-2 w-full">
          <SearchBar
            value={searchItem}
            onChange={(e) => setSearchItem(e.target.value)}
            onClear={() => setSearchItem("")}
          />
          <CustomDatePickerState
            onChange={setDate}
            value={date}
            placeholder="তারিখ"
            height="8"
          />
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
            ) : isError ? <tr><td colSpan={9} className="py-8 text-gray-600">
              {data?.message}
            </td></tr> : !dues?.length ? (
              <tr>
                <td colSpan={9} className="py-8 text-gray-600">
                  {data?.message}
                </td>
              </tr>
            ) : (
              dues?.map((row: PaymentRow) => (
                <tr key={row.id} className="hover:bg-gray-50">
                  <TableData td={row?.customerCode} />
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
                  <TableData td={row?.note ?? "-"} />

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
                        className="rounded-md border bg-white shadow-md"
                      >
                        <DropdownMenuItem onClick={() => {
                          setCustomerId(row?.customerCode)
                          setOpenDueModal(true)
                        }}>
                          <CustomDropDownMenuItem
                            Icon={Pencil}
                            title="তারিখ আপডেট করুন"
                          />
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => {
                          setCustomerId(row?.customerCode)
                          setOpenDueCollectionModal(true)
                        }}>
                          <CustomDropDownMenuItem
                            Icon={Wallet2Icon}
                            title="জমা করুন"
                          />
                        </DropdownMenuItem>
                        <DropdownMenuItem

                        >
                          <CustomDropDownMenuItem
                            Icon={MessageSquare}
                            title="মেসেজ করুন"
                          />
                        </DropdownMenuItem>

                        <DropdownMenuItem

                        >
                          <CustomDropDownMenuItem
                            Icon={User}
                            title="প্রোফাইল"
                          />
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <TablePagination
          page={meta?.page ?? 1}
          totalPages={meta?.totalPages ?? 1}
          dataLength={dues?.length}
          title="বাকি"
        />
      </div>
      {isOpen && (
        <NewPaymentModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
      )}

      {
        <UpdateDueCollectionDateModal
          id={customerId}
          isOpen={openDueModal}
          onClose={() => setOpenDueModal(false)}
          setId={setCustomerId} />
      }
      {openDueCollectionModal &&
        <NewDueCollectionModalId
          id={customerId}
          isOpen={openDueCollectionModal}
          onClose={() => setOpenDueCollectionModal(false)}
        />
      }
    </div>
  );
};

export default TodayWillPayPage;
