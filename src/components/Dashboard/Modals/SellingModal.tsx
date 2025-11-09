"use client";

import CustomReportModal from "@/components/Reusable/CustomReportModal";

type TCustomReportModal = {
  isOpen: boolean;
  onClose: () => void;
};

const SellingModal = ({ isOpen, onClose }: TCustomReportModal) => {
  return (
    <CustomReportModal
      isOpen={isOpen}
      onClose={onClose}
      title="বিক্রির রিপোর্ট"
      width="w-lg"
    >
      <div>
        <div className="mx-auto bg-white rounded-lg overflow-hidden border">
          {/* Top Table */}
          <table className="w-full   text-gray-700 ">
            <thead className="bg-[#039A63] text-white">
              <tr>
                <th className="px-4 py-2 text-left font-semibold">শ্রেণি</th>
                <th className="px-4 py-2 text-left font-semibold">চালান</th>
                <th className="px-4 py-2 text-left font-semibold">পরিমান</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="px-4 py-2">১ নং</td>
                <td className="px-4 py-2">3</td>
                <td className="px-4 py-2">24,000</td>
              </tr>
              <tr>
                <td className="px-4 py-2">পিকআপ</td>
                <td className="px-4 py-2">2</td>
                <td className="px-4 py-2">4,000</td>
              </tr>
              <tr>
                <td className="px-4 py-2">২ নং (খ)</td>
                <td className="px-4 py-2">1</td>
                <td className="px-4 py-2">3,000</td>
              </tr>
              <tr className="font-semibold">
                <td className="px-4 py-2">মোট</td>
                <td className="px-4 py-2">5</td>
                <td className="px-4 py-2">31,000</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Bottom Summary Section */}
        <div className="mt-3 border rounded-lg overflow-hidden">
          <table className="w-full   text-gray-700 border-collapse">
            <tbody>
              <tr className="border-b">
                <td className="px-4 py-2">মোট বিক্রয় মূল্য</td>
                <td className="px-4 py-2 text-right font-semibold text-gray-800">
                  ৳ ৩,০২,৩০০
                </td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-2">ছাড় (-)</td>
                <td className="px-4 py-2 text-right text-red-500 font-semibold">
                  ৳ ২০০
                </td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-2 text-blue-600 font-semibold">
                  মোট ভাড়া (+)
                </td>
                <td className="px-4 py-2 text-right text-blue-600 font-semibold">
                  ৳ ২,০০০
                </td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-2">মোট বিক্রি (ভাড়া সহ)</td>
                <td className="px-4 py-2 text-right font-semibold text-gray-800">
                  ৳ ৩,০৪,৩০০
                </td>
              </tr>
              <tr className="border-b bg-green-50">
                <td className="px-4 py-2 text-green-600 font-semibold">নগদ</td>
                <td className="px-4 py-2 text-right text-green-600 font-semibold">
                  ৳ ১,৭৭,০০০
                </td>
              </tr>
              <tr className="bg-red-50">
                <td className="px-4 py-2 text-red-600 font-semibold">বাকি</td>
                <td className="px-4 py-2 text-right text-red-600 font-semibold">
                  ৳ ১,২৭,৩০০
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </CustomReportModal>
  );
};

export default SellingModal;
