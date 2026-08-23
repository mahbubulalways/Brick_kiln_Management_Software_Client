"use client";

import CustomInput from "@/components/Reusable/CustomInput";
import CustomSelect from "@/components/Reusable/CustomSelect";
import { useForm } from "react-hook-form";

type TPaymentForm = {
    provider: string;
    vataId: string;
    senderNumber: string;
    transactionId: string;
    amount: string;
};

const SoftwarePaymentPage = () => {
    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm<TPaymentForm>({
        defaultValues: {
            provider: "",
            vataId: "",
            senderNumber: "",
            transactionId: "",
            amount: "",
        },
    });

    const onSubmit = (data: TPaymentForm) => {
        console.log(data);
    };

    const providerOptions = [
        {
            label: "বিকাশ",
            value: "bkash",
        },
        {
            label: "নগদ",
            value: "nagad",
        },
        {
            label: "রকেট",
            value: "rocket",
        },
    ];

    return (
        <div className="min-h-screen w-full bg-white pb-8">
            {/* ================= HEADER ================= */}
            <div className="mx-1 rounded-b-md bg-red-50 py-3 shadow-[0_10px_20px_rgba(255,0,0,0.08)]">
                <h1 className="text-center text-[28px] font-normal leading-[42px] text-orange-600">
                    সফটওয়্যারের ফি জমা দিন
                </h1>
            </div>

            {/* ================= PAYMENT METHOD ================= */}
            <div className="mx-auto mt-[22px] w-[493px] max-w-[calc(100%-30px)]">
                <p className="mb-[8px] text-center text-[15px] font-normal text-gray-500">
                    পেমেন্টের মাধ্যম সিলেক্ট করুন
                </p>

                <CustomSelect
                    name="provider"
                    placeholder="পেমেন্টের মাধ্যম নির্বাচন করুন"
                    options={providerOptions}
                    control={control}
                    rules={{
                        required: "পেমেন্টের মাধ্যম নির্বাচন করুন",
                    }}
                />

                {errors.provider && (
                    <p className="mt-1 text-sm text-red-500">
                        {errors.provider.message}
                    </p>
                )}
            </div>

            {/* ================= FORM CARD ================= */}
            <div className="mx-auto mt-[34px] w-[575px] max-w-[calc(100%-30px)] rounded-[9px] border border-gray-200 bg-white px-[30px] py-[27px] shadow-[0_3px_8px_rgba(0,0,0,0.16)]">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-[14px]">
                        {/* ================= DOCTOR ID ================= */}
                        <CustomInput
                            name="vataId"
                            label="ভাটার আইডি"
                            placeholder="ভাটার আইডি"
                            register={register}
                            type="text"
                            error={errors.vataId}
                            rules={{
                                required: "ভাটার আইডি প্রদান করুন",
                            }}
                        />

                        {/* ================= SENDER NUMBER ================= */}
                        <CustomInput
                            name="senderNumber"
                            label="যে অ্যাকাউন্ট/নম্বর থেকে টাকা পাঠিয়েছেন"
                            placeholder="017xxxxxxxx"
                            register={register}
                            type="text"
                            error={errors.senderNumber}
                            rules={{
                                required:
                                    "যে নম্বর থেকে টাকা পাঠিয়েছেন সেটি প্রদান করুন",
                            }}
                        />

                        {/* ================= TRANSACTION ID ================= */}
                        <CustomInput
                            name="transactionId"
                            label="Transaction ID (TrxID)"
                            placeholder="TXN123456"
                            register={register}
                            type="text"
                            error={errors.transactionId}
                            rules={{
                                required: "Transaction ID প্রদান করুন",
                            }}
                        />

                        {/* ================= AMOUNT ================= */}
                        <CustomInput
                            name="amount"
                            label="টাকার পরিমাণ"
                            placeholder="টাকার পরিমাণ লিখুন"
                            register={register}
                            type="number"
                            error={errors.amount}
                            rules={{
                                required: "টাকার পরিমাণ প্রদান করুন",
                            }}
                        />
                    </div>

                    {/* ================= BUTTONS ================= */}
                    <div className="mt-[15px] grid grid-cols-2 gap-[10px]">
                        <button
                            type="button"
                            onClick={() => reset()}
                            className="cursor-pointer rounded-md border border-gray-300 bg-white py-1.5 text-[18px] font-medium text-gray-800 transition-colors hover:bg-gray-50"
                        >
                            ক্লিয়ার
                        </button>

                        <button
                            type="submit"
                            className="cursor-pointer rounded-md bg-[#039A63] py-1.5 text-[18px] font-medium text-white transition-colors hover:bg-[#028957]"
                        >
                            সাবমিট
                        </button>
                    </div>
                </form>
            </div>

            {/* ================= RECEIPT BUTTON ================= */}
            <div className="mt-[24px] flex justify-center">
                <button
                    type="button"
                    className="rounded-[8px] border border-gray-300 bg-white px-[18px] py-[7px] text-[15px] font-normal text-gray-700 shadow-sm transition-colors hover:bg-gray-50"
                >
                    ফি (পেমেন্ট রিসিট দেখুন)
                </button>
            </div>
        </div>
    );
};

export default SoftwarePaymentPage;