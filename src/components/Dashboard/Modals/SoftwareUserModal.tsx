"use client";
import CustomInputLabel from "@/components/Reusable/CustomInputLabel";
import CustomModal from "@/components/Reusable/CustomModal";
import { SubmitHandler, useForm } from "react-hook-form";
type TCustomModal = {
  isOpen: boolean;
  onClose: () => void;
};

type SoftwareUserModal = {
  name: string;
  userName: string;
  userType: string;
  password: string;
};
const SoftwareUserModal = ({ isOpen, onClose }: TCustomModal) => {
  const { register, handleSubmit } = useForm<SoftwareUserModal>({
    defaultValues: {},
  });
  const onSubmit: SubmitHandler<SoftwareUserModal> = async (data) => {};
  return (
    <CustomModal
      isOpen={isOpen}
      onClose={onClose}
      title="নতুন ইউজার অ্যাড"
      width="w-sm"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-2">
          <CustomInputLabel
            name="name"
            label="নাম"
            placeholder=""
            register={register}
            readonly
            type="text"
          />
          <CustomInputLabel
            name="userName"
            label="ইউজারনেম"
            placeholder=""
            register={register}
            readonly
            type="text"
          />
          <CustomInputLabel
            name="userType"
            label="ইউজারের ধরন"
            placeholder=""
            register={register}
            readonly
            type="text"
          />
          <CustomInputLabel
            name="password"
            label="পাসওয়ার্ড"
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

export default SoftwareUserModal;
