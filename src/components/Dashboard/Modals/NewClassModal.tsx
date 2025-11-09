"use client";

import CustomInputLabel from "@/components/Reusable/CustomInputLabel";
import CustomModal from "@/components/Reusable/CustomModal";
import CustomSelect from "@/components/Reusable/CustomSelect";
import { SubmitHandler, useForm } from "react-hook-form";

type TCustomModal = {
  isOpen: boolean;
  onClose: () => void;
};

type TClass = {
  classType: string;
  className: string;
  rate: string;
};

const NewClassModal = ({ isOpen, onClose }: TCustomModal) => {
  const { register, handleSubmit, control, reset } = useForm<TClass>({
    defaultValues: {},
  });

  const onSubmit: SubmitHandler<TClass> = (data) => {
    console.log(data);
  };

  return (
    <CustomModal
      isOpen={isOpen}
      onClose={onClose}
      title="শ্রেণি অ্যাড/আপডেট"
      width="w-sm"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-2">
          <CustomSelect
            name="classType"
            label="শ্রেণির ধরণ"
            placeholder=""
            control={control} // ✅ instead of register
            options={["ইট", "আধলা", "অন্যান্য"]}
          />

          <CustomInputLabel
            name="className"
            label="শ্রেণির নাম"
            placeholder=""
            register={register}
            type="text"
          />

          <CustomInputLabel
            name="rate"
            label="রেট"
            placeholder="৳"
            register={register}
            type="text"
          />
        </div>

        <div className="flex items-center justify-between pt-5">
          <div
            onClick={() => reset()}
            className="text-[14px] border border-gray-300 bg-white hover:border-[#039A63] px-10 py-1.5 text-gray-500 duration-500 hover:text-[#039A63] font-medium rounded cursor-pointer"
          >
            ক্লিয়ার
          </div>
          <button
            type="submit"
            className="text-[14px] bg-[#039A63] px-8 py-1.5 text-gray-100 font-medium rounded cursor-pointer"
          >
            অ্যাড করুন
          </button>
        </div>
      </form>
    </CustomModal>
  );
};

export default NewClassModal;
