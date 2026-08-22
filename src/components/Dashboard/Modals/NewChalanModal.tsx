"use client";

import { useEffect, useState } from "react";
import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import CustomModalBottom from "@/components/Reusable/CustomModalBottom";
import { Plus, Trash } from "lucide-react";
import { Label } from "@radix-ui/react-dropdown-menu";
import SmsSwitch from "@/components/Reusable/SmsSwitch";
import { useGetAllClassAndRateQuery } from "@/redux/features/classAndRate.features";
import CustomSelect from "@/components/Reusable/CustomSelect";
import { TChallanCreate, TClassAndRate } from "@/types/types";
import {
  useCreateInvoiceMutation,
  useGetInvoiceSerialQuery,
} from "@/redux/features/invoice.features";
import { showToast } from "@/components/Toast/CustomToast";
import { MdOutlineError } from "react-icons/md";
import { FaCircleCheck } from "react-icons/fa6";
import { RiErrorWarningFill } from "react-icons/ri";
import CustomInput from "@/components/Reusable/CustomInput";
import CustomDatePicker from "@/components/Reusable/CustomDatePicker";
import CustomDatePickerState from "@/components/Reusable/CustomDatePickerState";
import CustomStatus from "@/components/Reusable/CustomStatus";
import OldCustomerModal from "./OldCustomerModal";
type TCustomModal = {
  isOpen: boolean;
  onClose: () => void;
};
type TCustomer = {
  id: string;
  customerCode: string;
  name: string;
  phoneNumber: string;
  address?: string;
};

const NewChalanModal = ({ isOpen, onClose }: TCustomModal) => {
  const [deliveryDate, setDeliveryDate] = useState<Date | undefined>(
    new Date(),
  );
  const [challanDate, setChallanDate] = useState<Date | undefined>(new Date());
  const [duePayDate, setDuepayDate] = useState<Date | undefined>();
  const [sendSms, setSendSms] = useState<boolean>(false);
  const [openOlodCustomerModal, setOpenOldCustomerModal] = useState<boolean>(false);
  // GET INVOICE SERIAL FOR INVOICE NO
  const { data: invoiceSerial, isLoading: serialLoading, isError: invoiceError } =
    useGetInvoiceSerialQuery({ refetchOnMountOrArgChange: true });
  // GET CLASS AND RATE FOR DROPDOWN
  const { isLoading: classRateLoading, data: fetchedData, isError } =
    useGetAllClassAndRateQuery(undefined);
  const classAndRate = fetchedData?.data || [];

  // CREATE NEW INVOICE
  const [mutateAsync, { isLoading: createInvoiceLoading }] =
    useCreateInvoiceMutation();
  const classOptions = classAndRate?.map((cls: TClassAndRate) => ({
    label: cls?.className,
    value: cls?.className,
  }));
  // REACT HOOK FORM
  const {
    register,
    handleSubmit,
    reset,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<TChallanCreate>({
    defaultValues: {
      invoiceItems: {
        items: [{ class: "", rate: 0, quantity: 0, price: 0 }],
      },
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "invoiceItems.items",
  });

  // eslint-disable-next-line react-hooks/incompatible-library
  const watchItems = watch("invoiceItems.items");
  const carRent = watch("invoice.carRent");
  const discount = watch("invoice.discount");
  const cash = watch("invoice.cash");

  // Update price instantly whenever rate or quantity changes
  watchItems.forEach((item, index) => {
    const selectedClassName = item.class;
    const rateFromClass =
      classAndRate.find(
        (cls: TClassAndRate) => cls.className === selectedClassName,
      )?.rate || 0;

    const quantity = Number(item.quantity) || 0;
    const price = rateFromClass * quantity;

    // Update rate if it's different
    if (Number(item.rate) !== rateFromClass) {
      setValue(`invoiceItems.items.${index}.rate`, rateFromClass);
    }

    // Update price if it's different
    if (Number(item.price) !== price) {
      setValue(`invoiceItems.items.${index}.price`, price);
    }
  });

  const totalProductPrice = watchItems.reduce(
    (acc, current) => acc + Number(current.price),
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
      Object.values(item).every((value) => value !== 0 && value !== ""),
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
    if (data.invoice.due && !duePayDate) {
      return showToast({
        title: "বাকি পরিশোধের তারিখ সেট করুন",
        type: "info",
        options: {
          duration: 4000,
          icon: <RiErrorWarningFill className="h-5 w-5" />,
        },
      });
    }
    try {
      const result = await mutateAsync(data).unwrap();

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


  const handleSelectOldCustomer = (customer: TCustomer) => {
    setValue("customer.phoneNumber", customer.phoneNumber || "");
    setValue("customer.name", customer.name || "");
    setValue("customer.address", customer.address || "");
    setOpenOldCustomerModal(false);
  };




  return (
    <CustomModalBottom
      isOpen={isOpen}
      onClose={onClose}
      title="নতুন চালান"
      width="xxl"
    >
      {classRateLoading || serialLoading ? (
        <CustomStatus type="loading" />
      ) : invoiceError || isError ? <CustomStatus type="error" /> : (
        <div>
          <div className="flex flex-col lg:flex-row justify-between gap-4 mb-4">
            <div className="flex items-stretch sm:items-center gap-2 w-full lg:w-auto">
              <button className="bg-[#039A63] text-white px-4 sm:px-6 py-2 rounded font-medium hover:bg-[#028a58] transition flex items-center justify-center gap-2 w-full sm:w-auto">
                নতুন কাস্টমার
              </button>
              <button
                onClick={() => setOpenOldCustomerModal(true)}
                className="text-orange-500 border border-orange-500 px-3 py-2 rounded hover:bg-orange-400 hover:text-white transition w-full sm:w-auto text-center">
                পুরাতন কাস্টমার
              </button>
            </div>

            <div className="flex items-stretch sm:items-center gap-3 w-full lg:w-auto">
              <div className="flex items-center border h-[41px] border-gray-300 rounded-md px-2 py-1 w-full sm:w-auto">
                <label className="text-gray-700 whitespace-nowrap mr-2">
                  চালান নম্বর:
                </label>
                <input
                  type="text"
                  className="outline-none w-full sm:w-20 pl-2 text-gray-800"
                  placeholder="000"
                  {...register("invoice.serial")}
                  defaultValue={
                    invoiceSerial?.data?.invoiceSerial
                      ? invoiceSerial?.data?.invoiceSerial
                      : 1
                  }
                />
              </div>

              <CustomDatePickerState
                value={challanDate!}
                onChange={setChallanDate!}
                disablePastDates
              />
            </div>
          </div>

          {/* Main Form */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
              <CustomInput
                name="customer.phoneNumber"
                label="ফোন নম্বর"
                placeholder="ফোন নম্বর"
                register={register}
                type="text"
                rules={{ required: "ফোন নম্বর লিখুন" }}
                error={errors.customer?.phoneNumber}
              />
              <CustomInput
                name="customer.name"
                label="কাস্টমারের নাম"
                placeholder="কাস্টমারের নাম"
                register={register}
                type="text"
                rules={{ required: "কাস্টমারের নাম লিখুন" }}
                error={errors.customer?.name}
              />
              <CustomInput
                name="customer.address"
                label="কাস্টমারের ঠিকানা"
                placeholder="কাস্টমারের ঠিকানা"
                register={register}
                type="text"
                rules={{ required: "কাস্টমারের ঠিকানা লিখুন" }}
                error={errors.customer?.address}
              />
              <CustomSelect
                name="invoice.chalanType"
                label="চালানের ধরণ"
                placeholder="চালানের ধরণ"
                error={errors.invoice?.chalanType}
                rules={{ required: "চালানের ধরণ লিখুন" }}
                control={control}
                options={[
                  { label: "রেগুলার চালান", value: "রেগুলার চালান" },
                  { label: "অগ্রিম চালান", value: "অগ্রিম চালান" },
                ]}
              />
              <div>
                <CustomDatePicker
                  control={control}
                  name="invoice.deliveryDate"
                  placeholder="ডেলিভারি তারিখ"
                  label="ডেলিভারি তারিখ"
                  disablePastDates
                  error={errors.invoice?.deliveryDate}
                  rules={{ required: "ডেলিভারি তারিখ" }}
                />
              </div>
              <CustomInput
                name="invoice.note"
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
                  className="flex w-full items-center md:items-end gap-2 rounded-xl border border-gray-200 bg-gray-50 p-3"
                >
                  {/* Add Button */}
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
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    <div className="flex-1">
                      <CustomSelect
                        name={`invoiceItems.items.${index}.class`}
                        label="শ্রেণি"
                        placeholder="শ্রেণি"
                        control={control}
                        options={classOptions || []}
                        error={errors.invoiceItems?.items?.[index]?.class}
                        rules={{
                          required: "শ্রেণি নির্বাচন করুন",
                        }}
                      />
                    </div>
                    <div className="flex-1">
                      <CustomInput
                        name={`invoiceItems.items.${index}.rate`}
                        label="রেট"
                        placeholder="0"
                        register={register}
                        type="text"
                        error={errors.invoiceItems?.items?.[index]?.rate}
                        rules={{
                          required: "রেট আবশ্যক",
                        }}
                      />
                    </div>
                    <div className="flex-1">
                      <CustomInput
                        name={`invoiceItems.items.${index}.quantity`}
                        label="পরিমাণ"
                        placeholder="0"
                        register={register}
                        type="number"
                        error={errors.invoiceItems?.items?.[index]?.quantity}
                        rules={{ required: "পরিমাণ আবশ্যক" }}
                      />
                    </div>

                    <div className="flex-1">
                      <CustomInput
                        name={`invoiceItems.items.${index}.price`}
                        label="মূল্য"
                        placeholder="0"
                        register={register}
                        type="number"
                        readonly
                        error={errors.invoiceItems?.items?.[index]?.price}
                        rules={{ required: "মূল্য আবশ্যক" }}
                      />
                    </div>
                  </div>
                  {/* Delete Button */}
                  <button
                    type="button"
                    disabled={fields.length === 1}
                    onClick={() => remove(index)}
                    title="সারি মুছে ফেলুন"
                    className={`flex h-10 w-10  cursor-pointer items-center justify-center rounded-lg border transition-all duration-200 active:scale-95 ${fields.length === 1
                      ? "cursor-not-allowed border-gray-200 bg-gray-100 text-gray-400"
                      : "border-red-200 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white hover:shadow-md"
                      }`}
                  >
                    <Trash size={18} strokeWidth={2.5} />
                  </button>
                </div>
              ))}
            </div>

            {/* Footer Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {due ? (
                <div className=" flex-col items-center justify-center h-auto">
                  <h1 className="text-orange-600 text-sm text-center">
                    বাকি পরিশোধের তারিখ লিখুন
                  </h1>
                  <div className="w-max mx-auto py-2">
                    <CustomDatePickerState disablePastDates value={duePayDate} onChange={setDuepayDate} />
                  </div>
                  <SmsSwitch
                    sendSms={sendSms}
                    setSendSms={setSendSms}
                    showBorder={false}
                    showLabel={false}
                    title="কাস্টমারকে এসএমএস দিন"
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
                  error={errors.invoice?.productPrice}
                  rules={{ required: "মূল্য আবশ্যক" }}
                />

                <CustomInput
                  name="invoice.discount"
                  label="ছাড়"
                  placeholder="0"
                  register={register}
                  type="number"
                  error={errors.invoice?.discount}
                  rules={{ required: "ছাড় আবশ্যক" }}
                />

                <CustomInput
                  name="invoice.carRent"
                  label="গাড়ি ভাড়া"
                  placeholder="৳ 0"
                  register={register}
                  type="number"
                  error={errors.invoice?.carRent}
                  rules={{ required: "গাড়ি ভাড়া আবশ্যক" }}
                />

                <CustomInput
                  name="invoice.totalPrice"
                  label="মোট"
                  placeholder="৳ 0"
                  register={register}
                  type="number"
                  readonly
                  error={errors.invoice?.totalPrice}
                  rules={{ required: "মোট মূল্য আবশ্যক" }}
                />

                <CustomInput
                  name="invoice.cash"
                  label="নগদ"
                  placeholder="৳ 0"
                  register={register}
                  type="number"
                  error={errors.invoice?.cash}
                  rules={{ required: "নগদ পরিমাণ আবশ্যক" }}
                />

                <CustomInput
                  name="invoice.due"
                  label="বাকি"
                  placeholder="৳ 0"
                  register={register}
                  type="number"
                  readonly
                  error={errors.invoice?.due}
                />
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
                className="text-[14px] bg-[#039A63] disabled:bg-gray-500 px-8 py-1.5 text-white font-medium rounded cursor-pointer"
                disabled={createInvoiceLoading}
              >
                {createInvoiceLoading ? "সেভ হচ্ছে..." : "সেভ করুন"}
              </button>
            </div>
          </form>

          {
            openOlodCustomerModal &&
            <OldCustomerModal
              setCustomer={handleSelectOldCustomer}
              isOpen={openOlodCustomerModal}
              onClose={() => setOpenOldCustomerModal(false)}
            />
          }
        </div>
      )}
    </CustomModalBottom>
  );
};

export default NewChalanModal;
