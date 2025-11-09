"use client";

import React, { useEffect, useState } from "react";
import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import CustomInputLabel from "@/components/Reusable/CustomInputLabel";
import CustomModalBottom from "@/components/Reusable/CustomModalBottom";
import { DatePicker } from "@/components/Others/DatePicker";
import { Plus, Trash } from "lucide-react";
import { Label } from "@radix-ui/react-dropdown-menu";
import SmsSwitch from "@/components/Reusable/SmsSwitch";

type TCustomModal = {
  isOpen: boolean;
  onClose: () => void;
};

type TChallanItem = {
  class: string;
  rate: number;
  quantity: number;
  price: number;
};

type TChallan = {
  serial: string;
  phoneNumber: string;
  customerName: string;
  address: string;
  chalanType: string;
  deliveryDate: Date | null;
  challanDate: Date;
  note: string;
  items: TChallanItem[];
  productPrice: number;
  discount: number;
  carRent: number;
  totalPrice: number;
  cash: number;
  due: number;
};

const NewChalanModal = ({ isOpen, onClose }: TCustomModal) => {
  const [deliveryDate, setDeliveryDate] = useState<Date>(new Date());
  const [challanDate, setChallanDate] = useState<Date>(new Date());
  const [duePayDate, setDuepayDate] = useState<Date>(new Date());

  const { register, handleSubmit, reset, control, watch, setValue } =
    useForm<TChallan>({
      defaultValues: {
        items: [{ class: "", rate: 0, quantity: 0, price: 0 }],
      },
    });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  const watchItems = watch("items");
  const carRent = watch("carRent");
  const discount = watch("discount");
  const cash = watch("cash");

  // Update price instantly whenever rate or quantity changes
  watchItems.forEach((item, index) => {
    const rate = Number(item.rate) || 0;
    const quantity = Number(item.quantity) || 0;
    const price = rate * quantity;
    if (item.price !== price) {
      setValue(`items.${index}.price`, price);
    }
  });

  const onSubmit: SubmitHandler<TChallan> = (data) => {
    data.deliveryDate = deliveryDate;
    data.challanDate = challanDate;
    console.log("✅ Final Data:", data);
  };

  const totalProductPrice = watchItems.reduce(
    (acc, current) => acc + Number(current.price),
    0
  );

  const totalPrice = totalProductPrice + Number(carRent) - Number(discount);
  const safeCash = Math.min(cash, totalPrice);
  const due = totalPrice - safeCash;
  useEffect(() => {
    const safeDue = Math.max(due, 0);
    setValue("productPrice", totalProductPrice);
    setValue("totalPrice", totalPrice);
    setValue("due", safeDue);
  }, [due, setValue, totalPrice, totalProductPrice]);
  return (
    <CustomModalBottom
      isOpen={isOpen}
      onClose={onClose}
      title="নতুন চালান 😍"
      width="w-4xl h-[85vh] lg:h-[85vh] overflow-y-auto pb-5 no-scrollbar"
    >
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between gap-4 mb-4">
        <div className="flex items-stretch sm:items-center gap-2 w-full lg:w-auto">
          <button className="bg-[#039A63] text-white px-4 sm:px-6 py-2 rounded font-medium hover:bg-[#028a58] transition flex items-center justify-center gap-2 w-full sm:w-auto">
            নতুন কাস্টমার
          </button>
          <button className="text-orange-500 border border-orange-500 px-3 py-2 rounded hover:bg-orange-400 hover:text-white transition w-full sm:w-auto text-center">
            পুরাতন কাস্টমার
          </button>
        </div>

        <div className="flex items-stretch sm:items-center gap-3 w-full lg:w-auto">
          <div className="flex items-center border-2 border-gray-300 rounded-md px-2 py-1 w-full sm:w-auto">
            <label className="text-gray-700 whitespace-nowrap mr-2">
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
            <DatePicker date={challanDate} setDate={setChallanDate} />
          </div>
        </div>
      </div>

      {/* Main Form */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          <CustomInputLabel
            name="phoneNumber"
            label="ফোন নম্বর"
            placeholder="ফোন নম্বর"
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
          <div>
            <Label className=" flex items-center text-sm font-medium text-gray-600">
              ডেলিভারি তারিখ
            </Label>
            <DatePicker setDate={setDeliveryDate} date={deliveryDate} />
          </div>
          <CustomInputLabel
            name="note"
            label="নোট"
            placeholder="নোট"
            register={register}
            type="text"
          />
        </div>

        {/* Items Section */}
        <div className="mb-4 flex flex-col gap-2">
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="flex items-center gap-2 bg-gray-50 rounded-md p-2"
            >
              <CustomInputLabel
                name={`items.${index}.class`}
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
                type="text"
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
                readonly={true}
              />

              <div className="flex flex-col gap-1 mt-4">
                <button
                  type="button"
                  className="flex items-center justify-center p-1 rounded bg-green-100 text-green-600 hover:bg-green-200"
                  onClick={() =>
                    append({ class: "", rate: 0, quantity: 0, price: 0 })
                  }
                >
                  <Plus size={18} />
                </button>
                <button
                  type="button"
                  disabled={fields.length === 1}
                  className={`flex items-center justify-center p-1 rounded ${
                    fields.length === 1
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-red-100 text-red-500 hover:bg-red-200"
                  }`}
                  onClick={() => remove(index)}
                >
                  <Trash size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {due ? (
            <div className="hidden lg:flex flex-col items-center justify-center h-auto">
              <h1 className="text-orange-600 text-sm text-center">
                বাকি পরিশোধের তারিখ লিখুন
              </h1>
              <div className="w-max mx-auto py-2">
                <DatePicker date={duePayDate} setDate={setDuepayDate} />
              </div>
              <SmsSwitch
                showBorder={false}
                showLabel={false}
                title="কাস্টমারকে এসএমএস দিন"
              />
            </div>
          ) : (
            <div>
              <h1>hehehehehehehe</h1>
            </div>
          )}

          <div className="grid grid-cols-2 gap-2">
            <CustomInputLabel
              name="productPrice"
              label="মূল্য"
              placeholder="0"
              register={register}
              type="number"
              readonly
            />
            <CustomInputLabel
              name="discount"
              label="ছাড়"
              placeholder="0"
              register={register}
              type="number"
            />
            <CustomInputLabel
              name="carRent"
              label="গাড়ি ভাড়া"
              placeholder="৳ 0"
              register={register}
              type="number"
            />
            <CustomInputLabel
              name="totalPrice"
              label="মোট"
              placeholder="৳ 0"
              register={register}
              type="number"
              readonly
            />
            <CustomInputLabel
              name="cash"
              label="নগদ"
              placeholder="৳ 0"
              register={register}
              type="number"
            />
            <CustomInputLabel
              name="due"
              label="বাকি"
              placeholder="৳ 0"
              register={register}
              type="number"
            />
          </div>

          <div className="block lg:hidden">
            <p className="text-xs text-gray-600 pb-1">এসএমএস</p>
            <p className="bg-gray-200 py-2 px-4 rounded w-full">SMS Off</p>
          </div>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-2 gap-5 pt-5">
          <div
            onClick={() => reset()}
            className="text-[14px] border border-gray-300 bg-white hover:border-[#039A63] px-10 py-1.5 text-gray-500 duration-500 hover:text-[#039A63] font-medium rounded cursor-pointer text-center"
          >
            ক্লিয়ার
          </div>
          <button
            type="submit"
            className="text-[14px] bg-[#039A63] px-8 py-1.5 text-white font-medium rounded cursor-pointer"
          >
            অ্যাড করুন
          </button>
        </div>
      </form>
    </CustomModalBottom>
  );
};

export default NewChalanModal;
