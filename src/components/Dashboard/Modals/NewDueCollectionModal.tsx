"use client";
import { DatePicker } from "@/components/Others/DatePicker";
import CustomInputLabel from "@/components/Reusable/CustomInputLabel";
import CustomModalBottom from "@/components/Reusable/CustomModalBottom";
import SmsSwitch from "@/components/Reusable/SmsSwitch";
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
const NewDueCollectionModal = ({ isOpen, onClose }: TCustomModal) => {
  const { register, handleSubmit } = useForm<TKhatiyan>({
    defaultValues: {},
  });
  const onSubmit: SubmitHandler<TKhatiyan> = async (data) => {};
  return (
    <CustomModalBottom
      isOpen={isOpen}
      onClose={onClose}
      title="বাকি জমা 😍"
      width="w-3xl overflow-y-auto pb-5 no-scrollbar"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="pt-5">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
          <CustomInputLabel
            name="serial"
            label="কাস্টমার আইডি"
            placeholder="কাস্টমার আইডি"
            register={register}
            readonly
            type="text"
          />
          <CustomInputLabel
            name="serial"
            label="কাস্টমারের নাম"
            placeholder="কাস্টমারের নাম"
            register={register}
            readonly
            type="text"
          />
          <CustomInputLabel
            name="serial"
            label="কাস্টমারের ঠিকানা"
            placeholder="কাস্টমারের ঠিকানা"
            register={register}
            readonly
            type="text"
          />
          <CustomInputLabel
            name="serial"
            label="সিজন"
            placeholder="সিজন"
            register={register}
            readonly
            type="text"
          />
        </div>

        <div className="bg-gray-100 rounded-md p-3 grid grid-cols-2 gap-5 mt-5">
          <div className="grid grid-cols-2 gap-3">
            <CustomInputLabel
              name="serial"
              label="মোট বাকি"
              placeholder="৳ মোট বাকি"
              register={register}
              readonly
              type="text"
              cls="bg-white"
            />
            <CustomInputLabel
              name="serial"
              label="জমা"
              placeholder="৳ জমা"
              register={register}
              readonly
              type="text"
              cls="bg-white"
            />
            <div>
              <label className="text-gray-600 text-xs font-medium pb-0.5  flex items-center">
                নতুন তারিখ
              </label>
              <DatePicker />
            </div>
            <SmsSwitch />
          </div>
          <div>
            <label className="text-gray-600 text-xs font-medium pb-2 flex items-center">
              নতুন বাকি
            </label>
            <div className="bg-white text-center py-7 rounded-md border border-gray-300">
              <span className=" text-gray-400  text-2xl pointer-events-none">
                নতুন বাকি
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 justify-between pt-5 w-full">
          <div className="text-[14px] border border-gray-300 bg-white hover:border-[#039A63] px-10 py-1.5  text-gray-500 duration-500 hover:text-[#039A63] font-medium rounded cursor-pointer w-full text-center">
            ক্লিয়ার
          </div>
          <button className="text-[14px] bg-[#039A63] px-8 py-1.5 text-gray-100 font-medium rounded cursor-pointer w-full">
            অ্যাড করুন
          </button>
        </div>
      </form>
    </CustomModalBottom>
  );
};

export default NewDueCollectionModal;
