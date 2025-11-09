import ChalanDownPart from "./ChalanDownPart";

interface TableRow {
  category: string;
  challan: number;
  quantity: string;
  totalPrice: string;
}

const tableData: TableRow[] = [
  {
    category: "১ নং",
    challan: 5,
    quantity: "24,000",
    totalPrice: "৳ 3,00,000",
  },
  {
    category: "২ নং (ক)",
    challan: 2,
    quantity: "10,000",
    totalPrice: "৳ 1,08,600",
  },
  { category: "পিকেট", challan: 1, quantity: "2,000", totalPrice: "৳ 23,000" },
  {
    category: "১ নং আদলা",
    challan: 1,
    quantity: "1,000",
    totalPrice: "৳ 5,000",
  },
];

export default function ChalanTable() {
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
            {tableData.map((row, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-[#F1FDF5]" : "bg-[#f4fcf5]"}
              >
                <td className="p-1 border-b border-green-100 ">
                  {row.category}
                </td>
                <td className="p-1 border-b border-green-100">{row.challan}</td>
                <td className="p-1 border-b border-green-100">
                  {row.quantity}
                </td>
                <td className="p-1 border-b border-green-100">
                  {row.totalPrice}
                </td>
              </tr>
            ))}

            <tr className="bg-[#ECFDF5]">
              <td className="p-1 border-b border-green-100 ">মোট</td>
              <td className="p-1 border-b border-green-100">9</td>
              <td className="p-1 border-b border-green-100">37,000</td>
              <td className="p-1 border-b border-green-100">৳ 4,36,600</td>
            </tr>
          </tbody>
        </table>
      </div>
      <ChalanDownPart />
    </div>
  );
}
