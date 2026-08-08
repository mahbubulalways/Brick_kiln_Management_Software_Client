"use client";
import CustomLoader from "@/components/Reusable/CustomLoader";
import CustomNormalModal from "@/components/Reusable/CustomNormalModal";
import { useGetSingleInvoiceQuery } from "@/redux/features/invoice.features";
import { IChallanForDataShow, TCustomInvoiceModal } from "@/types/types";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import moment from "moment";
const ChalanPrintModal = ({
  isOpen,
  onClose,
  invoiceId,
  setInvoiceId,
}: TCustomInvoiceModal) => {
  const { data, isLoading } = useGetSingleInvoiceQuery(invoiceId, {
    refetchOnMountOrArgChange: true,
  });

  const invoice: IChallanForDataShow = data?.data || {};

  console.log(invoice);
  const handleClose = () => {
    setInvoiceId(0);
    onClose();
  };
  const contentRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({ contentRef });

  const handleBothPrint = () => {
    const double = document.getElementById("chalan");
    const secondDiv = document.getElementById("chalan2");

    if (double && secondDiv) {
      secondDiv.innerHTML = double.outerHTML;
      handlePrint();
    }
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
              className=" grid grid-cols-2 gap-8 w-full px-5 pt-5"
              ref={contentRef}
            >
              <div id="chalan">
                <div className="flex justify-between items-start mt-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="bg-red-100 text-red-700 font-semibold px-3 py-0.5 rounded text-sm flex items-center">
                        🚧 DEMO
                      </span>
                      <span className="border px-2 py-0.5 rounded text-sm font-medium">
                        চালান কপি
                      </span>
                    </div>
                  </div>
                  <div>
                    <h2 className="text-2xl">চালান</h2>
                    <p className="text-sm">
                      চালানের তারিখঃ{" "}
                      <span className="font-semibold">
                        {" "}
                        {moment(invoice?.challanDate).format("L")}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="pt-2 flex justify-between">
                  <div>
                    <h2 className="text-green-700 font-bold text-lg">
                      এস.এম.বি ব্রিকস
                    </h2>
                    <p className="text-[13px] text-gray-700">
                      হিলালপুর, রামদিয়াপাড়া, গাইবান্ধা <br />
                      ০১৯১১-৯৮৯৮১০, ০১৯১১-৯৮৯৮৭০
                    </p>
                  </div>
                  <div>
                    <h3 className="text-green-700 font-bold">মালিক</h3>
                    <p className="text-gray-700 leading-tight text-[13px]">
                      রংপুর <br /> ০১৯১১-৯৮৯৮৭০
                    </p>
                  </div>
                </div>

                {/* ✅ Table */}
                <table className="w-full border border-gray-300 text-center text-[13px] mt-2">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="border p-1 w-12">চালান নং</th>
                      <th className="border p-1 w-12">শ্রেণি</th>
                      <th className="border p-1 w-20">পরিমাণ</th>
                      <th className="border p-1 w-20">দর</th>
                      <th className="border p-1 w-20">মূল্য</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* <tr>
                      <td className="border p-1">৫</td>
                      <td className="border p-1">১ নং</td>
                      <td className="border p-1">৩,০০০</td>
                      <td className="border p-1">৳ ৩.৫০</td>
                      <td className="border p-1">৳ ১০,৫০০</td>
                    </tr> */}
                    {invoice?.items?.map((item) => (
                      <tr key={item?.id}>
                        <td className="border-r p-2">{item?.challanId}</td>
                        <td className="border-r p-2">{item?.class}</td>
                        <td className="border-r p-2">{item?.quantity}</td>
                        <td className="border-r p-2">৳ {item?.rate}</td>
                        <td className="p-2">৳ {item?.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* ✅ Summary + Red Vertical Logo */}
                <div className="flex justify-between mt-4 gap-3">
                  {/* Left Red Logo */}
                  <div
                    className={`flex justify-center items-center border  rounded  text-3xl px-4 rotate ${
                      invoice?.due
                        ? "border-red-500 text-red-600"
                        : "border-green-500 text-green-600"
                    }`}
                  >
                    <p className="-rotate-90">
                      {" "}
                      {invoice?.due ? "বাকি" : "পরিশোধ"}
                    </p>
                  </div>

                  {/* Right Boxes */}
                  <div className="flex-1 border border-gray-200 rounded p-2">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-gray-50 rounded p-2 text-center">
                        <p className="text-gray-600 text-xs">মোট মূল্য</p>
                        <p className="font-semibold">
                          ৳ {invoice?.productPrice}
                        </p>
                      </div>
                      <div className="bg-orange-50 rounded p-2 text-center">
                        <p className="text-gray-600 text-xs">ছাড়</p>
                        <p className="font-semibold text-orange-600">
                          ৳ {invoice?.discount}
                        </p>
                      </div>
                      <div className="bg-blue-50 rounded p-2 text-center">
                        <p className="text-gray-600 text-xs">গাড়ি ভাড়া</p>
                        <p className="font-semibold text-blue-600">
                          ৳ {invoice?.carRent}
                        </p>
                      </div>
                      <div className="bg-green-50 rounded p-2 text-center">
                        <p className="text-gray-600 text-xs">সর্বমোট</p>
                        <p className="font-semibold text-green-600">
                          ৳ {invoice?.totalPrice}
                        </p>
                      </div>
                      <div className="bg-gray-50 rounded p-2 text-center">
                        <p className="text-gray-600 text-xs">জমা</p>
                        <p className="font-semibold">৳ {invoice?.cash}</p>
                      </div>
                      <div className="bg-red-50 rounded p-2 text-center">
                        <p className="text-gray-600 text-xs">বাকি</p>
                        <p className="font-semibold text-red-600">
                          ৳ {invoice?.due}
                        </p>
                      </div>
                    </div>

                    {/* Payment Date */}
                    <div className="border border-red-500 rounded text-center py-2 mt-3">
                      <p className="text-red-600 font-semibold text-sm">
                        পরিশোধের তারিখঃ{" "}
                        {moment(
                          invoice?.duePaymentDate || invoice?.challanDate,
                        ).format("L")}
                      </p>
                    </div>
                  </div>
                </div>

                {/* ✅ Footer */}
                <div className="text-center mt-6 text-[12px] text-gray-700">
                  <p>চালান ছাড়া রশিদ প্রদান বা টাকা গ্রহণ করবেন না</p>
                  <div className="flex justify-between mt-8 px-8">
                    <p>গ্রাহকের স্বাক্ষর</p>
                    <p>ম্যানেজারের স্বাক্ষর</p>
                  </div>
                  <p className="text-[10px] text-gray-500 mt-4">
                    [dev-mahbubul]
                  </p>
                </div>
              </div>
              <div id="chalan2"></div>
            </div>
          </div>
        </div>
      )}
    </CustomNormalModal>
  );
};

export default ChalanPrintModal;
