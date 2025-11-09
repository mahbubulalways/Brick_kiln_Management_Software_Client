"use client";

import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import CustomInputLabel from "@/components/Reusable/CustomInputLabel";
import CustomModalBottom from "@/components/Reusable/CustomModalBottom";
import { DatePicker } from "@/components/Others/DatePicker";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

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
  carRent: string;
  items: TChalanItem[];
};

const NewDeliveryModal = ({ isOpen, onClose }: TCustomModal) => {
  const { register, handleSubmit, reset } = useForm<TKhatiyan>({});

  const [enabled, setEnabled] = useState(false);
  const onSubmit: SubmitHandler<TKhatiyan> = (data) => {
    console.log(data);
    reset();
    onClose();
  };

  return (
    <CustomModalBottom
      isOpen={isOpen}
      onClose={onClose}
      title="নতুন ডেলিভারি 🚚"
      width="w-3xl h-[75vh] lg:h-[75vh] overflow-y-auto pb-5 no-scrollbar"
    >
      {/* Main Form */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 lg:grid-cols-3 items-center gap-4 mb-4 pt-3">
          <CustomInputLabel
            name="deliveryNo"
            label="ডেলিভারি নং"
            placeholder="ডেলিভারি নং"
            register={register}
            type="text"
          />
          <CustomInputLabel
            name="chalanNo"
            label="চালান নং"
            placeholder="চালান নং"
            register={register}
            type="text"
          />
          <CustomInputLabel
            name="deliveryDate"
            label="ডেলিভারি তারিখ"
            placeholder="ডেলিভারি তারিখ"
            register={register}
            type="text"
          />
          <CustomInputLabel
            name="customerName"
            label="কাস্টমারের নাম"
            placeholder="কাস্টমারের নাম"
            register={register}
            type="text"
          />
          <CustomInputLabel
            name="phoneNo"
            label="ফোন নম্বর"
            placeholder="ফোন নম্বর"
            register={register}
            type="text"
          />
          <CustomInputLabel
            name="deliveryAddress"
            label="ডেলিভারি ঠিকানা"
            placeholder="ডেলিভারি ঠিকানা"
            register={register}
            type="text"
          />
        </div>
        <div className="flex items-center gap-5">
          <div className="flex-1">
            <CustomInputLabel
              name="note"
              label="নোট"
              placeholder="চালানের  নোট"
              register={register}
              type="text"
            />
          </div>
          <div>
            <h1 className="pb-1 lg:pb-0.5 flex items-center text-xs font-medium text-gray-600">
              পরবর্তী ডেলিভারি তারিখ
            </h1>
            <DatePicker />
          </div>
        </div>
        {/* Items Table */}

        <div className="flex items-center my-2 justify-between bg-gray-100 rounded-md p-4 gap-2">
          <CustomInputLabel
            name={`class`}
            label="শ্রেণি"
            placeholder="শ্রেণি"
            register={register}
            type="text"
          />
          <CustomInputLabel
            name={`items.rate`}
            label="ডেলিভারি পাবে"
            placeholder="ডেলিভারি পাবে"
            register={register}
            type="number"
          />
          <CustomInputLabel
            name={`items.quantity`}
            label="আজকের ডেলিভারি"
            placeholder="আজকের ডেলিভারি"
            register={register}
            type="number"
          />
          <CustomInputLabel
            name={`items.price`}
            label="ডেলিভারি বাকি"
            placeholder="ডেলিভারি বাকি"
            register={register}
            type="number"
          />
        </div>

        {/*  */}

        <div className="grid grid-cols-3 pt-3  gap-5">
          <div className="flex flex-col gap-1">
            <h1 className=" lg:pb-0.5 flex items-center text-xs font-medium text-gray-600">
              ড্রাইভারের তথ্যঃ
            </h1>
            <CustomInputLabel
              name={`items.price`}
              label=""
              placeholder="ড্রাইভারের নাম"
              register={register}
              type="text"
            />
            <CustomInputLabel
              name={`items.price`}
              label=""
              placeholder="ড্রাইভারের ফোন নম্বর"
              register={register}
              type="text"
            />
            <CustomInputLabel
              name={`items.price`}
              label=""
              placeholder="গাড়ি নম্বর"
              register={register}
              type="number"
            />
          </div>

          <div className="flex flex-col w-full max-w-2xs">
            <div>
              <label className="text-gray-600 text-xs font-medium pb-1 flex items-center">
                গাড়ি ভাড়া
              </label>
              <div className="relative w-full ">
                <Input
                  type="number"
                  placeholder="ভাড়া"
                  {...register("carRent")}
                  className="h-16 text-6xl pl-8 rounded border border-gray-300 shadow-none placeholder:text-2xl"
                  style={{
                    fontSize: "24px",
                  }}
                />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-4xl pointer-events-none">
                  ৳
                </span>
              </div>
            </div>
            <div className="flex items-center w-full gap-3 p-2 border rounded-md mt-2">
              <span className="text-gray-600  ">কাস্টমারকে এসএমএস দিন</span>
              <Switch
                checked={enabled}
                onCheckedChange={setEnabled}
                className="data-[state=checked]:bg-green-500 h-6 w-12"
              />
            </div>
          </div>

          <div className="flex flex-col pt-5 gap-2">
            <div
              onClick={() => reset()}
              className="text-[14px] border border-gray-300 bg-white hover:border-[#039A63] px-10 py-1.5 text-gray-500 duration-500 hover:text-[#039A63] font-medium rounded cursor-pointer text-center"
            >
              ক্লিয়ার
            </div>
            <button className="text-[14px] bg-[#039A63] px-8 py-1.5 text-white font-medium rounded cursor-pointer">
              সেভ করুন
            </button>
            <button className="text-[14px] bg-[#039A63] px-8 py-1.5 text-white font-medium rounded cursor-pointer">
              সেভ + নতুন ডেলিভারি
            </button>
          </div>
        </div>
      </form>
    </CustomModalBottom>
  );
};

export default NewDeliveryModal;
