import { TPaymentReport } from "@/interface/dashboard";
import CardContainer from "./CardContainer";

export default function Payment({payments}:{payments:TPaymentReport[]}) {


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
          {payments?.map((p, i) => (
            <tr key={i}>
              <td className="text-orange-500 p-1 pl-2">{p?.ledger}</td>
              <td className="text-orange-500 p-1 text-center">{p?.amount}</td>
              <td className="text-orange-500 p-1 text-end pr-2">{p?.paymentGiven}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </CardContainer>
  );
}
