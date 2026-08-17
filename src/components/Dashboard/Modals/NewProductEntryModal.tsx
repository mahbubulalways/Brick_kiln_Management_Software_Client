"use client";

import CustomModal from "@/components/Reusable/CustomModal";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import CustomInput from "@/components/Reusable/CustomInput";
import { useCreateCashMutation } from "@/redux/features/cash.features";
import { showToast } from "@/components/Toast/CustomToast";
import CustomImagePicker from "@/components/Reusable/CustomImagePicker/CustomImagePicker";
import CustomWarrantyCheckbox from "@/components/Reusable/CustomWarrantyCheckbox";
import CustomDatePicker from "@/components/Reusable/CustomDatePicker";
import CustomSelect from "@/components/Reusable/CustomSelect";

type TCustomModal = {
  isOpen: boolean;
  onClose: () => void;
};

type TProductForm = {
  productName: string;
  category: string;
  shop: string;
  quantity: number;
  price: number;
  productImage: File | null;
  warranty: Date | null;
};

const NewProductEntryModal = ({
  isOpen,
  onClose,
}: TCustomModal) => {
  const [hasWarranty, setHasWarranty] = useState(false);

  // const [mutateAsync, { isLoading }] = useCreateCashMutation();

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<TProductForm>({
    defaultValues: {
      productName: "",
      category: "",
      shop: "",
      quantity: 0,
      price: 0,
      productImage: null,
      warranty: null,
    },
  });

  const handleWarrantyChange = (value: boolean) => {
    setHasWarranty(value);

    if (!value) {
      reset(
        {
          productName: "",
          category: "",
          shop: "",
          quantity: 0,
          price: 0,
          productImage: null,
          warranty: null,
        },
        {
          keepValues: true,
        }
      );
    }
  };

  const onSubmit: SubmitHandler<TProductForm> = async (data) => {
    const payload = {
      ...data,
      warranty: hasWarranty ? data.warranty : null,
    };
    console.log(payload);
    try {
      // const result = await mutateAsync(payload).unwrap();

      // showToast({
      //   title: result?.message || "মালামাল সফলভাবে এন্ট্রি হয়েছে",
      //   type: "success",
      // });

      reset();
      setHasWarranty(false);
      onClose();
    } catch (error: any) {
      showToast({
        title:
          error?.data?.message ||
          "মালামাল এন্ট্রি করতে সমস্যা হয়েছে",
        type: "error",
      });
    }
  };

  const handleClear = () => {
    reset({
      productName: "",
      category: "",
      shop: "",
      quantity: 0,
      price: 0,
      productImage: null,
      warranty: null,
    });

    setHasWarranty(false);
  };

  return (
    <CustomModal
      isOpen={isOpen}
      onClose={onClose}
      title="📦 নতুন মালামাল এন্ট্রি"
      width="xl"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
          {/* LEFT SIDE */}
          <div className="col-span-3 flex w-full flex-col gap-4">
            {/* Product Name */}
            <CustomInput
              name="productName"
              label="প্রোডাক্টের নাম"
              placeholder="প্রোডাক্টের নাম লিখুন"
              register={register}
              type="text"
              error={errors.productName}
            />

            {/* Category */}
            <CustomSelect
              name="category"
              label="ক্যাটাগরি"
              placeholder="ক্যাটাগরি লিখুন"
              control={control}
              searchable
              options={[
                { label: "Tools", value: "Tools" },
                { label: "Machinery", value: "Machinery" },
                { label: "Vehicles", value: "Vehicles" },
                { label: "Furniture", value: "Furniture" },
                { label: "Electronics", value: "Electronics" },
              ]}
              error={errors.category}
            />

            {/* Vendor / Shop */}
            <CustomInput
              name="shop"
              label="ভেন্ডর / দোকান"
              placeholder="কার কাছ থেকে কেনা হয়েছে?"
              register={register}
              type="text"
              error={errors.shop}
            />

            {/* Quantity + Price */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <CustomInput
                name="quantity"
                label="পরিমাণ"
                placeholder="পরিমাণ লিখুন"
                register={register}
                type="number"

                error={errors.quantity}
              />

              <CustomInput
                name="price"
                label="একক মূল্য"
                placeholder="একক মূল্য লিখুন"
                register={register}
                type="number"

                error={errors.price}
              />
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="col-span-2 flex flex-col gap-4">
            {/* Product Image */}
            <CustomImagePicker
              control={control}
              name="productImage"
              label="প্রোডাক্টের ছবি"
              error={errors.productImage}
            />

            {/* Warranty */}
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
              {!hasWarranty ? (
                <CustomWarrantyCheckbox
                  value={hasWarranty}
                  onChange={handleWarrantyChange}
                />
              ) : (
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-700">
                      ওয়ারেন্টি শেষ হওয়ার তারিখ
                    </label>
                  </div>

                  <CustomDatePicker
                    control={control}
                    name="warranty"
                    error={errors.warranty}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex items-center gap-3 pt-6">
          <button
            type="button"
            onClick={handleClear}
            // disabled={isLoading}
            className="w-full cursor-pointer rounded-lg border border-gray-300 bg-white px-6 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            ক্লিয়ার
          </button>

          <button
            // disabled={isLoading}
            type="submit"
            className="w-full cursor-pointer rounded-lg bg-[#039A63] px-6 py-2.5 text-sm font-medium text-white transition hover:bg-[#028653] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {true ? "সেভ হচ্ছে..." : "সেভ করুন"}
          </button>
        </div>
      </form>
    </CustomModal>
  );
};

export default NewProductEntryModal;