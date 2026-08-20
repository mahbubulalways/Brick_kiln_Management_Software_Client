import { TChallanItemReport, TChallanSummary } from "@/interface/dashboard";
import ChalanDownPart from "./ChalanDownPart";

export default function ChalanTable({
  items, summary
}: {
  items: TChallanItemReport[], summary: TChallanSummary
}) {
  const itemSummary = items?.reduce(
    (acc, item) => {
      acc.totalChallan += item.totalChallan;
      acc.totalQuantity += item.totalQuantity;
      acc.totalPrice += item.totalPrice;

      return acc;
    },
    {
      totalChallan: 0,
      totalQuantity: 0,
      totalPrice: 0,
    }
  );
  return (
    <div>
      <div className="bg-[#e9f9ed] flex flex-col items-center  text-[#066a20] w-full">
        <table className="w-full text-center ">
          <caption className="bg-[#039A63] text-white py-1 rounded-t-md font-medium">
            চালান
          </caption>
          <thead>
            <tr className="bg-[#BBF7D0]">
              {["শ্রেণি", "চালান", "পরিমান", "মোট মূল্য"].map(
                (header, index) => (
                  <th
                    key={index}
                    className="px-2 py-1 text-green-700  font-normal text-start"
                  >
                    {header}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody className="text-start p-2">
            {items?.map((row, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-[#F1FDF5]" : "bg-[#f4fcf5]"}
              >
                <td className="p-1 border-b border-green-100 ">
                  {row?.class}
                </td>
                <td className="p-1 border-b border-green-100">{row?.totalChallan}</td>
                <td className="p-1 border-b border-green-100">
                  {row?.totalQuantity}
                </td>
                <td className="p-1 border-b border-green-100">
                  ৳{row?.totalPrice}
                </td>
              </tr>
            ))}

            <tr className="bg-[#ECFDF5]">
              <td className="p-1 border-b border-green-100 ">মোট</td>
              <td className="p-1 border-b border-green-100">{itemSummary?.totalChallan}</td>
              <td className="p-1 border-b border-green-100">{itemSummary?.totalQuantity}</td>
              <td className="p-1 border-b border-green-100">৳{itemSummary?.totalPrice}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <ChalanDownPart summary={summary}/>
    </div>
  );
}
