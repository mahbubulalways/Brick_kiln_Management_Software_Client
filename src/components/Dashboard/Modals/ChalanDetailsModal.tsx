"use client";
import CustomModalBottom from "@/components/Reusable/CustomModalBottom";

type TCustomModal = {
  isOpen: boolean;
  onClose: () => void;
};

const ChalanDetailsModal = ({ isOpen, onClose }: TCustomModal) => {
  return (
    <CustomModalBottom
      isOpen={isOpen}
      onClose={onClose}
      title="চালান এর বিস্তারিত
"
      width="w-4xl h-[70vh] lg:h-[80vh] overflow-y-auto pb-5 no-scrollbar"
    >
      <div className="  text-gray-800 px-5">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-green-600  text-lg">চালান নং: ৫</h2>
            <p className="text-sm text-gray-600">চালান তৈরি করেছেন: Demo</p>
          </div>
          <div className="text-right">
            <h1 className="text-green-600  text-lg">এম.এম.বি ব্রিকস</h1>
            <p className="text-sm text-gray-600">
              বিল্লালপাড়া, চাটমোহর, গোবিন্দগঞ্জ
            </p>
          </div>
        </div>

        {/* Info Boxes */}
        <div className="grid grid-cols-3 gap-3 mt-4">
          <div className="border rounded-md p-3">
            <p>
              <span className="">নাম:</span> মানিক
            </p>
            <p>
              <span className="">ঠিকানা:</span> রংপুর
            </p>
            <p>
              <span className="">মোবাইল:</span> ০১৯১৮০৮০৭৩০
            </p>
          </div>
          <div className="border rounded-md p-3">
            <p>
              <span className="">কাস্টমার আইডি:</span> ৪
            </p>
            <p>
              <span className="">ধরণ:</span> রেগুলার চালান
            </p>
            <p>
              <span className="">ডেলিভারি তারিখ:</span> ৩১-১০-২০২৫
            </p>
          </div>
          <div className="border rounded-md p-3">
            <p>
              <span className="">তারিখ:</span> ৩১-১০-২০২৫
            </p>
            <p>
              <span className="">সময়:</span> সকাল ১০:১৭
            </p>
            <p>
              <span className="">সিজন:</span> ২৪২৫
            </p>
          </div>
        </div>

        {/* Table */}
        <div className="mt-4 border rounded-md overflow-hidden">
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
              <tr>
                <td className="border-r p-2">১ নং</td>
                <td className="border-r p-2">১,০০০</td>
                <td className="border-r p-2">০</td>
                <td className="border-r p-2">৳ ১০.৫</td>
                <td className="p-2">৳ ১০,৫০০</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Balance Info */}
        <div className="mt-5 flex flex-col md:flex-row gap-4">
          <div className="flex-1  border border-red-400 rounded-md p-4 text-center text-red-600 pt-10">
            <p className="text-3xl ">বাকি: ৳ ৫,৩০০</p>
            <p className="mt-2 ">পরিশোধের তারিখ : ৩১-১০-২০২৫</p>
          </div>

          <div className="flex-1 grid grid-cols-2 gap-2">
            <div className="border rounded-md p-3 flex justify-between">
              <span className="">মোট মূল্য</span>
              <span>৳ ১০,৫০০</span>
            </div>
            <div className="border rounded-md p-3 flex justify-between bg-green-50">
              <span className="">ছাড়</span>
              <span>৳ ২০০</span>
            </div>
            <div className="border rounded-md p-3 flex justify-between">
              <span className="">পাকা ভাড়া</span>
              <span>৳ ০</span>
            </div>
            <div className="border rounded-md p-3 flex justify-between">
              <span className="">সর্বমোট</span>
              <span>৳ ১০,৩০০</span>
            </div>
            <div className="border rounded-md p-3 flex justify-between bg-green-50">
              <span className="">জমা</span>
              <span>৳ ৫,০০০</span>
            </div>
            <div className="border rounded-md p-3 flex justify-between text-red-600">
              <span className="">বাকি</span>
              <span>৳ ৫,৩০০</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-4 text-center text-xs text-gray-500">
          [ PAYRA TECH ] a sister concern of [ ORIOSIS LTD ]
        </div>
      </div>
    </CustomModalBottom>
  );
};

export default ChalanDetailsModal;
