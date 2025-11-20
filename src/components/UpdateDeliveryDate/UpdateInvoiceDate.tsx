"use client";
import { useState } from "react";
import { DatePicker } from "../Others/DatePicker";

const UpdateInvoiceDate = ({ invoiceId }: { invoiceId: number }) => {
  const [newDeliveryDate, setNewDeliveryDate] = useState<Date | undefined>(
    new Date()
  );
  console.log(invoiceId);
  return (
    <div>
      <div>
        <h1 className="pb-1 lg:pb-0.5 flex items-center text-sm font-medium text-gray-600">
          নতুন ডেলিভারি তারিখ
        </h1>
        <DatePicker date={newDeliveryDate} setDate={setNewDeliveryDate} />
      </div>

      <div className=" text-sm pt-2">
        <h1 className="text-orange-600 pt-2 pb-0.5 underline">সতর্কতাঃ</h1>
        <p className=" text-gray-500 text-xs">
          এই চালানের যদি আরও শ্রেণির ইট ডেলিভারি বাকি থাকে তাহলে সেই ইটের
          ডেলিভারি তারিখ ও এটার সাথে পরিবর্তন হয়ে যাবে । তাই নিশ্চিত হয়ে তারিখ
          পরিবর্তন করুন ।
        </p>
      </div>
      <div className="flex items-center gap-2 justify-end pt-5">
        <div
          //   onClick={() => reset()}
          className="text-sm border border-gray-300 bg-white hover:border-[#039A63] px-2 py-1 text-gray-500 duration-500 hover:text-[#039A63]  rounded cursor-pointer"
        >
          ক্লিয়ার
        </div>
        <button className="bg-[#039A63] px-2 text-sm py-1 rounded text-white gap-2 cursor-pointer">
          পরিবর্তন
        </button>
      </div>
    </div>
  );
};

export default UpdateInvoiceDate;
