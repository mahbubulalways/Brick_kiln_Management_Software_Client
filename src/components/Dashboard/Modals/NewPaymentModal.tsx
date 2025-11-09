"use client";
import CustomInputLabel from "@/components/Reusable/CustomInputLabel";
import CustomModal from "@/components/Reusable/CustomModal";
import CustomModalBottom from "@/components/Reusable/CustomModalBottom";
import CustomSelect from "@/components/Reusable/CustomSelect";
import { SubmitHandler, useForm } from "react-hook-form";
type TCustomModal = {
  isOpen: boolean;
  onClose: () => void;
};

type TKhatiyan = {
  serial: string;
  name: string;
  group: number;
};
const NewPaymentModal = ({ isOpen, onClose }: TCustomModal) => {
  const { register, handleSubmit } = useForm<TKhatiyan>({
    defaultValues: {},
  });
  const onSubmit: SubmitHandler<TKhatiyan> = async (data) => {};
  return (
    <CustomModalBottom
      isOpen={isOpen}
      onClose={onClose}
      title="নতুন পেমেন্ট"
      width="w-4xl h-[70vh] lg:h-[80vh] overflow-y-auto pb-5 no-scrollbar"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="border rounded-t-md mt-2">
          <h1 className="bg-gray-200 px-4 rounded-t-md py-1.5   ">
            পেমেন্টের বিস্তারিত
          </h1>
          <div className="px-4 pt-2 pb-4 rounded-b-md flex flex-col gap-5">
            <div className="grid grid-cols-2 gap-2">
              <CustomInputLabel
                name="serial"
                label="খতিয়ান"
                placeholder="খতিয়ান নির্বাচন করুন"
                register={register}
                readonly
                type="text"
              />
              <CustomSelect
                name="paymentType"
                label="অগ্রিম/রেগুরাল পেমেন্ট"
                placeholder="অগ্রিম/রেগুরাল পেমেন্ট"
                register={register}
                options={["রেগুলার পেমেন্ট", "অগ্রিম পেমেন্ট", "বাকি পেমেন্ট"]}
              />
            </div>
            <CustomInputLabel
              name="paymentDetails"
              label="পেমেন্টের বিস্তারিত বর্ণনা লিখুন"
              placeholder="পেমেন্টের বিস্তারিত বর্ণনা লিখুন"
              register={register}
              type="text"
            />
          </div>
        </div>

        <div className="border rounded-t-md mt-5">
          <h1 className="bg-gray-200 px-4 rounded-t-md py-1.5   ">
            পেমেন্ট প্রদান
          </h1>
          <div className="px-4 pt-2 pb-4 rounded-b-md grid grid-cols-2 gap-2">
            <CustomInputLabel
              name="serial"
              label="পরিমান"
              placeholder="পরিমান লিখুন"
              register={register}
              readonly
              type="text"
            />
            <CustomInputLabel
              name="paymentDetails"
              label="মোট বিল"
              placeholder="মোট বিল"
              register={register}
              type="text"
            />
            <CustomInputLabel
              name="paymentDetails"
              label="কর্তন"
              placeholder="কেটে রাখা হল"
              register={register}
              type="text"
            />
            <CustomInputLabel
              name="paymentDetails"
              label="পেমেন্ট"
              placeholder="পেমেন্ট দেওয়া হল"
              register={register}
              type="text"
            />
          </div>
        </div>

        <div className="flex items-center justify-between pt-5">
          <div className="text-[14px] border border-gray-300 bg-white hover:border-[#039A63] px-10 py-1.5  text-gray-500 duration-500 hover:text-[#039A63] font-medium rounded cursor-pointer">
            ক্লিয়ার
          </div>
          <button className="text-[14px] bg-[#039A63] px-8 py-1.5 text-gray-100 font-medium rounded cursor-pointer">
            অ্যাড করুন
          </button>
        </div>
      </form>
    </CustomModalBottom>
  );
};

export default NewPaymentModal;
