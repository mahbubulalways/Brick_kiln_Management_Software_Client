"use client";
import CustomInputLabel from "@/components/Reusable/CustomInputLabel";
import CustomModal from "@/components/Reusable/CustomModal";
import { SubmitHandler, useForm } from "react-hook-form";
type TCustomModal = {
  isOpen: boolean;
  onClose: () => void;
};

type TClass = {
  type: string;
  name: string;
  rate: number;
};
const NewCashModal = ({ isOpen, onClose }: TCustomModal) => {
  const { register, handleSubmit } = useForm<TClass>({
    defaultValues: {},
  });
  const onSubmit: SubmitHandler<TClass> = async (data) => {
    console.log(data);
  };
  return (
    <CustomModal
      isOpen={isOpen}
      onClose={onClose}
      title="ক্যাশের হিসাব"
      width="w-sm"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <CustomInputLabel
          name="paymentDetails"
          label="ক্যাশের বিবরণ"
          placeholder=""
          register={register}
          type="text"
        />
        <div className="flex items-center pt-3 gap-2">
          <CustomInputLabel
            name="totalBill"
            label="ক্যাশ ইন"
            placeholder=""
            register={register}
            type="text"
          />
          <CustomInputLabel
            name="totalBill"
            label="ক্যাশ আউট"
            placeholder=""
            register={register}
            type="text"
          />
        </div>

        <div className="flex items-center justify-between pt-5">
          <div className="text-[14px] border border-gray-300 bg-white hover:border-[#039A63] px-10 py-1.5  text-gray-500 duration-500 hover:text-[#039A63] font-medium rounded cursor-pointer">
            ক্লিয়ার
          </div>
          <button className="text-[14px] bg-[#039A63] px-8 py-1.5 text-gray-100 font-medium rounded cursor-pointer">
            সেভ করুন
          </button>
        </div>
      </form>
    </CustomModal>
  );
};

export default NewCashModal;
