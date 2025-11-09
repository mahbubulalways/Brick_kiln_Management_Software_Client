"use client";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, Pencil, Printer, Trash, User } from "lucide-react";
import CustomNewButton from "@/components/Reusable/CustomNewButton";
import { DatePicker } from "@/components/Others/DatePicker";
import TableHead from "@/components/Reusable/TableHead";
import NewDueCollectionModal from "@/components/Dashboard/Modals/NewDueCollectionModal";
import TableData from "@/components/Reusable/TableData";
import CustomDropDownMenuItem from "@/components/Reusable/CustomDropDownMenuItem";
import TableFooter from "@/components/Reusable/TableFooter";
import PrintDueCollectionModal from "@/components/Dashboard/Modals/PrintDueCollectionModal";
import UpdateDueCollection from "@/components/Dashboard/Modals/UpdateDueCollectionModal";
import ThermalDueCollectionPrintModal from "@/components/Dashboard/Modals/ThermalDueCollectionPrintModal";
import CustomButtonFixed from "@/components/Reusable/CustomButtonFixed";
import { BsPencilSquare } from "react-icons/bs";

interface PaymentRow {
  id: number;
  creditor: string;
  description: string;
  quantity: number;
  totalBill: number;
  debit: number;
  credit: number;
  balance: number;
}

const data: PaymentRow[] = [
  {
    id: 29,
    creditor: "harun",
    description: "bank",
    quantity: 0,
    totalBill: 0,
    debit: 0,
    credit: 5000,
    balance: -5000,
  },
  {
    id: 30,
    creditor: "sona",
    description: "wood",
    quantity: 50,
    totalBill: 5000,
    debit: 0,
    credit: 0,
    balance: 5000,
  },
  {
    id: 31,
    creditor: "saiful",
    description: "nn",
    quantity: 0,
    totalBill: 0,
    debit: 5000,
    credit: 5000,
    balance: 0,
  },
  {
    id: 32,
    creditor: "sona",
    description: "wood",
    quantity: 0,
    totalBill: 0,
    debit: 0,
    credit: 5000,
    balance: 0,
  },
  {
    id: 33,
    creditor: "harun",
    description: "mia",
    quantity: 0,
    totalBill: 0,
    debit: 5000,
    credit: 5000,
    balance: 0,
  },
  {
    id: 34,
    creditor: "harun",
    description: "mia",
    quantity: 0,
    totalBill: 0,
    debit: 1200,
    credit: 1200,
    balance: 0,
  },
];

const DueCollectionPage = () => {
  const [rowsPerPage, setRowsPerPage] = useState(30);
  const [currentPage, setCurrentPage] = useState(1);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isOpenPrintModal, setOpenPrintModal] = useState<boolean>(false);
  const [isOpenThermalPrintModal, setOpenThermalPrintModal] =
    useState<boolean>(false);
  const [isOpenUpdateModal, setOpenUpdateModal] = useState<boolean>(false);
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  const totalCredit = data.reduce((sum, r) => sum + r.credit, 0);

  const toggleRow = (id: number) => {
    setExpandedRow((prev) => (prev === id ? null : id));
  };
  return (
    <div className="bg-white p-2 rounded-md border border-gray-200 shadow-sm">
      <span className="bg-green-100 text-center text-green-800 px-3 py-1 rounded text-sm border border-green-300 font-medium lg:hidden block">
        মোট জমাঃ: {totalCredit.toLocaleString()} টাকা
      </span>
      <div className="flex justify-between items-center pt-2 lg:pt-0 gap-5">
        <div className="flex items-center gap-2 w-auto lg:w-full">
          <button onClick={() => setIsOpen(true)}>
            <CustomNewButton title="নতুন বাকি জমা" />
          </button>
          <span className="bg-green-100 text-green-800 px-3 py-1 rounded text-sm border border-green-300 font-medium hidden lg:block">
            মোট জমাঃ: {totalCredit.toLocaleString()} টাকা
          </span>
        </div>

        <div>
          <DatePicker />
        </div>
      </div>
      <div className="overflow-x-auto pt-3">
        <table className="min-w-full text-sm text-center border-t">
          <thead className="bg-[#039A63] text-white">
            <tr>
              <TableHead th="নং" cls="hidden lg:table-cell" />
              <TableHead th="নাম" />
              <TableHead th="ঠিকানা" />
              <TableHead th="বাকি ছিল" cls="hidden lg:table-cell" />
              <TableHead th="জমা" />
              <TableHead th="বাকি রইল" />
              <TableHead th="নতুন তারিখ" cls="hidden lg:table-cell" />
              <TableHead th="সিজন" cls="hidden lg:table-cell" />
              <TableHead th="বাটন" cls="hidden lg:table-cell" />
            </tr>
          </thead>

          <tbody>
            {data.map((row) => (
              <React.Fragment key={row.id}>
                <tr
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => toggleRow(row.id)}
                >
                  <TableData td={row.id} cls="hidden lg:table-cell" />
                  <TableData td={row.creditor} />
                  <TableData td={row.description} />
                  <TableData td={row.quantity} cls="hidden lg:table-cell" />
                  <TableData td={row.quantity} />
                  <TableData td={row.quantity} />
                  <TableData td={row.quantity} cls="hidden lg:table-cell" />
                  <TableData td={row.quantity} cls="hidden lg:table-cell" />

                  <td className="border p-2 hidden lg:table-cell">
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
                          onClick={() => setOpenUpdateModal(true)}
                        >
                          <CustomDropDownMenuItem
                            Icon={Pencil}
                            title="আপডেট জমা"
                          />
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => setOpenPrintModal(true)}
                        >
                          <CustomDropDownMenuItem
                            Icon={Printer}
                            title="প্রিন্ট করুন"
                          />
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <CustomDropDownMenuItem
                            Icon={User}
                            title="প্রোফাইল"
                          />
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <CustomDropDownMenuItem Icon={Trash} title="ডিলেট" />
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>

                {expandedRow === row.id && (
                  <tr className="lg:hidden">
                    <td
                      colSpan={100}
                      className="border bg-gray-50 text-left p-3 "
                    >
                      <div className="grid grid-cols-2 ">
                        <div className="grid grid-cols-2 gap-1 text-sm text-gray-500">
                          <p className="font-semibold text-xs">কা.আইডি</p>
                          <p> {row.id}</p>
                          <p className="font-semibold text-xs">নাম </p>
                          <p>{row.creditor}</p>
                          <p className="font-semibold text-xs">ঠিকানা</p>
                          <p> {row.description}</p>
                          <p className="font-semibold text-xs">ফোন</p>
                          <p> {row.description}</p>
                          <p className="font-semibold text-xs">জমা তারিখ</p>
                          <p>{row.description}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-1 text-sm ">
                          <p className="font-semibold text-xs">মোট বাকি</p>
                          <p> {row.id}</p>
                          <p className="font-semibold text-xs text-green-600">
                            জমা{" "}
                          </p>
                          <p className="text-green-600">{row.creditor}</p>
                          <p className="font-semibold text-xs text-orange-600">
                            বাকি রইল
                          </p>
                          <p className="text-orange-600">{row.description}</p>
                          <p className="font-semibold text-xs text-gray-500">
                            নতুন তারিখ
                          </p>
                          <p className="text-gray-500">{row.description}</p>
                          <p className="font-semibold text-xs text-gray-500">
                            সিজন
                          </p>
                          <p className="text-gray-500">{row.description}</p>
                        </div>
                      </div>

                      {/* Buttons */}
                      <div className="flex items-center justify-between pt-3">
                        <button onClick={() => setOpenUpdateModal(true)}>
                          <CustomButtonFixed
                            title="এডিট"
                            cls="bg-green-200 text-green-700 px-2"
                            Icon={BsPencilSquare}
                          />
                        </button>
                        <button onClick={() => setOpenThermalPrintModal(true)}>
                          <CustomButtonFixed
                            title="প্রিন্ট"
                            cls="bg-green-200 text-green-700 px-2"
                            Icon={Printer}
                          />
                        </button>
                        <button>
                          <CustomButtonFixed
                            title="প্রোফাইল"
                            cls="bg-orange-200 text-orange-700 px-2"
                            Icon={User}
                          />
                        </button>
                        <button>
                          <CustomButtonFixed
                            title=""
                            cls="bg-red-200 text-red-700 px-1"
                            Icon={Trash}
                          />
                        </button>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
      <TableFooter
        currentPage={currentPage}
        filtered={[]}
        rowsPerPage={rowsPerPage}
        setCurrentPage={setCurrentPage}
        setRowsPerPage={setRowsPerPage}
        title={"জমা"}
      />

      {isOpen && (
        <NewDueCollectionModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        />
      )}
      {isOpenPrintModal && (
        <PrintDueCollectionModal
          isOpen={isOpenPrintModal}
          onClose={() => setOpenPrintModal(false)}
        />
      )}
      {isOpenUpdateModal && (
        <UpdateDueCollection
          isOpen={isOpenUpdateModal}
          onClose={() => setOpenUpdateModal(false)}
        />
      )}
      {isOpenThermalPrintModal && (
        <ThermalDueCollectionPrintModal
          isOpen={isOpenThermalPrintModal}
          onClose={() => setOpenThermalPrintModal(false)}
        />
      )}
    </div>
  );
};

export default DueCollectionPage;
