"use client";

import CustomNormalModal from "@/components/Reusable/CustomNormalModal";
import CustomStatus from "@/components/Reusable/CustomStatus";
import { useGetSingleInvoiceQuery } from "@/redux/features/invoice.features";
import { IChallanForDataShow, TCustomInvoiceModal } from "@/types/types";
import moment from "moment";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { FileText, ReceiptText } from "lucide-react";
import { formatBanglaDate } from "@/utils/formatBanglaDate";
import { TVataInformation } from "@/interface/vata";
import { toBanglaNumber } from "@/utils/toBanglaNumber";

// =====================================================
// Challan Copy Component
// =====================================================

interface ChallanCopyProps {
  invoice: IChallanForDataShow;
  copyType?: "customer" | "office";
  vataInformation: TVataInformation
}

const ChallanCopy = ({
  invoice,
  copyType = "customer",
  vataInformation
}: ChallanCopyProps) => {
  return (
    <div className="w-full bg-white text-black">
      {/* ================= Copy Title ================= */}
      <div className="mb-2 text-center print:hidden">
        <span className="inline-block rounded bg-gray-100 px-5 py-1 text-sm font-semibold text-gray-700">
          {copyType === "customer" ? "গ্রাহক কপি" : "অফিস কপি"}
        </span>
      </div>

      {/* ================= Invoice Body ================= */}
      <div className="border border-gray-300 bg-white px-4 py-4">
        {/* ================= Header ================= */}
        <div className="flex items-start justify-between border-b border-gray-300 pb-3">
          {/* Left Company */}
          <div className="flex items-start gap-3">
            {/* Logo */}
            <div className="flex h-[58px] w-[58px] shrink-0 items-center justify-center rounded-md bg-gray-100">
              <div className="relative flex flex-col items-center">
                <div className="h-2 w-7 rounded-t-full bg-red-500" />
                <div className="mt-[1px] h-2 w-9 bg-red-500" />
                <div className="mt-[1px] h-2 w-11 bg-red-500" />
                <div className="mt-[1px] h-2 w-14 rounded-b-full bg-red-500" />

                <div className="absolute top-[7px] h-[38px] w-2 bg-white/80" />
              </div>
            </div>

            <div>
              <h1 className="text-[21px] font-bold leading-none">
                {vataInformation?.nameBangla}
              </h1>

              <p className="mt-1 text-[11px] leading-[17px] text-gray-700">
                {vataInformation?.address}
                <br />
                {toBanglaNumber(vataInformation?.challansPhoneNumber)}
                <br />
                প্রোপ্রাইটরঃ  {vataInformation?.ownerName}
              </p>
            </div>
          </div>

          {/* Right Invoice */}
          <div className="text-right">
            <h2 className="text-[35px] font-bold leading-none">
              INVOICE
            </h2>

            <p className="mt-1 text-[11px]">
              {copyType === "customer"
                ? "গ্রাহক কপি"
                : "অফিস কপি"}
            </p>

            <p className="mt-3 text-[11px]">
              তারিখঃ{" "}
              <span className="font-semibold">
                {formatBanglaDate({ date: invoice?.challanDate })}
              </span>
            </p>
          </div>
        </div>

        {/* ================= Customer Info ================= */}
        <div className="flex justify-between border-b border-gray-300 py-1">
          {/* Left */}
          <div className="text-[12px] space-y-0.5">
            <p>
              <span className="font-medium">
                চালানের তারিখঃ
              </span>{" "}
              {formatBanglaDate({
                date: invoice?.challanDate,
                showTime: true,
              })}
            </p>
            {
              invoice?.deliverySeason && <p>
                <span className="">ডেলিভারি সিজন:</span> {invoice?.deliverySeason}
              </p>
            }
            <p>
              <span className="">ডেলিভারি তারিখ:</span>{" "}
              {formatBanglaDate({ date: invoice?.deliveryDate })}
            </p>
          </div>

          {/* Right */}
          <div className="border-r-[3px] border-black pr-3 text-right text-[12px] space-y-0.5">
            <p className="font-semibold">
              {invoice?.customer?.name}
            </p>
            <p>
              <span className="font-medium">
                কাস্টমার আইডিঃ
              </span>{" "}
              {toBanglaNumber(invoice?.customer?.customerCode)}
            </p>
            <p className="font-semibold">
              {invoice?.customer?.address}
            </p>

            <p>{toBanglaNumber(invoice?.customer?.phoneNumber)}</p>
          </div>
        </div>

        {/* ================= Product Table ================= */}
        <div className="mt-3 overflow-hidden rounded border border-gray-300">
          <table className="w-full border-collapse text-center text-[12px]">
            <thead className="bg-gray-100">
              <tr>
                <th className="border-r border-gray-300 px-2 py-2 font-medium">
                  চালান নং
                </th>

                <th className="border-r border-gray-300 px-2 py-2 font-medium">
                  শ্রেণি
                </th>

                <th className="border-r border-gray-300 px-2 py-2 font-medium">
                  পরিমাণ
                </th>

                <th className="border-r border-gray-300 px-2 py-2 font-medium">
                  দর
                </th>

                <th className="px-2 py-2 font-medium">
                  মূল্য
                </th>
              </tr>
            </thead>

            <tbody>
              {invoice?.items?.map((item) => (
                <tr key={item?.id}>
                  <td className="border-t border-r border-gray-300 px-2 py-2">
                    {toBanglaNumber(invoice?.serial)}
                  </td>

                  <td className="border-t border-r border-gray-300 px-2 py-2">
                    {item?.class}
                  </td>

                  <td className="border-t border-r border-gray-300 px-2 py-2">
                    {toBanglaNumber(item?.quantity)}
                  </td>

                  <td className="border-t border-r border-gray-300 px-2 py-2">
                    ৳ {toBanglaNumber(item?.rate)}
                  </td>

                  <td className="border-t border-gray-300 px-2 py-2">
                    ৳ {toBanglaNumber(item?.price)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ================= Bottom Section ================= */}
        <div className="mt-4 grid grid-cols-[1fr_300px] gap-5">
          {/* ================= Rules ================= */}
          <div className="pt-1">
            <h3 className="mb-2 text-[13px] font-semibold underline">
              বিশেষ দ্রষ্টব্যঃ
            </h3>

            <div className="space-y-1 text-[10px] leading-4 text-gray-600">
              <p>
                ১। চালান অথবা রশিদ ছাড়া কোনো লেনদেন করবেন না।
              </p>

              <p>
                ২। ২টি ডেলিভারি নেওয়ার কোনো অভিযোগ গ্রহণ করা হবে না।
              </p>

              <p>
                ৩। চালান করার ১০ দিনের মধ্যে ইট ডেলিভারি নিতে হবে।
              </p>
            </div>

            {/* Payment Date */}
            <div
              className={`mt-6 flex h-[40px] w-max px-10 items-center justify-center rounded-lg border text-center ${invoice?.due
                ? "border-red-500"
                : "border-green-500"
                }`}
            >
              <p
                className={`text-[12px] font-semibold ${invoice?.due
                  ? "text-red-500"
                  : "text-green-600"
                  }`}
              >
                পরিশোধের তারিখঃ{" "}
                {formatBanglaDate({
                  date: invoice?.duePaymentDate ||
                    invoice?.challanDate
                })}
              </p>
            </div>
          </div>

          {/* ================= Summary ================= */}
          <div className="rounded-lg bg-gray-100 px-3 py-3">
            <div className="space-y-2 text-[12px]">
              <div className="flex justify-between">
                <span>মোট মূল্য</span>

                <span className="font-medium">
                  ৳ {toBanglaNumber(invoice?.productPrice)}
                </span>
              </div>

              <div className="flex justify-between">
                <span>ছাড়</span>

                <span>
                  ৳ {toBanglaNumber(invoice?.discount || "00")}
                </span>
              </div>

              <div className="flex justify-between">
                <span>গাড়ি ভাড়া</span>

                <span>
                  ৳ {toBanglaNumber(invoice?.carRent || "00")}
                </span>
              </div>

              <div className="my-2 border-t border-gray-300" />

              <div className="flex justify-between font-medium">
                <span>সর্বমোট</span>

                <span>
                  ৳ {toBanglaNumber(invoice?.totalPrice || "00")}
                </span>
              </div>

              <div className="flex justify-between">
                <span>জমা</span>

                <span>
                  ৳ {toBanglaNumber(invoice?.cash || "00")}
                </span>
              </div>

              <div className="flex justify-between text-[18px] font-semibold">
                <span>বাকি</span>

                <span>
                  ৳ {toBanglaNumber(invoice?.due || "00")}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ================= Footer ================= */}
        <div className="mt-12">
          <div className="flex justify-between px-8 text-[11px]">
            <div className="w-[145px] border-t border-black pt-1 text-center">
              গ্রাহকের স্বাক্ষর
            </div>

            <div className="w-[145px] border-t border-black pt-1 text-center">
              ম্যানেজারের স্বাক্ষর
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// =====================================================
// Main Modal
// =====================================================

const ChalanPrintModal = ({
  isOpen,
  onClose,
  invoiceId,
  setInvoiceId, vataInformation
}: TCustomInvoiceModal) => {
  const {
    data,
    isLoading,
    isError,
  } = useGetSingleInvoiceQuery(invoiceId, {
    refetchOnMountOrArgChange: true,
  });

  const invoice: IChallanForDataShow =
    data?.data || ({} as IChallanForDataShow);

  // =====================================================
  // Close
  // =====================================================

  const handleClose = () => {
    setInvoiceId(0);
    onClose();
  };

  // =====================================================
  // Customer Print
  // =====================================================

  const customerPrintRef =
    useRef<HTMLDivElement>(null);

  const handleCustomerPrint = useReactToPrint({
    contentRef: customerPrintRef,
    documentTitle: "Customer-Challan",
  });

  // =====================================================
  // Customer + Office Print
  // =====================================================

  const bothPrintRef =
    useRef<HTMLDivElement>(null);

  const handleBothPrint = useReactToPrint({
    contentRef: bothPrintRef,
    documentTitle: "Customer-Office-Challan",
  });

  return (
    <CustomNormalModal
      isOpen={isOpen}
      onClose={handleClose}
      width="xxl"
    >
      {isLoading ? (
        <CustomStatus type="loading" />
      ) : isError ? (
        <CustomStatus type="error" />
      ) : !invoice ? (
        <CustomStatus type="empty" />
      ) : (
        <div className="space-y-2">

          {/* =================================================
              Print Options
          ================================================= */}

          <div className="rounded-xl bg-gray-100 py-2">
            <p className="mb-3 text-center text-[13px] font-medium text-gray-600">
              প্রিন্ট অপশন সিলেক্ট করুন
            </p>

            <div className="flex flex-wrap justify-center gap-2">

              {/* Customer A4 */}
              <button
                onClick={handleCustomerPrint}
                className="flex cursor-pointer items-center gap-2 rounded-lg bg-emerald-600 px-4 py-1.5 text-[13px] font-medium text-white shadow-sm transition hover:bg-emerald-700"
              >
                <FileText size={16} />

                A4 (কাস্টমার)
              </button>

              {/* Customer + Office A4 */}
              <button
                onClick={handleBothPrint}
                className="flex cursor-pointer items-center gap-2 rounded-lg bg-emerald-600 px-4 py-1.5 text-[13px] font-medium text-white shadow-sm transition hover:bg-emerald-700"
              >
                <FileText size={16} />

                A4 (কাস্টমার+অফিস)
              </button>

              {/* POS Customer */}
              <button
                className="flex cursor-pointer items-center gap-2 rounded-lg bg-orange-500 px-4 py-1.5 text-[13px] font-medium text-white shadow-sm transition hover:bg-orange-600"
              >
                <ReceiptText size={16} />

                POS (কাস্টমার)
              </button>

              {/* POS Customer + Office */}
              <button
                className="flex cursor-pointer items-center gap-2 rounded-lg bg-orange-600 px-4 py-1.5 text-[13px] font-medium text-white shadow-sm transition hover:bg-orange-700"
              >
                <ReceiptText size={16} />

                POS (কাস্টমার+অফিস)
              </button>
            </div>
          </div>

          {/* =================================================
              Screen Preview
          ================================================= */}

          <div>
            <div className="mx-auto max-w-[760px] bg-white shadow">
              <ChallanCopy
                vataInformation={vataInformation!}
                invoice={invoice}
                copyType="customer"
              />
            </div>
          </div>

          {/* =================================================
              Single Customer Print
          ================================================= */}

          <div
            ref={customerPrintRef}
            className="print-single-copy absolute -left-[99999px] top-0 w-[794px]"
          >
            <ChallanCopy
              vataInformation={vataInformation!}
              invoice={invoice}
              copyType="customer"
            />
          </div>

          {/* =================================================
              Customer + Office Print
              UPAR-NICHE
          ================================================= */}

          <div
            ref={bothPrintRef}
            className="print-both-copy absolute -left-[99999px] top-0 w-[794px]"
          >
            <div className="flex flex-col gap-6">

              {/* ================= Customer Copy ================= */}

              <div>
                <div className="mb-2 text-center">
                  <p className="text-sm font-bold">
                    গ্রাহক কপি
                  </p>
                </div>

                <ChallanCopy
                  vataInformation={vataInformation!}
                  invoice={invoice}
                  copyType="customer"
                />
              </div>

              {/* ================= Office Copy ================= */}

              <div>
                <div className="mb-2 text-center">
                  <p className="text-sm font-bold">
                    অফিস কপি
                  </p>
                </div>

                <ChallanCopy
                  vataInformation={vataInformation!}
                  invoice={invoice}
                  copyType="office"
                />
              </div>

            </div>
          </div>

          {/* =================================================
              Print CSS
          ================================================= */}

          <style jsx global>{`
            @media print {

              @page {
                size: A4 portrait;
                margin: 8mm;
              }

              body {
                margin: 0 !important;
                padding: 0 !important;
                background: white !important;
              }

              body * {
                visibility: hidden;
              }

              /* =================================================
                 SINGLE CUSTOMER COPY
              ================================================= */

              .print-single-copy,
              .print-single-copy * {
                visibility: visible;
              }

              .print-single-copy {
                position: absolute !important;
                left: 0 !important;
                top: 0 !important;
                width: 100% !important;
              }

              /* =================================================
                 CUSTOMER + OFFICE COPY
              ================================================= */

              .print-both-copy,
              .print-both-copy * {
                visibility: visible;
              }

              .print-both-copy {
                position: absolute !important;
                left: 0 !important;
                top: 0 !important;
                width: 100% !important;
              }

              /*
                দুইটা copy পাশাপাশি নয়,
                উপর-নিচে থাকবে
              */

              .print-both-copy > div {
                display: flex !important;
                flex-direction: column !important;
                gap: 5mm !important;
                width: 100% !important;
              }

              /* =================================================
                 Both Copy Size Adjustment
              ================================================= */

              .print-both-copy .text-\\[35px\\] {
                font-size: 22px !important;
              }

              .print-both-copy .text-\\[21px\\] {
                font-size: 15px !important;
              }

              .print-both-copy .text-\\[18px\\] {
                font-size: 13px !important;
              }

              .print-both-copy .text-\\[12px\\] {
                font-size: 8px !important;
              }

              .print-both-copy .text-\\[11px\\] {
                font-size: 7px !important;
              }

              .print-both-copy .text-\\[10px\\] {
                font-size: 6px !important;
              }

              /* =================================================
                 Bottom Grid
              ================================================= */

              .print-both-copy .grid-cols-\\[1fr_300px\\] {
                grid-template-columns: 1fr 145px !important;
              }

              /* =================================================
                 Padding
              ================================================= */

              .print-both-copy .px-4 {
                padding-left: 8px !important;
                padding-right: 8px !important;
              }

              .print-both-copy .py-4 {
                padding-top: 8px !important;
                padding-bottom: 8px !important;
              }

              /* =================================================
                 Logo
              ================================================= */

              .print-both-copy .h-\\[58px\\] {
                height: 38px !important;
              }

              .print-both-copy .w-\\[58px\\] {
                width: 38px !important;
              }

              /* =================================================
                 Footer
              ================================================= */

              .print-both-copy .mt-12 {
                margin-top: 20px !important;
              }

              /* =================================================
                 Rules
              ================================================= */

              .print-both-copy .mt-6 {
                margin-top: 10px !important;
              }

              /* =================================================
                 Table
              ================================================= */

              .print-both-copy table {
                font-size: 8px !important;
              }

              .print-both-copy th,
              .print-both-copy td {
                padding-top: 4px !important;
                padding-bottom: 4px !important;
                padding-left: 4px !important;
                padding-right: 4px !important;
              }

              /* =================================================
                 Border
              ================================================= */

              .print-both-copy .border {
                border-color: #d1d5db !important;
              }
            }
          `}</style>
        </div>
      )}
    </CustomNormalModal>
  );
};

export default ChalanPrintModal;