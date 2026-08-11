"use client";

import React from "react";
import CustomModal from "@/components/Reusable/CustomModal";
import { SubmitHandler, useForm } from "react-hook-form";
import CustomInput from "@/components/Reusable/CustomInput";
import { showToast } from "@/components/Toast/CustomToast";
import CustomSelect from "@/components/Reusable/CustomSelect";
import CustomDatePicker from "@/components/Reusable/CustomDatePicker";
import { SERVER_ERROR_MESSAGE } from "@/constant";

import { useGetAllClassAndRateQuery } from "@/redux/features/classAndRate.features";
import { TClassAndRate } from "@/types/types";

import { useGetAllRoundQuery } from "@/redux/features/round.features";

import {
  useCreateUnloadInfoMutation,
  useGetAllUnloadInfoQuery,
} from "@/redux/features/unload.features";
import { TUnloadItem, TUnloadResponse } from "@/interface/unload";

// =========================
// MODAL TYPE
// =========================
type TCustomModal = {
  isOpen: boolean;
  onClose: () => void;
};

// =========================
// FORM TYPE
// =========================
export interface TLoadInfo {
  date: Date;
  round: string;
  quantity: number;
  className: string;
}

const NewUnloadModal = ({
  isOpen,
  onClose,
}: TCustomModal) => {
  // =========================
  // ROUND
  // =========================
  const {
    data: roundData,
    isError: roundError,
    isLoading: roundLoading,
  } = useGetAllRoundQuery(undefined);

  const formatRoundLabelValue =
    roundData?.data?.map(
      (dt: { name: string }) => ({
        label: dt.name,
        value: dt.name,
      })
    ) || [];

  // =========================
  // CLASS
  // =========================
  const {
    isLoading: classLoading,
    data: fetchedData,
    isError: classError,
  } = useGetAllClassAndRateQuery(undefined);

  const formatClassLabelValue =
    fetchedData?.data
      ?.filter(
        (dt: TClassAndRate) =>
          dt.classType !== "অন্যান্য"
      )
      ?.map((dt: TClassAndRate) => ({
        label: dt.className,
        value: dt.className,
      })) || [];

  // =========================
  // GET UNLOAD DATA
  // =========================
  const {
    data: unloadData,
    isLoading: unloadLoading,
  } = useGetAllUnloadInfoQuery(
    {
      limit: 1000,
      page: 1,
    },
    {
      skip: !isOpen,
    }
  );

  const unloads = unloadData?.data?.data ?? [];

  // =========================
  // CREATE UNLOAD
  // =========================
  const [mutateAsync, { isLoading }] =
    useCreateUnloadInfoMutation();

  // =========================
  // FORM
  // =========================
  const {
    register,
    handleSubmit,
    watch,
    reset,
    control,
    setValue,
  } = useForm<TLoadInfo>({
    defaultValues: {
      date: new Date(),
      round: "",
      className: "",
      quantity: 0,
    },
  });

  // =========================
  // WATCH FORM VALUES
  // =========================
  const selectedRound = watch("round");
  const selectedClass = watch("className");
  const selectedDate = watch("date");

  // =========================
  // FIND EXISTING QUANTITY
  // =========================
  const existingQuantity = React.useMemo(() => {
    if (
      !selectedRound ||
      !selectedClass ||
      !selectedDate
    ) {
      return 0;
    }

    // Selected date -> YYYY-MM-DD
    const selectedDateKey = new Date(selectedDate)
      .toISOString()
      .split("T")[0];

    // =========================
    // FIND SAME ROUND + DATE
    // =========================
    const roundData = unloads.find((item:TUnloadResponse) => {
      if (!item.date || !item.round) {
        return false;
      }

      const itemDateKey = new Date(item.date)
        .toISOString()
        .split("T")[0];

      return (
        item.round.name === selectedRound &&
        itemDateKey === selectedDateKey
      );
    });

    // Round + Date না থাকলে
    if (!roundData) {
      return 0;
    }

    // =========================
    // FIND SAME CLASS
    // =========================
    const classData =
      roundData.unloadItems?.find(
        (item:TUnloadItem) =>
          item.classType?.className ===
          selectedClass
      );

    // Class না থাকলে 0
    return classData?.quantity ?? 0;
  }, [
    unloads,
    selectedRound,
    selectedClass,
    selectedDate,
  ]);

  // =========================
  // AUTO SET QUANTITY
  // =========================
  React.useEffect(() => {
    setValue(
      "quantity",
      existingQuantity
    );
  }, [
    existingQuantity,
    setValue,
  ]);

  // =========================
  // SUBMIT
  // =========================
  const onSubmit: SubmitHandler<TLoadInfo> =
    async (data) => {
      try {
        const result =
          await mutateAsync(data).unwrap();

        showToast({
          title: result?.message,
          type: "success",
        });

        onClose();

        // Optional reset
        reset({
          date: new Date(),
          round: "",
          className: "",
          quantity: 0,
        });
      } catch (error: any) {
        showToast({
          title:
            error?.data?.message ||
            SERVER_ERROR_MESSAGE,
          type: "error",
        });
      }
    };

  // =========================
  // CLEAR FORM
  // =========================
  const handleClear = () => {
    reset({
      date: new Date(),
      round: "",
      className: "",
      quantity: 0,
    });
  };

  return (
    <CustomModal
      isOpen={isOpen}
      onClose={onClose}
      title="নতুন আনলোড"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="grid grid-cols-2 gap-2">

          {/* =========================
              ROUND
          ========================= */}
          <CustomSelect
            name="round"
            label="রাউন্ড"
            placeholder="রাউন্ড"
            control={control}
            options={
              formatRoundLabelValue
            }
            isError={roundError}
            isLoading={roundLoading}
            rules={{
              required: "",
            }}
          />

          {/* =========================
              DATE
          ========================= */}
          <CustomDatePicker
            control={control}
            name="date"
            label="আনলোডের তারিখ"
          />

          {/* =========================
              CLASS
          ========================= */}
          <CustomSelect
            name="className"
            label="শ্রেণি"
            placeholder="শ্রেণি"
            control={control}
            options={
              formatClassLabelValue
            }
            isError={classError}
            isLoading={classLoading}
            rules={{
              required: "",
            }}
          />

          {/* =========================
              QUANTITY
          ========================= */}
          <CustomInput
            name="quantity"
            label="পরিমাণ"
            placeholder="পরিমাণ"
            register={register}
            type="text"
          />
        </div>

        {/* =========================
            BUTTONS
        ========================= */}
        <div className="flex items-center justify-between pt-5">

          {/* CLEAR */}
          <div
            onClick={handleClear}
            className="
              text-[14px]
              border
              border-gray-300
              bg-white
              hover:border-[#039A63]
              px-10
              py-1.5
              text-gray-500
              duration-500
              hover:text-[#039A63]
              font-medium
              rounded
              cursor-pointer
            "
          >
            ক্লিয়ার
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            className="
              text-[14px]
              bg-[#039A63]
              px-8
              py-1.5
              text-gray-100
              font-medium
              rounded
              cursor-pointer
              disabled:opacity-50
            "
            disabled={
              isLoading ||
              unloadLoading
            }
          >
            {isLoading
              ? "অ্যাড হচ্ছে..."
              : "অ্যাড করুন"}
          </button>
        </div>
      </form>
    </CustomModal>
  );
};

export default NewUnloadModal;