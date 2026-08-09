"use client";
import CustomLoader from "@/components/Reusable/CustomLoader";
import CustomNormalModal from "@/components/Reusable/CustomNormalModal";
import { Dispatch, SetStateAction, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import moment from "moment";
import { useGetSingleDeliveryQuery } from "@/redux/features/delivery.features";
type TDeliveryModalPrint = {
  isOpen: boolean;
  onClose: () => void;
  deliveryId: number|undefined;
  setDeliveryId: Dispatch<SetStateAction<number|undefined>>;
};
export interface TDeliveryItem {
  id: number;
  deliveryDate: string; // ISO date string
  deliveryNo: number;
  nextDeliveryDate: string; // ISO date string
  quantity: number;
  deliveryReceived: number;
  class: string;
  deliveryRemaining: number;
  driverName: string;
  driverPhoneNumber: string;
  carNo: string;
  carRent: number;
  invoiceId: number;
  isDeleted: boolean;
  createdAt: string; // ISO date string
}

const DeliveryPrintModal = ({
  isOpen,
  onClose,
  deliveryId,
  setDeliveryId,
}: TDeliveryModalPrint) => {
  const { data, isLoading } = useGetSingleDeliveryQuery(deliveryId, {
    refetchOnMountOrArgChange: true,
  });

  const delivery: TDeliveryItem = data?.data || {};
  const handleClose = () => {
    setDeliveryId(0);
    onClose();
  };
  const contentRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({ contentRef });

  const handleBothPrint = () => {
    const delivery = document.getElementById("delivery");
    const delivery2 = document.getElementById("delivery2");

    if (!delivery || !delivery2) return;

    // Clone delivery content into delivery2
    delivery2.innerHTML = delivery.outerHTML;

    // Update copy labels
    const firstCopyLabel = delivery.querySelector("#deliveryCopy");
    const secondCopyLabel = delivery2.querySelector("#deliveryCopy");

    if (firstCopyLabel) {
      firstCopyLabel.textContent = "গ্রাহক কপি";
    }

    if (secondCopyLabel) {
      secondCopyLabel.textContent = "অফিস কপি";
    }

    handlePrint();
  };

  return (
    <CustomNormalModal isOpen={isOpen} onClose={handleClose} width="w-4xl">
      {isLoading ? (
        <>
          <CustomLoader cls="h-[50vh]" />
        </>
      ) : (
        <div>
          <div className="space-y-3">
            {/* ✅ Top Buttons */}
            <div className="flex justify-center gap-3">
              <button
                onClick={handlePrint}
                className="bg-green-600 text-white px-4 py-1 rounded flex items-center gap-1 text-sm cursor-pointer"
              >
                🖨️ গ্রাহক কপি
              </button>
              <button
                onClick={handleBothPrint}
                className="bg-green-500 text-white px-4 py-1 rounded flex items-center gap-1 text-sm cursor-pointer"
              >
                🖨️ গ্রাহক + অফিস কপি
              </button>
              <button className="bg-orange-500 text-white px-4 py-1 rounded text-sm cursor-pointer">
                X বাতিল
              </button>
            </div>
            <div
              className=" grid grid-cols-2 gap-8 w-full px-2 pt-5"
              ref={contentRef}
            >
              <div className="bg-white  text-gray-900" id="delivery">
                <div className="flex items-center justify-between">
                  <div className="">
                    <span className=" text-red-600 text-2xl font-bold">
                      DEMO
                    </span>
                  </div>
                  <div id="deliveryCopy">গ্রাহক কপি</div>
                  <div>
                    <h2 className=" text-red-600 text-end text-2xl">
                      ডেলিভারি
                    </h2>
                    <p className="text-sm">প্রিন্ট তারিখঃ ১৯-১১-২০২৫</p>
                  </div>
                </div>

                {/* Sender + Customer Info */}
                <div className="flex justify-between">
                  <div>
                    <h3 className="text-green-600 ">ডেমো ব্রিকস</h3>
                    <p className="text-sm">হিলাশিয়াড়া, কাটাবাড়ি, গোপালগঞ্জ</p>
                    <p className="text-sm">০১৯১১১১১১১১, ০১৯০০০০০০০৩</p>
                  </div>
                  <div className="text-right">
                    <h3 className="text-green-600 ">মানিক</h3>
                    <p className="text-sm">বরিশাল</p>
                    <p className="text-sm">০১৯১২৩৪৫৬৭০</p>
                  </div>
                </div>

                {/* Delivery Table */}
                <div className="pt-2">
                  <table className="w-full text-center border border-gray-300">
                    <thead className="bg-green-600 text-white">
                      <tr>
                        <th className="text-sm font-normal">ডে.নং</th>
                        <th className="text-sm font-normal">চালান</th>
                        <th className="text-sm font-normal">শ্রেণি</th>
                        <th className="text-sm font-normal">ডেলিভারি</th>
                        <th className="text-sm font-normal">ডে.বাকি</th>
                        <th className="text-sm font-normal">সময়</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="p-2">{delivery?.id}</td>
                        <td className="p-2">{delivery?.invoiceId}</td>
                        <td className="p-2">{delivery?.class}</td>
                        <td className="p-2 text-green-700 font-bold text-sm">
                          {delivery?.deliveryReceived}
                        </td>
                        <td className="p-2">{delivery?.deliveryRemaining}</td>
                        <td className="p-2">
                          {moment(delivery?.deliveryDate)
                            .locale("bn-bd")
                            .format("LT")}
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  {/* Total Delivery */}
                  <div className="w-full text-center border border-t-0 border-gray-300 py-3 font-bold text-green-700 ">
                    মোট ডেলিভারি: {delivery?.deliveryReceived}
                  </div>
                </div>

                {/* Vehicle Fare Box */}
                <div className="border border-gray-300 p-6 mt-5 rounded-lg flex justify-between">
                  <div>
                    <p className="text-green-600 font-bold text-xl">
                      গাড়ি ভাড়া: {delivery?.carRent || 0} টাকা
                    </p>
                  </div>
                  <div className="text-right space-y-1">
                    <p className="font-semibold">
                      ড্রাইভারঃ {delivery?.driverName}
                    </p>
                    <p>ফোন নং- {delivery?.driverPhoneNumber}</p>
                    <p>গাড়ি নং- {delivery?.carNo}</p>
                  </div>
                </div>

                {/* Bottom Note */}
                <p className="mt-4 mb-12 text-[15px] text-gray-700">
                  চালান ছাড়া বা শ্রমিক ব্যতিত অন্য কোনো লেনদেন করবেন না।
                </p>

                {/* Signatures */}
                <div className="flex justify-between px-4 text-sm font-medium mt-4">
                  <p>
                    ------------------- <br />
                    গ্রাহকের স্বাক্ষর
                  </p>
                  <p>
                    ------------------- <br />
                    ম্যানেজারের স্বাক্ষর
                  </p>
                </div>

                {/* Footer Branding */}
                <p className="text-center text-xs mt-4 text-gray-500">
                  Powered by - Mahbubul Hasan - 014072128177
                </p>
              </div>
              <div id="delivery2"></div>
            </div>
          </div>
        </div>
      )}
    </CustomNormalModal>
  );
};

export default DeliveryPrintModal;
