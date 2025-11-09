"use client";
import CustomInputLabel from "@/components/Reusable/CustomInputLabel";
import CustomModal from "@/components/Reusable/CustomModal";
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
const KhotiyanModal = ({ isOpen, onClose }: TCustomModal) => {
  const { register, handleSubmit } = useForm<TKhatiyan>({
    defaultValues: {},
  });
  const onSubmit: SubmitHandler<TKhatiyan> = async (data) => {};
  return (
    <CustomModal
      isOpen={isOpen}
      onClose={onClose}
      title="খতিয়ান অ্যাড/আপডেট"
      width="w-sm"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-2">
          <CustomInputLabel
            name="serial"
            label="সিরিয়াল"
            placeholder=""
            register={register}
            readonly
            type="text"
          />
          <CustomInputLabel
            name="name"
            label="খতিয়ানের নাম"
            placeholder=""
            register={register}
            readonly
            type="text"
          />
          <CustomInputLabel
            name="group"
            label="খতিয়ানের গ্রুপ"
            placeholder=""
            register={register}
            readonly
            type="text"
          />
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
    </CustomModal>
  );
};

export default KhotiyanModal;
