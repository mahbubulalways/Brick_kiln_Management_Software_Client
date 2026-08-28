"use client";

import CustomNormalModal from "@/components/Reusable/CustomNormalModal";
import CustomStatus from "@/components/Reusable/CustomStatus";
import { TDeliveryResponse } from "@/interface/delivery";
import { TVataInformation } from "@/interface/vata";
import { useGetSingleDeliveryQuery } from "@/redux/features/delivery.features";
import { useGetVataInfoQuery } from "@/redux/features/vata.features";
import { formatBanglaDate } from "@/utils/formatBanglaDate";
import { toBanglaNumber } from "@/utils/toBanglaNumber";
import { FileText, ReceiptText } from "lucide-react";
import { Dispatch, SetStateAction, useRef } from "react";
import { useReactToPrint } from "react-to-print";

export type TDeliveryPrintModal = {
  isOpen: boolean;
  onClose: () => void;
  setDeliveryId: Dispatch<SetStateAction<number | undefined>>;
  deliveryId: number | undefined;
};

interface DeliveryCopyProps {
  invoice: TDeliveryResponse;
  copyType?: "customer" | "office";
  vataInformation: TVataInformation;
  isPOS?: boolean;
}

const DeliveryCopy = ({
  invoice,
  copyType = "customer",
  vataInformation,
  isPOS = false,
}: DeliveryCopyProps) => {
  return (
    <div
      className={`w-full bg-white text-black ${
        isPOS ? "pos-delivery-copy" : ""
      }`}
    >
      {!isPOS && (
        <div className="mb-2 text-center print:hidden">
          <span className="inline-block rounded bg-gray-100 px-5 py-1 text-sm font-semibold text-gray-700">
            {copyType === "customer" ? "গ্রাহক কপি" : "অফিস কপি"}
          </span>
        </div>
      )}

      <div
        className={`border border-gray-300 bg-white ${
          isPOS ? "px-3 py-3" : "px-4 py-4"
        }`}
      >
        <div
          className={`flex items-start justify-between border-b border-gray-300 pb-3 ${
            isPOS ? "pb-2" : ""
          }`}
        >
          <div>
            <h1
              className={`font-bold leading-none ${
                isPOS ? "text-[16px]" : "text-[21px]"
              }`}
            >
              {vataInformation?.nameBangla || "ডেমো ব্রিকস"}
            </h1>

            <p
              className={`mt-1 leading-[17px] ${
                isPOS ? "text-[8px] leading-[12px]" : "text-[11px]"
              }`}
            >
              {vataInformation?.address || "-"}
              <br />
              {toBanglaNumber(
                vataInformation?.challansPhoneNumber || ""
              )}
              <br />
              প্রোপ্রাইটরঃ {vataInformation?.ownerName || "-"}
            </p>
          </div>

          <div className="text-right">
            <h2
              className={`font-bold leading-none ${
                isPOS ? "text-[22px]" : "text-[35px]"
              }`}
            >
              DELIVERY
            </h2>

            <p
              className={`mt-1 ${
                isPOS ? "text-[8px]" : "text-[11px]"
              }`}
            >
              {copyType === "customer"
                ? "গ্রাহক কপি"
                : "অফিস কপি"}
            </p>

            <p
              className={`mt-2 ${
                isPOS ? "text-[8px]" : "text-[11px]"
              }`}
            >
              তারিখঃ{" "}
              <span className="font-semibold">
                {formatBanglaDate({
                  date: invoice?.deliveryDate,
                })}
              </span>
            </p>
          </div>
        </div>

        <div
          className={`flex justify-between border-b border-gray-300 ${
            isPOS ? "py-2" : "py-3"
          }`}
        >
          <div
            className={`leading-6 ${
              isPOS ? "text-[8px] leading-[14px]" : "text-[12px]"
            }`}
          >
            <p>
              কাস্টমার আইডিঃ{" "}
              {toBanglaNumber(
                invoice?.invoice?.customer?.customerCode || ""
              )}
            </p>

            <p>
              ডেলিভারি নংঃ{" "}
              {toBanglaNumber(invoice?.deliveryNo || 0)}
            </p>

            <p>
              ডেলিভারি তারিখঃ{" "}
              {formatBanglaDate({
                date: invoice?.deliveryDate,
                showTime: true,
              })}
            </p>

            <p>
              ইস্যু করেছেনঃ{" "}
              {invoice?.deliveryBy?.name || "Demo"}
            </p>
          </div>

          <div
            className={`border-r-[3px] border-black pr-3 text-right ${
              isPOS
                ? "text-[8px] leading-[14px]"
                : "text-[12px] leading-[21px]"
            }`}
          >
            <p className="font-bold">
              {invoice?.invoice?.customer?.name || "-"}
            </p>

            <p>
              {invoice?.invoice?.customer?.address || "-"}
            </p>

            <p>
              {toBanglaNumber(
                invoice?.invoice?.customer?.phoneNumber || ""
              )}
            </p>
          </div>
        </div>

        <div
          className={`mt-3 px-5 overflow-hidden rounded border border-gray-300 ${
            isPOS ? "mt-2" : ""
          }`}
        >
          <table
            className={`w-full border-collapse text-center ${
              isPOS ? "text-[8px]" : "text-[12px]"
            }`}
          >
            <thead className="bg-gray-100">
              <tr>
                <th className="border-r border-gray-300 px-2 py-2 font-medium">
                  ডে.নং
                </th>

                <th className="border-r border-gray-300 px-2 py-2 font-medium">
                  চালান
                </th>

                <th className="border-r border-gray-300 px-2 py-2 font-medium">
                  শ্রেণি
                </th>

                <th className="border-r border-gray-300 px-2 py-2 font-medium">
                  ডেলিভারি
                </th>

                <th className="border-r border-gray-300 px-2 py-2 font-medium">
                  ডে.বাকি
                </th>

                <th className="px-2 py-2 font-medium">
                  সময়
                </th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td className="border-t border-r border-gray-300 px-2 py-2 font-semibold">
                  {toBanglaNumber(invoice?.deliveryNo || 0)}
                </td>

                <td className="border-t border-r border-gray-300 px-2 py-2 font-semibold">
                  {toBanglaNumber(
                    invoice?.invoice?.serial || ""
                  )}
                </td>

                <td className="border-t border-r border-gray-300 px-2 py-2">
                  {invoice?.class || "-"}
                </td>

                <td className="border-t border-r border-gray-300 px-2 py-2">
                  {toBanglaNumber(
                    invoice?.deliveryReceived || 0
                  )}
                </td>

                <td className="border-t border-r border-gray-300 px-2 py-2">
                  {toBanglaNumber(
                    invoice?.deliveryRemaining || 0
                  )}
                </td>

                <td className="border-t border-gray-300 px-2 py-2">
                  {formatBanglaDate({
                    date: invoice?.deliveryDate,
                    showDate: false,
                    showTime: true,
                  })}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div
          className={`grid grid-cols-2 gap-5 ${
            isPOS ? "mt-3" : "mt-4"
          }`}
        >
          <div>
            <h3
              className={`font-semibold underline ${
                isPOS
                  ? "mb-1 text-[9px]"
                  : "mb-2 text-[13px]"
              }`}
            >
              বিশেষ দ্রষ্টব্যঃ
            </h3>

            <div
              className={`text-gray-600 ${
                isPOS
                  ? "space-y-0 text-[7px] leading-[11px]"
                  : "space-y-1 text-[10px] leading-4"
              }`}
            >
              <p>
                ১। চালান অথবা রশিদ ছাড়া কোনো লেনদেন করবেন না।
              </p>

              <p>
                ২। ইট ডেলিভারি নেওয়ার কোনো অভিযোগ গ্রহণ করা হবে না।
              </p>

              <p>
                ৩। চালান করার ৩০ দিনের মধ্যে ইট ডেলিভারি নিতে হবে।
              </p>
            </div>
          </div>

          <div
            className={
              isPOS
                ? "text-[8px] leading-[14px]"
                : "text-[12px] leading-[23px]"
            }
          >
            <p className="font-bold">
              গাড়ি ভাড়াঃ {invoice?.carNo || "-"}
            </p>

            <p>
              ড্রাইভারঃ {invoice?.driver.name || "-"}
            </p>

            <p>
              ফোন নম্বরঃ{" "}
              {invoice?.driver.PhoneNumber
                ? toBanglaNumber(invoice.driver.PhoneNumber)
                : "-"}
            </p>

            <p>
              গাড়ি নংঃ{" "}
              {invoice?.carNo
                ? toBanglaNumber(invoice.carNo)
                : "-"}
            </p>
          </div>
        </div>

        <div
          className={`grid grid-cols-2 ${
            isPOS ? "mt-6" : "mt-16"
          }`}
        >
          <div className="text-center">
            <div
              className={`mx-auto border-t border-black ${
                isPOS ? "w-[80px]" : "w-[145px]"
              }`}
            />

            <p
              className={`mt-1 ${
                isPOS ? "text-[7px]" : "text-[11px]"
              }`}
            >
              গ্রাহকের স্বাক্ষর
            </p>
          </div>

          <div className="text-center">
            <div
              className={`mx-auto border-t border-black ${
                isPOS ? "w-[80px]" : "w-[145px]"
              }`}
            />

            <p
              className={`mt-1 ${
                isPOS ? "text-[7px]" : "text-[11px]"
              }`}
            >
              ম্যানেজারের স্বাক্ষর
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const DeliveryPrintModal = ({
  isOpen,
  onClose,
  deliveryId,
  setDeliveryId,
}: TDeliveryPrintModal) => {
  const {
    data,
    isLoading,
    isError,
  } = useGetSingleDeliveryQuery(deliveryId!, {
    refetchOnMountOrArgChange: true,
  });

  const {
    data: vataInfo,
    isLoading: vataLoading,
    isError: vataError,
  } = useGetVataInfoQuery(undefined);

  const invoice: TDeliveryResponse =
    data?.data || ({} as TDeliveryResponse);

  const vataInformation =
    vataInfo?.data as TVataInformation;

  const customerPrintRef = useRef<HTMLDivElement>(null);
  const bothPrintRef = useRef<HTMLDivElement>(null);
  const posCustomerPrintRef = useRef<HTMLDivElement>(null);
  const posBothPrintRef = useRef<HTMLDivElement>(null);

  const handleCustomerPrint = useReactToPrint({
    contentRef: customerPrintRef,
    documentTitle: "Customer-Delivery",
  });

  const handleBothPrint = useReactToPrint({
    contentRef: bothPrintRef,
    documentTitle: "Customer-Office-Delivery",
  });

  const handlePOSCustomerPrint = useReactToPrint({
    contentRef: posCustomerPrintRef,
    documentTitle: "POS-Customer-Delivery",
  });

  const handlePOSBothPrint = useReactToPrint({
    contentRef: posBothPrintRef,
    documentTitle: "POS-Customer-Office-Delivery",
  });

  const handleClose = () => {
    setDeliveryId(undefined);
    onClose();
  };

  return (
    <CustomNormalModal
      isOpen={isOpen}
      onClose={handleClose}
      width="xxl"
    >
      {isLoading || vataLoading ? (
        <CustomStatus type="loading" />
      ) : isError || vataError ? (
        <CustomStatus type="error" />
      ) : (
        <div className="space-y-2">
          <div className="rounded-xl bg-gray-100 py-2">
            <p className="mb-3 text-center text-[13px] font-medium text-gray-600">
              প্রিন্ট অপশন সিলেক্ট করুন
            </p>

            <div className="flex flex-wrap justify-center gap-2">
              <button
                onClick={handleCustomerPrint}
                className="flex cursor-pointer items-center gap-2 rounded-lg bg-emerald-600 px-4 py-1.5 text-[13px] font-medium text-white shadow-sm transition hover:bg-emerald-700"
              >
                <FileText size={16} />
                A4 (কাস্টমার)
              </button>

              <button
                onClick={handleBothPrint}
                className="flex cursor-pointer items-center gap-2 rounded-lg bg-emerald-600 px-4 py-1.5 text-[13px] font-medium text-white shadow-sm transition hover:bg-emerald-700"
              >
                <FileText size={16} />
                A4 (কাস্টমার+অফিস)
              </button>

              <button
                onClick={handlePOSCustomerPrint}
                className="flex cursor-pointer items-center gap-2 rounded-lg bg-orange-500 px-4 py-1.5 text-[13px] font-medium text-white shadow-sm transition hover:bg-orange-600"
              >
                <ReceiptText size={16} />
                POS (কাস্টমার)
              </button>

              <button
                onClick={handlePOSBothPrint}
                className="flex cursor-pointer items-center gap-2 rounded-lg bg-orange-600 px-4 py-1.5 text-[13px] font-medium text-white shadow-sm transition hover:bg-orange-700"
              >
                <ReceiptText size={16} />
                POS (কাস্টমার+অফিস)
              </button>
            </div>
          </div>

          <div>
            <div className="mx-auto max-w-[760px] bg-white shadow">
              <DeliveryCopy
                vataInformation={vataInformation}
                invoice={invoice}
                copyType="customer"
              />
            </div>
          </div>

          <div
            ref={customerPrintRef}
            className="print-delivery-customer absolute -left-[99999px] top-0 w-[794px]"
          >
            <DeliveryCopy
              vataInformation={vataInformation}
              invoice={invoice}
              copyType="customer"
            />
          </div>

          <div
            ref={bothPrintRef}
            className="print-delivery-both absolute -left-[99999px] top-0 w-[794px]"
          >
            <div className="flex flex-col gap-6">
              <DeliveryCopy
                vataInformation={vataInformation}
                invoice={invoice}
                copyType="customer"
              />

              <DeliveryCopy
                vataInformation={vataInformation}
                invoice={invoice}
                copyType="office"
              />
            </div>
          </div>

          <div
            ref={posCustomerPrintRef}
            className="print-delivery-pos-customer absolute -left-[99999px] top-0 w-[302px]"
          >
            <DeliveryCopy
              vataInformation={vataInformation}
              invoice={invoice}
              copyType="customer"
              isPOS
            />
          </div>

          <div
            ref={posBothPrintRef}
            className="print-delivery-pos-both absolute -left-[99999px] top-0 w-[302px]"
          >
            <div className="flex flex-col gap-3">
              <DeliveryCopy
                vataInformation={vataInformation}
                invoice={invoice}
                copyType="customer"
                isPOS
              />

              <DeliveryCopy
                vataInformation={vataInformation}
                invoice={invoice}
                copyType="office"
                isPOS
              />
            </div>
          </div>

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

              .print-delivery-customer,
              .print-delivery-customer * {
                visibility: visible;
              }

              .print-delivery-customer {
                position: absolute !important;
                left: 0 !important;
                top: 0 !important;
                width: 100% !important;
              }

              .print-delivery-both,
              .print-delivery-both * {
                visibility: visible;
              }

              .print-delivery-both {
                position: absolute !important;
                left: 0 !important;
                top: 0 !important;
                width: 100% !important;
              }

              .print-delivery-both > div {
                display: flex !important;
                flex-direction: column !important;
                gap: 5mm !important;
                width: 100% !important;
              }

              .print-delivery-both .text-\\[35px\\] {
                font-size: 22px !important;
              }

              .print-delivery-both .text-\\[21px\\] {
                font-size: 15px !important;
              }

              .print-delivery-both .text-\\[12px\\] {
                font-size: 8px !important;
              }

              .print-delivery-both .text-\\[11px\\] {
                font-size: 7px !important;
              }

              .print-delivery-both .text-\\[10px\\] {
                font-size: 6px !important;
              }

              .print-delivery-both .text-\\[13px\\] {
                font-size: 8px !important;
              }

              .print-delivery-both .px-4 {
                padding-left: 8px !important;
                padding-right: 8px !important;
              }

              .print-delivery-both .py-4 {
                padding-top: 8px !important;
                padding-bottom: 8px !important;
              }

              .print-delivery-both .mt-16 {
                margin-top: 20px !important;
              }

              .print-delivery-both table {
                font-size: 8px !important;
              }

              .print-delivery-both th,
              .print-delivery-both td {
                padding-top: 4px !important;
                padding-bottom: 4px !important;
                padding-left: 4px !important;
                padding-right: 4px !important;
              }

              .print-delivery-pos-customer,
              .print-delivery-pos-customer * {
                visibility: visible;
              }

              .print-delivery-pos-customer {
                position: absolute !important;
                left: 0 !important;
                top: 0 !important;
                width: 80mm !important;
              }

              .print-delivery-pos-customer .pos-delivery-copy {
                width: 80mm !important;
              }

              .print-delivery-pos-both,
              .print-delivery-pos-both * {
                visibility: visible;
              }

              .print-delivery-pos-both {
                position: absolute !important;
                left: 0 !important;
                top: 0 !important;
                width: 80mm !important;
              }

              .print-delivery-pos-both > div {
                display: flex !important;
                flex-direction: column !important;
                gap: 4mm !important;
                width: 80mm !important;
              }

              .print-delivery-pos-both .pos-delivery-copy {
                width: 80mm !important;
              }

              .print-delivery-pos-customer .border,
              .print-delivery-pos-both .border {
                border-color: #d1d5db !important;
              }

              .print-delivery-pos-customer table,
              .print-delivery-pos-both table {
                width: 100% !important;
                font-size: 8px !important;
              }

              .print-delivery-pos-customer th,
              .print-delivery-pos-customer td,
              .print-delivery-pos-both th,
              .print-delivery-pos-both td {
                padding: 3px !important;
              }
            }
          `}</style>
        </div>
      )}
    </CustomNormalModal>
  );
};

export default DeliveryPrintModal;