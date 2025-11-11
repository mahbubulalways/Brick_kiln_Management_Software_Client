"use client";

import ChalanDetailsModal from "@/components/Dashboard/Modals/ChalanDetailsModal";
import NewChalanModal from "@/components/Dashboard/Modals/NewChalanModal";
import SellingModal from "@/components/Dashboard/Modals/SellingModal";
import UpdateChalanModal from "@/components/Dashboard/Modals/UpdateChalanModal";
import ChalanPrintModal from "@/components/Dashboard/PrintModal/ChalanPrint/ChalanPrintModal";
import { DatePicker } from "@/components/Others/DatePicker";
import CustomDropDownMenuItem from "@/components/Reusable/CustomDropDownMenuItem";
import CustomNewButton from "@/components/Reusable/CustomNewButton";
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
import { useGetAllInvoicesQuery } from "@/redux/features/invoice.features";
import {
  MoreVertical,
  Printer,
  Truck,
  Notebook,
  User,
  Trash,
} from "lucide-react";
import { useState } from "react";
import { BsPencilSquare } from "react-icons/bs";

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
export interface ICustomer {
  id: number;
  name: string;
  phoneNumber: string;
  address: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

export interface IChallanItem {
  id: number;
  challanId: number;
  class: string;
  quantity: number;
  rate: number;
  price: number;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

export interface IChallan {
  id: number;
  serial: number;
  chalanType: string;
  challanDate: string; // ISO date string
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  createdBy: string;
  customerId: number;
  customer: ICustomer;
  items: IChallanItem[];
  productPrice: number;
  discount: number;
  totalPrice: number;
  cash: number;
  due: number;
  duePaymentDate: string; // ISO date string
  deliveryDate: string; // ISO date string
  note?: string;
  carRent: number;
}

const SalesTable = () => {
  const [search, setSearch] = useState("");
  const [date, setDate] = useState<Date>(new Date());
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [openReportModal, setOpenReportModal] = useState<boolean>(false);
  const [openPrintModal, setOpenPrintModal] = useState<boolean>(false);
  const [openUpdateModal, setOpenUpdateModal] = useState<boolean>(false);
  const [invoiceId, setInvoiceId] = useState<number>();
  const [openChalanDetailsModal, setOpenChalanDetailsModal] =
    useState<boolean>(false);

  // FETCH ALL INVOICES
  const { isLoading: fetchInvoiceLoadig, data: invoices } =
    useGetAllInvoicesQuery(undefined);

  const totalInvoices = invoices?.data || [];
  const filtered = totalInvoices.filter((row: IChallan) =>
    row?.customer?.name?.toLowerCase()?.includes(search?.toLowerCase())
  );

  // const totalPages = Math.ceil(filtered.length / rowsPerPage);

  const paginatedData = filtered.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );
  return (
    <div className="bg-white rounded-md shadow border border-gray-200 overflow-hidden">
      <div className="flex justify-between items-center p-3 border-b bg-gray-50 gap-5">
        <div className="flex items-center gap-2 ">
          <button onClick={() => setIsOpen(true)}>
            <CustomNewButton title="নতুন চালান" />
          </button>
          <div className="flex-1">
            <CustomSearchInput search={search} setSearch={setSearch} />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <DatePicker date={date} setDate={setDate} />
          <button
            onClick={() => setOpenReportModal(true)}
            className="cursor-pointer"
          >
            <CustomReportButton />
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border-t">
          <thead>
            <tr className="bg-[#039A63] text-white text-center">
              <TableHead th={"#"} />
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
              <TableHead th={"বাটন"} />
            </tr>
          </thead>
          <tbody className="text-center">
            {paginatedData?.map((row: IChallan, idx: number) =>
              row.items.length > 1 ? (
                row.items.map((item: IChallanItem, index: number) => (
                  <tr
                    key={`${row.id}-${item.id}`}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    {index === 0 && (
                      <>
                        <TableData td={index + 1} rowSpan={row.items.length} />
                        <TableData
                          td={row?.customer?.name}
                          rowSpan={row.items.length}
                        />
                        <TableData
                          td={row?.customer?.address}
                          cls="hidden lg:table-cell"
                          rowSpan={row.items.length}
                        />
                      </>
                    )}

                    <TableData td={item.class} />
                    <TableData td={item.quantity.toLocaleString()} />
                    <TableData td={item.rate} cls="hidden lg:table-cell" />
                    <TableData
                      td={`৳ ${item.price.toLocaleString()}`}
                      cls="hidden lg:table-cell"
                    />

                    {index === 0 && (
                      <>
                        <TableData
                          td={`৳ ${row.productPrice}`}
                          cls="text-orange-500 hidden lg:table-cell"
                          rowSpan={row.items.length}
                        />
                        <TableData
                          td={`৳ ${row.discount}`}
                          cls="text-orange-500 hidden lg:table-cell"
                          rowSpan={row.items.length}
                        />
                        <TableData
                          td={`৳ ${row.carRent}`}
                          cls="text-blue-600 hidden lg:table-cell"
                          rowSpan={row.items.length}
                        />
                        <TableData
                          td={`৳ ${row.totalPrice}`}
                          cls="text-green-600 font-medium"
                          rowSpan={row.items.length}
                        />

                        <TableData
                          td={`৳ ${row.cash}`}
                          cls="text-green-600 font-medium hidden lg:table-cell"
                          rowSpan={row.items.length}
                        />
                        <TableData
                          td={`৳ ${row.due}`}
                          cls={`border p-2 ${
                            row.due > 0
                              ? "text-red-500 font-medium"
                              : "text-green-600"
                          } hidden lg:table-cell`}
                          rowSpan={row.items.length}
                        />
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
                                  setOpenUpdateModal(true);
                                  setInvoiceId(row?.id);
                                }}
                              >
                                <CustomDropDownMenuItem
                                  Icon={BsPencilSquare}
                                  title="আপডেট করুন"
                                />
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => setOpenPrintModal(true)}
                              >
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
                              <DropdownMenuItem
                                onClick={() => setOpenChalanDetailsModal(true)}
                              >
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
                              <DropdownMenuItem>
                                <CustomDropDownMenuItem
                                  Icon={Trash}
                                  title="ডিলিট করুন"
                                />
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </>
                    )}
                  </tr>
                ))
              ) : (
                <tr
                  key={row?.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <TableData td={idx + 1} />
                  <TableData td={row?.customer?.name} />
                  <TableData
                    td={row?.customer?.address}
                    cls="hidden lg:table-cell"
                  />
                  <TableData td={row.items[0]?.class} />
                  <TableData td={row.items[0]?.quantity.toLocaleString()} />
                  <TableData
                    td={row.items[0]?.rate}
                    cls="hidden lg:table-cell"
                  />
                  <TableData
                    td={`৳ ${row.items[0]?.price.toLocaleString()}`}
                    cls="hidden lg:table-cell"
                  />

                  <TableData
                    td={`৳ ${row?.productPrice}`}
                    cls="text-orange-500 hidden lg:table-cell"
                  />
                  <TableData
                    td={`৳ ${row?.discount}`}
                    cls="text-orange-500 hidden lg:table-cell"
                  />
                  <TableData
                    td={`৳ ${row?.carRent}`}
                    cls="text-blue-600 hidden lg:table-cell"
                  />
                  <TableData
                    td={`৳ ${row.totalPrice}`}
                    cls="text-green-600 font-medium"
                  />

                  <TableData
                    td={`৳ ${row?.cash}`}
                    cls="text-green-600 font-medium hidden lg:table-cell"
                  />
                  <TableData
                    td={`৳ ${row?.due}`}
                    cls={`border p-2 ${
                      row.due > 0
                        ? "text-red-500 font-medium"
                        : "text-green-600"
                    } hidden lg:table-cell`}
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
                            setOpenUpdateModal(true);
                            setInvoiceId(row?.id);
                          }}
                        >
                          <CustomDropDownMenuItem
                            Icon={BsPencilSquare}
                            title="আপডেট করুন"
                          />
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => setOpenPrintModal(true)}
                        >
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
                        <DropdownMenuItem
                          onClick={() => setOpenChalanDetailsModal(true)}
                        >
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
                        <DropdownMenuItem>
                          <CustomDropDownMenuItem
                            Icon={Trash}
                            title="ডিলিট করুন"
                          />
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <TableFooter
        currentPage={currentPage}
        length={filtered?.length}
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
      {openUpdateModal && (
        <UpdateChalanModal
          isOpen={openUpdateModal}
          onClose={() => setOpenUpdateModal(false)}
          invoiceId={invoiceId!}
          setInvoiceId={setInvoiceId!}
        />
      )}
      {openPrintModal && (
        <ChalanPrintModal
          isOpen={openPrintModal}
          onClose={() => setOpenPrintModal(false)}
        />
      )}
      {openChalanDetailsModal && (
        <ChalanDetailsModal
          isOpen={openChalanDetailsModal}
          onClose={() => setOpenChalanDetailsModal(false)}
        />
      )}
    </div>
  );
};

export default SalesTable;
