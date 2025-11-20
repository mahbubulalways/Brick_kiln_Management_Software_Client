"use client";

import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Calendar, MoreVertical, Truck, User } from "lucide-react";
import CustomNewButton from "@/components/Reusable/CustomNewButton";
import { DatePicker } from "@/components/Others/DatePicker";
import CustomReportButton from "@/components/Reusable/CustomReportButton";
import TableHead from "@/components/Reusable/TableHead";
import NewDeliveryModal from "@/components/Dashboard/Modals/NewDeliveryModal";
import { useGetTodaysDeliveryQuery } from "@/redux/features/delivery.features";
import moment from "moment";
import TableData from "@/components/Reusable/TableData";
import CustomLoader from "@/components/Reusable/CustomLoader";
import CustomDropDownMenuItem from "@/components/Reusable/CustomDropDownMenuItem";
import TableFooter from "@/components/Reusable/TableFooter";
import DeliveryReportModal, {
  TItems,
} from "@/components/Dashboard/Modals/ReportModal/DeliveryReportModal";
import { groupAndSumByClass } from "@/utils/getDeliveryReportData";
import DeliveryPrintModal from "@/components/Dashboard/PrintModal/DeliveryPrint/DeliveryPrintModal";
export type TInvoiceCustomer = {
  id: number;
  name: string;
  phoneNumber: string;
  address: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
};

export type TDeliveryInvoice = {
  id: number;
  customer: TInvoiceCustomer;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
};

export type TDeliveryShow = {
  id: number;
  carNo: string;
  class: string;
  deliveryDate: string;
  nextDeliveryDate: string;
  deliveryNo: number;
  quantity: number;
  deliveryReceived: number;
  deliveryRemaining: number;
  driverName: string;
  driverPhoneNumber: string;
  invoiceId: number;
  invoice: TDeliveryInvoice;
  isDeleted: boolean;
  createdAt: string;
};

const TodaysDeliveryPage = () => {
  const [rowsPerPage, setRowsPerPage] = useState(30);
  const [currentPage, setCurrentPage] = useState(1);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [openDeliveryReport, setOpenDeliveryReport] = useState<boolean>(false);
  const [openPrintModal, setOpenPrintModal] = useState<boolean>(false);
  const [deliveryId, setDeliveryId] = useState<number>(0);
  const isoDate = date ? date.toISOString() : "";

  const { data, isLoading } = useGetTodaysDeliveryQuery(isoDate, {
    refetchOnMountOrArgChange: true,
  });

  const deliveries = data?.data || [];

  const paginatedData = deliveries?.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const items = deliveries?.map((delivery: TDeliveryShow) => {
    return {
      class: delivery?.class,
      delivered: delivery?.deliveryReceived,
    };
  });

  const result: TItems[] = groupAndSumByClass(items);
  return (
    <div className="bg-white p-2 rounded-md border border-gray-200 shadow-sm">
      <div className="flex justify-between items-center pt-2 lg:pt-0 gap-5">
        <button onClick={() => setIsOpen(!isOpen)}>
          <CustomNewButton title="নতুন ডেলিভারি" />
        </button>

        <div className="flex items-center gap-2 ">
          <DatePicker setDate={setDate} date={date} />
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
              <TableHead th={"#"} />
              <TableHead th={"চালান নং"} />
              <TableHead th={"কাস্টমার"} />
              <TableHead th={"ঠিকানা"} cls="hidden lg:table-cell" />
              <TableHead th={"শ্রেণি"} />
              <TableHead th={"ক্রয়"} cls="hidden lg:table-cell" />
              <TableHead th={"ডেলিভারি"} />
              <TableHead th={"ডে.বাকি"} cls="hidden lg:table-cell" />
              <TableHead th={"ড্রাইভার"} cls="hidden lg:table-cell" />
              <TableHead th={"মোট ডেলিভারি"} />
              <TableHead th={"তারিখ ও সময়"} cls="hidden lg:table-cell" />
              <TableHead th={"বাটন"} />
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={11}>
                  <CustomLoader cls="h-[30vh]" />
                </td>
              </tr>
            ) : !paginatedData?.length ? (
              <tr>
                <td colSpan={13} className="py-8 text-gray-600">
                  {data?.message}
                </td>
              </tr>
            ) : (
              paginatedData?.map((row: TDeliveryShow) => (
                <tr key={row.id} className="hover:bg-gray-50">
                  <TableData td={row?.id} />
                  <TableData td={row?.invoiceId} />
                  <TableData td={row?.invoice?.customer?.name} />
                  <TableData
                    td={row?.invoice?.customer?.address}
                    cls="hidden lg:table-cell"
                  />
                  <TableData td={row?.class} />
                  <TableData td={row?.quantity} cls="hidden lg:table-cell" />
                  <TableData td={row?.deliveryReceived} />
                  <TableData
                    td={row?.deliveryRemaining}
                    cls="hidden lg:table-cell"
                  />
                  <TableData td={row?.driverName} cls="hidden lg:table-cell" />
                  <TableData td={row?.deliveryReceived} />
                  <TableData
                    cls="hidden lg:table-cell"
                    td={`${moment(row?.deliveryDate).format(
                      "DD/MM/YYYY"
                    )} ${moment(row?.deliveryDate).format("LT")}`}
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
                          onClick={() => {
                            setOpenPrintModal(true);
                            setDeliveryId(row?.id);
                          }}
                        >
                          <CustomDropDownMenuItem
                            Icon={Calendar}
                            title="প্রিন্ট ডেলিভারি"
                          />
                        </DropdownMenuItem>

                        <DropdownMenuItem>
                          <CustomDropDownMenuItem
                            Icon={Truck}
                            title="ডেলিভারি বিস্তারিত"
                          />
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <CustomDropDownMenuItem
                            Icon={User}
                            title="প্রোফাইলে যান"
                          />
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <CustomDropDownMenuItem
                            Icon={User}
                            title="ডিলিট করুন"
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
      </div>

      <TableFooter
        currentPage={currentPage}
        length={deliveries?.length}
        rowsPerPage={rowsPerPage}
        setCurrentPage={setCurrentPage}
        setRowsPerPage={setRowsPerPage}
        title=""
      />
      {isOpen && (
        <NewDeliveryModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
      )}

      {openDeliveryReport && (
        <DeliveryReportModal
          isOpen={openDeliveryReport}
          items={result}
          onClose={() => setOpenDeliveryReport(false)}
          title="আজকের ডেলিভারি রিপোর্ট"
        />
      )}

      {openPrintModal && (
        <DeliveryPrintModal
          isOpen={openPrintModal}
          onClose={() => setOpenPrintModal(false)}
          deliveryId={deliveryId}
          setDeliveryId={setDeliveryId}
        />
      )}
    </div>
  );
};

export default TodaysDeliveryPage;
