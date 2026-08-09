"use client";
import { DatePicker } from "@/components/Others/DatePicker";
import CustomDatePickerState from "@/components/Reusable/CustomDatePickerState";
import CustomInput from "@/components/Reusable/CustomInput";
import CustomModalBottom from "@/components/Reusable/CustomModalBottom";
import SmsSwitch from "@/components/Reusable/SmsSwitch";
import { showToast } from "@/components/Toast/CustomToast";
import {
  useCollectionDueMutation,
  useGetCustomerDueQuery,
} from "@/redux/features/dueCollection.features";
import { useEffect, useMemo, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaCircleCheck } from "react-icons/fa6";
import { MdOutlineError } from "react-icons/md";
import { RiErrorWarningFill } from "react-icons/ri";
type TCustomModal = {
  isOpen: boolean;
  onClose: () => void;
};

type TDueCollection = {
  customerId?: string;
  name: string;
  address: string;
  season: string;
  due: number | string;
  collect?: number | string;
  newDue?: number;
  nextDate?: Date;
  invoiceId: number;
};
const NewDueCollectionModal = ({ isOpen, onClose }: TCustomModal) => {
  const [collectionDue, { isLoading }] = useCollectionDueMutation();
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [sendSms, setSendSms] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<TDueCollection>({
    defaultValues: {},
  });

  const customerId = watch("customerId");
  const collect = watch("collect");

  const { data, isFetching, isError } = useGetCustomerDueQuery(
    Number(customerId),
    {
      skip: !customerId,
      refetchOnMountOrArgChange: true,
    }
  );

  const due = data?.data?.totalPurchased - data?.data?.totalPaid || 0;

  const newDue = useMemo(() => due - (Number(collect) || 0), [due, collect]);


  // Populate customer info when data loads
 useEffect(() => {
  if (isError) {
    reset();
    setDate(undefined);
    return;
  }

  if (!data?.data) return;

  reset((prev) => ({
    ...prev,
    name: data.data.name || "",
    address: data.data.address || "",
    due:
      Number(data.data.totalPurchased || 0) -
      Number(data.data.totalPaid || 0),
    season: "2427",
  }));
}, [data?.data, isError, reset]);

  const onSubmit: SubmitHandler<TDueCollection> = async (data) => {
    data.newDue = newDue;
    data.nextDate = date;
    data.collect = Number(data.collect);
    data.due = Number(data.due);
    const check = data.due > data.collect;
    try {
      if (!data.nextDate && check) {
        return showToast({
          title: "নতুন তারিখ সেট করুন",
          type: "info",
          options: {
            icon: <RiErrorWarningFill />,
            duration: 4000,
          },
        });
      }
      const result = await collectionDue(data).unwrap();
      if (result?.success) {
        onClose();
        return showToast({
          title: result?.message,
          type: "success",
          options: {
            icon: <FaCircleCheck className="h-5 w-5" />,
            duration: 4000,
          },
        });
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
     
      return showToast({
        title: error.data?.message,
        type: "success",
        options: {
          icon: <MdOutlineError className="h-5 w-5" />,
          duration: 4000,
        },
      });
    }
  };

  return (
    <CustomModalBottom
      isOpen={isOpen}
      onClose={onClose}
      title="বাকি জমা 😍"
      width="xxl"
    >
      <div className="relative">
        <form onSubmit={handleSubmit(onSubmit)} className="pt-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
            <CustomInput
              name="customerId"
              label="কাস্টমার আইডি"
              placeholder="কাস্টমার আইডি"
              register={register}
              type="text"
              rules={{ required: "কাস্টমার আইডি" }}
              error={errors.customerId}

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

          <div className="bg-gray-100 rounded-md p-12 grid grid-cols-2 gap-5 mt-12">
            <div className="grid grid-cols-2 gap-5">
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
                <CustomDatePickerState height="9" onChange={setDate} value={date} label=" নতুন তারিখ" placeholder=" নতুন তারিখ"/>
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
                  {customerId && newDue ? (
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
                  customerId: "",
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
            <button className="text-[14px] bg-[#039A63] px-8 py-1.5 text-gray-100 font-medium rounded cursor-pointer w-full">
              অ্যাড করুন
            </button>
          </div>
        </form>
        {isFetching && (
          <div className="absolute inset-0 w-full  bg-gray-100/50 blur-md"></div>
        )}
      </div>
    </CustomModalBottom>
  );
};

export default NewDueCollectionModal;
