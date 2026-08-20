"use client";

import { useState, useEffect, useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import CustomInput from "@/components/Reusable/CustomInput";
import CustomModalBottom from "@/components/Reusable/CustomModalBottom";
import { DatePicker } from "@/components/Others/DatePicker";
import { Input } from "@/components/ui/input";
import SmsSwitch from "@/components/Reusable/SmsSwitch";
import { useGetSingleInvoiceQuery, useLazyGetSingleInvoiceQuery } from "@/redux/features/invoice.features";
import { Label } from "@radix-ui/react-dropdown-menu";
import { IChallanItem } from "@/types/types";
import CustomSelect from "@/components/Reusable/CustomSelect";
import {
  useCreateDeliveryMutation,
  useGetNextDeliveryNoQuery,
} from "@/redux/features/delivery.features";
import { showToast } from "@/components/Toast/CustomToast";
import { RiErrorWarningFill } from "react-icons/ri";
import { FaCircleCheck } from "react-icons/fa6";
import { MdOutlineError } from "react-icons/md";
import CustomDatePickerState from "@/components/Reusable/CustomDatePickerState";
import CustomStatus from "@/components/Reusable/CustomStatus";

type TCustomModal = {
  isOpen: boolean;
  onClose: () => void;
  invoiceId?: number;
};

type TDelivery = {
  deliveryNo: string;
  invoiceId: number | string;
  deliveryDate: Date;
  nextDeliveryDate: Date;
  customer: {
    name: string;
    phoneNumber: string;
    address: string;
  };
  items: {
    class: string;
    quantity: number;
    todaysDelivery?: number;
    remainingDelivery?: number;
  };
  itemId?: number;
  carRent?: string;
  driverName?: string;
  driverMobileNumber?: string;
  carNumber?: string;
  note?: string;
  savingType?: string;
};

const NewDeliveryModal = ({
  isOpen,
  onClose,
  invoiceId: invoId,
}: TCustomModal) => {
  const [nextDeliveryDate, setNextDeliveryDate] = useState<Date | undefined>();
  const [sendSms, setSendSms] = useState<boolean>(false);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [saveType, setSaveType] = useState<string>("");

  const [createDelivery, { isLoading: createDeliveryLoading }] =
    useCreateDeliveryMutation();
  const { data: nextDeliveryNo, isLoading: deliveryNoLoading, isError: nextDeliveryError } =
    useGetNextDeliveryNoQuery(undefined);
  const [
    getSingleInvoice,
    {
      data,
      error,
      isLoading,
      isError,
    },
  ] = useLazyGetSingleInvoiceQuery();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    control,
    setValue,
    formState: { errors },
  } = useForm<Partial<TDelivery>>({
    defaultValues: {
      invoiceId: invoId || "",
      customer: {
        name: "",
        phoneNumber: "",
        address: "",
      },
      items: {
        class: "",
        quantity: 0,
        todaysDelivery: 0,
        remainingDelivery: 0,
      },
      note: "",
      deliveryNo: "",
    },
  });

  // eslint-disable-next-line react-hooks/incompatible-library
  // const invoiceId = watch("invoiceId");
  const targetClass = watch("items.class");
  const deliveryToday = watch("items.todaysDelivery");
  const willReceiveDelivery = watch("items.quantity");
  const invoiceId = watch("invoiceId")
  const items = data?.data?.items;
  const itemName = items?.map((item: IChallanItem) => ({
    label: item?.class,
    value: item?.class,
  }));
  const selectedItem = data?.data?.items?.find(
    (item: IChallanItem) => item?.class === targetClass,
  );




  useEffect(() => {
    if (!data?.data) return;

    const firstItem = data.data.items?.[0];

    reset({
      invoiceId: invoId && invoId,
      customer: {
        name: data.data.customer?.name || "",
        phoneNumber: data.data.customer?.phoneNumber || "",
        address: data.data.customer?.address || "",
      },
      items: {
        class: firstItem?.class || "",
        quantity: Math.max(
          Number(firstItem?.quantity || 0) -
          Number(firstItem?.delivered || 0),
          0,
        ),
        todaysDelivery: 0,
        remainingDelivery: Math.max(
          Number(firstItem?.quantity || 0) -
          Number(firstItem?.delivered || 0),
          0,
        ),
      },
      note: data.data.note || "",
      deliveryNo: nextDeliveryNo?.data || "",
    });
  }, [data, invoId, reset]);



  useEffect(() => {
    const id = invoId || invoiceId;

    if (!id) return;

    getSingleInvoice(Number(id));
  }, [invoId, invoiceId, getSingleInvoice]);

  useEffect(() => {
    if (nextDeliveryNo?.data) {
      setValue("deliveryNo", nextDeliveryNo.data);
    }
  }, [nextDeliveryNo?.data, setValue]);


  useEffect(() => {
    setValue(
      "items.quantity",
      selectedItem?.quantity - selectedItem?.delivered,
    );
    setValue("items.remainingDelivery", willReceiveDelivery! - deliveryToday!);
  }, [
    selectedItem?.quantity,
    willReceiveDelivery,
    setValue,
    deliveryToday,
    selectedItem?.delivered,
  ]);


  const onSubmit: SubmitHandler<Partial<TDelivery>> = async (formData) => {
    formData.itemId = selectedItem?.id;
    formData.savingType = saveType;
    formData.deliveryDate = date;
    formData.nextDeliveryDate = nextDeliveryDate;
    (formData.items as IChallanItem).quantity = selectedItem?.quantity;
    if (
      (formData.items?.remainingDelivery as number) > 0 &&
      !nextDeliveryDate
    ) {
      return showToast({
        title: "পরবর্তী ডেলিভারি ডেট সেট করুন",
        type: "info",
        options: {
          icon: <RiErrorWarningFill />,
          duration: 4000,
        },
      });
    }

    try {
      const result = await createDelivery(formData).unwrap();
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
      title="নতুন ডেলিভারি"
      width="xxl"
    >

      <div className="relative">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 lg:grid-cols-3 items-center gap-2 mb-4 ">
            <CustomInput
              name="deliveryNo"
              label="ডেলিভারি নং"
              placeholder="ডেলিভারি নং"
              register={register}
              type="text"
              rules={{ required: "" }}
              readonly
            />
            <CustomInput
              name="invoiceId"
              label="চালান নং"
              placeholder="চালান নং"
              register={register}
              type="text"
              readonly
              rules={{ required: "" }}
            />
            <div>
              <CustomDatePickerState
                label=" ডেলিভারি তারিখ"
                onChange={setDate}
                value={date}
              />
            </div>
            <CustomInput
              name="customer.name"
              label="কাস্টমারের নাম"
              placeholder="কাস্টমারের নাম"
              register={register}
              type="text"
              readonly={data?.data?.customer}
              error={errors?.customer?.name}
              rules={{ required: "কাস্টমারের নাম লিখুন" }}
            />
            <CustomInput
              name="customer.phoneNumber"
              label="ফোন নম্বর"
              placeholder="ফোন নম্বর"
              register={register}
              type="text"
              readonly={data?.data?.customer}
              rules={{ required: "ফোন নম্বর লিখুন" }}
              error={errors?.customer?.phoneNumber}
            />
            <CustomInput
              name="customer.address"
              label="ডেলিভারি ঠিকানা"
              placeholder="ডেলিভারি ঠিকানা"
              register={register}
              type="text"
              readonly={data?.data?.customer}
              error={errors?.customer?.address}
              rules={{ required: "ঠিকানা নম্বর লিখুন" }}
            />
          </div>
          <div className="flex items-center gap-5">
            <div className="flex-1">
              <CustomInput
                name="note"
                label="নোট"
                placeholder="চালানের  নোট"
                register={register}
                type="text"
                rules={{ required: "" }}
              />
            </div>
            <div>
              <CustomDatePickerState
                label="  পরবর্তী ডেলিভারি তারিখ"
                value={nextDeliveryDate}
                onChange={setNextDeliveryDate}
              />
            </div>
          </div>

          {/* Items Table */}
          <div className="grid grid-cols-2 md:grid-cols-4 my-2 justify-between bg-gray-100 rounded-md p-4 gap-2">
            <div className="flex-1">
              <CustomSelect
                name={`items.class`}
                label="শ্রেণি"
                placeholder="শ্রেণি"
                control={control}
                options={itemName || []}
              />
            </div>
            <div className="flex-1">
              <CustomInput
                name={`items.quantity`}
                label="ডেলিভারি পাবে"
                placeholder="ডেলিভারি পাবে"
                register={register}
                type="number"
                readonly
                rules={{ required: "" }}
              />
            </div>
            <div className="flex-1">
              <CustomInput
                name={`items.todaysDelivery`}
                label="আজকের ডেলিভারি"
                placeholder="আজকের ডেলিভারি"
                register={register}
                type="number"
                rules={{ required: "" }}
              />  </div>
            <div className="flex-1">
              <CustomInput
                name={`items.remainingDelivery`}
                label="ডেলিভারি বাকি"
                placeholder="ডেলিভারি বাকি"
                register={register}
                type="number"
                rules={{ required: "" }}
              /></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 pt-3 gap-5">
            <div className="flex flex-col gap-1">
              <h1 className=" lg:pb-0.5 flex items-center  font-medium text-gray-600">
                ড্রাইভারের তথ্যঃ
              </h1>
              <CustomInput
                name={`driverName`}
                label=""
                placeholder="ড্রাইভারের নাম"
                register={register}
                type="text"
              />
              <CustomInput
                name={`driverMobileNumber`}
                label=""
                placeholder="ড্রাইভারের ফোন নম্বর"
                register={register}
                type="text"
              />
              <CustomInput
                name={`carNumber`}
                label=""
                placeholder="গাড়ি নম্বর"
                register={register}
                type="number"
              />
            </div>

            <div className="flex flex-col w-full max-w-2xs">
              <div className="space-y-2">
                <label className="text-gray-600 font-medium pb-1 flex items-center">
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

                <SmsSwitch
                  sendSms={sendSms}
                  setSendSms={setSendSms}
                  showBorder={true}
                  showLabel={false}
                  title="কাস্টমারকে এসএমএস দিন"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-1 col-span-2 md:col-span-1 w-full flex-col gap-2 pt-5 sm:flex-row sm:items-center">
              {/* Clear */}
              <button
                type="button"
                onClick={() =>
                  reset({
                    customer: {
                      address: "",
                      name: "",
                      phoneNumber: "",
                    },
                  })
                }
                className="w-full rounded border border-gray-300 bg-white px-5 py-2 text-[14px] font-medium text-gray-500 duration-500 hover:border-[#039A63] hover:text-[#039A63] sm:w-auto sm:flex-1"
              >
                ক্লিয়ার
              </button>

              {/* Save */}
              {/* <button
                type="button"
                onClick={() => setSaveType("saveOnly")}
                className="w-full rounded bg-[#039A63] px-5 py-2 text-[14px] font-medium text-white transition hover:bg-[#028a58] sm:w-auto sm:flex-1"
              >
                সেভ করুন
              </button> */}

              {/* Save + New Delivery */}
              <button
                type="button"
                onClick={() => setSaveType("saveAndCreate")}
                className="w-full rounded bg-[#039A63] px-5 py-2 text-[14px] font-medium text-white transition hover:bg-[#028a58] sm:w-auto sm:flex-1"
                disabled={createDeliveryLoading}
              >
                {createDeliveryLoading ? "সেভ হচ্ছে.." : "সেভ + নতুন ডেলিভারি"}
              </button>
            </div>
          </div>
        </form>
        {(isLoading || deliveryNoLoading) && (
          <div className="absolute inset-0 w-full  bg-gray-100/50 blur-md"></div>
        )}
      </div>
    </CustomModalBottom>
  );
};

export default NewDeliveryModal;
