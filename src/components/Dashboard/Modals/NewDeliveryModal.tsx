"use client";

import { useState, useEffect, useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import CustomInputLabel from "@/components/Reusable/CustomInputLabel";
import CustomModalBottom from "@/components/Reusable/CustomModalBottom";
import { DatePicker } from "@/components/Others/DatePicker";
import { Input } from "@/components/ui/input";
import SmsSwitch from "@/components/Reusable/SmsSwitch";
import { useLazyGetSingleInvoiceQuery } from "@/redux/features/invoice.features";
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
  const { data: nextDeliveryNo, isLoading: deliveryNoLoading } =
    useGetNextDeliveryNoQuery(undefined);
  const [getInvoice, { data, isLoading }] = useLazyGetSingleInvoiceQuery();

  const defaultValues = { invoiceId: invoId || "" };
  const {
    register,
    handleSubmit,
    reset,
    watch,
    control,
    setValue,
    formState: { errors },
  } = useForm<Partial<TDelivery>>({
    defaultValues: defaultValues,
  });

  // eslint-disable-next-line react-hooks/incompatible-library
  const invoiceId = watch("invoiceId");
  const targetClass = watch("items.class");
  const deliveryToday = watch("items.todaysDelivery");
  const willReceiveDelivery = watch("items.quantity");

  const items = data?.data?.items;
  const itemName = items?.map((item: IChallanItem) => item?.class);
  const selectedItem = data?.data?.items?.find(
    (item: IChallanItem) => item?.class === targetClass
  );
  // Fetch invoice when invoiceId changes

  useEffect(() => {
    if (!invoiceId) {
      return;
    }
    const timer = setTimeout(() => {
      getInvoice(invoiceId as number);
    }, 1500);

    return () => clearTimeout(timer);
  }, [invoiceId, getInvoice]);

  // Reset customer data when invoice data arrives
  useEffect(() => {
    if (data?.data) {
      reset(() => ({
        customer: {
          name: data.data.customer.name || "",
          phoneNumber: data.data.customer.phoneNumber || "",
          address: data.data.customer.address || "",
        },
        items: {
          class: data?.data?.items?.[0]?.class,
          quantity:
            data?.data?.items?.[0]?.quantity -
            data?.data?.items?.[0]?.delivered,
        },
        note: data?.data?.note || "",
      }));
    } else {
      reset(() => ({
        note: "",
        customer: {
          address: "",
          name: "",
          phoneNumber: "",
        },
      }));
    }
  }, [data, reset, nextDeliveryNo?.data, invoId]);

  useEffect(() => {
    setValue(
      "items.quantity",
      selectedItem?.quantity - selectedItem?.delivered
    );
    setValue("items.remainingDelivery", willReceiveDelivery! - deliveryToday!);
  }, [
    selectedItem?.quantity,
    willReceiveDelivery,
    setValue,
    deliveryToday,
    selectedItem?.delivered,
  ]);

  useEffect(() => {
    reset(() => ({
      deliveryNo: nextDeliveryNo?.data,
    }));
  }, [nextDeliveryNo?.data, reset]);

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
      title="নতুন ডেলিভারি 🚚"
      width="w-3xl h-[75vh] lg:h-[75vh] overflow-y-auto pb-5 no-scrollbar"
    >
      <div className="relative">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 lg:grid-cols-3 items-center gap-4 mb-4 pt-3">
            <CustomInputLabel
              name="deliveryNo"
              label="ডেলিভারি নং"
              placeholder="ডেলিভারি নং"
              register={register}
              type="text"
              required
            />
            <CustomInputLabel
              name="invoiceId"
              label="চালান নং"
              placeholder="চালান নং"
              register={register}
              type="text"
              required
            />
            <div>
              <Label className="pb-1 lg:pb-0.5 flex items-center text-sm font-medium text-gray-600">
                ডেলিভারি তারিখ
              </Label>
              <DatePicker setDate={setDate} date={date} />
            </div>
            <CustomInputLabel
              name="customer.name"
              label="কাস্টমারের নাম"
              placeholder="কাস্টমারের নাম"
              register={register}
              type="text"
              readonly={data?.data?.customer}
              error={errors?.customer?.name}
              errMsg="কাস্টমারের নাম লিখুন"
              required
            />
            <CustomInputLabel
              name="customer.phoneNumber"
              label="ফোন নম্বর"
              placeholder="ফোন নম্বর"
              register={register}
              type="text"
              readonly={data?.data?.customer}
              required
              error={errors?.customer?.phoneNumber}
              errMsg="ফোন নম্বর লিখুন"
            />
            <CustomInputLabel
              name="customer.address"
              label="ডেলিভারি ঠিকানা"
              placeholder="ডেলিভারি ঠিকানা"
              register={register}
              type="text"
              readonly={data?.data?.customer}
              error={errors?.customer?.address}
              errMsg="ঠিকানা নম্বর লিখুন"
              required
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
                required
              />
            </div>
            <div>
              <h1 className="pb-1 lg:pb-0.5 flex items-center text-xs font-medium text-gray-600">
                পরবর্তী ডেলিভারি তারিখ
              </h1>
              <DatePicker
                date={nextDeliveryDate}
                setDate={setNextDeliveryDate}
              />
            </div>
          </div>

          {/* Items Table */}
          <div className="flex items-center my-2 justify-between bg-gray-100 rounded-md p-4 gap-2">
            <CustomSelect
              name={`items.class`}
              label="শ্রেণি"
              placeholder="শ্রেণি"
              control={control}
              options={itemName || []}
              // defaultValue={itemName?.[0] ?? ""}
            />
            <CustomInputLabel
              name={`items.quantity`}
              label="ডেলিভারি পাবে"
              placeholder="ডেলিভারি পাবে"
              register={register}
              type="number"
              readonly
              required
            />
            <CustomInputLabel
              name={`items.todaysDelivery`}
              label="আজকের ডেলিভারি"
              placeholder="আজকের ডেলিভারি"
              register={register}
              type="number"
              required
            />
            <CustomInputLabel
              name={`items.remainingDelivery`}
              label="ডেলিভারি বাকি"
              placeholder="ডেলিভারি বাকি"
              register={register}
              type="number"
              required
            />
          </div>

          <div className="grid grid-cols-3 pt-3 gap-5">
            <div className="flex flex-col gap-1">
              <h1 className=" lg:pb-0.5 flex items-center text-xs font-medium text-gray-600">
                ড্রাইভারের তথ্যঃ
              </h1>
              <CustomInputLabel
                name={`driverName`}
                label=""
                placeholder="ড্রাইভারের নাম"
                register={register}
                type="text"
              />
              <CustomInputLabel
                name={`driverMobileNumber`}
                label=""
                placeholder="ড্রাইভারের ফোন নম্বর"
                register={register}
                type="text"
              />
              <CustomInputLabel
                name={`carNumber`}
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
                <SmsSwitch
                  sendSms={sendSms}
                  setSendSms={setSendSms}
                  showBorder={true}
                  showLabel={false}
                  title="কাস্টমারকে এসএমএস দিন"
                />
              </div>
            </div>

            <div className="flex flex-col pt-5 gap-2">
              <div
                onClick={() =>
                  reset({
                    customer: {
                      address: "",
                      name: "",
                      phoneNumber: "",
                    },
                  })
                }
                className="text-[14px] border border-gray-300 bg-white hover:border-[#039A63] px-10 py-1.5 text-gray-500 duration-500 hover:text-[#039A63] font-medium rounded cursor-pointer text-center"
              >
                ক্লিয়ার
              </div>
              {/* <button
                onClick={() => setSaveType("saveOnly")}
                className="text-[14px] bg-[#039A63] px-8 py-1.5 text-white font-medium rounded cursor-pointer"
              >
                সেভ করুন
              </button> */}
              <button
                onClick={() => setSaveType("saveAndCreate")}
                className="text-[14px] bg-[#039A63] px-8 py-1.5 text-white font-medium rounded cursor-pointer"
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
