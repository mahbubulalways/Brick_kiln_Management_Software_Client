import CardContainer from "./CardContainer";

export default function Production() {
  return (
    <div className="space-y-2">
      <CardContainer
        title="প্রোডাকশন"
        color="bg-sky-500"
        bg="bg-gradient-to-b from-[#0378BF]/20 to-[#8FD3FF]/10"
      >
        <table className="w-full text-center border-collapse">
          <thead className="bg-[#BAE6FD]">
            <tr>
              <th className="px-2 py-1 text-[#0378BF]  font-normal text-start">
                মেল
              </th>
              <th className="px-2 py-1 text-[#0378BF]  font-normal text-end">
                প্রোডাকশন
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-sky-50">
              <td className="text-[#0378BF] p-1.5 pl-2 text-start">১ নং মেল</td>
              <td className="text-[#0378BF] p-1.5 pr-2 text-end">0</td>
            </tr>
            <tr className="bg-sky-50">
              <td className="text-[#0378BF] p-1.5 pl-2 text-start">১ নং মেল</td>
              <td className="text-[#0378BF] p-1.5 pr-r text-end">0</td>
            </tr>
            <tr className="bg-sky-50">
              <td className="text-[#0378BF] p-1.5 pl-2 text-start">১ নং মেল</td>
              <td className="text-[#0378BF] p-1.5 pl-r text-end">0</td>
            </tr>
            <tr>
              <td className="text-[#0378BF] p-1.5 pl-2 text-start">
                মোট প্রোডাকশন
              </td>
              <td className="text-[#0378BF] p-1.5 pl-r text-end">0</td>
            </tr>
          </tbody>
        </table>
      </CardContainer>

      <CardContainer
        title="ডেলিভারি"
        color="bg-[#818CF8]"
        bg="bg-gradient-to-b from-[#818CF8] to-[#E0E7FF]"
      >
        <table className="w-full text-center border-collapse">
          <thead className="bg-[#C7D2FE]">
            <tr>
              <th className="px-2 py-1 text-[#616bc2]  font-normal text-start">
                শ্রেণি
              </th>
              <th className="px-2 py-1 text-[#616bc2]  font-normal text-end">
                ডেলিভারি
              </th>
            </tr>
          </thead>
          <tbody>
            {/* #818CF8 */}
            <tr className="bg-[#ECF0FF]">
              <td className="text-[#616bc2]  p-1.5 pl-2 text-start">
                ১ নং আদলা
              </td>
              <td className="text-[#616bc2] p-1.5 pl-r text-end">1,000</td>
            </tr>
            <tr className=" bg-[#EEF2FF]">
              <td className="text-[#616bc2]  p-1.5 pl-2 text-start">
                মোট ডেলিভারি
              </td>
              <td className="text-[#616bc2] p-1.5 pl-r text-end">1,000</td>
            </tr>
          </tbody>
        </table>
      </CardContainer>
    </div>
  );
}
