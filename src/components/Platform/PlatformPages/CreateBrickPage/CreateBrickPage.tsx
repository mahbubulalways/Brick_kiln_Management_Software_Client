"use client";

import {
    Building2,
    CreditCard,
    ShieldCheck,
    UserRound,
} from "lucide-react";

import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

import CustomInput from "@/components/Reusable/CustomInput";
import CustomDatePicker from "@/components/Reusable/CustomDatePicker";
import CustomSelect from "@/components/Reusable/CustomSelect";

import { handleApiError } from "@/utils/handleApiError";
import formatLabelValuePair from "@/utils/formatLabelValuePair";

import { useCreateNewVataMutation } from "@/redux/system.features/system.vata.features";
import { useGetSubscriptionOptionsQuery } from "@/redux/system.features/system.subscription.featurs";

export type TVata = {
    vata: {
        vataId: string;
        nameEnglish: string;
        nameBangla: string;
        address: string;
        subdomain: string;
        ownerName: string;
        ownerPhoneNumber: string;
        challansPhoneNumber: string;
        susbscriptionPlanId: string;
        nextPaymentDate: string;
    };

    owner: {
        name: string;
        username: string;
        password: string;
    };
};

const CreateBrickPage = () => {
    const [createNewVata, { isLoading }] =
        useCreateNewVataMutation();

    const {
        isError,
        isLoading: optionsLoading,
        data,
        error
    } = useGetSubscriptionOptionsQuery(undefined);

    const subscriptionOptions = formatLabelValuePair({
        data: data?.data,
        label: "name",
        value: "id",
    });
console.log(error)
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<TVata>({
        defaultValues: {
            vata: {
                vataId: "VATA-003",
                nameEnglish: "Royal Bricks",
                nameBangla: "রয়্যাল ব্রিকস",
                address: "ধামরাই, ঢাকা",
                subdomain: "royal-bricks",
                ownerName: "সোহেল মিয়া",
                ownerPhoneNumber: "01987654321",
                challansPhoneNumber:
                    "01687654321,01687654322",
                susbscriptionPlanId: "",
                nextPaymentDate: "2026-12-01",
            },

            owner: {
                name: "সোহেল মিয়া",
                username: "sohel",
                password: "Sohel@123",
            },
        },
    });

    const onSubmit: SubmitHandler<TVata> = async (data) => {
        try {
            const res = await createNewVata(data).unwrap();

            if (res?.success) {
                toast.success("ভাটা সফলভাবে তৈরি হয়েছে");
            } else {
                toast.error(
                    res?.message || "ভাটা তৈরি করা যায়নি"
                );
            }
        } catch (error: any) {
            handleApiError({ error });
        }
    };

    return (
        <div className="min-h-full w-full bg-[#f8fafc]">
            <div className="mx-auto w-full max-w-7xl">
                {/* ================= PAGE HEADER ================= */}
                <div className="mb-6 rounded-xl border border-gray-200 bg-white px-5 py-4 shadow-sm">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <div className="flex items-center gap-2">
                                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#039A63]/10">
                                    <Building2
                                        size={19}
                                        className="text-[#039A63]"
                                        strokeWidth={2}
                                    />
                                </div>

                                <h1 className="text-lg font-semibold text-[#34495e] md:text-xl">
                                    নতুন ভাটা তৈরি করুন
                                </h1>
                            </div>

                            <p className="mt-1.5 text-sm text-gray-500">
                                নতুন ভাটা, সাবস্ক্রিপশন এবং অ্যাডমিন
                                অ্যাকাউন্ট তৈরি করুন।
                            </p>
                        </div>

                        <div className="hidden rounded-lg bg-[#039A63]/5 px-3 py-2 sm:block">
                            <span className="text-xs font-medium text-[#039A63]">
                                নতুন ভাটা
                            </span>
                        </div>
                    </div>
                </div>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-5"
                >
                    {/* ================= VATA BASIC INFORMATION ================= */}
                    <section className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                        {/* Header */}
                        <div className="border-b border-gray-100 bg-gradient-to-r from-[#039A63]/5 to-transparent px-5 py-4">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#039A63]/10">
                                    <Building2
                                        size={20}
                                        className="text-[#039A63]"
                                        strokeWidth={1.8}
                                    />
                                </div>

                                <div>
                                    <h2 className="text-base font-semibold text-[#34495e]">
                                        ভাটার তথ্য
                                    </h2>

                                    <p className="mt-0.5 text-xs text-gray-500">
                                        ভাটার পরিচয়, নাম, ঠিকানা ও
                                        যোগাযোগের তথ্য
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Body */}
                        <div className="p-5">
                            <div className="grid grid-cols-1 gap-x-5 gap-y-4 md:grid-cols-2">
                                <CustomInput
                                    label="ভাটার আইডি"
                                    placeholder="VATA-001"
                                    type="text"
                                    error={errors.vata?.vataId}
                                    register={register}
                                    name="vata.vataId"
                                    rules={{
                                        required:
                                            "ভাটার আইডি দিন",
                                    }}
                                />

                                <CustomInput
                                    label="সাবডোমেইন"
                                    placeholder="hasan"
                                    type="text"
                                    error={
                                        errors.vata?.subdomain
                                    }
                                    register={register}
                                    name="vata.subdomain"
                                    rules={{
                                        required:
                                            "সাবডোমেইন দিন",
                                        pattern: {
                                            value: /^[a-z0-9-]+$/,
                                            message:
                                                "শুধু ছোট হাতের অক্ষর, সংখ্যা ও - ব্যবহার করুন",
                                        },
                                    }}
                                />

                                <CustomInput
                                    label="ভাটার নাম (ইংরেজি)"
                                    placeholder="Hasan Bricks"
                                    type="text"
                                    error={
                                        errors.vata?.nameEnglish
                                    }
                                    register={register}
                                    name="vata.nameEnglish"
                                    rules={{
                                        required:
                                            "ইংরেজি নাম দিন",
                                    }}
                                />

                                <CustomInput
                                    label="ভাটার নাম (বাংলায়)"
                                    placeholder="হাসান ব্রিকস"
                                    type="text"
                                    error={
                                        errors.vata?.nameBangla
                                    }
                                    register={register}
                                    name="vata.nameBangla"
                                    rules={{
                                        required:
                                            "বাংলা নাম দিন",
                                    }}
                                />

                                <CustomInput
                                    label="ভাটার ঠিকানা"
                                    placeholder="ভাটার সম্পূর্ণ ঠিকানা"
                                    type="text"
                                    error={errors.vata?.address}
                                    register={register}
                                    name="vata.address"
                                    rules={{
                                        required:
                                            "ঠিকানা দিন",
                                    }}
                                />

                                <CustomInput
                                    label="মালিকের নাম"
                                    placeholder="মালিকের নাম"
                                    type="text"
                                    error={
                                        errors.vata?.ownerName
                                    }
                                    register={register}
                                    name="vata.ownerName"
                                    rules={{
                                        required:
                                            "মালিকের নাম দিন",
                                    }}
                                />

                                <CustomInput
                                    label="মালিকের ফোন নম্বর"
                                    placeholder="017XXXXXXXX"
                                    type="text"
                                    error={
                                        errors.vata
                                            ?.ownerPhoneNumber
                                    }
                                    register={register}
                                    name="vata.ownerPhoneNumber"
                                    rules={{
                                        required:
                                            "মালিকের ফোন নম্বর দিন",
                                        pattern: {
                                            value: /^01[3-9]\d{8}$/,
                                            message:
                                                "সঠিক মোবাইল নম্বর দিন",
                                        },
                                    }}
                                />

                                <CustomInput
                                    label="চালানের ফোন নম্বর"
                                    placeholder="018XXXXXXXX"
                                    type="text"
                                    error={
                                        errors.vata
                                            ?.challansPhoneNumber
                                    }
                                    register={register}
                                    name="vata.challansPhoneNumber"
                                    rules={{
                                        required:
                                            "চালানের ফোন নম্বর দিন",
                                    }}
                                />
                            </div>
                        </div>
                    </section>

                    {/* ================= SUBSCRIPTION & PAYMENT ================= */}
                    <section className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                        {/* Header */}
                        <div className="border-b border-gray-100 bg-gradient-to-r from-[#039A63]/5 to-transparent px-5 py-4">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#039A63]/10">
                                    <CreditCard
                                        size={20}
                                        className="text-[#039A63]"
                                        strokeWidth={1.8}
                                    />
                                </div>

                                <div>
                                    <h2 className="text-base font-semibold text-[#34495e]">
                                        সাবস্ক্রিপশন ও পেমেন্ট
                                    </h2>

                                    <p className="mt-0.5 text-xs text-gray-500">
                                        সাবস্ক্রিপশন প্ল্যান এবং
                                        পরবর্তী পেমেন্টের তথ্য নির্বাচন করুন
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Body */}
                        <div className="p-5">
                            <div className="grid grid-cols-1 gap-x-5 gap-y-4 md:grid-cols-3">
                                {/* Subscription Plan */}
                                <CustomSelect
                                    label="সাবস্ক্রিপশন প্ল্যান"
                                    placeholder={
                                        optionsLoading
                                            ? "প্ল্যান লোড হচ্ছে..."
                                            : "সাবস্ক্রিপশন প্ল্যান নির্বাচন করুন"
                                    }
                                    options={
                                        subscriptionOptions || []
                                    }
                                    control={control}
                                    name="vata.susbscriptionPlanId"
                                    error={
                                        errors.vata
                                            ?.susbscriptionPlanId
                                    }
                                    rules={{
                                        required:
                                            "সাবস্ক্রিপশন প্ল্যান নির্বাচন করুন",
                                    }}
                                />


                                {/* Next Payment Date */}
                                <CustomDatePicker
                                    label="পরবর্তী পেমেন্টের তারিখ"
                                    error={
                                        errors.vata
                                            ?.nextPaymentDate
                                    }
                                    control={control}
                                    name="vata.nextPaymentDate"
                                    rules={{
                                        required:
                                            "পরবর্তী পেমেন্টের তারিখ দিন",
                                    }}
                                />
                            </div>
                        </div>
                    </section>

                    {/* ================= ADMIN USER ================= */}
                    <section className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                        {/* Header */}
                        <div className="border-b border-gray-100 bg-gradient-to-r from-[#039A63]/5 to-transparent px-5 py-4">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#039A63]/10">
                                    <UserRound
                                        size={20}
                                        className="text-[#039A63]"
                                        strokeWidth={1.8}
                                    />
                                </div>

                                <div>
                                    <h2 className="text-base font-semibold text-[#34495e]">
                                        অ্যাডমিন ইউজারের তথ্য
                                    </h2>

                                    <p className="mt-0.5 text-xs text-gray-500">
                                        ভাটার জন্য অ্যাডমিন লগইন
                                        অ্যাকাউন্ট তৈরি করুন
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Body */}
                        <div className="p-5">
                            <div className="grid grid-cols-1 gap-x-5 gap-y-4 md:grid-cols-3">
                                <CustomInput
                                    label="ইউজারের নাম"
                                    placeholder="Mahbubul Hasan"
                                    type="text"
                                    error={errors.owner?.name}
                                    register={register}
                                    name="owner.name"
                                    rules={{
                                        required:
                                            "ইউজারের নাম দিন",
                                    }}
                                />

                                <CustomInput
                                    label="ইউজারনেম"
                                    placeholder="hasan"
                                    type="text"
                                    error={
                                        errors.owner?.username
                                    }
                                    register={register}
                                    name="owner.username"
                                    rules={{
                                        required:
                                            "ইউজারনেম দিন",
                                        minLength: {
                                            value: 3,
                                            message:
                                                "ইউজারনেম কমপক্ষে ৩ অক্ষরের হতে হবে",
                                        },
                                    }}
                                />

                                <CustomInput
                                    label="পাসওয়ার্ড"
                                    placeholder="••••••••"
                                    type="password"
                                    error={
                                        errors.owner?.password
                                    }
                                    register={register}
                                    name="owner.password"
                                    rules={{
                                        required:
                                            "পাসওয়ার্ড দিন",
                                        minLength: {
                                            value: 6,
                                            message:
                                                "পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে",
                                        },
                                    }}
                                />
                            </div>

                            {/* Security Notice */}
                            <div className="mt-5 flex items-start gap-3 rounded-lg border border-[#039A63]/10 bg-[#039A63]/5 p-3">
                                <ShieldCheck
                                    size={18}
                                    className="mt-0.5 shrink-0 text-[#039A63]"
                                />

                                <div>
                                    <p className="text-xs font-medium text-[#34495e]">
                                        নিরাপত্তা নির্দেশনা
                                    </p>

                                    <p className="mt-0.5 text-xs leading-5 text-gray-500">
                                        অ্যাডমিনের ইউজারনেম ও
                                        পাসওয়ার্ড নিরাপদে সংরক্ষণ
                                        করুন। পাসওয়ার্ড কারও সাথে
                                        শেয়ার করবেন না।
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* ================= ACTION ================= */}
                    <div className="flex flex-col-reverse gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
                        <p className="text-xs text-gray-500">
                            সব তথ্য সঠিকভাবে পূরণ করে ভাটা তৈরি করুন।
                        </p>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="rounded-lg bg-[#039A63] px-7 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#028653] hover:shadow-md active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-gray-400 disabled:shadow-none"
                        >
                            {isLoading
                                ? "ভাটা তৈরি হচ্ছে..."
                                : "ভাটা তৈরি করুন"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateBrickPage;