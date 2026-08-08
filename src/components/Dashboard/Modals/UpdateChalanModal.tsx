"use client";

import { useEffect, useState } from "react";
import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import CustomInput from "@/components/Reusable/CustomInput";
import CustomModalBottom from "@/components/Reusable/CustomModalBottom";
import { DatePicker } from "@/components/Others/DatePicker";
import { Plus, Trash } from "lucide-react";
import { Label } from "@radix-ui/react-dropdown-menu";
import SmsSwitch from "@/components/Reusable/SmsSwitch";
import { useGetAllClassAndRateQuery } from "@/redux/features/classAndRate.features";
import CustomSelect from "@/components/Reusable/CustomSelect";
import {
  TChallanCreate,
  TClassAndRate,
  TCustomInvoiceModal,
} from "@/types/types";
import {
  useGetSingleInvoiceQuery,
  useUpdateInvoiceMutation,
} from "@/redux/features/invoice.features";
import { showToast } from "@/components/Toast/CustomToast";
import { MdOutlineError } from "react-icons/md";
import { FaCircleCheck } from "react-icons/fa6";
import CustomLoader from "@/components/Reusable/CustomLoader";
import CustomDatePickerState from "@/components/Reusable/CustomDatePickerState";
import CustomDatePicker from "@/components/Reusable/CustomDatePicker";

const UpdateChalanModal = ({
  isOpen,
  onClose,
  invoiceId,
  setInvoiceId,
}: TCustomInvoiceModal) => {
  const [deliveryDate, setDeliveryDate] = useState<Date | undefined>(
    new Date(),
  );
  const [challanDate, setChallanDate] = useState<Date | undefined>(new Date());
  const [duePayDate, setDuepayDate] = useState<Date | undefined>(new Date());
  const [sendSms, setSendSms] = useState<boolean>(false);
  // FETCH SINGLE INVOICE
  const { data: invoice, isLoading: invoiceLoading } = useGetSingleInvoiceQuery(
    invoiceId,
    {
      refetchOnMountOrArgChange: true,
    },
  );

  // GET CLASS AND RATE FOR DROPDOWN
  const { isLoading: classRateLoading, data: fetchedData } =
    useGetAllClassAndRateQuery(undefined);
  const classAndRate = fetchedData?.data || [];

  // UPDATE INVOICE
  const [mutateAsync, { isLoading: createInvoiceLoading }] =
    useUpdateInvoiceMutation();

  const classOptions = classAndRate?.map(
    (cls: TClassAndRate) => cls?.className,
  );

  // REACT HOOK FORM
  const { register, handleSubmit, reset, control, watch, setValue } =
    useForm<TChallanCreate>({
      defaultValues: {
        invoiceItems: {
          items: [{ class: "", rate: 0, quantity: 0, price: 0 }],
        },
      },
    });

  // ✅ FIX: Reset form when invoice data is loaded
  useEffect(() => {
    if (invoice?.data) {
      reset({
        customer: {
          phoneNumber: invoice.data.customer?.phoneNumber || "",
          name: invoice.data.customer?.name || "",
          address: invoice.data.customer?.address || "",
        },
        invoice: {
          note: invoice.data.note || "",
          serial: invoice.data.serial || "",
          discount: invoice.data.discount || 0,
          carRent: invoice.data.carRent || 0,
          due: invoice.data.due || 0,
          cash: invoice.data.cash || 0,
          chalanType: invoice.data.chalanType || "",
          challanDate: invoice.data.challanDate || "",
          deliveryDate: invoice.data.deliveryDate || "",
          duePaymentDate: invoice.data.duePaymentDate || "",
        },
        invoiceItems: {
          items:
            invoice.data.items && invoice.data.items.length > 0
              ? invoice.data.items
              : [{ class: "", rate: 0, quantity: 0, price: 0 }],
        },
      });

      // ✅ Sync dates with DB values if available
      if (invoice.data.deliveryDate)
        setDeliveryDate(new Date(invoice.data.deliveryDate));
      if (invoice.data.challanDate)
        setChallanDate(new Date(invoice.data.challanDate));
      if (invoice.data.duePaymentDate)
        setDuepayDate(new Date(invoice.data.duePaymentDate));
    }
  }, [invoice, reset]);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "invoiceItems.items",
  });

  const watchItems = watch("invoiceItems.items");
  const carRent = watch("invoice.carRent");
  const discount = watch("invoice.discount");
  const cash = watch("invoice.cash");

  // Update price instantly whenever rate or quantity changes
  watchItems?.forEach((item, index) => {
    const selectedClassName = item?.class;
    const rateFromClass =
      classAndRate?.find(
        (cls: TClassAndRate) => cls?.className === selectedClassName,
      )?.rate || 0;

    const quantity = Number(item?.quantity) || 0;
    const price = rateFromClass * quantity;

    if (Number(item?.rate) !== rateFromClass) {
      setValue(`invoiceItems.items.${index}.rate`, rateFromClass);
    }

    if (Number(item?.price) !== price) {
      setValue(`invoiceItems.items.${index}.price`, price);
    }
  });

  const totalProductPrice = watchItems?.reduce(
    (acc, current) => acc + Number(current?.price),
    0,
  );
  const totalPrice = totalProductPrice + Number(carRent) - Number(discount);
  const safeCash = Math.min(cash, totalPrice);
  const due = totalPrice - safeCash;

  // HANDLE CALCULATIONS
  useEffect(() => {
    const safeDue = Math.max(due, 0);
    setValue("invoice.productPrice", totalProductPrice);
    setValue("invoice.totalPrice", totalPrice);
    setValue("invoice.due", safeDue);
  }, [due, setValue, totalPrice, totalProductPrice]);

  //* FORM SUBMIT
  const onSubmit: SubmitHandler<TChallanCreate> = async (data) => {
    const allValid = watchItems.every((item) =>
      Object.entries(item)
        .filter(([key]) => key !== "delivered")
        .every(
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          ([_, value]) => value !== null && value !== undefined && value !== "",
        ),
    );

    if (allValid === false) {
      return showToast({
        title: "আইটেমের শ্রেণি/পরিমাণ/রেট ঠিক করে দিন",
        type: "error",
        options: {
          duration: 4000,
          icon: <MdOutlineError className="h-5 w-5" />,
        },
      });
    }
    data.invoice.deliveryDate = deliveryDate as Date;
    data.invoice.challanDate = challanDate as Date;
    data.invoice.duePaymentDate = duePayDate as Date;
    data.invoice.serial = Number(data.invoice.serial);
    data.invoice.carRent = Number(data.invoice.carRent);
    data.invoice.cash = Number(data.invoice.cash);
    data.invoice.discount = Number(data.invoice.discount);
    data.invoice.totalPrice = Number(data.invoice.totalPrice);
    data.invoice.due = Number(data.invoice.due);
    data.invoice.chalanType = invoice?.data?.chalanType;
    const updatedData = {
      payload: {
        invoice: data.invoice,
        invoiceItems: data.invoiceItems.items,
      },
      id: invoiceId,
    };
    try {
      const result = await mutateAsync(updatedData).unwrap();
      console.log(result);
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
      showToast({
        title: error?.data?.message,
        type: "error",
        options: {
          duration: 4000,
          icon: <MdOutlineError className="h-5 w-5" />,
        },
      });
    }
  };

  const handleClose = () => {
    onClose();
    setInvoiceId(0);
    reset();
  };

  return (
    <CustomModalBottom
      isOpen={isOpen}
      onClose={handleClose}
      title="আপডেট চালান 🧐"
      width="full"
    >
      {classRateLoading || invoiceLoading ? (
        <>
          <CustomLoader cls="h-[60vh]" />
        </>
      ) : (
        <div>
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
              <div className="flex items-center border-2 border-gray-300 rounded-md px-2 py-1 w-full sm:w-auto bg-gray-100">
                <label className="text-gray-700 whitespace-nowrap mr-2">
                  চালান নম্বর:
                </label>
                <input
                  type="text"
                  className="outline-none w-full sm:w-20 pl-2 text-gray-800"
                  placeholder="000"
                  {...register("invoice.serial")}
                  readOnly
                />
              </div>

              <CustomDatePickerState
                value={challanDate!}
                onChange={setChallanDate!}
                disablePastDates
              />
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
              <CustomInput
                name="customer.phoneNumber"
                label="ফোন নম্বর"
                placeholder="ফোন নম্বর"
                register={register}
                type="text"
                readonly
              />
              <CustomInput
                name="customer.name"
                label="কাস্টমারের নাম"
                placeholder="কাস্টমারের নাম"
                register={register}
                type="text"
                readonly
              />
              <CustomInput
                name="customer.address"
                label="কাস্টমারের ঠিকানা"
                placeholder="কাস্টমারের ঠিকানা"
                register={register}
                type="text"
                readonly
              />
              <CustomSelect
                name="invoice.chalanType"
                label="চালানের ধরণ"
                placeholder=""
                control={control}
                options={[
                  { label: "রেগুলার চালান", value: "রেগুলার চালান" },
                  { label: "অগ্রিম চালান", value: "অগ্রিম চালান" },
                ]}
              />
              <CustomDatePicker
                control={control}
                name=" data.invoice.deliveryDate"
                placeholder="ডেলিভারি তারিখ"
                label="ডেলিভারি তারিখ"
                disablePastDates
                rules={{ required: "ডেলিভারি তারিখ" }}
              />
              <CustomInput
                name="invoice.note"
                label="নোট"
                placeholder="নোট"
                register={register}
                type="text"
              />
            </div>

            <div className="mb-4 flex flex-col gap-2">
              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="flex items-end gap-2 bg-gray-50 rounded-md p-2"
                >
                  <button
                    type="button"
                    onClick={() =>
                      append({ class: "", rate: 0, quantity: 0, price: 0 })
                    }
                    className="flex h-10 w-10  cursor-pointer items-center justify-center rounded-lg border border-green-200 bg-green-50 text-green-600 transition-all duration-200 hover:bg-green-600 hover:text-white hover:shadow-md active:scale-95"
                    title="নতুন সারি যোগ করুন"
                  >
                    <Plus size={18} strokeWidth={2.5} />
                  </button>
                  <div className="flex-1">
                    <CustomSelect
                      name={`invoiceItems.items.${index}.class`}
                      label="শ্রেণি"
                      placeholder="শ্রেণি"
                      control={control}
                      options={classOptions || []}
                    />
                  </div>
                  <div className="flex-1">
                    <CustomInput
                      name={`invoiceItems.items.${index}.rate`}
                      label="রেট"
                      placeholder="0"
                      register={register}
                      type="text"
                      rules={{ required: "" }}
                    />
                  </div>{" "}
                  <div className="flex-1">
                    <CustomInput
                      name={`invoiceItems.items.${index}.quantity`}
                      label="পরিমাণ"
                      placeholder="0"
                      register={register}
                      type="number"
                      rules={{ required: "" }}
                    />
                  </div>{" "}
                  <div className="flex-1">
                    <CustomInput
                      name={`invoiceItems.items.${index}.price`}
                      label="মূল্য"
                      placeholder="0"
                      register={register}
                      type="number"
                      readonly={true}
                      rules={{ required: "" }}
                    />
                  </div>
                  <button
                    type="button"
                    disabled={fields.length === 1}
                    onClick={() => remove(index)}
                    title="সারি মুছে ফেলুন"
                    className={`flex h-10 w-10  cursor-pointer items-center justify-center rounded-lg border transition-all duration-200 active:scale-95 ${
                      fields.length === 1
                        ? "cursor-not-allowed border-gray-200 bg-gray-100 text-gray-400"
                        : "border-red-200 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white hover:shadow-md"
                    }`}
                  >
                    <Trash size={18} strokeWidth={2.5} />
                  </button>
                </div>
              ))}
            </div>

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
                    setSendSms={setSendSms}
                    sendSms={sendSms}
                  />
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center">
                  <div>
                    <h1 className="text-red-600 mx-auto bg-red-50 p-5 text-4xl font-semibold w-max">
                      DEMO
                    </h1>
                    <SmsSwitch
                      sendSms={sendSms}
                      setSendSms={setSendSms}
                      showBorder={false}
                      showLabel={false}
                      title="কাস্টমারকে এসএমএস দিন"
                    />
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-2">
                <CustomInput
                  name="invoice.productPrice"
                  label="মূল্য"
                  placeholder="0"
                  register={register}
                  type="number"
                  readonly
                  rules={{ required: "" }}
                />
                <CustomInput
                  name="invoice.discount"
                  label="ছাড়"
                  placeholder="0"
                  register={register}
                  type="number"
                  rules={{ required: "" }}
                />
                <CustomInput
                  name="invoice.carRent"
                  label="গাড়ি ভাড়া"
                  placeholder="৳ 0"
                  register={register}
                  type="number"
                  rules={{ required: "" }}
                />
                <CustomInput
                  name="invoice.totalPrice"
                  label="মোট"
                  placeholder="৳ 0"
                  register={register}
                  type="number"
                  readonly
                  rules={{ required: "" }}
                />
                <CustomInput
                  name="invoice.cash"
                  label="নগদ"
                  placeholder="৳ 0"
                  register={register}
                  type="number"
                />
                <CustomInput
                  name="invoice.due"
                  label="বাকি"
                  placeholder="৳ 0"
                  register={register}
                  type="number"
                  readonly
                />
              </div>

              <div className="block lg:hidden">
                <p className="text-xs text-gray-600 pb-1">এসএমএস</p>
                <p className="bg-gray-200 py-2 px-4 rounded w-full">SMS Off</p>
              </div>
            </div>

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
                disabled={createInvoiceLoading}
              >
                {createInvoiceLoading ? "সেভ হচ্ছে..." : "সেভ করুন"}
              </button>
            </div>
          </form>
        </div>
      )}
    </CustomModalBottom>
  );
};

export default UpdateChalanModal;
