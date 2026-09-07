"use client";
import { useRef, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Calendar, MoreVertical, Truck, User } from "lucide-react";
import CustomReportButton from "@/components/Reusable/CustomReportButton";
import TableHead from "@/components/Reusable/TableHead";
import NewDeliveryModal from "@/components/Dashboard/Modals/NewDeliveryModal";
import TableData from "@/components/Reusable/TableData";
import { useGetAllDeliveryListQuery } from "@/redux/features/delivery.features";
import moment from "moment";
import { IChallanForDataShow } from "@/types/types";
import CustomDropDownMenuItem from "@/components/Reusable/CustomDropDownMenuItem";
import UpdateDeliveryDateModal from "@/components/Dashboard/Modals/EditModals/UpdateDeliveryDateModal";
import CustomLoader from "@/components/Reusable/CustomLoader";
import DeliveryReportModal from "@/components/Dashboard/Modals/ReportModal/DeliveryReportModal";
import {
  remainingAllDelivery,
} from "@/utils/getDeliveryReportData";
import { TQuery } from "@/interface/query";
import SearchBar from "@/components/Reusable/SearchBar";
import CustomDateRangePicker from "@/components/Reusable/CustomDateRangePicker";
import { TMetaConfig } from "@/interface/meta";
import { TablePagination } from "@/components/Reusable/TablePagination";
import { toBanglaNumber } from "@/utils/toBanglaNumber";
import CommonPrint, { TCommonPrintRef } from "@/components/Reusable/CommonPrint";
import { useGetVataInfoQuery } from "@/redux/features/vata.features";
import CustomPrintButton from "@/components/Reusable/CustomPrintButton";
import RemainingDeliveryPrint from "@/components/PrintComponent/RemainingDeliveryPrint";
import Link from "next/link";
import { formatDateRange } from "@/utils/formatDateRange";

const AllDeliveryPage = ({ limit, page, search }: TQuery) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchItem, setSearchItem] = useState<string>("");
  const [openDateChangeModal, setIsOpenDateChangeModal] =
    useState<boolean>(false);
  const [InvoiceIdDelivery, setInvoiceIDelivery] = useState<number>();
  const [openDeliveryReport, setOpenDeliveryReport] = useState<boolean>(false);
  const [InvoiceId, setInvoiceId] = useState<number>();
  const [itemIds, setItemIds] = useState<string[]>([]);
  const [filterRange, setFilterRange] = useState("");


  const { data, isLoading } = useGetAllDeliveryListQuery({
    date: formatDateRange(filterRange), limit, page, search
  }, {
    refetchOnMountOrArgChange: true,
  });
  const printRef = useRef<TCommonPrintRef>(null);
  // VATA INFORMATIONS
  const { data: vata } = useGetVataInfoQuery(undefined)
  const deliveries = data?.data?.data;
  const meta = data?.data?.meta as TMetaConfig;

  const reportItems = remainingAllDelivery(deliveries || []);

  return (
    <div className="bg-white p-2 rounded-md border border-gray-200 shadow-sm">
      <div className="flex flex-col gap-2 pt-2 lg:flex-row lg:items-center lg:justify-between lg:pt-0">
        {/* Left Section */}
        <div className="flex w-full items-center gap-2 lg:w-auto">
          <div className="min-w-0 flex-1 lg:flex-none">
            <SearchBar
              value={searchItem}
              onChange={(e) => setSearchItem(e.target.value)}
              onClear={() => setSearchItem("")}
            />
          </div>

          {/* Date - Mobile/Tablet */}
          <div className="lg:hidden">
            <CustomDateRangePicker
              value={filterRange}
              onChange={setFilterRange}
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex w-full items-center gap-2 lg:w-auto lg:justify-end">
          {/* Date - Large */}
          <div className="hidden lg:block">
            <CustomDateRangePicker
              value={filterRange}
              onChange={setFilterRange}
            />
          </div>

          <CustomPrintButton
            className="w-full md:w-max"
            onClick={() => printRef.current?.print()}
          />

          <CustomReportButton
            className="w-full md:w-max"
            onClick={() => setOpenDeliveryReport(true)}
          />
        </div>
      </div>
      <div>
        <div className="overflow-x-auto pt-3">
          <table className="min-w-full   text-center border-t">
            <thead className="bg-[#039A63] text-white">
              <tr>
                <TableHead th={"চালান নং"} />
                <TableHead th={"কাস্টমার"} />
                <TableHead th={"ঠিকানা"} cls="hidden lg:table-cell" />
                <TableHead th={"টাকা বাকি"} cls="hidden lg:table-cell" />
                <TableHead th={"নোট"} cls="hidden lg:table-cell" />
                <TableHead th={"শ্রেণি"} />
                <TableHead th={"ক্রয়"} cls="hidden lg:table-cell" />
                <TableHead th={"ডেলিভারি"} cls="hidden lg:table-cell" />
                <TableHead th={"ডে.বাকি"} />
                <TableHead th={"মোট ডে.বাকি"} />
                <TableHead th={"ডে.তারিখ"} cls="hidden lg:table-cell" />
                <TableHead th={"বাটন"} />
              </tr>
            </thead>

            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={12}>
                    <CustomLoader cls="h-[30vh]" />
                  </td>
                </tr>
              ) : !deliveries?.length ? (
                <tr>
                  <td colSpan={12} className="py-8 text-gray-600">
                    {data?.message}
                  </td>
                </tr>
              ) : (
                deliveries?.map((row: IChallanForDataShow) =>
                  row.items?.map((item, index) => (
                    <tr key={`${row.id}-${item.id}`} className="hover:bg-gray-50">
                      {/* Show challan info only for the first item row */}
                      {index === 0 ? (
                        <>
                          <TableData td={row?.serial} rowSpan={row.items.length} />
                          <TableData
                            td={row?.customer?.name}
                            rowSpan={row.items.length}
                          />
                          <TableData
                            td={row?.customer?.address}
                            rowSpan={row.items.length}
                            cls="hidden lg:table-cell"
                          />
                          <TableData
                            td={
                              toBanglaNumber(row?.totalDue)
                            }
                            rowSpan={row.items.length}
                            cls="hidden lg:table-cell"
                          />
                          <TableData
                            td={row?.note as string}
                            cls="text-gray-700 hidden lg:table-cell"
                            rowSpan={row.items.length}
                          />
                        </>
                      ) : null}

                      {/* These change per item */}
                      <TableData td={item?.class} />
                      <TableData td={toBanglaNumber(item?.quantity)} cls="hidden lg:table-cell" />
                      <TableData
                        td={item?.delivered}
                        cls="hidden lg:table-cell"
                      />
                      <TableData td={toBanglaNumber(item?.quantity - item?.delivered)} />
                      {index === 0 && (
                        <TableData
                          td={toBanglaNumber(row.items.reduce(
                            (t, i) => t + (i.quantity - i.delivered),
                            0
                          ))}
                          rowSpan={row.items.length}
                        />
                      )}

                      <TableData
                        td={
                          item?.deliveryDate
                            ? moment(item.deliveryDate).format("DD-MM-YYYY")
                            : "---"
                        }
                        cls="hidden lg:table-cell"
                      />

                      {/* Actions only once per challan */}
                      {index === 0 ? (
                        <td
                          rowSpan={row.items.length}
                          className="border p-2 text-center align-middle"
                        >
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
                                  setInvoiceId(row?.serial);
                                  setItemIds(row.items.map((itm) => itm.id));
                                }}
                              >
                                <CustomDropDownMenuItem
                                  Icon={Calendar}
                                  title="তারিখ পরিবর্তন"
                                />
                              </DropdownMenuItem>

                              <DropdownMenuItem onClick={() => {
                                setIsOpen(true);
                                setInvoiceIDelivery(row?.serial);
                              }}>
                                <CustomDropDownMenuItem
                                  Icon={Truck}
                                  title="ডেলিভারি দিন"
                                />
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Link
                                  href={`/dashboard/customer/profile/${row.customer.customerCode}`}>
                                  <CustomDropDownMenuItem
                                    Icon={User}
                                    title="প্রোফাইলে যান"
                                  />
                                </Link>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      ) : null}
                    </tr>
                  ))
                )
              )}
            </tbody>
          </table>

        </div>
        <TablePagination
          page={meta?.page ?? 1}
          totalPages={meta?.totalPages ?? 1}
          dataLength={deliveries?.length}
          title="ডেলিভারি"
        />
      </div>
      {isOpen && (
        <NewDeliveryModal isOpen={isOpen} onClose={() => setIsOpen(false)} invoiceId={InvoiceIdDelivery!} />
      )}
      {openDateChangeModal && (
        <UpdateDeliveryDateModal
          isOpen={openDateChangeModal}
          onClose={() => setIsOpenDateChangeModal(false)}
          id={InvoiceId!}
          itemIds={itemIds}
          setItemIds={setItemIds}
        />
      )}
      {openDeliveryReport && (
        <DeliveryReportModal
          isOpen={openDeliveryReport}
          items={reportItems}
          onClose={() => setOpenDeliveryReport(false)}
          title="ডেলিভারি দিতে হবে"
        />
      )}

      <CommonPrint
        ref={printRef}
        title="payments"
      >
        <RemainingDeliveryPrint
          deliveries={deliveries}
          vataInformation={vata?.data}
        />
      </CommonPrint>
    </div>
  );
};

export default AllDeliveryPage;
