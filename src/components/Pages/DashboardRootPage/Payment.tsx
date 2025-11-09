import CardContainer from "./CardContainer";

export default function Payment() {
  const payments = [
    ["বেতন", "-", "৳ 28,000"],
    ["গোডাউন", "-", "৳ 25,000"],
    ["সাদা মাটি", "-", "৳ 10,000"],
    ["লোড মিশ্র", "-", "৳ 9,700"],
    ["আনলোড", "54,500", "৳ 8,170"],
    ["মেল", "-", "৳ 6,500"],
    ["বেকু", "-", "৳ 5,060"],
    ["ডেইলি লেবার", "14", "৳ 3,200"],
    ["খাওয়া ভাড়া", "-", "৳ 3,000"],
    ["ট্রাক্টর", "-", "৳ 2,150"],
    ["অফিস খরচ", "-", "৳ 1,140"],
    ["মটরসাইকেল", "5", "৳ 500"],
  ];

  return (
    <CardContainer
      title="পেমেন্ট"
      color="bg-[#FB923C]"
      bg="bg-gradient-to-b from-orange-200/30 to-orange-100/30"
    >
      <table className="w-full text-center border-collapse">
        <thead>
          <tr className="bg-orange-200">
            <th className="px-2 py-1 text-orange-600 font-normal text-start">
              খরচ
            </th>
            <th className="px-2 py-1 text-orange-600 font-normal text-center">
              পরিমান
            </th>
            <th className="px-2 py-1 text-orange-600 font-normal text-end">
              পেমেন্ট দেওয়া
            </th>
          </tr>
        </thead>
        <tbody className="text-start p-2">
          {payments.map((p, i) => (
            <tr key={i}>
              <td className="text-orange-500 p-1 pl-2">{p[0]}</td>
              <td className="text-orange-500 p-1 text-center">{p[1]}</td>
              <td className="text-orange-500 p-1 text-end pr-2">{p[2]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </CardContainer>
  );
}
