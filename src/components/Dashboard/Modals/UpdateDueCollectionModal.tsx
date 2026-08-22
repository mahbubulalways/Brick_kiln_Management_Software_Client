"use client";
import { DatePicker } from "@/components/Others/DatePicker";
import CustomDatePickerState from "@/components/Reusable/CustomDatePickerState";
import CustomInput from "@/components/Reusable/CustomInput";
import CustomModalBottom from "@/components/Reusable/CustomModalBottom";
import SmsSwitch from "@/components/Reusable/SmsSwitch";
import { showToast } from "@/components/Toast/CustomToast";
import {
  useGetSingleDueQuery,
  useUpdateDueCollectionMutation,
} from "@/redux/features/dueCollection.features";
import { useEffect, useMemo, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaCircleCheck } from "react-icons/fa6";
import { MdOutlineError } from "react-icons/md";
type TCustomModal = {
  isOpen: boolean;
  onClose: () => void;
  id: string;
};

type TDueCollection = {
  customerCode: string;
  name: string;
  address: string;
  season: string;
  due: number | string;
  collect?: number | string;
  newDue?: number;
  nextDate?: Date;
  invoiceId: number;
};
const UpdateDueCollection = ({ isOpen, onClose, id }: TCustomModal) => {
  const { isLoading, data ,error} = useGetSingleDueQuery(id, {
    refetchOnMountOrArgChange: true,
  });
console.log(error)
  const [updateDueCollection, { isLoading: updateLoading }] =
    useUpdateDueCollectionMutation();

  const [date, setDate] = useState<Date | undefined>();
  const [sendSms, setSendSms] = useState(false);
  console.log(data)
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<TDueCollection>({
    defaultValues: {},
  });
  // eslint-disable-next-line react-hooks/incompatible-library
  const collect = watch("collect");

  useEffect(() => {
    if (!data?.data) return;

    reset({
      name: data.data.customer?.name,
      address: data.data.customer?.address,
      customerCode: data.data.customer?.customerCode,
      due: data.data.due,
      collect: data.data.collect,
      season: data.data.season,
    });
    setDate(new Date(data.data.nextDate));

  }, [data, reset]);
  const newDue = useMemo(
    () => data?.data?.due - (Number(collect) || 0),
    [data?.data?.due, collect]
  );

  const onSubmit: SubmitHandler<TDueCollection> = async (data) => {
    data.newDue = newDue;
    data.nextDate = date;

    const updateData = {
      payload: data,
      id: id,
    };
    try {
      const result = await updateDueCollection(updateData).unwrap();
      if (result?.success) {
        onClose();
        reset();
        return showToast({
          title: result?.message,
          type: "success",
          options: {
            duration: 4000,
            icon: <FaCircleCheck className="h-5 w-5" />,
          },
        });
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return showToast({
        title: error?.data?.message,
        type: "error",
        options: {
          duration: 4000,
          icon: <MdOutlineError className="h-5 w-5" />,
        },
      });
    }
  };


  return (
    <CustomModalBottom
      isOpen={isOpen}
      onClose={onClose}
      title="বাকি জমা (আপডেট)"
      width="xxl"
    >
      <div className="relative">
        <form onSubmit={handleSubmit(onSubmit)} className="pt-5">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
            <CustomInput
              name="customerCode"
              type="text"
              label="কাস্টমার আইডি"
              placeholder="কাস্টমার আইডি"
              register={register}
              rules={{ required: "কাস্টমার আইডি" }}
              error={errors.customerCode}
              readonly
            />
            <CustomInput
              name="name"
              label="কাস্টমারের নাম"
              placeholder="কাস্টমারের নাম"
              register={register}
              readonly
              type="text"
            />
            <CustomInput
              name="address"
              label="কাস্টমারের ঠিকানা"
              placeholder="কাস্টমারের ঠিকানা"
              register={register}
              readonly
              type="text"
            />
            <CustomInput
              name="season"
              label="সিজন"
              placeholder="সিজন"
              register={register}
              readonly
              type="text"
            />
          </div>

          <div className="bg-gray-100 rounded-md p-3 grid grid-cols-2 gap-5 mt-5">
            <div className="grid grid-cols-2 gap-3">
              <CustomInput
                name="due"
                label="মোট বাকি"
                placeholder="৳ মোট বাকি"
                register={register}
                readonly
                type="text"
              />
              <CustomInput
                name="collect"
                label="জমা"
                placeholder="৳ জমা"
                register={register}
                type="text"
                rules={{ required: "আজকের জমা লিখুন" }}
                error={errors.collect}
              />
              <div>
                <CustomDatePickerState
                  disablePastDates
                  height="9"
                  onChange={setDate}
                  value={date}
                  label=" নতুন তারিখ"
                  placeholder=" নতুন তারিখ"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 pb-1.5  flex items-center">
                  এসএমএস
                </label>
                <SmsSwitch sendSms={sendSms} setSendSms={setSendSms} />
              </div>
            </div>
            <div>
              <label className="text-gray-600 text-xs font-medium pb-2 flex items-center">
                নতুন বাকি
              </label>
              <div className="bg-white text-center py-7 rounded-md border border-gray-300">
                <span className=" text-gray-400  text-2xl pointer-events-none">
                  {id && newDue ? (
                    <p className="text-5xl font-medium text-red-600">
                      ৳ {newDue}
                    </p>
                  ) : (
                    "নতুন বাকি"
                  )}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 justify-between pt-5 w-full">
            <div
              onClick={() => {
                setDate(undefined);
                reset((prev) => ({
                  ...prev,
                  customerCode: "",
                  name: "",
                  address: "",
                  due: "",
                  season: "",
                  collect: "",
                }));
              }}
              className="text-[14px] border border-gray-300 bg-white hover:border-[#039A63] px-10 py-1.5  text-gray-500 duration-500 hover:text-[#039A63] font-medium rounded cursor-pointer w-full text-center"
            >
              ক্লিয়ার
            </div>
            <button
              disabled={updateLoading}
              className="text-[14px] bg-[#039A63] px-8 py-1.5 text-gray-100 font-medium rounded cursor-pointer w-full"
            >
              {updateLoading ? "আপডেট হচ্ছে..." : "আপডেট করুন"}
            </button>
          </div>
        </form>
        {isLoading && (
          <div className="absolute inset-0 w-full  bg-gray-100/50 blur-md"></div>
        )}
      </div>
    </CustomModalBottom>
  );
};

export default UpdateDueCollection;
