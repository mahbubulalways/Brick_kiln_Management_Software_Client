"use client";
import CustomNormalModal from "@/components/Reusable/CustomNormalModal";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

type TCustomModal = {
  isOpen: boolean;
  onClose: () => void;
};

const PrintDueCollectionModal = ({ isOpen, onClose }: TCustomModal) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({ contentRef });

  return (
    <CustomNormalModal isOpen={isOpen} onClose={onClose} width="w-4xl">
      <div className="w-full flex flex-col items-center py-5">
        {/* Top Buttons */}
        <div className="flex justify-center gap-2 w-full mb-3">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 bg-green-600 text-white px-3 py-1.5 rounded   hover:bg-green-700 print:hidden cursor-pointer"
          >
            🖨️ প্রিন্ট (গ্রাহক কপি)
          </button>
          <button className="flex items-center gap-2 bg-green-500 text-white px-3 py-1.5 rounded   hover:bg-green-600 print:hidden">
            🖨️ প্রিন্ট (গ্রাহক+অফিস কপি)
          </button>
          <button className="flex items-center gap-2 bg-orange-500 text-white px-3 py-1.5 rounded   hover:bg-orange-600 print:hidden">
            ✖ বাতিল
          </button>
        </div>

        {/* Printable Section */}
        <div ref={contentRef} className=" w-full p-5">
          {/* Header */}
          <div className="flex justify-between items-start border-b pb-2 mb-4">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                {/* <Image src="/demo-logo.png" alt="Demo" width={45} height={45} /> */}
                <span className="text-2xl font-semibold text-red-500">
                  DEMO
                </span>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-green-700 ">
                  এস.এম.বি ব্রিকস
                </h2>
                <p className="  text-gray-600 leading-tight font-semibold py-1">
                  হিলিপাড়া, কাটাবাড়ি, গাইবান্ধা <br />
                  ০১৯১০৩৪৯১৯১, ০১৯১০৩৪৯১৯৩
                </p>
              </div>
            </div>

            <div className="text-right space-y-1">
              <h3 className="text-lg font-semibold text-green-700">বাকি জমা</h3>
              <p className="  text-gray-500">
                প্রিন্ট তারিখঃ{" "}
                <span className="font-medium text-gray-700">০৮-১১-২০২৫</span>
              </p>
              <p className="text-gray-700 font-medium">
                মালিক
                <br />
                <span className="text-green-700 font-semibold">মানিক</span>
                <br />
                <span className="text-gray-500  ">রংপুর</span>
                <br />
                <span className="text-gray-500  ">০১৭২১৬৬৬৬৬৩</span>
              </p>
            </div>
          </div>

          {/* Table */}
          <div className="border rounded-md overflow-hidden mb-4">
            <table className="w-full text-center border-collapse  ">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="border px-2 py-1">#</th>
                  <th className="border px-2 py-1">জমা দেওয়ার তারিখ</th>
                  <th className="border px-2 py-1">কা.আইডি</th>
                  <th className="border px-2 py-1">মোট বাকি</th>
                  <th className="border px-2 py-1">জমা দেওয়া</th>
                  <th className="border px-2 py-1">অবশিষ্ট বাকি</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border px-2 py-1">১৩</td>
                  <td className="border px-2 py-1">০৮-১১-২০২৫ (সকাল ১০:৫৫)</td>
                  <td className="border px-2 py-1">১</td>
                  <td className="border px-2 py-1">৳ ১,২১,000</td>
                  <td className="border px-2 py-1">৳ ২১,000</td>
                  <td className="border px-2 py-1">৳ ১,00,000</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Remaining balance */}
          <div className="border border-red-400 bg-red-50 rounded text-center py-2 mb-4">
            <p className="text-red-600 font-bold text-lg">
              বাকি রয়েলঃ ১,00,000 টাকা
            </p>
          </div>

          {/* Notes */}
          <div className="  text-gray-600 mb-6">
            <p className="font-semibold underline mb-1">বিশেষ দ্রষ্টব্যঃ</p>
            <p>১। চালান অথবা রশিদ ছাড়া কোনো লেনদেন করবেন না।</p>
            <p>
              ২। ডেলিভারি অথবা বাকি টাকা পরিশোধের সময় চালানটি অবশ্যই সাথে আনতে
              হবে।
            </p>
          </div>

          {/* Footer */}
          <div className="flex justify-between items-center text-gray-500 text-xs mt-6">
            <p>
              [ PAYRA TECH - ০১৯১৯৮০৮০৭০ ] a sister concern of [ ORIOSIS LTD ]
            </p>
            <p className="text-right font-medium text-gray-700 border-t border-gray-300 px-2 pt-1">
              ম্যানেজারের সাক্ষর
            </p>
          </div>
        </div>
      </div>
    </CustomNormalModal>
  );
};

export default PrintDueCollectionModal;
