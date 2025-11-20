"use client";

import { useEffect, useState } from "react";
import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import CustomInputLabel from "@/components/Reusable/CustomInputLabel";
import CustomModalBottom from "@/components/Reusable/CustomModalBottom";
import { DatePicker } from "@/components/Others/DatePicker";
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
type TCustomModal = {
  isOpen: boolean;
  onClose: () => void;
};

const NewChalanModal = ({ isOpen, onClose }: TCustomModal) => {
  const [deliveryDate, setDeliveryDate] = useState<Date | undefined>(
    new Date()
  );
  const [challanDate, setChallanDate] = useState<Date | undefined>(new Date());
  const [duePayDate, setDuepayDate] = useState<Date | undefined>();
  const [sendSms, setSendSms] = useState<boolean>(false);

  // GET INVOICE SERIAL FOR INVOICE NO
  const { data: invoiceSerial, isLoading: serialLoading } =
    useGetInvoiceSerialQuery({ refetchOnMountOrArgChange: true });

  // GET CLASS AND RATE FOR DROPDOWN
  const { isLoading: classRateLoading, data: fetchedData } =
    useGetAllClassAndRateQuery(undefined);
  const classAndRate = fetchedData?.data || [];

  // CREATE NEW INVOICE
  const [mutateAsync, { isLoading: createInvoiceLoading }] =
    useCreateInvoiceMutation();
  const classOptions = classAndRate?.map(
    (cls: TClassAndRate) => cls?.className
  );

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
        (cls: TClassAndRate) => cls.className === selectedClassName
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
    0
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
    console.log(data);
    const allValid = watchItems.every((item) =>
      Object.values(item).every((value) => value !== 0 && value !== "")
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

  return (
    <CustomModalBottom
      isOpen={isOpen}
      onClose={onClose}
      title="নতুন চালান 😍"
      width="w-4xl h-[85vh] lg:h-[85vh] overflow-y-auto pb-5 no-scrollbar"
    >
      {classRateLoading || serialLoading ? (
        <></>
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
              <div className="flex items-center border-2 border-gray-300 rounded-md px-2 py-1 w-full sm:w-auto">
                <label className="text-gray-700 whitespace-nowrap mr-2">
                  চালান নম্বর:
                </label>
                <input
                  type="text"
                  className="outline-none w-full sm:w-20 pl-2 text-gray-800"
                  placeholder="000"
                  {...register("invoice.serial")}
                  defaultValue={
                    invoiceSerial?.data?.totalInvoice
                      ? invoiceSerial?.data?.totalInvoice + 1
                      : 1
                  }
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
                name="customer.phoneNumber"
                label="ফোন নম্বর"
                placeholder="ফোন নম্বর"
                register={register}
                type="text"
                errMsg={"ফোন নম্বর লিখুন"}
                required
                error={errors.customer?.phoneNumber}
              />
              <CustomInputLabel
                name="customer.name"
                label="কাস্টমারের নাম"
                placeholder="কাস্টমারের নাম"
                register={register}
                type="text"
                required
                errMsg={"কাস্টমারের নাম লিখুন"}
                error={errors.customer?.name}
              />
              <CustomInputLabel
                name="customer.address"
                label="কাস্টমারের ঠিকানা"
                placeholder="কাস্টমারের ঠিকানা"
                register={register}
                type="text"
                errMsg={"কাস্টমারের ঠিকানা লিখুন"}
                required
                error={errors.customer?.address}
              />
              <CustomSelect
                name="invoice.chalanType"
                label="চালানের ধরণ"
                placeholder=""
                defaultValue="রেগুলার চালান"
                control={control}
                options={["রেগুলার চালান", "অগ্রিম চালান"]}
              />
              <div>
                <Label className=" flex items-center text-sm font-medium text-gray-600">
                  ডেলিভারি তারিখ
                </Label>
                <DatePicker setDate={setDeliveryDate} date={deliveryDate} />
              </div>
              <CustomInputLabel
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
                  className="flex items-center gap-2 bg-gray-50 rounded-md p-2"
                >
                  <CustomSelect
                    name={`invoiceItems.items.${index}.class`}
                    label="শ্রেণি"
                    placeholder="শ্রেণি"
                    control={control}
                    options={classOptions || []}
                  />
                  <CustomInputLabel
                    name={`invoiceItems.items.${index}.rate`}
                    label="রেট"
                    placeholder="0"
                    register={register}
                    type="text"
                    required
                  />
                  <CustomInputLabel
                    name={`invoiceItems.items.${index}.quantity`}
                    label="পরিমাণ"
                    placeholder="0"
                    register={register}
                    type="number"
                    required
                  />
                  <CustomInputLabel
                    name={`invoiceItems.items.${index}.price`}
                    label="মূল্য"
                    placeholder="0"
                    register={register}
                    type="number"
                    readonly={true}
                    required
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
                    sendSms={sendSms}
                    setSendSms={setSendSms}
                    showBorder={false}
                    showLabel={false}
                    title="কাস্টমারকে এসএমএস দিন"
                  />
                </div>
              ) : (
                <div>
                  <h1>HERE WILL BE SOMETHING</h1>
                </div>
              )}

              <div className="grid grid-cols-2 gap-2">
                <CustomInputLabel
                  name="invoice.productPrice"
                  label="মূল্য"
                  placeholder="0"
                  register={register}
                  type="number"
                  readonly
                  required
                />
                <CustomInputLabel
                  name="invoice.discount"
                  label="ছাড়"
                  placeholder="0"
                  register={register}
                  type="number"
                  required
                  // error={errors.invoice?.discount}
                />
                <CustomInputLabel
                  name="invoice.carRent"
                  label="গাড়ি ভাড়া"
                  placeholder="৳ 0"
                  register={register}
                  type="number"
                  required
                />
                <CustomInputLabel
                  name="invoice.totalPrice"
                  label="মোট"
                  placeholder="৳ 0"
                  register={register}
                  type="number"
                  readonly
                  required
                />
                <CustomInputLabel
                  name="invoice.cash"
                  label="নগদ"
                  placeholder="৳ 0"
                  register={register}
                  type="number"
                />
                <CustomInputLabel
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

export default NewChalanModal;
