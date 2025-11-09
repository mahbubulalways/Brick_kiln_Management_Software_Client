"use client";

import { useState } from "react";
import { SubmitHandler, useForm, useFieldArray } from "react-hook-form";
import CustomInputLabel from "@/components/Reusable/CustomInputLabel";
import CustomModalBottom from "@/components/Reusable/CustomModalBottom";
import { DatePicker } from "@/components/Others/DatePicker";
import { Plus, Trash } from "lucide-react";

type TCustomModal = {
  isOpen: boolean;
  onClose: () => void;
};

type TChalanItem = {
  category: string;
  rate: number;
  quantity: number;
  price: number;
};

type TKhatiyan = {
  serial: string;
  name: string;
  address: string;
  chalanType: string;
  deliveryDate: Date | null;
  note: string;
  items: TChalanItem[];
};

const UpdateChalanModal = ({ isOpen, onClose }: TCustomModal) => {
  const { register, control, handleSubmit, reset, watch } = useForm<TKhatiyan>({
    defaultValues: {
      serial: "",
      name: "",
      address: "",
      chalanType: "",
      deliveryDate: null,
      note: "",
      items: [{ category: "", rate: 0, quantity: 0, price: 0 }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  const onSubmit: SubmitHandler<TKhatiyan> = (data) => {
    console.log(data);
    reset();
    onClose();
  };

  return (
    <CustomModalBottom
      isOpen={isOpen}
      onClose={onClose}
      title="নতুন চালান 😍"
      width="w-4xl h-[85vh] lg:h-[80vh] overflow-y-auto pb-5 no-scrollbar"
    >
      {/* Header Buttons */}
      <div className="flex flex-col lg:flex-row justify-between gap-4 mb-4 h-">
        {/* Buttons */}
        <div className="flex items-stretch sm:items-center gap-2 w-full lg:w-auto">
          <button className="bg-[#039A63] text-white px-4 sm:px-6 py-2 rounded   font-medium hover:bg-[#028a58] transition flex items-center justify-center gap-2 w-full sm:w-auto">
            নতুন কাস্টমার
          </button>
          <button className="text-orange-500 border border-orange-500 px-3 py-2 rounded   hover:bg-orange-400 hover:text-white transition w-full sm:w-auto text-center">
            পুরাতন কাস্টমার
          </button>
        </div>

        {/* Serial & Date */}
        <div className="flex  items-stretch sm:items-center gap-3 w-full lg:w-auto">
          <div className="flex items-center border-2 border-gray-300 rounded-md px-2 py-1 w-full sm:w-auto">
            <label className="  text-gray-700 whitespace-nowrap mr-2">
              চালান নম্বর:
            </label>
            <input
              type="text"
              className="outline-none w-full sm:w-20 pl-2 text-gray-800"
              placeholder="000"
              {...register("serial")}
            />
          </div>
          <div className="w-full sm:w-auto">
            <DatePicker />
          </div>
        </div>
      </div>

      {/* Main Form */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          <CustomInputLabel
            name="name"
            label="ফোন নম্বর"
            placeholder="ফোন নম্বর"
            register={register}
            type="text"
          />
          <CustomInputLabel
            name="name"
            label="কাস্টমারের নাম"
            placeholder="কাস্টমারের নাম"
            register={register}
            type="text"
          />
          <CustomInputLabel
            name="address"
            label="কাস্টমারের ঠিকানা"
            placeholder="কাস্টমারের ঠিকানা"
            register={register}
            type="text"
          />
          <CustomInputLabel
            name="chalanType"
            label="চালানের ধরণ"
            placeholder="চালানের ধরণ"
            register={register}
            type="text"
          />
          <CustomInputLabel
            name="chalanType"
            label="ডেলিভারি তারিখ"
            placeholder="চালানের ধরণ"
            register={register}
            type="text"
          />
          <CustomInputLabel
            name="note"
            label="নোট"
            placeholder="নোট"
            register={register}
            type="text"
          />
        </div>

        {/* Items Table */}
        <div className="mb-4">
          {fields.map((item, index) => (
            <div
              key={item.id}
              className="flex items-center gap-2 bg-gray-50 rounded-md p-2"
            >
              <button
                type="button"
                className="flex items-center justify-center p-1 mt-4  rounded bg-gray-200 border border-gray-300 text-green-500 hover:bg-green-50 cursor-pointer"
                onClick={() =>
                  append({ category: "", rate: 0, quantity: 0, price: 0 })
                }
              >
                <Plus size={20} />
              </button>
              <CustomInputLabel
                name={`items.${index}.category`}
                label="শ্রেণি"
                placeholder="শ্রেণি"
                register={register}
                type="text"
              />
              <CustomInputLabel
                name={`items.${index}.rate`}
                label="রেট"
                placeholder="0"
                register={register}
                type="number"
              />
              <CustomInputLabel
                name={`items.${index}.quantity`}
                label="পরিমাণ"
                placeholder="0"
                register={register}
                type="number"
              />
              <CustomInputLabel
                name={`items.${index}.price`}
                label="মূল্য"
                placeholder="0"
                register={register}
                type="number"
              />
              <button
                type="button"
                disabled={fields.length === 1}
                className={`flex items-center justify-center cursor-pointer  p-1 mt-4 rounded ${
                  fields.length === 1
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-red-100 text-red-500 hover:bg-red-200"
                }`}
                onClick={() => remove(index)}
              >
                <Trash size={20} />
              </button>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div className="bg-red-100 hidden lg:block">DEMO</div>
          <div className="grid grid-cols-2 gap-2">
            <CustomInputLabel
              name={`da`}
              label="মূল্য"
              placeholder="0"
              register={register}
              type="number"
            />
            <CustomInputLabel
              name={`da`}
              label="ছাড়"
              placeholder="0"
              register={register}
              type="number"
            />
            <CustomInputLabel
              name={`da`}
              label="গাড়ি ভাড়া"
              placeholder="৳ 0"
              register={register}
              type="number"
            />
            <CustomInputLabel
              name={`da`}
              label="মোট"
              placeholder="৳ 0"
              register={register}
              type="number"
            />
            <CustomInputLabel
              name={`da`}
              label="নগদ"
              placeholder="৳ 0"
              register={register}
              type="number"
            />
            <CustomInputLabel
              name={`da`}
              label="বাকি"
              placeholder="৳ 0"
              register={register}
              type="number"
            />
          </div>

          <div className="block lg:hidden">
            <p className="text-xs text-gray-600 pb-1">এসএমএস</p>
            <p className="bg-gray-200 py-2 px-4   rounded w-full">SMS Off</p>
          </div>
        </div>
        {/* Footer Buttons */}
        <div className="grid grid-cols-2 gap-5 pt-5">
          <div
            onClick={() => reset()}
            className="text-[14px] border border-gray-300 bg-white hover:border-[#039A63] px-10 py-1.5 text-gray-500 duration-500 hover:text-[#039A63] font-medium rounded cursor-pointer text-center"
          >
            ক্লিয়ার
          </div>
          <button className="text-[14px] bg-[#039A63] px-8 py-1.5 text-white font-medium rounded cursor-pointer">
            অ্যাড করুন
          </button>
        </div>
      </form>
    </CustomModalBottom>
  );
};

export default UpdateChalanModal;
