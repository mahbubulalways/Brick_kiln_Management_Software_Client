"use client";
import CustomInputLabel from "@/components/Reusable/CustomInputLabel";
import { SubmitHandler, useForm } from "react-hook-form";

type TPasswordChange = {
  oldPassword: string;
  newPassword: string;
};
const PasswordChange = () => {
  const { register, handleSubmit } = useForm<TPasswordChange>({
    defaultValues: {},
  });
  const onSubmit: SubmitHandler<TPasswordChange> = async (data) => {};
  return (
    <div className="w-sm mx-auto flex items-center justify-center flex-col h-full">
      <h1 className="text-xl font-semibold text-gray-900 py-3">
        পাসওয়ার্ড পরিবর্তন
      </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-3">
          <CustomInputLabel
            name="oldPassword"
            label="পুরাতন পাসওয়ার্ড"
            placeholder=""
            register={register}
            readonly
            type="text"
          />
          <CustomInputLabel
            name="newPassword"
            label="নতুন পাসওয়ার্ড"
            placeholder=""
            register={register}
            readonly
            type="text"
          />
        </div>

        <button className="text-[14px] bg-[#039A63] px-8 py-1.5 text-gray-100 font-medium rounded cursor-pointer mt-3 w-full">
          কনফার্ম
        </button>
        <p className="text-[11px] text-center mt-4 text-orange-400">
          নোটঃ পাসওয়ার্ড পরিবর্তন হলে আটোমেটিক লগআউট হয়ে যাবে
        </p>
      </form>
    </div>
  );
};

export default PasswordChange;
