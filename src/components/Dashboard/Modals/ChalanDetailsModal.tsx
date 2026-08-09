"use client";
import CustomLoader from "@/components/Reusable/CustomLoader";
import CustomModalBottom from "@/components/Reusable/CustomModalBottom";
import { useGetSingleInvoiceQuery } from "@/redux/features/invoice.features";
import { IChallanForDataShow, TCustomInvoiceModal } from "@/types/types";
import moment from "moment";
// import "moment/locale/bn";
const ChalanDetailsModal = ({
  isOpen,
  onClose,
  invoiceId,
  setInvoiceId,
}: TCustomInvoiceModal) => {
  const { data, isLoading } = useGetSingleInvoiceQuery(invoiceId, {
    refetchOnMountOrArgChange: true,
  });

  const handleClose = () => {
    setInvoiceId(0);
    onClose();
  };

  const invoice: IChallanForDataShow = data?.data || {};
  return (
    <CustomModalBottom
      isOpen={isOpen}
      onClose={handleClose}
      title="চালান এর বিস্তারিত"
      width="xxl"
    >
      {isLoading ? (
        <>
          <CustomLoader cls="h-[50vh]" />
        </>
      ) : (
        <div className="  text-gray-800 px-5">
          {/* Header */}
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-green-600  text-lg">
                চালান নং: {invoice?.serial}
              </h2>
              <p className="text-sm text-gray-600">
                চালান তৈরি করেছেন: {invoice?.createdBy}
              </p>
            </div>
            <div className="text-right">
              <h1 className="text-green-600  text-lg">এম.এম.বি ব্রিকস</h1>
              <p className="text-sm text-gray-600">
                বিল্লালপাড়া, চাটমোহর, গোবিন্দগঞ্জ
              </p>
            </div>
          </div>

          {/* Info Boxes */}
          <div className="grid  grid-cols-1 lg:grid-cols-3 gap-3 mt-4 text-[15px]">
            <div className="border rounded-md p-3">
              <p>
                <span className="">নাম:</span> {invoice?.customer?.name}
              </p>
              <p>
                <span className="">ঠিকানা:</span> {invoice?.customer?.address}
              </p>
              <p>
                <span className="">মোবাইল:</span>{" "}
                {invoice?.customer?.phoneNumber}
              </p>
            </div>
            <div className="border rounded-md p-3">
              <p>
                <span className="">কাস্টমার আইডি:</span> {invoice?.customer?.id}
              </p>
              <p>
                <span className="">ধরণ:</span> {invoice?.chalanType}
              </p>
              <p>
                <span className="">ডেলিভারি তারিখ:</span>{" "}
                {moment(invoice?.deliveryDate).format("L")}
              </p>
            </div>
            <div className="border rounded-md p-3">
              <p>
                <span className="">তারিখ:</span>{" "}
                {moment(invoice?.challanDate).format("L")}
              </p>
              <p>
                <span className="">সময়: </span>
                {moment(invoice?.challanDate).format("LT")}
              </p>
              <p>
                <span className="">সিজন:</span> ২৪২৫
              </p>
            </div>
          </div>

          {/* Table */}
          <div className="mt-4 border rounded-md overflow-hidden ">
            <table className="w-full text-sm text-center border-collapse">
              <thead className="bg-gray-100">
                <tr className="border-b">
                  <th className="p-2 border-r">শ্রেণি</th>
                  <th className="p-2 border-r">পরিমাণ</th>
                  <th className="p-2 border-r">ডেলিভারি</th>
                  <th className="p-2 border-r">দর</th>
                  <th className="p-2">মূল্য</th>
                </tr>
              </thead>
              <tbody>
                {invoice?.items?.map((item) => (
                  <tr key={item?.id}>
                    <td className="border-r p-2">{item?.class}</td>
                    <td className="border-r p-2">{item?.quantity}</td>
                    <td className="border-r p-2">০</td>
                    <td className="border-r p-2">৳ {item?.rate}</td>
                    <td className="p-2">৳ {item?.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Balance Info */}
          <div className="mt-5 flex flex-col md:flex-row gap-4">
            <div className="flex-1  border border-red-400 rounded-md p-4 text-center text-red-600 pt-10">
              <p className="text-3xl ">বাকি: ৳ {invoice?.due}</p>
              <p className="mt-2 ">
                পরিশোধের তারিখ : {moment(invoice?.duePaymentDate).format("L")}
              </p>
            </div>

            <div className="flex-1 grid grid-cols-2 gap-2 text-[15px]">
              <div className="border rounded-md p-3 flex justify-between">
                <span className="">মোট মূল্য</span>
                <span>৳ {invoice?.productPrice}</span>
              </div>
              <div className="border rounded-md p-3 flex justify-between bg-green-50">
                <span className="">ছাড়</span>
                <span>৳ {invoice?.discount}</span>
              </div>
              <div className="border rounded-md p-3 flex justify-between">
                <span className="">গাড়ি ভাড়া</span>
                <span>৳ {invoice?.carRent}</span>
              </div>
              <div className="border rounded-md p-3 flex justify-between">
                <span className="">সর্বমোট</span>
                <span>৳ {invoice?.totalPrice}</span>
              </div>
              <div className="border rounded-md p-3 flex justify-between bg-green-50">
                <span className="">জমা</span>
                <span>৳ {invoice?.cash}</span>
              </div>
              <div className="border rounded-md p-3 flex justify-between text-red-600">
                <span className="">বাকি</span>
                <span>৳ {invoice?.due}</span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-4 text-center text-xs text-gray-500">
            [dev-mahbubul.com]
          </div>
        </div>
      )}
    </CustomModalBottom>
  );
};

export default ChalanDetailsModal;
