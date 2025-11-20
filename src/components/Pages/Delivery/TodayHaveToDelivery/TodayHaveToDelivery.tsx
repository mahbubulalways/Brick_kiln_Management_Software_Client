"use client";

import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Calendar, MoreVertical, Truck, User } from "lucide-react";
import CustomSearchInput from "@/components/Reusable/CustomSearchInput";
import { DatePicker } from "@/components/Others/DatePicker";
import CustomReportButton from "@/components/Reusable/CustomReportButton";
import TableHead from "@/components/Reusable/TableHead";
import NewDeliveryModal from "@/components/Dashboard/Modals/NewDeliveryModal";
import TableFooter from "@/components/Reusable/TableFooter";
import TableData from "@/components/Reusable/TableData";
import { useGetDeliveryHaveTodayQuery } from "@/redux/features/delivery.features";
import { IChallanItem, TTodaySDelivery } from "@/types/types";
import CustomDropDownMenuItem from "@/components/Reusable/CustomDropDownMenuItem";
import UpdateDeliveryDateModal from "@/components/Dashboard/Modals/EditModals/UpdateDeliveryDateModal";
import CustomLoader from "@/components/Reusable/CustomLoader";
import DeliveryReportModal from "@/components/Dashboard/Modals/ReportModal/DeliveryReportModal";
import { remainingAllDelivery } from "@/utils/getDeliveryReportData";

const TodaysHaveToDelivery = () => {
  const [rowsPerPage, setRowsPerPage] = useState(30);
  const [currentPage, setCurrentPage] = useState(1);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [openDateChangeModal, setIsOpenDateChangeModal] =
    useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [InvoiceId, setInvoiceId] = useState<number>();
  const [InvoiceIdDelivery, setInvoiceIDelivery] = useState<number>();
  const [itemIds, setItemIds] = useState<number[]>([]);
  const [deliveryDate, setDeliveryDate] = useState<Date | undefined>(
    new Date()
  );
  const [openDeliveryReport, setOpenDeliveryReport] = useState<boolean>(false);
  const isoDate = deliveryDate ? deliveryDate.toISOString() : "";
  const { data, isLoading } = useGetDeliveryHaveTodayQuery(isoDate, {
    refetchOnMountOrArgChange: true,
  });

  const todaysDelivery = data?.data || [];

  // Filter & paginate
  const filtered = todaysDelivery.filter((item: TTodaySDelivery) =>
    item?.customer?.name?.toLowerCase().includes(search.toLowerCase())
  );

  const paginatedData = filtered.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );
  const reportItems = remainingAllDelivery(todaysDelivery || []);
  return (
    <div className="bg-white p-2 rounded-md border border-gray-200 shadow-sm">
      {/* Top Controls */}
      <div className="flex justify-between items-center pt-2 lg:pt-0 gap-5">
        <CustomSearchInput search={search} setSearch={setSearch} />
        <div className="flex items-center gap-2 ">
          <DatePicker date={deliveryDate} setDate={setDeliveryDate} />
          <button onClick={() => setOpenDeliveryReport(true)}>
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
              <TableHead th={"ঠিকানা"} cls="hidden lg:table-cell" />
              <TableHead th={"শ্রেণি"} />
              <TableHead th={"ক্রয়"} cls="hidden lg:table-cell" />
              <TableHead th={"ডেলিভারি"} cls="hidden lg:table-cell" />
              <TableHead th={"ডে.বাকি"} />
              <TableHead th={"মোট বাকি"} cls="hidden lg:table-cell" />
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
            ) : !todaysDelivery?.length ? (
              <tr>
                <td colSpan={9} className="py-8 text-gray-600">
                  {data?.message}
                </td>
              </tr>
            ) : (
              <>
                {paginatedData?.map((row: TTodaySDelivery) => {
                  // Calculate total baki for this delivery
                  const totalBaki = row.items.reduce(
                    (acc, item) => acc + (item.quantity - item.delivered),
                    0
                  );

                  return row.items.map((item: IChallanItem, index: number) => (
                    <tr
                      key={`${row.id}-${item.id}`}
                      className="hover:bg-gray-50"
                    >
                      {/* Top-level delivery info */}
                      {index === 0 && (
                        <>
                          <TableData td={row.id} rowSpan={row.items.length} />
                          <TableData
                            td={row.customer?.name}
                            rowSpan={row.items.length}
                          />
                          <TableData
                            td={row.customer?.address}
                            rowSpan={row.items.length}
                            cls="hidden lg:table-cell"
                          />
                        </>
                      )}

                      {/* Item info */}
                      <TableData td={item.class} />
                      <TableData
                        td={item.quantity}
                        cls="hidden lg:table-cell"
                      />
                      <TableData
                        td={item.delivered}
                        cls="hidden lg:table-cell"
                      />
                      {/* Daily baki */}
                      <TableData td={item.quantity - item.delivered} />

                      {/* Total baki — only on first item row */}
                      {index === 0 && (
                        <TableData
                          td={totalBaki}
                          rowSpan={row.items.length}
                          cls="hidden lg:table-cell"
                        />
                      )}

                      {/* Actions column only once */}
                      {index === 0 && (
                        <td className="border p-2" rowSpan={row.items.length}>
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
                                onClick={() => {
                                  setIsOpenDateChangeModal(true);
                                  setInvoiceId(row?.id);
                                  setItemIds(row.items.map((itm) => itm.id));
                                }}
                              >
                                <CustomDropDownMenuItem
                                  Icon={Calendar}
                                  title="তারিখ পরিবর্তন"
                                />
                              </DropdownMenuItem>

                              <DropdownMenuItem
                                onClick={() => {
                                  setIsOpen(true);
                                  setInvoiceIDelivery(row?.id);
                                }}
                              >
                                <CustomDropDownMenuItem
                                  Icon={Truck}
                                  title="ডেলিভারি দিন"
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
                      )}
                    </tr>
                  ));
                })}
              </>
            )}
          </tbody>
        </table>
        <TableFooter
          currentPage={currentPage}
          length={filtered?.length}
          rowsPerPage={rowsPerPage}
          setCurrentPage={setCurrentPage}
          setRowsPerPage={setRowsPerPage}
          title=""
        />
      </div>
      {isOpen && (
        <NewDeliveryModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          invoiceId={InvoiceIdDelivery}
        />
      )}
      {openDateChangeModal && (
        <UpdateDeliveryDateModal
          isOpen={openDateChangeModal}
          onClose={() => setIsOpenDateChangeModal(false)}
          id={InvoiceId!}
          itemIds={itemIds}
          setItemIds={setItemIds}
        />
      )}{" "}
      {openDeliveryReport && (
        <DeliveryReportModal
          isOpen={openDeliveryReport}
          items={reportItems}
          onClose={() => setOpenDeliveryReport(false)}
          title="ডেলিভারি দিতে হবে"
        />
      )}
    </div>
  );
};

export default TodaysHaveToDelivery;
