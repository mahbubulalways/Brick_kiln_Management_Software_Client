"use client";
import CustomLoader from "@/components/Reusable/CustomLoader";
import CustomReportModal from "@/components/Reusable/CustomReportModal";
import { useGetItemsWithInvoicesQuery } from "@/redux/features/invoice.features";
import { IChallanItem } from "@/types/types";
import { TbDatabaseOff } from "react-icons/tb";

type TCustomReportModal = {
  isOpen: boolean;
  onClose: () => void;
  startDate?: string;
  endDate?: string;
};

const SellingModal = ({
  isOpen,
  onClose,
  startDate,
  endDate = "",
}: TCustomReportModal) => {
  const { isLoading, data } = useGetItemsWithInvoicesQuery(
    { startDate: startDate as string, endDate: endDate as string },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const totalQuantity: number = data?.data?.reduce(
    (acc: number, curr: IChallanItem) => acc + curr?.quantity,
    0
  );

  const uniqueChallanCount: number = data?.data
    ? new Set(data.data.map((item: IChallanItem) => item?.challan?.id)).size
    : 0;

  const totalProductPrice = getTotalByField(data?.data, "productPrice");
  const totalDiscount = getTotalByField(data?.data, "discount");
  const totalCarRent = getTotalByField(data?.data, "carRent");
  const totalPrice = getTotalByField(data?.data, "totalPrice");
  const totalDue = getTotalByField(data?.data, "due");
  const totalCash = getTotalByField(data?.data, "cash");

  return (
    <CustomReportModal
      isOpen={isOpen}
      onClose={onClose}
      title="বিক্রির রিপোর্ট"
    >
      {isLoading ? (
        <>
          <CustomLoader cls="h-[50vh]" />
        </>
      ) : !data?.data?.length ? (
        <>
          <div className="flex flex-col gap-2 justify-center items-center h-44 text-gray-600 ">
            <TbDatabaseOff className="h-6 w-6" />
            <h1 className="text-sm">কোনো রিপোর্ট পাওয়া যায় নি</h1>
          </div>
        </>
      ) : (
        <div>
          <div className="mx-auto bg-white rounded-lg overflow-hidden border">
            <table className="w-full   text-gray-700 ">
              <thead className="bg-[#039A63] text-white">
                <tr>
                  <th className="px-4 py-2 text-left font-medium">শ্রেণি</th>
                  <th className="px-4 py-2 text-left font-medium">চালান</th>
                  <th className="px-4 py-2 text-left font-medium">পরিমান</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 text-[15px]">
                {data?.data?.slice(0, 4)?.map((item: IChallanItem) => (
                  <tr key={item?.id}>
                    <td className="px-4 py-2">{item?.class}</td>
                    <td className="px-4 py-2">{item?.challanId}</td>
                    <td className="px-4 py-2">{item?.quantity}</td>
                  </tr>
                ))}
                <tr className="font-semibold">
                  <td className="px-4 py-2">মোট</td>
                  <td className="px-4 py-2">{uniqueChallanCount}</td>
                  <td className="px-4 py-2">{totalQuantity}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Bottom Summary Section */}
          <div className="mt-3 border rounded overflow-hidden">
            <table className="w-full   text-gray-700 bg-gray-50 border-collapse text-[15px]">
              <tbody>
                <tr className="border-b">
                  <td className="px-4 py-2">মোট বিক্রয় মূল্য</td>
                  <td className="px-4 py-2 text-right  text-gray-800">
                    ৳ {totalProductPrice}
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="px-4 py-2">ছাড় (-)</td>
                  <td className="px-4 py-2 text-right text-red-500 ">
                    ৳ {totalDiscount}
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="px-4 py-2 text-blue-600 ">মোট ভাড়া (+)</td>
                  <td className="px-4 py-2 text-right text-blue-600 ">
                    ৳ {totalCarRent}
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="px-4 py-2">মোট বিক্রি (ভাড়া সহ)</td>
                  <td className="px-4 py-2 text-right  text-gray-800">
                    ৳ {totalPrice}
                  </td>
                </tr>
                <tr className="border-b ">
                  <td className="px-4 py-2 text-green-600 ">নগদ</td>
                  <td className="px-4 py-2 text-right text-green-600 ">
                    ৳ {totalCash}
                  </td>
                </tr>
                <tr className="">
                  <td className="px-4 py-2 text-red-600 ">বাকি</td>
                  <td className="px-4 py-2 text-right text-red-600 ">
                    ৳ {totalDue}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </CustomReportModal>
  );
};

export default SellingModal;
const getTotalByField = (
  data: IChallanItem[] | undefined,
  field: keyof NonNullable<IChallanItem["challan"]>
): number => {
  if (!data) return 0;

  const uniqueChallans = Array.from(
    new Map<number, IChallanItem>(
      data.map((item) => [item.challanId, item])
    ).values()
  );

  return uniqueChallans.reduce(
    (acc: number, current: IChallanItem) =>
      acc + Number(current?.challan?.[field] || 0),
    0
  );
};
